import { ENDPOINTS } from "@/constants/endpoints";
import { apiGet } from "@/lib/axios";

export const fetchUsers = async () => {
  try {
    const res: DashboardUser[] = await apiGet(ENDPOINTS.USERS.GET);

    return {
      users: res,
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
