import { apiInterceptor } from "../../utils/axios";
import { User } from "../../interfaces/User";

export const fetchUsers = async ({
  pageParam = 1,
}: {
  pageParam: number;
}): Promise<{ users: User[]; nextPage: number | null }> => {
  try {
    const response = await apiInterceptor.get("/users", {
      params: { page: pageParam, per_page: 15 },
    });
    return { users: response.data, nextPage: response.data.nextPage };
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw error;
  }
};
