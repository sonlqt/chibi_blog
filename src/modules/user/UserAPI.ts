import api from "../../utils/axios";

import { User } from "../../interfaces/User";

export const fetchUsers = async ({ pageParam = 1 }): Promise<{ users: User[], nextPage: number   | null }> => {
    try {
      const response = await api.get(`/users`, { params: { page: pageParam, per_page: 15 } });
      const data = response.data;

      const nextPageUrl = response.headers['x-links-next'] || null;
      const nextPage = nextPageUrl ? parseInt(new URL(nextPageUrl).searchParams.get('page') || '0', 10) : null;
      return { users: data, nextPage };
    } catch (error) {
      console.error("Failed to fetch users:", error);
      throw error;
    }
  };