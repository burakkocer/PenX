import type { MessageKey } from "@/lib/i18n";
import { tg } from "@/lib/i18n/runtime";
import type { NewAssetType } from "@/lib/types";

const ASSET_TYPE_LABELS: Record<NewAssetType, MessageKey> = {
  app: "assetsFlow.assetType.app",
  endpoint: "assetsFlow.assetType.endpoint",
  ip: "assetsFlow.assetType.ip",
  root_domain: "assetsFlow.assetType.rootDomain",
  service: "assetsFlow.assetType.service",
  subdomain: "assetsFlow.assetType.subdomain",
};

const TASK_ASSET_SOURCE_LABELS: Record<string, MessageKey> = {
  agent: "assetsFlow.taskSource.agent",
  anchor: "assetsFlow.taskSource.anchor",
  api: "assetsFlow.taskSource.api",
  company: "assetsFlow.taskSource.company",
  legacy: "assetsFlow.taskSource.legacy",
  manual: "assetsFlow.taskSource.manual",
  system: "assetsFlow.taskSource.system",
  task: "assetsFlow.taskSource.task",
};

export function taskAssetTypeLabel(type: NewAssetType): string {
  return tg(ASSET_TYPE_LABELS[type]);
}

export function taskAssetSourceLabel(source: string): string {
  const key = TASK_ASSET_SOURCE_LABELS[source];
  return key ? tg(key) : source;
}
