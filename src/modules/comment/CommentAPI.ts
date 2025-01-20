import { apiInterceptor } from "../../utils/axios";
import { Comment } from "../../interfaces/Comment";

export const fetchPostComment = async ({ pageParam = 1 }, postId: string): Promise<{ comments: Comment[], nextPage: number | null }> => {
  try {
    const response = await apiInterceptor.get(`/posts/${postId}/comments`, { params: { page: pageParam, per_page: 10 } });
    return { comments: response.data, nextPage: response.data.nextPage };
  } catch (error) {
    console.error("Failed to fetch comments:", error);
    throw error;
  }
};
