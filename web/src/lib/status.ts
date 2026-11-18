// Centralised status → color/label semantics, reused across the whole app.
// Spec §8.3: 意图 / 覆盖 / 任务 / 严重度 each have a consistent color set.

import type { MessageKey } from "@/lib/i18n";
import { tg } from "@/lib/i18n/runtime";

export type Tone = "neutral" | "blue" | "green" | "amber" | "red" | "rose" | "violet" | "slate";

export const toneClasses: Record<Tone, string> = {
  neutral: "bg-muted text-muted-foreground border-transparent",
  blue: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/20",
  green: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  amber: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/20",
  red: "bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/20",
  // rose 用作「严重」——实心高强调,视觉上明显高于「高危」的软红描边。
  rose: "bg-rose-600 text-white border-rose-600 dark:bg-rose-600 dark:text-white",
  violet: "bg-violet-500/15 text-violet-600 dark:text-violet-400 border-violet-500/20",
  slate: "bg-slate-500/15 text-slate-600 dark:text-slate-400 border-slate-500/20",
};

export const toneDot: Record<Tone, string> = {
  neutral: "bg-muted-foreground",
  blue: "bg-blue-500",
  green: "bg-emerald-500",
  amber: "bg-amber-500",
  red: "bg-red-500",
  rose: "bg-white",
  violet: "bg-violet-500",
  slate: "bg-slate-500",
};

interface StatusMeta {
  /** i18n message key (resolved by statusMeta) */
  label: MessageKey;
  tone: Tone;
}

const intent: Record<string, StatusMeta> = {
  open: { label: "status.intent.open", tone: "slate" },
  running: { label: "status.intent.running", tone: "blue" },
  paused: { label: "status.intent.paused", tone: "amber" },
  done: { label: "status.intent.done", tone: "green" },
  // blocked = 模型/API/网络故障重试用尽，这条意图基本没真正探成（非目标拦截）。
  blocked: { label: "status.intent.blocked", tone: "red" },
  // exhausted = 达到步数/时间预算被中途掐断、只写回部分结果（非方向已探尽）。
  exhausted: { label: "status.intent.exhausted", tone: "violet" },
  // stopped = 历史软删除状态（保留,历史数据）。
  stopped: { label: "status.intent.stopped", tone: "slate" },
  // deleted = 用户假删除了该意图（保留节点与血缘，删除原因见 delete_reason 字段）。
  deleted: { label: "status.intent.deleted", tone: "slate" },};

const task: Record<string, StatusMeta> = {
  created: { label: "status.task.created", tone: "slate" },
  queued: { label: "status.task.queued", tone: "amber" },
  running: { label: "status.task.running", tone: "blue" },
  paused: { label: "status.task.paused", tone: "amber" },
  done: { label: "status.task.done", tone: "green" },
  failed: { label: "status.task.failed", tone: "red" },
  timeout: { label: "status.task.timeout", tone: "amber" },};

const severity: Record<string, StatusMeta> = {
  critical: { label: "status.severity.critical", tone: "rose" },
  high: { label: "status.severity.high", tone: "red" },
  medium: { label: "status.severity.medium", tone: "amber" },
  low: { label: "status.severity.low", tone: "slate" },};

const finding: Record<string, StatusMeta> = {
  pending: { label: "status.finding.pending", tone: "amber" },
  in_progress: { label: "status.finding.in_progress", tone: "blue" },
  confirmed: { label: "status.finding.confirmed", tone: "red" },
  resolved: { label: "status.finding.resolved", tone: "green" },
  fixed: { label: "status.finding.fixed", tone: "green" },
  false_positive: { label: "status.finding.false_positive", tone: "slate" },
  ignored: { label: "status.finding.ignored", tone: "neutral" },
  duplicate: { label: "status.finding.duplicate", tone: "neutral" },
  risk_accepted: { label: "status.finding.risk_accepted", tone: "violet" },};

const engine: Record<string, StatusMeta> = {
  exploring: { label: "status.engine.exploring", tone: "blue" },
  paused: { label: "status.engine.paused", tone: "amber" },
  stalled: { label: "status.engine.stalled", tone: "red" },
  idle: { label: "status.engine.idle", tone: "neutral" },};

const goal: Record<string, StatusMeta> = {
  open: { label: "status.goal.open", tone: "blue" },
  met: { label: "status.goal.met", tone: "green" },
  abandoned: { label: "status.goal.abandoned", tone: "slate" },};

const audit: Record<string, StatusMeta> = {
  allow: { label: "status.audit.allow", tone: "green" },
  block: { label: "status.audit.block", tone: "red" },};

const node: Record<string, StatusMeta> = {
  observed: { label: "status.node.observed", tone: "slate" },
  confirmed: { label: "status.node.confirmed", tone: "green" },
  tombstoned: { label: "status.node.tombstoned", tone: "neutral" },};

// 推送投递状态。sending 用 blue 而不是 amber：它不是「有问题」，
// 而是「已被领取、正在发」，与 pending 的等待语义要能区分开。
const delivery: Record<string, StatusMeta> = {
  pending: { label: "status.delivery.pending", tone: "amber" },
  sending: { label: "status.delivery.sending", tone: "blue" },
  sent: { label: "status.delivery.sent", tone: "green" },
  failed: { label: "status.delivery.failed", tone: "red" },
  skipped: { label: "status.delivery.skipped", tone: "neutral" },};

const maps = {
  intent,
  task,
  severity,
  finding,
  engine,
  goal,
  audit,
  node,
  delivery,
} as const;

export type StatusDomain = keyof typeof maps;

export function statusMeta(domain: StatusDomain, key: string): { label: string; tone: Tone } {
  const meta = maps[domain][key];
  // Unknown status values are shown as-is (never a raw message key).
  return meta ? { label: tg(meta.label), tone: meta.tone } : { label: key, tone: "neutral" };
}
