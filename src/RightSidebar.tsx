import React from "react";
import UserProfileCard from "./UserProfileCard";
import { useAuth } from "./AuthContext";

const RightSidebar = () => {
  const { token } = useAuth();

  return (
    <aside className="w-80 p-4 sticky top-0 h-screen space-y-4">
      {/* Conditionally render the UserProfileCard if the user is logged in */}
      {token && <UserProfileCard />}

      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="font-bold text-lg mb-4">Trends for you</h3>
        {/* Placeholder for trends */}
        <p className="text-sm text-gray-500">Trending content will appear here.</p>
      </div>
    </aside>
  );
};

export default RightSidebar;