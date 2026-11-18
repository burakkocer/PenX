"use client";

import * as React from "react";

import {
  CpuIcon,
  FlaskConicalIcon,
  KeyboardIcon,
  LanguagesIcon,
  RadioTowerIcon,
  SearchIcon,
  ShieldAlertIcon,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useTranslations } from "@/hooks/use-translations";
import { api } from "@/lib/api";
import { CHAT_SEND_MODE_OPTIONS, type ChatSendMode, setChatSendMode, useChatSendMode } from "@/lib/chat-send-mode";
import { LOCALE_LABELS, type Locale, SUPPORTED_LOCALES } from "@/lib/i18n";
import { persistPreference } from "@/lib/preferences/preferences-storage";
import type { Settings } from "@/lib/types";
import { usePreferencesStore } from "@/stores/preferences/preferences-provider";

import { UpdateCard } from "./_components/update-card";

// 把 **粗体**、`代码` 与换行标记渲染成 React 节点，使长说明文字能整段翻译。
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((line, li) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: static text segments
        <React.Fragment key={li}>
          {li > 0 && <br />}
          {line.split(/(\*\*[^*]+\*\*|`[^`]+`)/).map((seg, i) => {
            if (seg.startsWith("**") && seg.endsWith("**") && seg.length > 4) {
              // biome-ignore lint/suspicious/noArrayIndexKey: static text segments
              return <b key={i}>{seg.slice(2, -2)}</b>;
            }
            if (seg.startsWith("`") && seg.endsWith("`") && seg.length > 2) {
              // biome-ignore lint/suspicious/noArrayIndexKey: static text segments
              return <code key={i}>{seg.slice(1, -1)}</code>;
            }
            return seg;
          })}
        </React.Fragment>
      ))}
    </>
  );
}

export default function SystemSettingsPage() {
  const t = useTranslations();
  const locale = usePreferencesStore((s) => s.locale);
  const setLocale = usePreferencesStore((s) => s.setLocale);
  const onLocaleChange = (next: Locale) => {
    setLocale(next);
    void persistPreference("locale", next);
  };
  const [trafficCapture, setTrafficCapture] = React.useState(false);
  const [agentTrafficBinding, setAgentTrafficBinding] = React.useState(false);
  const [webSearch, setWebSearch] = React.useState(false);
  const [backend, setBackend] = React.useState("ddgs");
  const [braveKeySet, setBraveKeySet] = React.useState(false);
  const [braveKeyInput, setBraveKeyInput] = React.useState("");
  const [tavilyKeySet, setTavilyKeySet] = React.useState(false);
  const [tavilyKeyInput, setTavilyKeyInput] = React.useState("");
  const [savingTavilyKey, setSavingTavilyKey] = React.useState(false);
  const [proxyInput, setProxyInput] = React.useState("");
  const [savingProxy, setSavingProxy] = React.useState(false);
  const [globalProxyInput, setGlobalProxyInput] = React.useState("");
  const [savingGlobalProxy, setSavingGlobalProxy] = React.useState(false);
  const [testing, setTesting] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [savingKey, setSavingKey] = React.useState(false);
  const [pyInterp, setPyInterp] = React.useState("");
  const [workers, setWorkers] = React.useState("3");
  const [savingWorkers, setSavingWorkers] = React.useState(false);
  // 操作约束注入范围(默认都开)。
  const [injectPlanner, setInjectPlanner] = React.useState(true);
  const [injectWorker, setInjectWorker] = React.useState(true);
  // 实验功能:noa 上下文压缩(默认关)。
  const [noaCompaction, setNoaCompaction] = React.useState(false);
  // 纯前端偏好：不走 /api/settings，直接读写 localStorage。
  const sendMode = useChatSendMode();

  const apply = React.useCallback((s: Settings) => {
    setTrafficCapture(!!s.traffic_capture);
    setAgentTrafficBinding(!!s.agent_traffic_binding);
    setWebSearch(!!s.web_search_enabled);
    setBackend(s.web_search_backend || "ddgs");
    setBraveKeySet(!!s.brave_key_set);
    setTavilyKeySet(!!s.tavily_key_set);
    setProxyInput(s.web_search_proxy ?? "");
    setGlobalProxyInput(s.global_proxy ?? "");
    setPyInterp(s.python_interpreter ?? "");
    setWorkers(String(s.workers ?? 3));
    setInjectPlanner(s.constraints_inject_planner !== false);
    setInjectWorker(s.constraints_inject_worker !== false);
    setNoaCompaction(!!s.noa_compaction);
  }, []);

  const saveWorkers = () => {
    const n = Number(workers);
    if (!Number.isInteger(n) || n <= 0) {
      toast.error(t("systemNotify.settings.wkInvalid"));
      return;
    }
    setSavingWorkers(true);
    api
      .setSettings({ workers: n })
      .then((s) => {
        apply(s);
        toast.success(t("systemNotify.settings.wkSaved"));
      })
      .catch((e) => toast.error(t("systemNotify.settings.saveFailed", { error: (e as Error).message })))
      .finally(() => setSavingWorkers(false));
  };

  const savePython = () => {
    setSaving(true);
    api
      .setSettings({ python_interpreter: pyInterp.trim() })
      .then((s) => {
        apply(s);
        toast.success(t("systemNotify.settings.pySaved"));
      })
      .catch((e) => toast.error(t("systemNotify.settings.saveFailed", { error: (e as Error).message })))
      .finally(() => setSaving(false));
  };
  const detectPython = () => {
    setSaving(true);
    api
      .detectPython()
      .then((r) => setPyInterp(r.python_interpreter))
      .catch(() => undefined)
      .finally(() => setSaving(false));
  };

  React.useEffect(() => {
    api
      .settings()
      .then(apply)
      .catch(() => undefined)
      .finally(() => setLoaded(true));
  }, [apply]);

  const toggleTraffic = (v: boolean) => {
    setTrafficCapture(v); // optimistic
    setSaving(true);
    api
      .setSettings({ traffic_capture: v })
      .then(apply)
      .catch(() => setTrafficCapture(!v)) // revert on failure
      .finally(() => setSaving(false));
  };

  const toggleInjectPlanner = (v: boolean) => {
    setInjectPlanner(v); // optimistic
    api
      .setSettings({ constraints_inject_planner: v })
      .then(apply)
      .catch(() => setInjectPlanner(!v)); // revert on failure
  };

  const toggleAgentTrafficBinding = (v: boolean) => {
    setAgentTrafficBinding(v);
    setSaving(true);
    api
      .setSettings({ agent_traffic_binding: v })
      .then((s) => {
        apply(s);
        toast.success(v ? t("systemNotify.settings.bindToastOn") : t("systemNotify.settings.bindToastOff"));
      })
      .catch((e) => {
        setAgentTrafficBinding(!v);
        toast.error(t("systemNotify.settings.saveFailed", { error: (e as Error).message }));
      })
      .finally(() => setSaving(false));
  };

  const toggleInjectWorker = (v: boolean) => {
    setInjectWorker(v); // optimistic
    api
      .setSettings({ constraints_inject_worker: v })
      .then(apply)
      .catch(() => setInjectWorker(!v)); // revert on failure
  };

  const toggleNoaCompaction = (v: boolean) => {
    setNoaCompaction(v); // optimistic
    api
      .setSettings({ noa_compaction: v })
      .then((s) => {
        apply(s);
        toast.success(v ? t("systemNotify.settings.noaToastOn") : t("systemNotify.settings.noaToastOff"));
      })
      .catch((e) => {
        setNoaCompaction(!v); // revert on failure
        toast.error(t("systemNotify.settings.saveFailed", { error: (e as Error).message }));
      });
  };

  // Persist a web-search patch (enable and/or backend). Optimistic with refetch.
  const saveWebSearch = (patch: Partial<Settings>) => {
    setSaving(true);
    api
      .setSettings(patch)
      .then((s) => {
        apply(s);
        toast.success(t("systemNotify.settings.searchSaved"));
      })
      .catch((e) => {
        toast.error(t("systemNotify.settings.saveFailed", { error: (e as Error).message }));
        api
          .settings()
          .then(apply)
          .catch(() => undefined);
      })
      .finally(() => setSaving(false));
  };

  const saveBraveKey = () => {
    setSavingKey(true);
    api
      .setSettings({ brave_search_api_key: braveKeyInput })
      .then((s) => {
        apply(s);
        setBraveKeyInput("");
        toast.success(t("systemNotify.settings.braveSaved"));
      })
      .catch((e) => toast.error(t("systemNotify.settings.saveFailed", { error: (e as Error).message })))
      .finally(() => setSavingKey(false));
  };

  const saveTavilyKey = () => {
    setSavingTavilyKey(true);
    api
      .setSettings({ tavily_search_api_key: tavilyKeyInput })
      .then((s) => {
        apply(s);
        setTavilyKeyInput("");
        toast.success(t("systemNotify.settings.tavilySaved"));
      })
      .catch((e) => toast.error(t("systemNotify.settings.saveFailed", { error: (e as Error).message })))
      .finally(() => setSavingTavilyKey(false));
  };

  const saveProxy = () => {
    setSavingProxy(true);
    api
      .setSettings({ web_search_proxy: proxyInput.trim() })
      .then((s) => {
        apply(s);
        toast.success(
          proxyInput.trim() ? t("systemNotify.settings.proxySaved") : t("systemNotify.settings.proxyCleared"),
        );
      })
      .catch((e) => toast.error(t("systemNotify.settings.saveFailed", { error: (e as Error).message })))
      .finally(() => setSavingProxy(false));
  };

  const saveGlobalProxy = () => {
    setSavingGlobalProxy(true);
    api
      .setSettings({ global_proxy: globalProxyInput.trim() })
      .then((s) => {
        apply(s);
        toast.success(
          globalProxyInput.trim() ? t("systemNotify.settings.gpSaved") : t("systemNotify.settings.gpCleared"),
        );
      })
      .catch((e) => toast.error(t("systemNotify.settings.saveFailed", { error: (e as Error).message })))
      .finally(() => setSavingGlobalProxy(false));
  };

  // Run a real "test" search ("test") against the CURRENT form values (backend +
  // proxy + entered key), falling back to saved values server-side. Toasts result.
  const runTest = () => {
    setTesting(true);
    api
      .testWebSearch({
        web_search_backend: backend,
        web_search_proxy: proxyInput.trim(),
        brave_search_api_key: braveKeyInput,
        tavily_search_api_key: tavilyKeyInput,
      })
      .then((r) => {
        if (r.ok) toast.success(t("systemNotify.settings.testOk", { backend: r.backend ?? "", count: r.count ?? 0 }));
        else
          toast.error(
            t("systemNotify.settings.testFail", { error: r.error || t("systemNotify.settings.unknownError") }),
          );
      })
      .catch((e) => toast.error(t("systemNotify.settings.testFail", { error: (e as Error).message })))
      .finally(() => setTesting(false));
  };

  // brave-free selected but no key stored and none being entered → tool stays off.
  const braveNeedsKey = webSearch && backend === "brave-free" && !braveKeySet;

  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">{t("systemNotify.settings.title")}</h1>
        <p className="text-muted-foreground text-sm">{t("systemNotify.settings.subtitle")}</p>
      </div>

      {/* 多列而非 grid：网络搜索卡片比其余高数倍，且高度随所选后端变化（brave/tavily
          的 key 输入是条件渲染）。grid 会按最高的一张撑满整行、在旁边留下大片空白，
          多列则自动按内容高度平衡填充。卡片间距靠 mb 而非 gap——多列布局下
          column-gap 只管列间距，行间距要由子元素自己给。 */}
      <div className="columns-1 gap-4 md:gap-6 lg:columns-2">
        <Card className="mb-4 break-inside-avoid md:mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <LanguagesIcon className="size-4" />
              {t("settings.language.title")}
            </CardTitle>
            <CardDescription>{t("settings.language.description")}</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between gap-4">
            <Label htmlFor="ui-locale" className="text-sm font-normal text-muted-foreground">
              {t("settings.language.label")}
            </Label>
            <Select value={locale} onValueChange={(v) => onLocaleChange(v as Locale)}>
              <SelectTrigger id="ui-locale" className="w-48 shrink-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SUPPORTED_LOCALES.map((code) => (
                  <SelectItem key={code} value={code}>
                    {LOCALE_LABELS[code]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <UpdateCard />

        <Card className="mb-4 break-inside-avoid md:mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <RadioTowerIcon className="size-4" />
              {t("systemNotify.settings.trafficTitle")}
            </CardTitle>
            <CardDescription>
              <Rich text={t("systemNotify.settings.trafficDesc")} />
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between gap-4">
            <Label htmlFor="traffic-capture" className="text-sm font-normal text-muted-foreground">
              {trafficCapture ? t("systemNotify.settings.trafficOn") : t("systemNotify.settings.trafficOff")}
            </Label>
            <Switch
              id="traffic-capture"
              checked={trafficCapture}
              disabled={!loaded || saving}
              onCheckedChange={toggleTraffic}
            />
          </CardContent>
        </Card>

        <Card className="mb-4 break-inside-avoid md:mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <RadioTowerIcon className="size-4" />
              {t("systemNotify.settings.bindTitle")}
            </CardTitle>
            <CardDescription id="agent-traffic-binding-description">
              <Rich text={t("systemNotify.settings.bindDesc")} />
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between gap-4">
            <Label htmlFor="agent-traffic-binding" className="text-sm font-normal text-muted-foreground">
              {agentTrafficBinding ? t("systemNotify.settings.bindOn") : t("systemNotify.settings.bindOff")}
            </Label>
            <Switch
              id="agent-traffic-binding"
              aria-describedby="agent-traffic-binding-description"
              checked={agentTrafficBinding}
              disabled={!loaded || saving}
              onCheckedChange={toggleAgentTrafficBinding}
            />
          </CardContent>
        </Card>

        <Card className="mb-4 break-inside-avoid md:mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <RadioTowerIcon className="size-4" />
              {t("systemNotify.settings.gpTitle")}
            </CardTitle>
            <CardDescription>
              <Rich text={t("systemNotify.settings.gpDesc")} />
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Label htmlFor="global-proxy" className="text-sm font-normal text-muted-foreground">
              {t("systemNotify.settings.gpLabel")}
            </Label>
            <div className="flex items-center gap-2">
              <Input
                id="global-proxy"
                autoComplete="off"
                placeholder={t("systemNotify.settings.gpPlaceholder")}
                value={globalProxyInput}
                disabled={!loaded || savingGlobalProxy}
                onChange={(e) => setGlobalProxyInput(e.target.value)}
              />
              <Button type="button" onClick={saveGlobalProxy} disabled={!loaded || savingGlobalProxy}>
                {t("common.save")}
              </Button>
            </div>
            <p className="text-muted-foreground text-xs">
              {globalProxyInput.trim() ? t("systemNotify.settings.gpOn") : t("systemNotify.settings.gpOff")}
            </p>
          </CardContent>
        </Card>

        <Card className="mb-4 break-inside-avoid md:mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <ShieldAlertIcon className="size-4" />
              {t("systemNotify.settings.injTitle")}
            </CardTitle>
            <CardDescription>
              <Rich text={t("systemNotify.settings.injDesc")} />
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <Label htmlFor="inject-planner" className="text-sm font-normal text-muted-foreground">
                {t("systemNotify.settings.injPlanner")} · {injectPlanner ? t("common.enabled") : t("common.disabled")}
              </Label>
              <Switch
                id="inject-planner"
                checked={injectPlanner}
                disabled={!loaded}
                onCheckedChange={toggleInjectPlanner}
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              <Label htmlFor="inject-worker" className="text-sm font-normal text-muted-foreground">
                {t("systemNotify.settings.injWorker")} · {injectWorker ? t("common.enabled") : t("common.disabled")}
              </Label>
              <Switch
                id="inject-worker"
                checked={injectWorker}
                disabled={!loaded}
                onCheckedChange={toggleInjectWorker}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="mb-4 break-inside-avoid md:mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <FlaskConicalIcon className="size-4" />
              {t("systemNotify.settings.expTitle")}
            </CardTitle>
            <CardDescription>
              <Rich text={t("systemNotify.settings.expDesc")} />
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between gap-4">
            <Label htmlFor="noa-compaction" className="text-sm font-normal text-muted-foreground">
              {t("systemNotify.settings.noaLabel")} · {noaCompaction ? t("common.enabled") : t("common.disabled")}
            </Label>
            <Switch
              id="noa-compaction"
              checked={noaCompaction}
              disabled={!loaded}
              onCheckedChange={toggleNoaCompaction}
            />
          </CardContent>
        </Card>

        <Card className="mb-4 break-inside-avoid md:mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <SearchIcon className="size-4" />
              {t("systemNotify.settings.wsTitle")}
            </CardTitle>
            <CardDescription>
              <Rich text={t("systemNotify.settings.wsDesc")} />
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <Label htmlFor="web-search" className="text-sm font-normal text-muted-foreground">
                {webSearch ? t("systemNotify.settings.wsOn") : t("systemNotify.settings.wsOff")}
              </Label>
              <Switch
                id="web-search"
                checked={webSearch}
                disabled={!loaded || saving}
                onCheckedChange={(v) => {
                  setWebSearch(v); // optimistic
                  saveWebSearch({ web_search_enabled: v });
                }}
              />
            </div>

            {webSearch && (
              <div className="flex items-center justify-between gap-4">
                <Label className="text-sm font-normal text-muted-foreground">
                  {t("systemNotify.settings.wsSource")}
                </Label>
                <Select
                  value={backend}
                  disabled={!loaded || saving}
                  onValueChange={(v) => {
                    setBackend(v); // optimistic
                    saveWebSearch({ web_search_backend: v });
                  }}
                >
                  <SelectTrigger className="w-48 shrink-0">
                    <SelectValue placeholder={t("systemNotify.settings.wsSourcePlaceholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ddgs">{t("systemNotify.settings.srcDdgs")}</SelectItem>
                    <SelectItem value="brave-free">{t("systemNotify.settings.srcBrave")}</SelectItem>
                    <SelectItem value="tavily">{t("systemNotify.settings.srcTavily")}</SelectItem>
                    <SelectItem value="deepseek">{t("systemNotify.settings.srcDeepseek")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {webSearch && backend === "deepseek" && (
              <div className="border-border/60 bg-muted/30 flex flex-col gap-2 rounded-md border p-3">
                <p className="text-sm font-medium">{t("systemNotify.settings.dsTitle")}</p>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  <Rich text={t("systemNotify.settings.dsP1")} />
                </p>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  <Rich text={t("systemNotify.settings.dsP2")} />
                </p>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  <Rich text={t("systemNotify.settings.dsP3")} />
                </p>
              </div>
            )}

            {webSearch && backend === "brave-free" && (
              <div className="flex flex-col gap-2">
                <Label htmlFor="brave-key" className="text-sm font-normal text-muted-foreground">
                  Brave Search API Key
                  {braveKeySet && (
                    <span className="ml-2 text-xs text-emerald-500">{t("systemNotify.settings.keyConfigured")}</span>
                  )}
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="brave-key"
                    type="password"
                    autoComplete="off"
                    placeholder={
                      braveKeySet
                        ? t("systemNotify.settings.braveKeyPlaceholderSet")
                        : t("systemNotify.settings.braveKeyPlaceholderNew")
                    }
                    value={braveKeyInput}
                    disabled={!loaded || savingKey}
                    onChange={(e) => setBraveKeyInput(e.target.value)}
                  />
                  <Button
                    type="button"
                    onClick={saveBraveKey}
                    disabled={!loaded || savingKey || braveKeyInput.trim() === ""}
                  >
                    {t("common.save")}
                  </Button>
                </div>
                {braveNeedsKey && <p className="text-xs text-amber-500">{t("systemNotify.settings.braveNeedsKey")}</p>}
                <p className="text-muted-foreground text-xs">{t("systemNotify.settings.braveQuota")}</p>
              </div>
            )}

            {webSearch && backend === "tavily" && (
              <div className="flex flex-col gap-2">
                <Label htmlFor="tavily-key" className="text-sm font-normal text-muted-foreground">
                  Tavily Search API Key
                  {tavilyKeySet && (
                    <span className="ml-2 text-xs text-emerald-500">{t("systemNotify.settings.keyConfigured")}</span>
                  )}
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="tavily-key"
                    type="password"
                    autoComplete="off"
                    placeholder={
                      tavilyKeySet
                        ? t("systemNotify.settings.tavilyKeyPlaceholderSet")
                        : t("systemNotify.settings.tavilyKeyPlaceholderNew")
                    }
                    value={tavilyKeyInput}
                    disabled={!loaded || savingTavilyKey}
                    onChange={(e) => setTavilyKeyInput(e.target.value)}
                  />
                  <Button
                    type="button"
                    onClick={saveTavilyKey}
                    disabled={!loaded || savingTavilyKey || tavilyKeyInput.trim() === ""}
                  >
                    {t("common.save")}
                  </Button>
                </div>
                {webSearch && backend === "tavily" && !tavilyKeySet && (
                  <p className="text-xs text-amber-500">{t("systemNotify.settings.tavilyNeedsKey")}</p>
                )}
                <p className="text-muted-foreground text-xs">{t("systemNotify.settings.tavilyHint")}</p>
              </div>
            )}

            {webSearch && (
              <div className="flex flex-col gap-2">
                <Label htmlFor="ws-proxy" className="text-sm font-normal text-muted-foreground">
                  {t("systemNotify.settings.proxyLabel")}
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="ws-proxy"
                    autoComplete="off"
                    placeholder={t("systemNotify.settings.proxyPlaceholder")}
                    value={proxyInput}
                    disabled={!loaded || savingProxy}
                    onChange={(e) => setProxyInput(e.target.value)}
                  />
                  <Button type="button" onClick={saveProxy} disabled={!loaded || savingProxy}>
                    {t("common.save")}
                  </Button>
                </div>
                <p className="text-muted-foreground text-xs">{t("systemNotify.settings.proxyHelp")}</p>
              </div>
            )}

            {webSearch && (
              <div className="flex items-center justify-between gap-4 border-t pt-4">
                <p className="text-muted-foreground text-xs">{t("systemNotify.settings.testHint")}</p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={runTest}
                  disabled={!loaded || testing}
                  className="shrink-0"
                >
                  {testing ? t("systemNotify.settings.testing") : t("systemNotify.settings.testBtn")}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="mb-4 break-inside-avoid md:mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <RadioTowerIcon className="size-4" />
              {t("systemNotify.settings.pyTitle")}
            </CardTitle>
            <CardDescription>
              <Rich text={t("systemNotify.settings.pyDesc")} />
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Input
                className="font-mono text-sm"
                placeholder={t("systemNotify.settings.pyPlaceholder")}
                value={pyInterp}
                disabled={!loaded || saving}
                onChange={(e) => setPyInterp(e.target.value)}
              />
              <Button variant="outline" onClick={detectPython} disabled={!loaded || saving}>
                {t("systemNotify.settings.pyRedetect")}
              </Button>
              <Button onClick={savePython} disabled={!loaded || saving}>
                {t("common.save")}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-4 break-inside-avoid md:mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <CpuIcon className="size-4" />
              {t("systemNotify.settings.wkTitle")}
            </CardTitle>
            <CardDescription>
              <Rich text={t("systemNotify.settings.wkDesc")} />
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Input
                type="number"
                min={1}
                className="w-32 font-mono text-sm"
                placeholder="3"
                value={workers}
                disabled={!loaded || savingWorkers}
                onChange={(e) => setWorkers(e.target.value)}
              />
              <Button onClick={saveWorkers} disabled={!loaded || savingWorkers}>
                {t("common.save")}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-4 break-inside-avoid md:mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <KeyboardIcon className="size-4" />
              {t("systemNotify.settings.sendTitle")}
            </CardTitle>
            <CardDescription>
              <Rich text={t("systemNotify.settings.sendDesc")} />
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between gap-4">
            <Label htmlFor="chat-send-mode" className="text-sm font-normal text-muted-foreground">
              {t("systemNotify.settings.sendLabel")}
            </Label>
            <Select value={sendMode} onValueChange={(v) => setChatSendMode(v as ChatSendMode)}>
              <SelectTrigger id="chat-send-mode" className="w-72">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CHAT_SEND_MODE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
