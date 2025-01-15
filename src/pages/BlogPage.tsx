import React from "react";
import PostList from "../modules/blog/PostList";
import HeaderNavbar from "../components/Header";

const BlogPage: React.FC = () => (
  
  <div className="w-full mx-auto text-center">
    <HeaderNavbar/>
    <h1 className="text-2xl font-bold mb-4">Blog</h1>
    
    <PostList />
  </div>
);

export default BlogPage;
