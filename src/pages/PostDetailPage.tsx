import React from "react";
import HeaderNavbar from "../components/Header";
import CommentList from "../modules/comment/CommentList";
import { useParams } from "react-router-dom";
import PostDetail from "../modules/post/PostDetail";

const PostDetailPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();

  return (
    <div className="w-full mx-auto">
      {/* Header */}
      <HeaderNavbar />

      {/* Post Details Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <section className="bg-white px-6 pb-6 rounded-lg shadow-md">
          <PostDetail postId={postId!} />
        </section>
      </div>

      {/* Comments Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <section className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Comments</h2>
          <CommentList postId={postId!} />
        </section>
      </div>
    </div>
  );
};

export default PostDetailPage;
