import { getTranslations } from "next-intl/server";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

export default async function HomePage() {
  const t = await getTranslations("HomePage");

  // Mock data fetching
  const utilisateurs = [
    {
      id: 1,
      lastName: "Doe",
      firstName: "John",
      email: "john.doe@example.com",
      roleName: "Admin",
      clientName: "Acme Corp",
    },
    {
      id: 2,
      lastName: "dsmith",
      firstName: "Jane",
      email: "jane.smith@example.com",
      roleName: "User",
      clientName: "Beta LLC",
    },
    {
      id: 3,
      lastName: "Brown",
      firstName: "Charlie",
      email: "charlie.brown@example.com",
      roleName: "User",
      clientName: "Gamma Inc",
    },
    {
      id: 4,
      lastName: "Johnson",
      firstName: "Emily",
      email: "emily.johnson@example.com",
      roleName: "User",
      clientName: "Delta Corp",
    },
  ];

  const totalCount = utilisateurs.length;

  const page = 1;
  const size = 10;

  return (
    <div className="case">
      <h1 className="text-lg">{t("title")}</h1>

      <div className="mt-12">
        <div className="w-full overflow-hidden relative">
          <DataTable
            columns={columns}
            totalCount={totalCount}
            data={utilisateurs}
            page={+page}
            size={+size}
          />
        </div>
      </div>
    </div>
  );
}
