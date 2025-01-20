import React, { useEffect, useState } from "react";
import PostForm from "../components/PostForm";
import { fetchUsers } from "../modules/user/UserAPI";
import { createPost } from "../modules/post/PostFormAPI";
import HeaderNavbar from "../components/Header";
import { User } from "../interfaces/User";
import { useNavigate } from "react-router-dom"; // Importing useNavigate

const PostCreatePage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const { users } = await fetchUsers({ pageParam: 1 });
        setUsers(users);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    loadUsers();
  }, []);

  const handleSubmit = async (data: { title: string; body: string }) => {
    try {
      if (!selectedUserId) {
        console.error("User ID is required");
        return;
      }
      const postResponse = await createPost(selectedUserId, data);
      console.log("Post created successfully");
      const postId = postResponse.id; 
      navigate(`/posts/${postId}`);
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  return (
    <div className="min-h-screen">
      <HeaderNavbar />
      <div className="max-w-xl mx-auto p-6">
        <PostForm
          initialData={{ title: "", body: "" }}
          onSubmit={handleSubmit}
          submitButtonLabel="Create Post"
          users={users}
          selectedUserId={selectedUserId}
          onUserChange={setSelectedUserId}
        />
      </div>
    </div>
  );
};

export default PostCreatePage;
