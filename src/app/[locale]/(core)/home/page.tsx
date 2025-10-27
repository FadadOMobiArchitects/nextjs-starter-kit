import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";

export default async function HomePage() {
  const t = await getTranslations("HomePage");

  return (
    <div className="case text-center space-y-4">
      <h1>{t("title")}</h1>

      <Button variant="default" loading>
        Loading...
      </Button>
    </div>
  );
}
