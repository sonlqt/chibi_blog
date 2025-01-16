import { apiInterceptor } from "../../utils/axios";
import { api } from "../../utils/axios";
import { Post } from "../../interfaces/Post";
import { User } from "../../interfaces/User";



export const fetchUserPosts = async ({ pageParam = 1 }, userId: string): Promise<{ posts: Post[], nextPage: number | null }> => {
  try {
    const response = await apiInterceptor.get(`/users/${userId}/posts`, { params: { page: pageParam, per_page: 9 } });
    const data = response.data;

    const nextPageUrl = response.headers['x-links-next'] || null;
    const nextPage = nextPageUrl ? parseInt(new URL(nextPageUrl).searchParams.get('page') || '0', 10) : null;

    return { posts: data, nextPage };
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    throw error;
  }
};

export const fetchUser = async (userId: string): Promise<User> => {
    try {
      const response = await api.get(`/users/${userId}`);
      const user = response.data;
      return user;
    } catch (error) {
      console.error("Failed to fetch user:", error);
      throw error;
    }
  };
  
