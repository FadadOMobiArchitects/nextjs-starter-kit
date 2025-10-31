import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardNavbar from "@/features/dashboard/components/dashboard-navbar";
import { DashboardSidebar } from "@/features/dashboard/components/dashboard-sidebar";
import { ReactNode } from "react";

export default async function CoreLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <SidebarProvider defaultOpen={false}>
      <DashboardSidebar />

      <div className="relative w-full overflow-x-hidden bg-accent">
        <DashboardNavbar />
        {children}
      </div>
    </SidebarProvider>
  );
}
