import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPostDetail } from "./PostDetailAPI";
import { fetchUser } from "../profile/ProfileAPI";
import { Post } from "../../interfaces/Post";

interface PostDetailProps {
  postId: string;
}

const PostDetail: React.FC<PostDetailProps> = ({ postId }) => {
  const { data, isLoading, isError } = useQuery<Post, Error>(
    ["postDetail", postId],
    () => fetchPostDetail(postId)
  );

  if (isLoading) {
    return <div className="text-center mt-10">Loading post details...</div>;
  }

  if (isError || !data) {
    return (
      <div className="text-center mt-10 text-red-500">
        Failed to load post details.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-10">
      {/* Post Title and Image */}
      <div className="text-center">
        <img
          src="https://i.redd.it/atgfq5mldgy81.jpg"
          alt="Default Post"
          className="w-full max-w-2xl mx-auto rounded-lg shadow-md"
        />
        <h1 className="text-xl sm:text-3xl font-bold text-gray-800 mt-4 mx-auto max-w-2xl break-words leading-tight">
          {data.title}
        </h1>
      </div>

      {/* Post Body */}
      <div className="mt-6 mx-auto max-w-2xl">
        <p className="text-left text-gray-700 text-base sm:text-lg leading-relaxed">
          {data.body}
        </p>
      </div>
    </div>
  );
};

export default PostDetail;
