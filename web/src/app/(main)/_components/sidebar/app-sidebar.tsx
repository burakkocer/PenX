"use client";

import { useMemo } from "react";

import Link from "next/link";

import { useShallow } from "zustand/react/shallow";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { APP_CONFIG } from "@/config/app-config";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useTranslations } from "@/hooks/use-translations";
import type { MessageKey } from "@/lib/i18n";
import { type NavGroup, sidebarItems } from "@/navigation/sidebar/sidebar-items";
import { usePreferencesStore } from "@/stores/preferences/preferences-provider";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { SidebarSupportCard } from "./sidebar-support-card";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const currentUser = useCurrentUser();
  const t = useTranslations();
  const { sidebarVariant, sidebarCollapsible, isSynced } = usePreferencesStore(
    useShallow((s) => ({
      sidebarVariant: s.sidebarVariant,
      sidebarCollapsible: s.sidebarCollapsible,
      isSynced: s.isSynced,
    })),
  );

  const variant = isSynced ? sidebarVariant : props.variant;
  const collapsible = isSynced ? sidebarCollapsible : props.collapsible;

  // sidebarItems stores i18n keys in `title`/`label` (see sidebar-items.ts);
  // resolve them to the current language once per render before handing the
  // tree to NavMain, which only ever sees plain display strings.
  const localizedItems = useMemo<NavGroup[]>(
    () =>
      sidebarItems.map((group) => ({
        ...group,
        label: group.label ? t(group.label as MessageKey) : group.label,
        items: group.items.map((item) =>
          "subItems" in item && item.subItems
            ? {
                ...item,
                title: t(item.title as MessageKey),
                subItems: item.subItems.map((sub) => ({ ...sub, title: t(sub.title as MessageKey) })),
              }
            : { ...item, title: t(item.title as MessageKey) },
        ),
      })),
    [t],
  );

  return (
    <Sidebar {...props} variant={variant} collapsible={collapsible}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link prefetch={false} href="/function/tasks">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.png" alt="ARTEX" width={40} height={40} className="shrink-0" />
                <span className="font-semibold text-base">{APP_CONFIG.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={localizedItems} />
        {/* <NavDocuments items={data.documents} /> */}
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={currentUser} />
      </SidebarFooter>
    </Sidebar>
  );
}
