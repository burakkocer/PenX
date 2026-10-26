/**
 * Supported UI languages.
 *
 * Kept deliberately small and flat (no routing/segment changes) because the
 * whole app is a client-rendered static export (see next.config.mjs,
 * `output: "export"`) — there is no per-request SSR to key off a URL
 * segment. Language is a client preference, same tier as theme/font in
 * `lib/preferences/`.
 */
export const SUPPORTED_LOCALES = ["en", "tr"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  tr: "Türkçe",
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (SUPPORTED_LOCALES as readonly string[]).includes(value);
}
