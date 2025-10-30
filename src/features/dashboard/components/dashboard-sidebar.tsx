"use client";

import { House, LayoutGrid, Users, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// Mock navigation items
const menuItems = [
  {
    title: "Home",
    url: "/home",
    icon: House,
  },
  {
    title: "Services",
    url: "/services",
    icon: LayoutGrid,
  },
  {
    title: "Users",
    url: "/users",
    icon: Users,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  const isActive = (itemUrl: string) => {
    // Remove locale prefix for comparison
    const cleanPathname = pathname.replace(/^\/(fr|en)/, "");
    const cleanItemUrl = itemUrl.replace(/^\/(fr|en)/, "");

    return cleanPathname === cleanItemUrl;
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex items-center justify-center mb-2 h-18">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center justify-center">
            <div className="text-lg font-medium">PF</div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-y-2">
              {menuItems.map((item) => {
                const active = isActive(item.url);

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton isActive={active} asChild>
                      <Link href={item.url}>
                        <item.icon
                          className={cn("!size-4.5")}
                          strokeWidth={1.75}
                        />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
