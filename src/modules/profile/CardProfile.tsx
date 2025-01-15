import React, { useEffect, useState } from "react";
import { fetchUser } from "./ProfileAPI";
import { User } from "../../interfaces/User";

interface CardProfileProps {
  userId: string;
}

const CardProfile: React.FC<CardProfileProps> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        setIsLoading(true);
        const fetchedUser = await fetchUser(userId);
        setUser(fetchedUser);
      } catch (error) {
        setIsError(true);
        console.error("Failed to fetch user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, [userId]);

  if (isLoading) {
    return <div>Loading user profile...</div>;
  }

  if (isError) {
    return <div>Failed to load user profile. Please try again later.</div>;
  }

  if (!user) {
    return <div>No user found.</div>;
  }

  return (
    <div className="w-80 bg-white shadow-md rounded-lg p-6 text-left">
      {/* Avatar */}
      <div className="flex justify-center mb-4">
        <img
          src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoX8ABsoVvsYw0kdLSCa-hqxEZfAbXtfVwNQ&s"}
          alt={"User avatar"}
          className="w-60 h-60 rounded-full border-2 border-gray-300 object-cover"
        />
      </div>

      {/* User Information */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{user.email}</p>
        <p className="text-sm text-gray-500">Gender: {user.gender}</p>
        <p className="text-sm text-gray-500">Status: {user.status}</p>
      </div>
    </div>
  );
};

export default CardProfile;
