import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "./ProfileAPI";
import { User } from "../../interfaces/User";

interface CardProfileProps {
  userId: string;
}

const CardProfile: React.FC<CardProfileProps> = ({ userId }) => {
  const { data: user, isLoading, isError, error } = useQuery<User, Error>(
    ["user", userId], 
    () => fetchUser(userId), 
    {
      staleTime: 1000 * 60 * 5, //này là mình cache cái profile 5p á - sau 5p cút
      retry: 2, 
    }
  );

  if (isLoading) {
    return <div>Loading user profile...</div>;
  }

  if (isError) {
    return (
      <div>
        <p>Failed to load user profile. Please try again later.</p>
        <p>Error: {error?.message}</p>
      </div>
    );
  }

  if (!user) {
    return <div>No user found.</div>;
  }

  return (
    <div className="w-80 bg-white shadow-md rounded-lg p-6 text-left">
      {/* Avatar */}
      <div className="flex justify-center mb-4">
        <img
          src={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoX8ABsoVvsYw0kdLSCa-hqxEZfAbXtfVwNQ&s"
          }
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
