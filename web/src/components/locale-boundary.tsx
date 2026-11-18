"use client";

import { Fragment, type ReactNode } from "react";

import { useLocale } from "@/hooks/use-translations";

/**
 * Remounts the app tree when the UI language changes, so text produced by
 * non-hook helpers (see lib/i18n/runtime.ts `tg`) is re-evaluated everywhere.
 * Language switches are rare, so losing transient UI state is acceptable.
 */
export function LocaleBoundary({ children }: { children: ReactNode }) {
  const locale = useLocale();
  return <Fragment key={locale}>{children}</Fragment>;
}
