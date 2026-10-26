import { DEFAULT_LOCALE, type Locale } from "./locales";
import en from "./messages/en";
import tr from "./messages/tr";

export type MessageKey = keyof typeof en;

const CATALOGS: Record<Locale, Record<MessageKey, string>> = { en, tr };

/**
 * Resolve one message key to localized text, with simple `{token}`
 * interpolation. Falls back from the requested locale to English, and (only
 * if a key is somehow missing from both — shouldn't happen, `tr` is typed
 * against `en`'s keys) returns the key itself rather than throwing, so the
 * UI never hard-fails over a translation gap.
 */
export function t(locale: Locale, key: MessageKey, vars?: Record<string, string | number>): string {
  const template = CATALOGS[locale]?.[key] ?? CATALOGS[DEFAULT_LOCALE]?.[key] ?? key;
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (match, token: string) =>
    Object.hasOwn(vars, token) ? String(vars[token]) : match,
  );
}

export { DEFAULT_LOCALE, isLocale, LOCALE_LABELS, type Locale, SUPPORTED_LOCALES } from "./locales";
