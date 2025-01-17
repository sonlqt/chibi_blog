import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchUsers } from "./UserAPI.ts";
import Card from "../../components/CardUser";
import { useEffect } from "react";
import { User } from "../../interfaces/User.ts";


const UserList = () => {
  const {
    data,
    isLoading,
    isError,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ["users"],
    ({ pageParam = 1 }) => fetchUsers({ pageParam }), 
    {
      getNextPageParam: (lastPage) => lastPage.nextPage, 
      keepPreviousData: true, 
    }
  );


  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 50 &&
      hasNextPage && !isFetching
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
       
        {data?.pages.map((page) =>
          page.users.map((user: User) => (
            <Card key={user.id} user={user} />
          ))
        )}

        
        {isFetching && <p>Loading more users...</p>}

        {!hasNextPage && (
          <p className="text-center text-gray-500 col-span-full">
            Oh no.. No more users
          </p>
        )}
      </div>
    </div>
  );
};

export default UserList;
