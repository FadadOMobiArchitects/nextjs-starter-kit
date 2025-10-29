import { requestUsers } from "@/utils/api-requests";

export const fetchUsers = async () => {
  try {
    const res = await requestUsers();

    return {
      users: res,
    };
  } catch (error) {
    console.error("API Error while fetching users:", error);
    throw error;
  }
};
