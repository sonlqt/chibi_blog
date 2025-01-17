import React from "react";
import UserList from "../modules/user/UserList";
import HeaderNavbar from "../components/Header";

const UserPage: React.FC = () => (
  
  <div className="w-full mx-auto text-center">
    <HeaderNavbar/>
    <h1 className="text-2xl font-bold mb-4">User Page</h1>
    
    <UserList />
  </div>
);

export default UserPage;
