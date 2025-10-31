"use client";

import { Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useLocale } from "next-intl";
import { Locale } from "@/i18n/routing";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  align?: "start" | "center" | "end";
};

export const LanguageSelector = ({ className, align = "center" }: Props) => {
  const locale: string = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const localeNames: Record<string, string> = {
    en: "English",
    fr: "Français",
  };

  const localesToShow = Object.keys(localeNames);

  const handleLanguageChange = (currentLocale: string) => {
    const query = searchParams
      ? Object.fromEntries(searchParams.entries())
      : {};

    router.replace(
      {
        pathname: pathname ?? "/",
        query,
      },
      { locale: currentLocale as Locale, scroll: false }
    );

    // Update the HTML lang attribute for accessibility and SEO (guarded)
    if (typeof document !== "undefined" && document?.documentElement) {
      document.documentElement.lang = currentLocale;
    }
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          aria-label={`Select language (current ${locale})`}
          className={cn(
            "flex flex-row items-center p-0 rounded-full size-10",
            className
          )}
        >
          <span className="uppercase inline-block">{locale}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align={align}>
        {localesToShow.map((currentLocale) => {
          const isActive = currentLocale === locale;
          return (
            <DropdownMenuItem
              key={currentLocale}
              onClick={() => handleLanguageChange(currentLocale)}
              className={`flex items-center justify-between gap-2 ${
                isActive ? "font-medium text-primary" : ""
              }`}
            >
              <span>{localeNames[currentLocale] ?? currentLocale}</span>
              {isActive && <Check className="h-4 w-4 text-primary" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
