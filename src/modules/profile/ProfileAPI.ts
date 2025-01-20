import { apiInterceptor } from "../../utils/axios";
import { api } from "../../utils/axios";
import { Post } from "../../interfaces/Post";
import { User } from "../../interfaces/User";

export const fetchUserPosts = async ({ pageParam = 1 }, userId: string): Promise<{ posts: Post[], nextPage: number | null }> => {
  try {
    const response = await apiInterceptor.get(`/users/${userId}/posts`, { params: { page: pageParam, per_page: 10 } });
    return { posts: response.data, nextPage: response.data.nextPage };
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    throw error;
  }
};

export const fetchUser = async (userId: string): Promise<User> => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw error;
  }
};
