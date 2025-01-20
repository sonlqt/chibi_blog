import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchUsers } from "./UserAPI.ts";
import Card from "../../components/CardUser";
import { useEffect, useState } from "react";
import { User } from "../../interfaces/User.ts";

const UserList = () => {
  const [filters, setFilters] = useState({
    status: "",
    gender: "",
    email: "",
  });

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
    return <div>Error loading users</div>;
  }

  // Filter users based on filters
  const filteredUsers = data?.pages
    .flatMap((page) => page.users)
    .filter((user: User) => {
      const matchesStatus =
        filters.status === "" || user.status.toLowerCase() === filters.status.toLowerCase();
      const matchesGender =
        filters.gender === "" || user.gender.toLowerCase() === filters.gender.toLowerCase();
      const matchesEmail =
        filters.email === "" || user.email.toLowerCase().includes(filters.email.toLowerCase());
      return matchesStatus && matchesGender && matchesEmail;
    });

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Filter by email"
          value={filters.email}
          onChange={(e) => setFilters({ ...filters, email: e.target.value })}
          className="border p-2 mr-2"
        />
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="border p-2 mr-2"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <select
          value={filters.gender}
          onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
          className="border p-2"
        >
          <option value="">All Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {filteredUsers?.map((user: User) => (
          <Card key={user.id} user={user} />
        ))}

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
