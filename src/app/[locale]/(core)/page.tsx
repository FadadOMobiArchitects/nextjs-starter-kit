import { getTranslations } from "next-intl/server";

export default async function CorePage() {
  const t = await getTranslations("CorePage");

  return (
    <div className="case text-center space-y-4">
      <h1 className="text-lg font-medium">{t("title")}</h1>
    </div>
  );
}
