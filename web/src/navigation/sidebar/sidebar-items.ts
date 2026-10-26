import {
  Activity,
  Ban,
  BellRing,
  Bot,
  Brain,
  Bug,
  ClipboardList,
  FolderOpen,
  FolderSync,
  LayoutDashboard,
  type LucideIcon,
  MessageSquare,
  Network,
  Plug,
  Radio,
  ScrollText,
  Settings2,
  ShieldAlert,
  Sparkles,
  Target,
  Terminal,
  Wrench,
} from "lucide-react";

export type NavBadge = "new" | "soon";

export interface NavSubItem {
  id: string;
  title: string;
  url: string;
  icon?: LucideIcon;
  badge?: NavBadge;
  disabled?: boolean;
  newTab?: boolean;
}

interface NavItemBase {
  id: string;
  title: string;
  icon?: LucideIcon;
  badge?: NavBadge;
  disabled?: boolean;
  newTab?: boolean;
}

export interface NavMainLinkItem extends NavItemBase {
  url: string;
  subItems?: never;
}

export interface NavMainParentItem extends NavItemBase {
  subItems: NavSubItem[];
}

export type NavMainItem = NavMainLinkItem | NavMainParentItem;

export interface NavGroup {
  id: number;
  label?: string;
  items: NavMainItem[];
}

// `title`/`label` hold i18n message keys (see lib/i18n), not display text.
// `app-sidebar.tsx` resolves them to the current UI language via `t()`
// before handing items to `NavMain`, so this file and `nav-main.tsx` never
// need to know about locales.
export const sidebarItems: NavGroup[] = [
  {
    id: 1,
    label: "nav.group.functions",
    items: [
      { id: "dashboard", title: "nav.dashboard", url: "/dashboard", icon: LayoutDashboard },
      { id: "chat", title: "nav.chat", url: "/chat", icon: MessageSquare },
      { id: "tasks", title: "nav.tasks", url: "/function/tasks", icon: Target },
      { id: "findings", title: "nav.findings", url: "/function/findings", icon: Bug },
      { id: "traffic", title: "nav.traffic", url: "/function/traffic", icon: Activity },
      { id: "commands", title: "nav.commands", url: "/function/commands", icon: Terminal },
      { id: "llm-records", title: "nav.llmRecords", url: "/function/llm-records", icon: Radio },
      { id: "assets", title: "nav.assets", url: "/function/assets", icon: Network },
      { id: "sync", title: "nav.sync", url: "/function/sync", icon: FolderSync },
      { id: "workspace", title: "nav.workspace", url: "/function/workspace", icon: FolderOpen },
    ],
  },
  {
    id: 2,
    label: "nav.group.system",
    items: [
      { id: "llm", title: "nav.llm", url: "/system/llm", icon: Brain },
      { id: "agents", title: "nav.agents", url: "/system/agents", icon: Bot },
      { id: "mcp", title: "nav.mcp", url: "/system/mcp", icon: Plug },
      { id: "skills", title: "nav.skills", url: "/system/skills", icon: Sparkles },
      { id: "tools", title: "nav.tools", url: "/system/tools", icon: Wrench },
      { id: "notify", title: "nav.notify", url: "/system/notify", icon: BellRing },
      { id: "intercept", title: "nav.intercept", url: "/system/intercept", icon: ShieldAlert },
      { id: "asset-intercept", title: "nav.assetIntercept", url: "/system/intercept/assets", icon: Ban },
      { id: "approvals", title: "nav.approvals", url: "/system/intercept/approvals", icon: ClipboardList },
      { id: "logs", title: "nav.logs", url: "/system/logs", icon: ScrollText },
      { id: "settings", title: "nav.settings", url: "/system/settings", icon: Settings2 },
    ],
  },
];
