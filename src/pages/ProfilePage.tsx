import React from "react";
import { useParams } from "react-router-dom";
import HeaderNavbar from "../components/Header";
import PostList from "../modules/profile/UserPostList.tsx";
import CardProfile from "../modules/profile/CardProfile";

const ProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();

  return (
    <div className="w-full mx-auto">
      <HeaderNavbar />
      <div className="flex p-4 h-screen">
        {/* Left section for CardProfile */}
        <div className="w-1/4 flex justify-center items-center">
          <CardProfile userId={userId!} />
        </div>

        {/* Right section for PostList */}
        <div className="flex-1 overflow-auto">
          <h2 className="text-2xl font-bold mb-4">User's Posts</h2>
          <PostList userId={userId!} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
