import { PostForm as PostFormData } from "../interfaces/PostForm";
import React, { useState, useEffect } from "react";
import { User } from "../interfaces/User";

interface PostFormProps {
  initialData: PostFormData;
  onSubmit: (data: PostFormData) => void;
  submitButtonLabel: string;
  users?: User[];
  selectedUserId?: string;
  onUserChange?: (userId: string) => void;
}

const PostForm: React.FC<PostFormProps> = ({
  initialData,
  onSubmit,
  submitButtonLabel,
  users,
  selectedUserId,
  onUserChange,
}) => {
  const [formData, setFormData] = useState<PostFormData>(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      className="max-w-xl mx-auto p-6 bg-pink-100 rounded-lg shadow-xl transform transition-all duration-300 hover:scale-105"
      onSubmit={handleSubmit}
    >
      {users && selectedUserId !== undefined && onUserChange && (
        <div className="mb-6">
          <label htmlFor="user" className="block text-sm font-semibold text-gray-800">
            Choose Your User
          </label>
          <select
            id="user"
            name="user"
            className="mt-1 block w-full px-4 py-2 border-2 border-pink-300 rounded-lg shadow-md focus:ring-pink-500 focus:border-pink-500 bg-white"
            value={selectedUserId}
            onChange={(e) => onUserChange(e.target.value)}
            required
          >
            <option value="">-- Choose a User --</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="mb-6">
        <label htmlFor="title" className="block text-sm font-semibold text-gray-800">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          className="mt-1 block w-full px-4 py-3 border-2 border-pink-300 rounded-lg shadow-md focus:ring-pink-500 focus:border-pink-500 bg-white"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-6">
        <label htmlFor="content" className="block text-sm font-semibold text-gray-800">
          Body
        </label>
        <textarea
          id="body"
          name="body"
          rows={6}
          className="mt-1 block w-full px-4 py-3 border-2 border-pink-300 rounded-lg shadow-md focus:ring-pink-500 focus:border-pink-500 bg-white"
          value={formData.body}
          onChange={handleChange}
          required
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full bg-pink-500 text-white py-3 px-6 rounded-lg hover:bg-pink-600 transition-all duration-200 transform hover:scale-105"
      >
        {submitButtonLabel}
      </button>
    </form>
  );
};

export default PostForm;
