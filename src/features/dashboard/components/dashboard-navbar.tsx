import { SidebarTrigger } from "@/components/ui/sidebar";
import DashboardNavbarProfile from "./dashboard-navbar-profile";

export default async function DashboardNavbar() {
  return (
    <header className="px-4 md:px-6 bg-sidebar border-b sticky top-0 z-50 transition-all duration-300">
      <div className="flex h-18 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          <SidebarTrigger />
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <DashboardNavbarProfile />
        </div>
      </div>
    </header>
  );
}
