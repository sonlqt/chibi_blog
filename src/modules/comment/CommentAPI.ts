import { apiInterceptor } from "../../utils/axios";
import { Comment } from "../../interfaces/Comment";

export const fetchPostComment = async ({ pageParam = 1 }, postId: string): Promise<{ comments: Comment[], nextPage: number | null }> => {
    try {
      const response = await apiInterceptor.get(`/posts/${postId}/comments`, { params: { page: pageParam, per_page: 9 } });
      const data = response.data;
  
      const nextPageUrl = response.headers['x-links-next'] || null;
      const nextPage = nextPageUrl ? parseInt(new URL(nextPageUrl).searchParams.get('page') || '0', 10) : null;
  
      return { comments: data, nextPage };
    } catch (error) {
      console.error("Failed to fetch posts:", error);
      throw error;
    }
  };