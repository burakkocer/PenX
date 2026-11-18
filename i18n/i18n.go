// Package i18n resolves the caller's preferred UI language for API
// responses whose text is shown directly to the user (error messages,
// validation messages, notifications). It mirrors the frontend's
// web/src/lib/i18n: a flat key -> message catalog per locale, with English
// as the fallback for any key missing from another locale.
//
// This is an incremental migration: most of the backend's ~850
// writeErr(w, code, "<literal>") call sites still pass a raw string
// (unchanged, still works exactly as before). Only call sites that have
// been migrated to WriteErr(w, r, code, Key) get localized per-request;
// everything else keeps its original hardcoded text until migrated in a
// later batch.
package i18n

import (
	"fmt"
	"net/http"
	"os"
	"strings"
	"sync"
)

type Locale string

const (
	EN Locale = "en"
	TR Locale = "tr"

	DefaultLocale = EN
)

// Key identifies one message in the catalogs below. Deliberately a plain
// string (not an enum) so catalogs stay simple data; T falls back to the
// key itself if it is ever missing from every catalog, so a typo here
// degrades to an ugly-but-visible string instead of a panic or blank text.
type Key string

var catalogs = map[Locale]map[Key]string{
	EN: messagesEN,
	TR: messagesTR,
}

// T resolves one message key to localized text for the given locale,
// falling back to English, and finally to the key itself. `args` are
// applied with fmt.Sprintf-style verbs already baked into the catalog
// string (e.g. "Task %s not found").
func T(locale Locale, key Key, args ...any) string {
	msg, ok := catalogs[locale][key]
	if !ok {
		msg, ok = catalogs[DefaultLocale][key]
	}
	if !ok {
		msg = string(key)
	}
	if len(args) == 0 {
		return msg
	}
	return fmt.Sprintf(msg, args...)
}

// FromRequest determines the caller's preferred locale from the standard
// Accept-Language header (sent by the frontend's fetch wrapper based on
// its own `locale` preference — see web/src/lib/api.ts). Defaults to
// English for anything unrecognized, missing, or ambiguous.
func FromRequest(r *http.Request) Locale {
	if r == nil {
		return DefaultLocale
	}
	return FromAcceptLanguage(r.Header.Get("Accept-Language"))
}

// FromAcceptLanguage parses a (possibly multi-value, weighted) HTTP
// Accept-Language header and returns the first supported locale found,
// defaulting to English. Intentionally simple: it does not implement full
// RFC 4647 matching, just enough to honor "tr", "tr-TR", "en;q=0.9, tr",
// etc. in the order the client listed them.
func FromAcceptLanguage(header string) Locale {
	for _, part := range strings.Split(header, ",") {
		tag := strings.TrimSpace(strings.SplitN(part, ";", 2)[0])
		lang := strings.ToLower(strings.SplitN(tag, "-", 2)[0])
		switch Locale(lang) {
		case TR:
			return TR
		case EN:
			return EN
		}
	}
	return DefaultLocale
}

// Notification locale.
//
// Outgoing notifications (IM messages, emails, webhooks, delivery failure
// reasons) are produced by background workers with no HTTP request, hence no
// Accept-Language header. They use one process-wide locale instead, selected
// by the ARTEX_LANG environment variable ("en", "tr", "tr-TR", "tr_TR.UTF-8",
// ...). Unset or unsupported values mean English.
var (
	notifyOnce   sync.Once
	notifyMu     sync.RWMutex
	notifyLocale = DefaultLocale
)

// notifyLocaleFromEnvValue parses an ARTEX_LANG value. It reuses the
// Accept-Language parser after normalizing POSIX-style separators.
func notifyLocaleFromEnvValue(v string) Locale {
	return FromAcceptLanguage(strings.ReplaceAll(strings.TrimSpace(v), "_", "-"))
}

// NotifyLocale returns the locale used for server-generated notification
// text. The environment is read once, on first use.
func NotifyLocale() Locale {
	notifyOnce.Do(func() {
		l := notifyLocaleFromEnvValue(os.Getenv("ARTEX_LANG"))
		notifyMu.Lock()
		notifyLocale = l
		notifyMu.Unlock()
	})
	notifyMu.RLock()
	defer notifyMu.RUnlock()
	return notifyLocale
}

// SetNotifyLocale overrides the notification locale (intended for tests).
// It also disables the lazy ARTEX_LANG read so the override sticks.
func SetNotifyLocale(l Locale) {
	notifyOnce.Do(func() {})
	notifyMu.Lock()
	notifyLocale = l
	notifyMu.Unlock()
}
