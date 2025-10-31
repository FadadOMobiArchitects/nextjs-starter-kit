"use client";

import { ChevronDown, LogOutIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { redirect } from "next/navigation";
import { LanguageSelector } from "@/components/common/language-selector";
import { useTranslations } from "next-intl";

export default function DashboardNavbarProfile() {
  const t = useTranslations("Dashboard.Navbar");

  const user = {
    FirstName: "Jean",
    LastName: "Dupont",
    UserName: "j.dupont",
    UserId: "user-123",
  };

  const handleLogout = () => {
    redirect("/");
  };

  return (
    <>
      <LanguageSelector />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-auto !p-0 hover:bg-transparent cursor-pointer"
            endIcon={<ChevronDown className="size-4" />}
          >
            <Avatar className="size-10">
              <AvatarImage
                src="/assets/profile-placeholder.jpeg"
                alt="Profile image"
              />

              <AvatarFallback className="uppercase">
                {user.FirstName.charAt(0)}
                {user.LastName.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="max-w-64" align="end">
          <DropdownMenuLabel className="flex min-w-0 flex-col">
            <span className="font-medium">
              {user.FirstName} {user.LastName}
            </span>

            <span className="text-sm text-muted-foreground font-normal">
              {user.UserName}
            </span>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuLabel className="text-muted-foreground text-xs font-medium">
            {t("manageAccount")}
          </DropdownMenuLabel>

          <DropdownMenuItem onClick={handleLogout}>
            <LogOutIcon
              size={16}
              aria-hidden="true"
              className="text-muted-foreground"
            />
            <div className="flex items-center justify-between w-full gap-x-2">
              <span className="mb-px inline-block">{t("logout")}</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
