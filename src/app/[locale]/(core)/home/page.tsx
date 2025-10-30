import { LanguageSelector } from "@/components/generics/language-selector";
import { fetchUsers } from "@/queries/users-queries";
import { getTranslations } from "next-intl/server";

export default async function HomePage() {
  const t = await getTranslations("HomePage");
  const { users } = await fetchUsers();

  return (
    <div className="case text-center space-y-4">
      <div className="absolute top-4 right-4">
        <LanguageSelector align="end" />
      </div>

      <div>
        <h1 className="text-base">{t("title")}</h1>
        <p className="text-sm text-muted-foreground">{t("description")}</p>
      </div>

      <ul>
        {users.map((user: any) => (
          <li key={user.id}>
            {user.firstName} - {user.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
}
