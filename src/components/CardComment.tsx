import React from 'react';
import { Comment } from '../interfaces/Comment';

interface CardCommentProps {
  comment: Comment;
}

const CardComment: React.FC<CardCommentProps> = ({ comment }) => (
  <div className="flex flex-wrap items-start p-4 bg-white rounded-lg shadow-md transition transform hover:scale-105 hover:shadow-lg text-left">
    {/* Profile Picture */}
    <div className="flex-shrink-0">
      <img
        src={`https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(comment.name)}`}
        alt={`${comment.name}'s profile`}
        className="w-12 h-12 rounded-full object-cover"
      />
    </div>

    {/* Content */}
    <div className="pl-3 flex-1">
      <div className="text-gray-800 font-semibold text-lg break-words">{comment.name}</div>
      <div className="text-sm text-gray-500 break-words">{comment.email}</div>
      <p className="mt-2 text-gray-700 break-words">{comment.body}</p>
    </div>
  </div>
);


export default CardComment;
