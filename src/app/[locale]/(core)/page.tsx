import { LanguageSelector } from "@/components/common/language-selector";
import { Button } from "@/components/ui/button";
import { LayoutDashboard } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function CorePage() {
  const t = await getTranslations("CorePage");

  return (
    <div className="case flex flex-col items-center justify-center min-h-screen space-y-2">
      <div className="absolute top-4 right-4 z-50">
        <LanguageSelector align="end" />
      </div>

      <h1 className="text-lg font-medium">{t("title")}</h1>

      <Link href="/dashboard">
        <Button
          variant="secondary"
          startIcon={<LayoutDashboard strokeWidth={2} />}
        >
          {t("dashboardButton")}
        </Button>
      </Link>
    </div>
  );
}
