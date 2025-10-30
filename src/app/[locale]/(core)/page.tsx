import { LanguageSelector } from "@/components/common/language-selector";
import { fetchUsers } from "@/queries/users-queries";
import { getTranslations } from "next-intl/server";

export default async function CorePage() {
  const t = await getTranslations("CorePage");
  const { users } = await fetchUsers();

  return (
    <div className="case text-center space-y-4">
      <div className="relative">
        <h1 className="text-base">{t("title")}</h1>
        <p className="text-sm text-muted-foreground">{t("description")}</p>
      </div>

      <ul className="relative">
        {users.map((user: any) => (
          <li key={user.id}>
            {user.firstName} - {user.lastName}
          </li>
        ))}
      </ul>

      <div className="mx-auto w-fit">
        <LanguageSelector />
      </div>
    </div>
  );
}
