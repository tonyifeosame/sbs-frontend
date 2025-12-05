import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

const UserProfileCard = () => {
  const { user, isLoading } = useAuth();

  if (isLoading || !user) {
    // Don't render the card if there's an error or no profile data
    return null;
  }

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 text-center w-full md:w-80">
      {user.avatar_url ? (
        <img
          src={user.avatar_url}
          alt={`${user.username}'s profile`}
          className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
        />
      ) : (
        <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center text-gray-400 text-3xl font-bold">
          {user.username.charAt(0).toUpperCase()}
        </div>
      )}
      <h3 className="text-xl font-semibold mb-2">{user.username}</h3>
      <div className="flex justify-center space-x-8 mb-4">
        <div><p className="text-2xl font-bold text-green-600">{user.wins ?? 0}</p><p className="text-gray-500 text-sm">Wins</p></div>
        <div><p className="text-2xl font-bold text-red-600">{user.losses ?? 0}</p><p className="text-gray-500 text-sm">Losses</p></div>
      </div>
      <Link to="/profile" className="text-blue-600 hover:underline font-medium text-sm">View Full Profile</Link>
    </div>
  );
};

export default UserProfileCard;