import type { MessageKey } from "@/lib/i18n";
import { tg } from "@/lib/i18n/runtime";

// `label` is the protocol token written into the message text (@[漏洞#1 ...]) and
// parsed by the backend, so it must stay as-is. Use mentionKindLabel() for display.
export const mentionKinds = [
  { kind: "finding", label: "漏洞", alias: "finding" },
  { kind: "asset", label: "资产", alias: "asset" },
  { kind: "company", label: "企业", alias: "company" },
  { kind: "endpoint", label: "接口", alias: "api" },
  { kind: "ip", label: "IP", alias: "ip" },
  { kind: "app", label: "应用", alias: "app" },
  { kind: "root_domain", label: "域名", alias: "domain" },
  { kind: "subdomain", label: "子域名", alias: "subdomain" },
  { kind: "service", label: "服务", alias: "service" },
] as const;

const MENTION_KIND_LABEL_KEYS: Record<string, MessageKey> = {
  finding: "shell.mention.finding",
  asset: "shell.mention.asset",
  company: "shell.mention.company",
  endpoint: "shell.mention.endpoint",
  ip: "shell.mention.ip",
  app: "shell.mention.app",
  root_domain: "shell.mention.domain",
  subdomain: "shell.mention.subdomain",
  service: "shell.mention.service",
};

/** Localized display name of a mention kind (UI only; not the protocol token). */
export function mentionKindLabel(kind: string): string {
  const key = MENTION_KIND_LABEL_KEYS[kind];
  return key ? tg(key) : kind;
}

export type MentionKind = (typeof mentionKinds)[number]["kind"];
export interface ChatMention {
  kind: MentionKind;
  id: number;
  label: string;
  description: string;
}

export function activeMention(value: string, caret: number) {
  const before = value.slice(0, caret);
  const start = before.lastIndexOf("@");
  if (start < 0 || (start > 0 && /[\w.+/-]/.test(before[start - 1]))) return null;
  const query = before.slice(start + 1);
  if (/[[\]\r\n@]/.test(query) || query.length > 220) return null;
  return { start, end: caret, query };
}

export function mentionSearch(query: string) {
  const text = query.trimStart().toLowerCase();
  for (const item of mentionKinds) {
    for (const alias of [item.label.toLowerCase(), mentionKindLabel(item.kind).toLowerCase(), item.alias]) {
      if (text === alias || text.startsWith(`${alias} `) || (/[^a-z]/.test(alias) && text.startsWith(alias))) {
        return { kind: item.kind, query: query.trimStart().slice(alias.length).trim(), categories: [] };
      }
    }
  }
  const categories = mentionKinds.filter(
    (item) =>
      item.label.toLowerCase().startsWith(text) ||
      mentionKindLabel(item.kind).toLowerCase().startsWith(text) ||
      item.alias.startsWith(text),
  );
  return { kind: "" as const, query: query.trim(), categories };
}

export function mentionToken(item: ChatMention) {
  const kind = mentionKinds.find((entry) => entry.kind === item.kind)?.label ?? "资产";
  const label = item.label
    .replace(/[[\]]/g, (char) => (char === "[" ? "（" : "）"))
    .replace(/\s+/g, " ")
    .slice(0, 100);
  return `@[${kind}#${item.id} ${label}]`;
}

function mentionTokenKindLabel(tokenKind: string): string {
  const entry = mentionKinds.find((item) => item.label === tokenKind);
  return entry ? mentionKindLabel(entry.kind) : tokenKind;
}

export function selectedMentions(value: string) {
  return [...value.matchAll(/@\[(漏洞|资产|企业|接口|IP|应用|域名|子域名|服务)#([0-9]+)(?: ([^\]\r\n]*))?\]/g)].map(
    (match) => ({
      token: match[0],
      label: `${mentionTokenKindLabel(match[1])} #${match[2]}${match[3] ? ` · ${match[3]}` : ""}`,
      start: match.index,
    }),
  );
}
