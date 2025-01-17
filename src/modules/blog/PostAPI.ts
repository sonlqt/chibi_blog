import api from "../../utils/axios";
import { Post } from "../../interfaces/Post";

export const fetchPosts = async ({ pageParam = 1 }): Promise<{ posts: Post[], nextPage: number | null }> => {
  try {
    const response = await api.get(`/posts`, { params: { page: pageParam, per_page: 9 } });
    const data = response.data;

    const nextPageUrl = response.headers['x-links-next'] || null;
    const nextPage = nextPageUrl ? parseInt(new URL(nextPageUrl).searchParams.get('page') || '0', 10) : null;

    return { posts: data, nextPage };
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    throw error;
  }
};
