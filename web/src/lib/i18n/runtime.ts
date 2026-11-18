import { getClientCookie } from "@/lib/cookie.client";

import { DEFAULT_LOCALE, isLocale, type Locale } from "./locales";
import { type MessageKey, t } from "./index";

/**
 * Non-React access to the active UI language, for modules that cannot call
 * hooks (label maps in lib/*.ts, option lists, helpers that return text).
 *
 * The preferences store keeps this in sync (see preferences-provider.tsx),
 * and LocaleBoundary remounts the app tree when the language changes, so any
 * function that calls `tg()` during render picks up the new language.
 *
 * Rule for callers: never call `tg()` at module load time (it would freeze
 * the language at startup). Call it inside functions/getters evaluated
 * during render.
 */
let activeLocale: Locale = DEFAULT_LOCALE;

if (typeof window !== "undefined") {
  const fromCookie = getClientCookie("locale");
  if (isLocale(fromCookie)) activeLocale = fromCookie;
}

export function getActiveLocale(): Locale {
  return activeLocale;
}

export function setActiveLocale(locale: Locale) {
  activeLocale = locale;
}

/** Translate with the active locale (non-React counterpart of useTranslations). */
export function tg(key: MessageKey, vars?: Record<string, string | number>): string {
  return t(activeLocale, key, vars);
}

/** BCP-47 tag for Intl / toLocaleString for the given (default: active) UI language. */
export function intlLocale(locale: Locale = activeLocale): string {
  return locale === "tr" ? "tr-TR" : "en-US";
}
