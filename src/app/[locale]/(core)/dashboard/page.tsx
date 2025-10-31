import ServerPagination from "@/components/common/server-pagination";
import { DashboardColumns } from "@/features/dashboard/components/dashboard-columns";
import { DashboardTable } from "@/features/dashboard/components/dashboard-table";
import { fetchUsers } from "@/features/dashboard/queries/dashboard-users-queries";

export default async function DashboardPage() {
  const { users } = await fetchUsers();

  return (
    <div className="case">
      <div className="w-full overflow-hidden relative">
        <DashboardTable
          columns={DashboardColumns}
          data={users}
          totalCount={users.length}
          page={1}
          size={10}
        />

        <div className="my-4">
          <ServerPagination
            dataCount={users.length}
            page={1}
            itemsPerPage={10}
            currentItemsCount={users.length}
          />
        </div>
      </div>
    </div>
  );
}
