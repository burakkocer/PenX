"use client";

import { useCallback } from "react";

import { type Locale, type MessageKey, t as translate } from "@/lib/i18n";
import { usePreferencesStore } from "@/stores/preferences/preferences-provider";

/** Current UI language, read from the preferences store. */
export function useLocale(): Locale {
  return usePreferencesStore((s) => s.locale);
}

/**
 * `t(key, vars?)` bound to the current UI language. Falls back to English
 * (see `lib/i18n`) for any key not yet translated, so the UI never shows a
 * raw key.
 */
export function useTranslations() {
  const locale = useLocale();
  return useCallback(
    (key: MessageKey, vars?: Record<string, string | number>) => translate(locale, key, vars),
    [locale],
  );
}
