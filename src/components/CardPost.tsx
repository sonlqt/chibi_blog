import React, { useState } from "react";
import { Post } from "../interfaces/Post";
import { Link } from "react-router-dom";
import { CogIcon } from '@heroicons/react/20/solid'; 
import { deletePost } from "../modules/post/PostFormAPI"; 

interface CardProps {
  post: Post;
  isProfilePage?: boolean;
  onPostDeleted?: (postId: string) => void;  
}

const Card: React.FC<CardProps> = ({ post, isProfilePage, onPostDeleted }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const shortenBody =
    post.body.length > 40 ? `${post.body.substring(0, 40)}...` : post.body;

    const handleDelete = async () => {
      try {
        setIsDeleting(true);
        const status = await deletePost(post.id); 
        if (status === 204) {
          onPostDeleted && onPostDeleted(post.id);
          setShowConfirmDelete(false);
        } else {
          console.error("Failed to delete post, unexpected status code:", status);
        }
      } catch (error) {
        console.error("Error deleting post:", error);
      } finally {
        setIsDeleting(false);
      }
    };

  

  return (
    <div className="block w-full max-w-xs mx-auto bg-white rounded-lg shadow-md p-4 transition transform hover:scale-105 hover:shadow-lg relative">
      {/* Gear Icon ne`*/}
      {isProfilePage && (
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-gray-700 z-10"
        >
          <CogIcon className="w-6 h-6" /> {/* Cog icon from Heroicons v2 */}
        </button>
      )}

      {/* Image holder ne`*/}
      <div className="w-full h-40 rounded-lg overflow-hidden">
        <img
          src="https://i.imgur.com/PHzuVRJ.png"
          alt="Post image"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Title ne`*/}
      <h3 className="text-lg font-semibold text-gray-800 mt-3">{post.title}</h3>

      {/* Body ne`*/}
      <p className="text-gray-600 text-sm mt-2">{shortenBody}</p>

      {/* Post link ne`*/}
      <Link to={`/posts/${post.id}`} className="absolute inset-0"></Link> {/* Entire area is clickable */}

      {/* Dropdown menu ne`*/}
      {isProfilePage && showMenu && (
        <div className="absolute top-2 right-10 mt-2 w-40 bg-white shadow-md rounded-lg z-20">
          <Link
            to={`/posts/${post.id}/update`}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Update
          </Link>
          <button
            onClick={() => setShowConfirmDelete(true)}
            className="block w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
          >
            Delete
          </button>
        </div>
      )}

      {/* Confirm delete modal ne` */}
      {showConfirmDelete && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-30">
          <div className="bg-white p-4 rounded-lg">
            <p className="text-sm">Are you sure you want to delete this post?</p>
            <div className="mt-2">
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </button>
              <button
                onClick={() => setShowConfirmDelete(false)}
                className="ml-2 bg-gray-300 text-black px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
