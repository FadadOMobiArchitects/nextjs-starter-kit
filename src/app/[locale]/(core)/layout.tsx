import { SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";
import { AppSidebar } from "./_components/app-sidebar";
import AppNavbar from "./_components/app-navbar";

export default async function CoreLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <div className="relative w-full overflow-x-hidden">
        <AppNavbar />
        {children}
      </div>
    </SidebarProvider>
  );
}
