import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useParams and useNavigate
import PostForm from "../components/PostForm";
import { fetchPostDetail, updatePost } from "../modules/post/PostFormAPI";
import HeaderNavbar from "../components/Header";

const PostUpdatePage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>(); // Get postId from the URL
  const [initialData, setInitialData] = useState<{ title: string; body: string } | null>(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (postId) {
          const post = await fetchPostDetail(postId);
          setInitialData({ title: post.title, body: post.body });
        }
      } catch (error) {
        console.error("Failed to fetch post details:", error);
      }
    };
    fetchData();
  }, [postId]);

  const handleSubmit = async (data: { title: string; body: string }) => {
    try {
      if (postId) {
        await updatePost(postId, data);
        console.log("Post updated successfully");
        // Redirect to the updated post's page
        navigate(`/posts/${postId}`);
      }
    } catch (error) {
      console.error("Failed to update post:", error);
    }
  };

  if (!initialData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <HeaderNavbar />
      <PostForm
        initialData={initialData}
        onSubmit={handleSubmit}
        submitButtonLabel="Update Post"
      />
    </div>
  );
};

export default PostUpdatePage;
