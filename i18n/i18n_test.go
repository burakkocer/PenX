package i18n

import "testing"

// Go maps have no compile-time exhaustiveness check (unlike the frontend's
// TypeScript catalogs), so this test is the backend equivalent: every key
// defined in English must have a Turkish translation, and vice versa.
func TestCatalogsAreComplete(t *testing.T) {
	for k := range messagesEN {
		if _, ok := messagesTR[k]; !ok {
			t.Errorf("key %q has an English message but no Turkish translation", k)
		}
	}
	for k := range messagesTR {
		if _, ok := messagesEN[k]; !ok {
			t.Errorf("key %q has a Turkish message but no English translation (and no canonical key)", k)
		}
	}
}

func TestFromAcceptLanguage(t *testing.T) {
	cases := map[string]Locale{
		"":                  EN,
		"tr":                TR,
		"tr-TR":             TR,
		"en":                EN,
		"en-US,en;q=0.9":    EN,
		"fr-FR,fr;q=0.9":    EN, // unsupported language -> default
		"en;q=0.8,tr;q=0.9": EN, // first listed wins in this simple parser
		"tr;q=0.9,en;q=0.8": TR,
	}
	for header, want := range cases {
		if got := FromAcceptLanguage(header); got != want {
			t.Errorf("FromAcceptLanguage(%q) = %q, want %q", header, got, want)
		}
	}
}

func TestTFallback(t *testing.T) {
	if got := T(TR, "auth.unauthorized"); got != messagesTR["auth.unauthorized"] {
		t.Errorf("T(TR, ...) = %q, want %q", got, messagesTR["auth.unauthorized"])
	}
	if got := T(Locale("xx"), "auth.unauthorized"); got != messagesEN["auth.unauthorized"] {
		t.Errorf("T with unknown locale should fall back to English, got %q", got)
	}
	if got := T(EN, "no.such.key"); got != "no.such.key" {
		t.Errorf("T with unknown key should fall back to the key itself, got %q", got)
	}
}

func TestNotifyLocaleFromEnvValue(t *testing.T) {
	cases := map[string]Locale{
		"":            EN,
		"en":          EN,
		"EN":          EN,
		"tr":          TR,
		"tr-TR":       TR,
		"tr_TR":       TR,
		"tr_TR.UTF-8": TR,
		" tr ":        TR,
		"fr":          EN,
		"zh-CN":       EN,
	}
	for v, want := range cases {
		if got := notifyLocaleFromEnvValue(v); got != want {
			t.Errorf("notifyLocaleFromEnvValue(%q) = %q, want %q", v, got, want)
		}
	}
}

func TestSetNotifyLocale(t *testing.T) {
	defer SetNotifyLocale(EN)
	SetNotifyLocale(TR)
	if got := NotifyLocale(); got != TR {
		t.Errorf("NotifyLocale() = %q after SetNotifyLocale(TR)", got)
	}
	SetNotifyLocale(EN)
	if got := NotifyLocale(); got != EN {
		t.Errorf("NotifyLocale() = %q after SetNotifyLocale(EN)", got)
	}
}
