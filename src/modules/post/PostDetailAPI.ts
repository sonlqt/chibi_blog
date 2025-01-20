import { api } from "../../utils/axios";
import { Post } from "../../interfaces/Post";

export const fetchPostDetail = async (postId: string): Promise<Post> => {
    try {
      const response = await api.get(`/posts/${postId}`);
      const user = response.data;
      return user;
    } catch (error) {
      console.error("Failed to fetch post:", error);
      throw error;
    }
  };
  
