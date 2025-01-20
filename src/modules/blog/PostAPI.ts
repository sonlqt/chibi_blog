import { apiInterceptor } from "../../utils/axios";
import { Post } from "../../interfaces/Post";

export const fetchPosts = async ({ pageParam = 1 }): Promise<{ posts: Post[], nextPage: number | null }> => {
  try {
    const response = await apiInterceptor.get(`/posts`, { params: { page: pageParam, per_page: 10 } });
    return { posts: response.data, nextPage: response.data.nextPage };
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    throw error;
  }
};
