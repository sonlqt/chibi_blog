import { api } from "../../utils/axios";
import { PostForm } from "../../interfaces/PostForm";
import { Post } from "../../interfaces/Post";
import { fetchPostDetail } from "./PostDetailAPI";

export {fetchPostDetail};

  export const createPost = async (userId: string, postFormDetail: PostForm ):Promise<Post> =>
  {
try {
    const response = await api.post(`/users/${userId}/posts`,{
        title: postFormDetail.title,
        body: postFormDetail.body
        
    })
    const post = response.data;
    return post;
    } catch (error) {
        console.error("Failed to create post, error ne`: ",error);   
        throw error; 
    }
  }

  export const updatePost = async (postId: string, postFormDetail: PostForm ):Promise<Post> =>
    {
  try {
      const response = await api.patch(`/posts/${postId}`,{
          title: postFormDetail.title,
          body: postFormDetail.body
          
      })
      const post = response.data;
      return post;
      } catch (error) {
          console.error("Failed to update post, error ne`: ",error);   
          throw error; 
      }
    }
  
    export const deletePost = async (postId: string):Promise<number> =>
        {
      try {
          const response = await api.delete(`/posts/${postId}`);
          return response.status;
          } catch (error) {
              console.error("Failed to delete post, error ne`: ",error);   
              throw error; 
          }
        }
      
