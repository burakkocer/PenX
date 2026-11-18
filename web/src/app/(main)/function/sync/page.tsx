"use client";

import * as React from "react";

import { AlertCircleIcon, CheckCircle2Icon, DownloadIcon, PlugZapIcon, RefreshCwIcon, SearchIcon } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslations } from "@/hooks/use-translations";
import { api } from "@/lib/api";
import type { MessageKey } from "@/lib/i18n";
import type { SSProject, SSTask } from "@/lib/types";

type SSStatus = {
  exists: boolean;
  configured: boolean;
  enabled: boolean;
  reachable: boolean;
  url?: string;
  tools: string[];
};

type Dimension = "project" | "task";

const ASSET_TYPES: { key: string; label: MessageKey }[] = [
  { key: "subdomain", label: "assetsFlow.sync.typeSubdomain" },
  { key: "service", label: "assetsFlow.sync.typeService" },
  { key: "app", label: "assetsFlow.sync.typeApp" },
];

export default function AssetSyncPage() {
  const t = useTranslations();
  return (
    <div className="p-4 md:p-6">
      <div className="mb-4">
        <h1 className="font-semibold text-xl">{t("assetsFlow.sync.title")}</h1>
        <p className="text-muted-foreground text-sm">{t("assetsFlow.sync.subtitle")}</p>
      </div>
      <Tabs defaultValue="scopesentry">
        <TabsList>
          <TabsTrigger value="scopesentry">ScopeSentry</TabsTrigger>
        </TabsList>
        <TabsContent value="scopesentry" className="mt-4">
          <ScopeSentryPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ScopeSentryPanel() {
  const t = useTranslations();
  const [status, setStatus] = React.useState<SSStatus | null>(null);
  const [loadingStatus, setLoadingStatus] = React.useState(true);

  const loadStatus = React.useCallback(() => {
    setLoadingStatus(true);
    api
      .ssStatus()
      .then(setStatus)
      .catch((e) => toast.error(t("assetsFlow.sync.statusLoadFailed", { error: e.message })))
      .finally(() => setLoadingStatus(false));
  }, [t]);

  React.useEffect(() => {
    loadStatus();
  }, [loadStatus]);

  const ready = !!status && status.exists && status.configured && status.enabled;

  return (
    <div className="space-y-4">
      <DataSourceCard status={status} loading={loadingStatus} onChanged={loadStatus} />
      {ready ? (
        <SyncWorkbench />
      ) : (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground text-sm">
            {t("assetsFlow.sync.readyHint")}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ── 数据源状态卡 ─────────────────────────────────────────────────────────────

function DataSourceCard({
  status,
  loading,
  onChanged,
}: {
  status: SSStatus | null;
  loading: boolean;
  onChanged: () => void;
}) {
  const [url, setUrl] = React.useState("");
  const [apiKey, setApiKey] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const t = useTranslations();

  React.useEffect(() => {
    if (status?.url) setUrl(status.url);
  }, [status?.url]);

  const create = async () => {
    setBusy(true);
    try {
      await api.ssDatasource({});
      toast.success(t("assetsFlow.sync.created"));
      onChanged();
    } catch (e) {
      toast.error(t("assetsFlow.sync.createFailed", { error: (e as Error).message }));
    } finally {
      setBusy(false);
    }
  };

  const save = async () => {
    if (!url.trim()) return toast.error(t("assetsFlow.sync.mcpUrlRequired"));
    setBusy(true);
    try {
      const r = await api.ssDatasource({ url: url.trim(), api_key: apiKey.trim() });
      toast.success(r.enabled ? t("assetsFlow.sync.savedEnabled") : t("assetsFlow.sync.savedNotEnabled"));
      setApiKey("");
      onChanged();
    } catch (e) {
      toast.error(t("assetsFlow.sync.saveFailed", { error: (e as Error).message }));
    } finally {
      setBusy(false);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-base">
          <PlugZapIcon className="size-4" /> {t("assetsFlow.sync.dataSourceStatus")}
          <StatusBadge status={status} loading={loading} />
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={onChanged} disabled={loading}>
          <RefreshCwIcon className={loading ? "size-4 animate-spin" : "size-4"} /> {t("common.refresh")}
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {!status?.exists ? (
          <div className="flex items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm">{t("assetsFlow.sync.notCreatedHint")}</p>
            <Button onClick={create} disabled={busy}>
              {t("assetsFlow.sync.createSource")}
            </Button>
          </div>
        ) : (
          <>
            {!status.configured && (
              <p className="text-amber-600 text-sm dark:text-amber-500">{t("assetsFlow.sync.notConfiguredHint")}</p>
            )}
            {status.configured && !status.enabled && (
              <p className="text-amber-600 text-sm dark:text-amber-500">{t("assetsFlow.sync.notEnabledHint")}</p>
            )}
            <div className="grid gap-3 md:grid-cols-2">
              <div className="space-y-1.5">
                <Label>{t("assetsFlow.sync.mcpUrl")}</Label>
                <Input
                  placeholder={t("assetsFlow.sync.mcpUrlPlaceholder")}
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label>{t("assetsFlow.sync.apiKeyLabel")}</Label>
                <Input
                  type="password"
                  placeholder="ssk_..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={save} disabled={busy}>
                {t("assetsFlow.sync.saveAndEnable")}
              </Button>
              {status.enabled && status.tools.length > 0 && (
                <span className="text-muted-foreground text-xs">
                  {t("assetsFlow.sync.toolsFound", { n: status.tools.length })}
                </span>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

function StatusBadge({ status, loading }: { status: SSStatus | null; loading: boolean }) {
  const t = useTranslations();
  if (loading || !status) return <Badge variant="secondary">{t("assetsFlow.sync.checking")}</Badge>;
  if (!status.exists) return <Badge variant="destructive">{t("assetsFlow.sync.notCreated")}</Badge>;
  if (!status.configured) return <Badge variant="outline">{t("assetsFlow.sync.notConfigured")}</Badge>;
  if (!status.enabled) return <Badge variant="outline">{t("assetsFlow.sync.notEnabled")}</Badge>;
  if (status.reachable)
    return (
      <Badge className="bg-emerald-600 hover:bg-emerald-600">
        <CheckCircle2Icon className="mr-1 size-3" /> {t("assetsFlow.sync.connected")}
      </Badge>
    );
  return (
    <Badge variant="destructive">
      <AlertCircleIcon className="mr-1 size-3" /> {t("assetsFlow.sync.unreachable")}
    </Badge>
  );
}

// ── 同步工作区（项目 / 任务维度）────────────────────────────────────────────────

function SyncWorkbench() {
  const t = useTranslations();
  const [dimension, setDimension] = React.useState<Dimension>("project");
  const [assetTypes, setAssetTypes] = React.useState<Record<string, boolean>>({
    subdomain: true,
    service: true,
    app: true,
  });
  const [createCompany, setCreateCompany] = React.useState(true);

  const [projects, setProjects] = React.useState<SSProject[]>([]);
  const [tasks, setTasks] = React.useState<SSTask[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [selected, setSelected] = React.useState<Set<string>>(new Set());

  const [syncing, setSyncing] = React.useState(false);
  const [result, setResult] = React.useState<Awaited<ReturnType<typeof api.ssSync>> | null>(null);

  const load = React.useCallback(() => {
    setLoading(true);
    setSelected(new Set());
    const fn =
      dimension === "project"
        ? api.ssProjects(page, 50, search).then((r) => setProjects(r.projects))
        : api.ssTasks(page, 50, search).then(setTasks);
    fn.catch((e) => toast.error(t("assetsFlow.sync.listLoadFailed", { error: e.message }))).finally(() =>
      setLoading(false),
    );
  }, [dimension, page, search, t]);

  React.useEffect(() => {
    load();
  }, [load]);

  const rows = dimension === "project" ? projects : tasks;
  const idOf = (row: SSProject | SSTask) => (dimension === "project" ? (row as SSProject).id : (row as SSTask).name);

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  const toggleAll = () => {
    setSelected((prev) => (prev.size === rows.length ? new Set() : new Set(rows.map(idOf))));
  };

  const chosenTypes = ASSET_TYPES.filter((at) => assetTypes[at.key]).map((at) => at.key);

  const runSync = async () => {
    if (selected.size === 0)
      return toast.error(t(dimension === "project" ? "assetsFlow.sync.selectProject" : "assetsFlow.sync.selectTask"));
    if (chosenTypes.length === 0) return toast.error(t("assetsFlow.sync.selectAssetType"));
    setSyncing(true);
    setResult(null);
    try {
      const r = await api.ssSync({
        dimension,
        targets: [...selected],
        asset_types: chosenTypes,
        create_company: dimension === "project" ? createCompany : false,
      });
      setResult(r);
      const total = Object.values(r.synced ?? {}).reduce((a, b) => a + b, 0);
      toast.success(t("assetsFlow.sync.done", { n: total }));
    } catch (e) {
      toast.error(t("assetsFlow.sync.failed", { error: (e as Error).message }));
    } finally {
      setSyncing(false);
    }
  };

  const renderRows = () => {
    if (loading) {
      return (
        <TableRow>
          <TableCell colSpan={4} className="py-8 text-center text-muted-foreground text-sm">
            {t("common.loading")}
          </TableCell>
        </TableRow>
      );
    }
    if (rows.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={4} className="py-8 text-center text-muted-foreground text-sm">
            {t("common.empty")}
          </TableCell>
        </TableRow>
      );
    }
    if (dimension === "project") {
      return projects.map((p) => (
        <TableRow key={p.id} className="cursor-pointer" onClick={() => toggle(p.id)}>
          <TableCell onClick={(e) => e.stopPropagation()}>
            <Checkbox checked={selected.has(p.id)} onCheckedChange={() => toggle(p.id)} />
          </TableCell>
          <TableCell className="font-medium">{p.name}</TableCell>
          <TableCell>{p.tag ? <Badge variant="secondary">{p.tag}</Badge> : "—"}</TableCell>
          <TableCell className="text-right">{p.AssetCount ?? 0}</TableCell>
        </TableRow>
      ));
    }
    return tasks.map((task) => (
      <TableRow key={task.id} className="cursor-pointer" onClick={() => toggle(task.name)}>
        <TableCell onClick={(e) => e.stopPropagation()}>
          <Checkbox checked={selected.has(task.name)} onCheckedChange={() => toggle(task.name)} />
        </TableCell>
        <TableCell className="font-medium">{task.name}</TableCell>
        <TableCell>
          <Badge variant={task.progress === 100 ? "secondary" : "outline"}>
            {task.progress != null ? `${task.progress}%` : "—"}
          </Badge>
        </TableCell>
        <TableCell className="text-muted-foreground text-xs">{task.endTime || task.creatTime || "—"}</TableCell>
      </TableRow>
    ));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{t("assetsFlow.sync.selectData")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 维度切换 */}
        <Tabs
          value={dimension}
          onValueChange={(v) => {
            setDimension(v as Dimension);
            setPage(1);
          }}
        >
          <TabsList>
            <TabsTrigger value="project">{t("assetsFlow.sync.byProject")}</TabsTrigger>
            <TabsTrigger value="task">{t("assetsFlow.sync.byTask")}</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* 资产类型 + 选项 */}
        <div className="flex flex-wrap items-center gap-4">
          <span className="font-medium text-sm">{t("assetsFlow.sync.assetsToSync")}</span>
          {ASSET_TYPES.map((at) => (
            <label key={at.key} htmlFor={`at-${at.key}`} className="flex items-center gap-1.5 text-sm">
              <Checkbox
                id={`at-${at.key}`}
                checked={!!assetTypes[at.key]}
                onCheckedChange={(c) => setAssetTypes((prev) => ({ ...prev, [at.key]: !!c }))}
              />
              {t(at.label)}
            </label>
          ))}
          {dimension === "project" && (
            <label htmlFor="create-company" className="flex items-center gap-1.5 text-sm">
              <Checkbox id="create-company" checked={createCompany} onCheckedChange={(c) => setCreateCompany(!!c)} />
              {t("assetsFlow.sync.createCompany")}
            </label>
          )}
        </div>

        {/* 搜索 + 操作 */}
        <div className="flex items-center gap-2">
          <div className="relative max-w-xs flex-1">
            <SearchIcon className="absolute top-1/2 left-2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-8"
              placeholder={t(dimension === "project" ? "assetsFlow.sync.searchProject" : "assetsFlow.sync.searchTask")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setPage(1);
                  load();
                }
              }}
            />
          </div>
          <Button variant="outline" size="sm" onClick={load} disabled={loading}>
            <RefreshCwIcon className={loading ? "size-4 animate-spin" : "size-4"} />
          </Button>
          <div className="flex-1" />
          <span className="text-muted-foreground text-xs">
            {t("assetsFlow.sync.selectedCount", { n: selected.size })}
          </span>
          <Button onClick={runSync} disabled={syncing || selected.size === 0}>
            <DownloadIcon className={syncing ? "size-4 animate-pulse" : "size-4"} /> {t("assetsFlow.sync.syncSelected")}
          </Button>
        </div>

        {/* 列表 */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">
                  <Checkbox checked={rows.length > 0 && selected.size === rows.length} onCheckedChange={toggleAll} />
                </TableHead>
                <TableHead>
                  {t(dimension === "project" ? "assetsFlow.sync.projectName" : "assetsFlow.sync.taskName")}
                </TableHead>
                {dimension === "project" ? (
                  <>
                    <TableHead>{t("assetsFlow.sync.tag")}</TableHead>
                    <TableHead className="text-right">{t("assetsFlow.sync.assetCount")}</TableHead>
                  </>
                ) : (
                  <>
                    <TableHead>{t("common.status")}</TableHead>
                    <TableHead>{t("common.time")}</TableHead>
                  </>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>{renderRows()}</TableBody>
          </Table>
        </div>

        {/* 分页 */}
        <div className="flex items-center justify-end gap-2">
          <Button variant="outline" size="sm" disabled={page <= 1 || loading} onClick={() => setPage((p) => p - 1)}>
            {t("common.previous")}
          </Button>
          <span className="text-muted-foreground text-xs">{t("assetsFlow.sync.pageN", { n: page })}</span>
          <Button
            variant="outline"
            size="sm"
            disabled={rows.length < 50 || loading}
            onClick={() => setPage((p) => p + 1)}
          >
            {t("common.next")}
          </Button>
        </div>

        {/* 结果 */}
        {result && <SyncResult result={result} />}
      </CardContent>
    </Card>
  );
}

function SyncResult({ result }: { result: Awaited<ReturnType<typeof api.ssSync>> }) {
  const t = useTranslations();
  const synced = result.synced ?? {};
  const labels: Record<string, string> = {
    subdomain: t("assetsFlow.sync.typeSubdomain"),
    service: t("assetsFlow.sync.typeService"),
    app: t("assetsFlow.sync.typeApp"),
    ip: "IP",
  };
  return (
    <div className="space-y-2 rounded-md border bg-muted/40 p-3 text-sm">
      <div className="flex flex-wrap gap-3">
        {Object.entries(synced).map(([k, v]) => (
          <Badge key={k} variant="secondary">
            {labels[k] ?? k}: {v}
          </Badge>
        ))}
      </div>
      {result.companies && result.companies.length > 0 && (
        <p className="text-muted-foreground">
          {t("assetsFlow.sync.companiesUpdated", { names: result.companies.join(", ") })}
        </p>
      )}
      {result.warnings && result.warnings.length > 0 && (
        <ul className="list-inside list-disc text-amber-600 dark:text-amber-500">
          {result.warnings.map((wm) => (
            <li key={wm}>{wm}</li>
          ))}
        </ul>
      )}
      {result.errors && result.errors.length > 0 && (
        <ul className="list-inside list-disc text-destructive">
          {result.errors.slice(0, 20).map((em) => (
            <li key={em}>{em}</li>
          ))}
          {result.errors.length > 20 && <li>{t("assetsFlow.sync.moreErrors", { n: result.errors.length })}</li>}
        </ul>
      )}
    </div>
  );
}
