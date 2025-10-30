import { ENDPOINTS } from "@/constants/endpoints";
import { apiGet } from "@/lib/axios";

export const fetchUsers = async () => {
  try {
    const res = await apiGet(ENDPOINTS.USERS.GET);

    return {
      users: res,
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
