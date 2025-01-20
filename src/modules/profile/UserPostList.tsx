import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchUserPosts } from "./ProfileAPI";
import Card from "../../components/CardPost";
import { Post } from "../../interfaces/Post";
import React, { useEffect, useState } from "react";

interface PostListProps {
  userId: string;
  isProfilePage?: boolean;
}

const PostList: React.FC<PostListProps> = ({ userId, isProfilePage }) => {
  const {
    data,
    isLoading,
    isError,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ["userPosts", userId],
    ({ pageParam = 1 }) => fetchUserPosts({ pageParam }, userId),
    {
      getNextPageParam: (lastPage) => lastPage.nextPage || null,
      keepPreviousData: true,
    }
  );

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Flatten all pages and set the posts to state
    if (data) {
      const allPosts = data.pages.flatMap((page) => page.posts);
      setPosts(allPosts);
    }
  }, [data]);

  const handlePostDeleted = (deletedPostId: string) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== deletedPostId));
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 50 &&
      hasNextPage &&
      !isFetching
    ) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, isFetching]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading posts</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {posts.map((post: Post) => (
          <Card
            key={post.id}
            post={post}
            isProfilePage={isProfilePage}
            onPostDeleted={handlePostDeleted} // Pass the deletion handler
          />
        ))}

        {isFetching && <p>Loading more posts...</p>}

        {!hasNextPage && (
          <p className="text-center text-gray-500 col-span-full">
            Oh no.. No more posts
          </p>
        )}
      </div>
    </div>
  );
};

export default PostList;
