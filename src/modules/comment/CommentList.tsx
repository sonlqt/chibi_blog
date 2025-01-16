import React, { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPostComment } from "./CommentAPI";
import CardComment from "../../components/CardComment";
import { Comment } from "../../interfaces/Comment";

interface CommentListProps {
  postId: string;
}

const CommentList: React.FC<CommentListProps> = ({ postId }) => {
  const {
    data,
    isLoading,
    isError,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ["postComments", postId],
    ({ pageParam = 1 }) => fetchPostComment({ pageParam }, postId),
    {
      getNextPageParam: (lastPage) => lastPage.nextPage || null,
      keepPreviousData: true,
    }
  );

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
    return <div>Loading comments...</div>;
  }

  if (isError) {
    return <div>Error loading comments.</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
      <div className="space-y-4 w-full">
        {data?.pages?.map((page) =>
          page.comments.map((comment: Comment) => (
            <CardComment key={comment.id} comment={comment} />
          ))
        )}

        {isFetching && <p>Loading more comments...</p>}

        {!hasNextPage && (
          <p className="text-center text-gray-500 col-span-full">
            Oh no.. No more comments
          </p>
        )}
      </div>
    </div>
  );
};

export default CommentList;
