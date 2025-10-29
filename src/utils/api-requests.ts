import { ENDPOINTS } from "@/constants/endpoints";
import { apiGet } from "@/lib/axios";

type Args = {
  pageNumber: number;
  pageSize: number;
  searchKeyword?: string;
};

export const requestUsers = async () => {
  try {
    const response = await apiGet(ENDPOINTS.USERS.GET);

    return response;
  } catch (error) {
    console.error("Error in requestUsers:", error);
    throw error;
  }
};
