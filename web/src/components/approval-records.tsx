"use client";

import * as React from "react";

import {
  BotIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ClipboardListIcon,
  CopyIcon,
  RefreshCwIcon,
  ShieldAlertIcon,
  XIcon,
} from "lucide-react";
import { toast } from "sonner";

import { TablePagination } from "@/components/table-pagination";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTranslations } from "@/hooks/use-translations";
import { api } from "@/lib/api";
import type { MessageKey } from "@/lib/i18n";
import { intlLocale, tg } from "@/lib/i18n/runtime";
import type {
  InterceptApprovalFilter,
  InterceptApprovalRow,
  InterceptAudit,
  InterceptDetail,
  InterceptPending,
  InterceptReviewInput,
} from "@/lib/types";
import { cn } from "@/lib/utils";

function fmtTime(value?: string) {
  if (!value) return "—";
  return new Date(value).toLocaleString(intlLocale(), {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function source(row: InterceptApprovalRow) {
  if (row.decision_source) return row.decision_source;
  if (row.rule_id) return "rule";
  return row.reason?.startsWith("[模型]") ? "model" : "unknown";
}

function originLabel(row: InterceptApprovalRow) {
  if (row.task_id) return row.task_id;
  if (row.conversation_id) return tg("systemIntercept.approval.conversationOrigin", { id: row.conversation_id });
  return "—";
}

function ApprovalOrigin({ row, detail = false }: { row: InterceptApprovalRow; detail?: boolean }) {
  const t = useTranslations();
  const [locating, setLocating] = React.useState(false);
  const label =
    detail && row.task_id ? t("systemIntercept.approval.taskOrigin", { id: row.task_id }) : originLabel(row);
  const query = new URLSearchParams({ approval: String(row.id) });
  let href: string | undefined;
  if (row.conversation_id) {
    query.set("c", String(row.conversation_id));
    href = `/chat?${query}`;
  } else if (row.task_id) {
    query.set("id", row.task_id);
    href = `/function/tasks/detail?${query}`;
  }
  return href ? (
    <a
      href={href}
      className="text-primary underline-offset-4 hover:underline"
      aria-label={t("systemIntercept.approval.locateAria", { id: row.id, label })}
      aria-busy={locating}
      onClick={async (e) => {
        e.stopPropagation();
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        if (locating) return;
        setLocating(true);
        try {
          await api.interceptExecution(row.id, row.conversation_id ?? undefined);
          window.location.assign(href);
        } catch (error) {
          toast.error((error as Error).message || t("systemIntercept.approval.locateFailed"));
          setLocating(false);
        }
      }}
    >
      {label}
    </a>
  ) : (
    <span>{label}</span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const t = useTranslations();
  const labels: Record<string, string> = {
    pending: t("systemIntercept.approval.statusPending"),
    allowed: t("systemIntercept.approval.statusAllowed"),
    denied: t("systemIntercept.approval.statusDenied"),
    timeout: t("systemIntercept.approval.statusTimeout"),
  };
  let variant: "default" | "destructive" | "secondary" | "outline" = "outline";
  if (status === "allowed") variant = "default";
  if (status === "denied") variant = "destructive";
  if (status === "pending") variant = "secondary";
  return <Badge variant={variant}>{labels[status] ?? status}</Badge>;
}

function MatchCell({ row, showReason = true }: { row: InterceptApprovalRow; showReason?: boolean }) {
  const t = useTranslations();
  const reason = row.reason?.replace(/^\[模型\]\s*/, "");
  return (
    <div className="flex min-w-0 flex-col gap-1">
      {source(row) === "model" ? (
        <Badge variant="outline">
          <BotIcon />
          {t("systemIntercept.approval.modelDecision")}
        </Badge>
      ) : (
        <span className="truncate">{row.rule_name || t("systemIntercept.approval.ruleMissing")}</span>
      )}
      {showReason ? (
        <p className="truncate text-muted-foreground text-xs" title={reason}>
          {reason || t("systemIntercept.approval.reasonMissing")}
        </p>
      ) : null}
    </div>
  );
}

function CodeBlock({ label, text, truncated = false }: { label: string; text: string; truncated?: boolean }) {
  const t = useTranslations();
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(t("systemIntercept.approval.copied"));
    } catch {
      toast.error(t("systemIntercept.approval.copyFailed"));
    }
  }
  return (
    <section className="flex min-w-0 flex-col gap-2" aria-label={label}>
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-medium text-muted-foreground text-xs">{label}</h3>
        {text ? (
          <Button
            variant="ghost"
            size="icon-xs"
            aria-label={t("systemIntercept.approval.copyLabel", { label })}
            onClick={() => void copy()}
          >
            <CopyIcon />
          </Button>
        ) : null}
      </div>
      <pre className="max-h-80 min-w-0 overflow-auto whitespace-pre-wrap break-words rounded-lg bg-muted/60 p-3 font-mono text-xs leading-6 [overflow-wrap:anywhere]">
        {text || t("systemIntercept.approval.notRecorded")}
      </pre>
      {truncated ? (
        <p className="text-muted-foreground text-xs">{t("systemIntercept.approval.truncatedNote")}</p>
      ) : null}
    </section>
  );
}

// Message keys; resolved at render time so labels follow the active language.
const contextLabelKeys: Record<string, MessageKey> = {
  user: "systemIntercept.approval.ctxUser",
  assistant: "systemIntercept.approval.ctxAssistant",
  text: "systemIntercept.approval.ctxAssistant",
  tool_use: "systemIntercept.approval.ctxToolUse",
  tool_result: "systemIntercept.approval.ctxToolResult",
};
const contextLabel = (kind: string): string => (contextLabelKeys[kind] ? tg(contextLabelKeys[kind]) : kind);

const actionLabelKeys: Record<string, MessageKey> = {
  allow: "systemIntercept.approval.actionAllow",
  ask: "systemIntercept.approval.actionAsk",
  deny: "systemIntercept.approval.actionDeny",
};
const actionLabel = (action: string): string | undefined =>
  actionLabelKeys[action] ? tg(actionLabelKeys[action]) : undefined;

const executionLabelKeys: Record<InterceptAudit["execution_status"], MessageKey> = {
  not_started: "systemIntercept.approval.execNotStarted",
  not_executed: "systemIntercept.approval.execNotExecuted",
  awaiting_result: "systemIntercept.approval.execAwaiting",
  succeeded: "systemIntercept.approval.execSucceeded",
  failed: "systemIntercept.approval.execFailed",
  unknown: "systemIntercept.approval.execUnknown",
};

function ModelReviewContext({ input }: { input: InterceptReviewInput }) {
  const t = useTranslations();
  return (
    <section className="flex min-w-0 flex-col gap-4" aria-label={t("systemIntercept.approval.reviewContext")}>
      <div className="flex flex-col gap-2">
        <h3 className="font-medium text-sm">{t("systemIntercept.approval.reviewContext")}</h3>
        <p className="text-muted-foreground text-xs">
          {t("systemIntercept.approval.reviewContextDesc")}
          {input.version < 4 ? ` ${t("systemIntercept.approval.legacyInput")}` : null}
        </p>
      </div>
      <CodeBlock
        label={t("systemIntercept.approval.currentCall")}
        text={JSON.stringify({ tool_name: input.tool_name, arguments: input.arguments }, null, 2)}
      />
      {input.version >= 2 ? (
        input.background ? (
          <div className="flex min-w-0 flex-col gap-2">
            <CodeBlock
              label={
                input.background.source === "user_message"
                  ? t("systemIntercept.approval.bgUser")
                  : t("systemIntercept.approval.bgWorkerLegacy")
              }
              text={input.background.text}
              truncated={input.background.truncated}
            />
            <p className="text-muted-foreground text-xs">
              {input.background.source === "user_message"
                ? t("systemIntercept.approval.bgFromUser")
                : t("systemIntercept.approval.bgFromWorker")}
            </p>
          </div>
        ) : (
          <p className="text-muted-foreground text-xs">{t("systemIntercept.approval.noBackground")}</p>
        )
      ) : (
        <>
          {input.turn_input ? (
            <CodeBlock
              label={t("systemIntercept.approval.turnInputLegacy")}
              text={input.turn_input}
              truncated={input.background_truncated}
            />
          ) : null}
          {input.task ? (
            <>
              <CodeBlock
                label={t("systemIntercept.approval.taskDescLegacy")}
                text={input.task.description}
                truncated={input.task.truncated}
              />
              <CodeBlock
                label={t("systemIntercept.approval.taskGoalLegacy")}
                text={input.task.goal}
                truncated={input.task.truncated}
              />
              <CodeBlock
                label={t("systemIntercept.approval.taskConstraintsLegacy")}
                text={JSON.stringify(input.task.constraints, null, 2)}
              />
            </>
          ) : null}
          {input.worker_intent ? (
            <CodeBlock
              label={t("systemIntercept.approval.workerIntentLegacy")}
              text={input.worker_intent}
              truncated={input.background_truncated}
            />
          ) : null}
        </>
      )}
      {input.working_directory ? (
        <CodeBlock label={t("systemIntercept.approval.workingDir")} text={input.working_directory} />
      ) : null}
      {input.version >= 3 ? (
        <p className="text-muted-foreground text-xs">{t("systemIntercept.approval.noHistory")}</p>
      ) : (
        <div className="flex min-w-0 flex-col gap-3">
          <h4 className="font-medium text-muted-foreground text-xs">{t("systemIntercept.approval.historyLegacy")}</h4>
          {input.history?.length ? (
            input.history.map((entry) => (
              <div key={entry.tool_use_id} className="flex min-w-0 flex-col gap-2 rounded-lg border p-3">
                <p className="break-words font-medium text-xs">
                  {entry.tool} ·{" "}
                  {entry.status === "succeeded"
                    ? t("systemIntercept.approval.historySucceeded")
                    : t("systemIntercept.approval.historyFailed")}
                </p>
                <CodeBlock
                  label={t("systemIntercept.approval.historyArgs")}
                  text={entry.arguments_preview}
                  truncated={entry.truncated}
                />
                <CodeBlock
                  label={t("systemIntercept.approval.historyResult")}
                  text={entry.result}
                  truncated={entry.truncated}
                />
              </div>
            ))
          ) : (
            <p className="text-muted-foreground text-xs">{t("systemIntercept.approval.noPairedHistory")}</p>
          )}
          {input.history_truncated ? (
            <p className="text-muted-foreground text-xs">{t("systemIntercept.approval.historyTruncated")}</p>
          ) : null}
        </div>
      )}

      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button variant="outline" size="sm" className="self-start">
            <ChevronDownIcon data-icon="inline-start" />
            {t("systemIntercept.approval.viewFullInput")}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-3">
          <CodeBlock label={t("systemIntercept.approval.reviewInput")} text={JSON.stringify(input, null, 2)} />
        </CollapsibleContent>
      </Collapsible>
    </section>
  );
}

type Decide = (id: number, decision: "allowed" | "denied") => Promise<void>;

function DecisionActions({ row, busy, decide }: { row: InterceptApprovalRow; busy: boolean; decide: Decide }) {
  const t = useTranslations();
  if (row.status !== "pending") return null;
  return (
    <div className="flex flex-wrap gap-2">
      <Button size="sm" disabled={busy} onClick={() => void decide(row.id, "allowed")}>
        <CheckIcon data-icon="inline-start" />
        {t("systemIntercept.approval.allow")}
      </Button>
      <Button size="sm" variant="destructive" disabled={busy} onClick={() => void decide(row.id, "denied")}>
        <XIcon data-icon="inline-start" />
        {t("systemIntercept.approval.deny")}
      </Button>
    </div>
  );
}

export function ApprovalDetail({
  row,
  busy,
  decide,
  revision,
  readOnly = false,
  defaultExpanded = false,
  onResolved,
}: {
  row: InterceptApprovalRow;
  busy: boolean;
  decide: Decide;
  revision: number;
  readOnly?: boolean;
  defaultExpanded?: boolean;
  onResolved?: (status: "allowed" | "denied" | "timeout") => void;
}) {
  const t = useTranslations();
  const [detail, setDetail] = React.useState<InterceptDetail | null>(null);
  const [error, setError] = React.useState("");
  const [retry, setRetry] = React.useState(0);
  const [more, setMore] = React.useState(defaultExpanded);

  // biome-ignore lint/correctness/useExhaustiveDependencies: Status, refresh and retry invalidate details without closing the panel.
  React.useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    async function load() {
      try {
        const next = await api.interceptDetail(row.id);
        if (cancelled) return;
        setDetail(next);
        setError("");
        if (next.status !== "pending") onResolved?.(next.status);
        if (next.status === "pending" || next.audit?.execution_status === "awaiting_result")
          timer = setTimeout(() => void load(), 5000);
      } catch (e) {
        if (!cancelled) setError((e as Error).message || t("systemIntercept.approval.detailLoadFailed"));
      }
    }
    void load();
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [row.id, row.status, revision, retry, onResolved, t]);

  // Row updates are authoritative until the lazy detail has caught up.
  const current = detail?.status === row.status ? detail : row;
  const audit = detail?.audit;
  let execution = audit ? t(executionLabelKeys[audit.execution_status]) : t("systemIntercept.approval.notRecorded");
  if (row.status === "pending") execution = t("systemIntercept.approval.execNotStarted");
  if (audit && audit.correlation !== "exact" && audit.effective_action === "allow")
    execution = t("systemIntercept.approval.execNoLink");
  const command = typeof row.tool_input?.command === "string" ? row.tool_input.command : undefined;
  let initialLabel =
    source(row) === "model" ? t("systemIntercept.approval.initialModel") : t("systemIntercept.approval.initialRule");
  if (audit?.model_fallback) initialLabel = t("systemIntercept.approval.initialFallback");

  return (
    <div className="flex min-w-0 flex-col gap-4 p-3 sm:p-5">
      <div className="grid min-w-0 gap-5 rounded-xl border bg-muted/20 p-4 lg:grid-cols-2">
        <div className="flex min-w-0 flex-col gap-3">
          <CodeBlock
            label={t("systemIntercept.approval.toolRequestLabel", {
              agent: current.agent_name || current.conv_agent_key || "Agent",
            })}
            text={JSON.stringify(row.tool_input ?? {}, null, 2)}
          />
          {command ? (
            <Collapsible>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                  <ChevronDownIcon data-icon="inline-start" />
                  {t("systemIntercept.approval.viewCommand")}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-2">
                <CodeBlock label={t("systemIntercept.approval.command")} text={command} />
              </CollapsibleContent>
            </Collapsible>
          ) : null}
          <p className="text-muted-foreground text-xs">
            {t("systemIntercept.approval.executionResult")}{" "}
            <span className="text-foreground">{detail ? execution : t("common.loading")}</span>
          </p>
        </div>
        <div className="flex min-w-0 flex-col gap-4 lg:border-l lg:pl-5">
          <h3 className="font-medium text-muted-foreground text-xs">
            {current.status === "pending"
              ? t("systemIntercept.approval.reviewStatus")
              : t("systemIntercept.approval.verdict")}
          </h3>
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={current.status} />
            <MatchCell row={current} showReason={false} />
          </div>
          <p className="whitespace-pre-wrap break-words text-sm leading-7 [overflow-wrap:anywhere]">
            {current.reason?.replace(/^\[模型\]\s*/, "") || t("systemIntercept.approval.reasonMissingApproval")}
          </p>
          {audit?.decision_reason ? <p className="text-sm">{audit.decision_reason}</p> : null}
          {audit?.effective_action ? (
            <p className="text-sm">
              {t("systemIntercept.approval.finalAction", {
                action: actionLabel(audit.effective_action) ?? audit.effective_action,
              })}
            </p>
          ) : null}
          <dl className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-2 text-xs">
            <dt className="text-muted-foreground">{t("systemIntercept.approval.source")}</dt>
            <dd className="break-words">
              <ApprovalOrigin row={current} detail />
            </dd>
            <dt className="text-muted-foreground">{t("systemIntercept.approval.requestedAt")}</dt>
            <dd>{fmtTime(row.created_at)}</dd>
            <dt className="text-muted-foreground">{t("systemIntercept.approval.decidedAt")}</dt>
            <dd>{fmtTime(current.decided_at)}</dd>
            {audit?.rule_name ? (
              <>
                <dt className="text-muted-foreground">{t("systemIntercept.approval.ruleSnapshot")}</dt>
                <dd>{audit.rule_name}</dd>
              </>
            ) : null}
            {audit?.profile_id ? (
              <>
                <dt className="text-muted-foreground">{t("systemIntercept.approval.judgeProfile")}</dt>
                <dd>#{audit.profile_id}</dd>
              </>
            ) : null}
          </dl>
          {!readOnly ? <DecisionActions row={current} busy={busy} decide={decide} /> : null}
        </div>
      </div>
      {error ? (
        <Alert variant="destructive">
          <AlertDescription>
            <div className="flex flex-wrap items-center gap-2">
              <span>{t("systemIntercept.approval.detailLoadFailedWith", { error })}</span>
              <Button variant="outline" size="sm" onClick={() => setRetry((v) => v + 1)}>
                {t("systemIntercept.approval.retryDetail")}
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      ) : null}
      {!detail && !error ? <Skeleton className="h-8 w-60" /> : null}
      {detail && !audit ? (
        <Alert>
          <AlertDescription>{t("systemIntercept.approval.noSnapshot")}</AlertDescription>
        </Alert>
      ) : null}
      {audit ? (
        <Collapsible open={more} onOpenChange={setMore}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              <ChevronDownIcon data-icon="inline-start" className={cn(more && "rotate-180")} />
              {more ? t("systemIntercept.approval.hideContext") : t("systemIntercept.approval.showContext")}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4">
            <div className="flex min-w-0 flex-col gap-5">
              {audit.model_input ? (
                <ModelReviewContext input={audit.model_input} />
              ) : (
                <Alert>
                  <AlertDescription>
                    {audit.model_input_digest
                      ? t("systemIntercept.approval.digestOnly")
                      : t("systemIntercept.approval.noModelInput")}
                  </AlertDescription>
                </Alert>
              )}
              {audit.user_message || audit.context?.length ? (
                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <ChevronDownIcon data-icon="inline-start" />
                      {audit.model_input && audit.model_input.version >= 3
                        ? t("systemIntercept.approval.viewAuditSnippetNotSent")
                        : t("systemIntercept.approval.viewAuditSnippet")}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-3">
                    <div className="flex min-w-0 flex-col gap-3">
                      {audit.user_message ? (
                        <CodeBlock
                          label={t("systemIntercept.approval.auditUserTurn")}
                          text={audit.user_message}
                          truncated={audit.user_truncated}
                        />
                      ) : null}
                      <section className="flex min-w-0 flex-col gap-3">
                        <h3 className="font-medium text-muted-foreground text-xs">
                          {t("systemIntercept.approval.visibleContext")}
                        </h3>
                        <p className="text-muted-foreground text-xs">
                          {t("systemIntercept.approval.snippetSaved", { time: fmtTime(audit.captured_at) })}
                        </p>
                        {audit.context_truncated ? (
                          <p className="text-muted-foreground text-xs">
                            {t("systemIntercept.approval.contextTruncated")}
                          </p>
                        ) : null}
                        {audit.context?.length ? (
                          audit.context.map((entry, index) => (
                            <CodeBlock
                              key={`${entry.kind}-${entry.tool_use_id || index}`}
                              label={`${contextLabel(entry.kind)}${entry.tool ? ` · ${entry.tool}` : ""}${entry.is_error ? ` · ${t("systemIntercept.approval.ctxError")}` : ""}`}
                              text={entry.text}
                              truncated={entry.truncated}
                            />
                          ))
                        ) : (
                          <p className="text-muted-foreground text-sm">
                            {t("systemIntercept.approval.noLinkedContext")}
                          </p>
                        )}
                      </section>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ) : null}
              <CodeBlock
                label={t("systemIntercept.approval.initialDecision", {
                  label: initialLabel,
                  action: actionLabel(audit.initial_action) ?? audit.initial_action,
                })}
                text={audit.initial_reason.replace(/^\[模型\]\s*/, "")}
              />
              <CodeBlock
                label={t("systemIntercept.approval.executionOutput")}
                text={
                  audit.output ??
                  (audit.execution_status === "not_executed"
                    ? t("systemIntercept.approval.toolNotExecuted")
                    : t("systemIntercept.approval.noOutput"))
                }
                truncated={audit.output_truncated}
              />
              {audit.correlation !== "exact" ? (
                <Alert>
                  <AlertDescription>
                    {audit.correlation === "ambiguous"
                      ? t("systemIntercept.approval.ambiguous")
                      : t("systemIntercept.approval.noToolUseId")}
                  </AlertDescription>
                </Alert>
              ) : null}
              <dl className="grid gap-2 text-muted-foreground text-xs [overflow-wrap:anywhere]">
                <div>
                  {t("systemIntercept.approval.toolUseId", {
                    value: audit.tool_use_id || t("systemIntercept.approval.notRecorded"),
                  })}
                </div>
                <div>{t("systemIntercept.approval.argsDigest", { value: audit.input_digest })}</div>
                <div>
                  {t("systemIntercept.approval.configDigest", {
                    value: audit.config_digest || t("systemIntercept.approval.notRecorded"),
                  })}
                </div>
                {audit.model_input_digest ? (
                  <div>{t("systemIntercept.approval.modelInputDigest", { value: audit.model_input_digest })}</div>
                ) : null}
                {audit.execution_ended_at ? (
                  <div>
                    {t("systemIntercept.approval.resultRecordedAt", { value: fmtTime(audit.execution_ended_at) })}
                  </div>
                ) : null}
              </dl>
            </div>
          </CollapsibleContent>
        </Collapsible>
      ) : null}
    </div>
  );
}

// Hidden cells do not occupy table columns. Keep the detail span in sync so
// expansion cannot create empty columns and leave a gap in the selected row.
const approvalBreakpoints = ["(min-width: 40rem)", "(min-width: 48rem)", "(min-width: 64rem)", "(min-width: 80rem)"];
function subscribeColumns(onChange: () => void) {
  const queries = approvalBreakpoints.map((query) => window.matchMedia(query));
  for (const query of queries) query.addEventListener("change", onChange);
  return () => {
    for (const query of queries) query.removeEventListener("change", onChange);
  };
}
function visibleColumnCount() {
  const matches = approvalBreakpoints.map((query) => window.matchMedia(query).matches);
  return 3 + Number(matches[0]) + Number(matches[1]) + 2 * Number(matches[2]) + 2 * Number(matches[3]);
}
function serverColumnCount() {
  return 9;
}

function ApprovalTable({
  rows,
  busy,
  decide,
  revision,
  label,
}: {
  rows: InterceptApprovalRow[];
  busy: boolean;
  decide: Decide;
  revision: number;
  label: string;
}) {
  const t = useTranslations();
  const [expanded, setExpanded] = React.useState<Set<number>>(() => new Set());
  const columns = React.useSyncExternalStore(subscribeColumns, visibleColumnCount, serverColumnCount);
  const prefix = React.useId();
  function toggle(id: number) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }
  return (
    <Table className="table-fixed" aria-label={label}>
      <TableHeader>
        <TableRow>
          <TableHead className="w-10">
            <span className="sr-only">{t("systemIntercept.approval.expandDetails")}</span>
          </TableHead>
          <TableHead className="hidden w-14 sm:table-cell">#</TableHead>
          <TableHead className="w-28">{t("systemIntercept.approval.colTool")}</TableHead>
          <TableHead className="hidden md:table-cell">{t("systemIntercept.approval.source")}</TableHead>
          <TableHead className="hidden lg:table-cell">{t("systemIntercept.approval.colMatchedRule")}</TableHead>
          <TableHead className="hidden xl:table-cell">{t("systemIntercept.approval.colArgs")}</TableHead>
          <TableHead className="w-24">{t("common.status")}</TableHead>
          <TableHead className="hidden w-36 lg:table-cell">{t("systemIntercept.approval.requestedAt")}</TableHead>
          <TableHead className="hidden w-36 xl:table-cell">{t("systemIntercept.approval.decidedAt")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => {
          const open = expanded.has(row.id);
          const panelID = `${prefix}-${row.id}`;
          return (
            <React.Fragment key={row.id}>
              <TableRow
                data-state={open ? "selected" : undefined}
                className="cursor-pointer"
                onClick={() => toggle(row.id)}
              >
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label={t(
                      open ? "systemIntercept.approval.collapseItem" : "systemIntercept.approval.expandItem",
                      { id: row.id },
                    )}
                    aria-expanded={open}
                    aria-controls={open ? panelID : undefined}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggle(row.id);
                    }}
                  >
                    {open ? <ChevronDownIcon /> : <ChevronRightIcon />}
                  </Button>
                </TableCell>
                <TableCell className="hidden text-muted-foreground sm:table-cell">{row.id}</TableCell>
                <TableCell>
                  <code className="block truncate text-xs">{row.tool_name}</code>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex flex-col gap-1">
                    <span className="truncate" title={originLabel(row)}>
                      <ApprovalOrigin row={row} />
                    </span>
                    <span className="truncate text-muted-foreground text-xs">
                      {row.agent_name || row.conv_agent_key}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <MatchCell row={row} />
                </TableCell>
                <TableCell className="hidden xl:table-cell">
                  <code className="block truncate text-muted-foreground text-xs">{JSON.stringify(row.tool_input)}</code>
                </TableCell>
                <TableCell>
                  <StatusBadge status={row.status} />
                </TableCell>
                <TableCell className="hidden text-muted-foreground text-xs lg:table-cell">
                  {fmtTime(row.created_at)}
                </TableCell>
                <TableCell className="hidden text-muted-foreground text-xs xl:table-cell">
                  {fmtTime(row.decided_at)}
                </TableCell>
              </TableRow>
              {open ? (
                <TableRow className="hover:bg-transparent has-aria-expanded:bg-transparent">
                  <TableCell colSpan={columns} className="whitespace-normal p-0">
                    <section id={panelID} aria-label={t("systemIntercept.approval.detailAria", { id: row.id })}>
                      <ApprovalDetail row={row} busy={busy} decide={decide} revision={revision} />
                    </section>
                  </TableCell>
                </TableRow>
              ) : null}
            </React.Fragment>
          );
        })}
      </TableBody>
    </Table>
  );
}

export function ApprovalRecords({ taskId }: { taskId?: string }) {
  const t = useTranslations();
  const [rows, setRows] = React.useState<InterceptApprovalRow[]>([]);
  const [pendingRows, setPendingRows] = React.useState<InterceptPending[]>([]);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(20);
  const [total, setTotal] = React.useState(0);
  const [filter, setFilter] = React.useState<InterceptApprovalFilter>({});
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [error, setError] = React.useState("");
  const [pendingError, setPendingError] = React.useState("");
  const [deciding, setDeciding] = React.useState(false);
  const [revision, setRevision] = React.useState(0);
  const request = React.useRef(0);
  const decisionLock = React.useRef(false);
  const filterID = React.useId();
  const filtered = Boolean(filter.status || filter.decision_source);

  // A task can stay mounted while the user switches between task details.
  // Reset the cursor so the new scope always starts at its newest records.
  // biome-ignore lint/correctness/useExhaustiveDependencies: taskId intentionally resets pagination when scope changes.
  React.useEffect(() => {
    setPage(1);
  }, [taskId]);

  const load = React.useCallback(
    async (manual = false) => {
      const id = ++request.current;
      if (manual) setRefreshing(true);
      try {
        // The approval queue is independent of the current history page and its
        // filter. Older requests must remain actionable even when newer decisions
        // fill the page or a filter would hide them.
        const [history, pending] = await Promise.allSettled([
          taskId
            ? api.interceptTaskPage(taskId, page, pageSize, filter)
            : api.interceptHistoryPage(page, pageSize, filter),
          api.interceptPending(),
        ]);
        if (id !== request.current) return;
        if (history.status === "fulfilled") {
          setRows(history.value.items);
          setTotal(history.value.total);
          setError("");
        } else {
          setError((history.reason as Error).message || t("systemIntercept.approval.loadFailed"));
        }
        if (pending.status === "fulfilled") {
          setPendingRows(pending.value);
          setPendingError("");
        } else {
          setPendingError((pending.reason as Error).message || t("systemIntercept.approval.loadFailed"));
        }
        if (manual) setRevision((v) => v + 1);
      } catch (e) {
        if (id === request.current) setError((e as Error).message || t("systemIntercept.approval.loadFailed"));
      } finally {
        if (id === request.current) {
          setLoading(false);
          setRefreshing(false);
        }
      }
    },
    [taskId, page, pageSize, filter, t],
  );
  const latestLoad = React.useRef(load);
  latestLoad.current = load;

  React.useEffect(() => {
    void load();
    const timer = setInterval(() => void load(), 5000);
    return () => {
      request.current++;
      clearInterval(timer);
    };
  }, [load]);

  const changePageSize = (next: number) => {
    setPageSize(next);
    setPage(1);
  };

  const changeFilter = (next: InterceptApprovalFilter) => {
    // An in-flight response for the old filter must not repopulate the table.
    request.current++;
    setFilter(next);
    setPage(1);
    setRows([]);
    setTotal(0);
    setError("");
    setLoading(true);
  };

  const decide: Decide = async (id, decision) => {
    if (decisionLock.current) return;
    decisionLock.current = true;
    setDeciding(true);
    try {
      await api.interceptDecide(id, decision);
      // Invalidate a list request started before this decision.
      request.current++;
      // Optimistically drop the decided item from the independent pending queue
      // for instant feedback; the re-fetch below reconciles with server truth.
      setRows((prev) =>
        prev.map((row) => (row.id === id ? { ...row, status: decision, decided_at: new Date().toISOString() } : row)),
      );
      setPendingRows((prev) => prev.filter((row) => row.id !== id));
      setRevision((v) => v + 1);
      toast.success(
        decision === "allowed" ? t("systemIntercept.approval.allowedExec") : t("systemIntercept.approval.deniedExec"),
      );
      // Re-fetch counts and rows: a decided item may no longer match the filter.
      await latestLoad.current(true);
    } catch (e) {
      toast.error((e as Error).message);
      await latestLoad.current(true);
    } finally {
      decisionLock.current = false;
      setDeciding(false);
    }
  };

  const historyById = new Map(rows.map((row) => [row.id, row]));
  const pending: InterceptApprovalRow[] = pendingRows
    .filter((row) => !taskId || row.task_id === taskId)
    .map((row) => ({
      conv_title: "",
      conv_agent_key: "",
      rule_name: row.rule_id ? t("systemIntercept.approval.ruleNum", { id: row.rule_id }) : "",
      ...historyById.get(row.id),
      ...row,
    }));
  const title = taskId ? t("systemIntercept.approval.titleTask") : t("systemIntercept.approval.titleAll");
  return (
    <div className="flex min-w-0 flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ClipboardListIcon className="size-5 text-muted-foreground" />
          <h1 className="font-semibold text-xl">{title}</h1>
          {pending.length ? (
            <Badge variant="secondary">{t("systemIntercept.approval.pendingCount", { n: pending.length })}</Badge>
          ) : null}
        </div>
        <Button variant="outline" size="sm" onClick={() => void load(true)} disabled={loading || refreshing}>
          <RefreshCwIcon data-icon="inline-start" className={cn(refreshing && "animate-spin")} />
          {t("common.refresh")}
        </Button>
      </div>
      <p className="text-muted-foreground text-sm">{t("systemIntercept.approval.intro")}</p>
      <FieldGroup className="flex-row flex-wrap items-end gap-3" aria-label={t("systemIntercept.approval.filterAria")}>
        <Field className="w-full sm:w-40">
          <FieldLabel htmlFor={`${filterID}-status`}>{t("systemIntercept.approval.filterStatus")}</FieldLabel>
          <Select
            value={filter.status ?? "all"}
            onValueChange={(value) =>
              changeFilter({
                ...filter,
                status: value === "all" ? undefined : (value as InterceptApprovalFilter["status"]),
              })
            }
          >
            <SelectTrigger id={`${filterID}-status`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">{t("systemIntercept.approval.allStatuses")}</SelectItem>
                <SelectItem value="denied">{t("systemIntercept.approval.statusDenied")}</SelectItem>
                <SelectItem value="pending">{t("systemIntercept.approval.statusPending")}</SelectItem>
                <SelectItem value="allowed">{t("systemIntercept.approval.statusAllowed")}</SelectItem>
                <SelectItem value="timeout">{t("systemIntercept.approval.statusTimeout")}</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
        <Field className="w-full sm:w-40">
          <FieldLabel htmlFor={`${filterID}-source`}>{t("systemIntercept.approval.filterSource")}</FieldLabel>
          <Select
            value={filter.decision_source ?? "all"}
            onValueChange={(value) =>
              changeFilter({
                ...filter,
                decision_source: value === "all" ? undefined : (value as InterceptApprovalFilter["decision_source"]),
              })
            }
          >
            <SelectTrigger id={`${filterID}-source`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">{t("systemIntercept.approval.allSources")}</SelectItem>
                <SelectItem value="model">{t("systemIntercept.approval.srcModel")}</SelectItem>
                <SelectItem value="rule">{t("systemIntercept.approval.srcRule")}</SelectItem>
                <SelectItem value="unknown">{t("systemIntercept.approval.srcUnknown")}</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
        {filtered ? (
          <Button variant="ghost" size="sm" onClick={() => changeFilter({})}>
            {t("systemIntercept.approval.clearFilters")}
          </Button>
        ) : null}
      </FieldGroup>
      {error ? (
        <Alert variant="destructive">
          <AlertDescription>{t("systemIntercept.approval.recordsLoadFailed", { error })}</AlertDescription>
        </Alert>
      ) : null}
      {pendingError ? (
        <Alert variant="destructive">
          <AlertDescription>
            {t("systemIntercept.approval.pendingLoadFailed", { error: pendingError })}
          </AlertDescription>
        </Alert>
      ) : null}
      {pending.length ? (
        <section className="overflow-hidden rounded-xl border">
          <div className="flex items-center gap-2 border-b bg-muted/40 px-4 py-3 font-medium text-sm">
            <ShieldAlertIcon className="size-4" />
            {t("systemIntercept.approval.toHandle", { n: pending.length })}{" "}
            <span className="text-muted-foreground text-xs">{t("systemIntercept.approval.toHandleHint")}</span>
          </div>
          <ApprovalTable
            rows={pending}
            busy={deciding}
            decide={decide}
            revision={revision}
            label={t("systemIntercept.approval.pendingTableLabel")}
          />
        </section>
      ) : null}
      <section className="overflow-hidden rounded-xl border">
        <div className="border-b px-4 py-3 font-medium text-sm">
          {filtered
            ? t("systemIntercept.approval.filteredResults", { n: total })
            : t("systemIntercept.approval.allRecords", { n: total })}
        </div>
        {loading ? (
          <div className="flex flex-col gap-3 p-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : null}
        {!loading && !rows.length && !error ? (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <ClipboardListIcon />
              </EmptyMedia>
              <EmptyTitle>
                {filtered ? t("systemIntercept.approval.emptyFiltered") : t("systemIntercept.approval.emptyNone")}
              </EmptyTitle>
              <EmptyDescription>
                {filtered
                  ? t("systemIntercept.approval.emptyFilteredDesc")
                  : t("systemIntercept.approval.emptyNoneDesc")}
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : null}
        {rows.length ? (
          <ApprovalTable
            rows={rows}
            busy={deciding}
            decide={decide}
            revision={revision}
            label={t("systemIntercept.approval.recordsTableLabel")}
          />
        ) : null}
        {!loading && !error ? (
          <TablePagination
            page={page}
            pageSize={pageSize}
            total={total}
            onPageChange={setPage}
            onPageSizeChange={changePageSize}
            pageSizeOptions={[10, 20, 50]}
          />
        ) : null}
      </section>
    </div>
  );
}
