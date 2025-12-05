import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const LeftSidebar = () => {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <aside className="w-64 p-4 flex flex-col justify-between sticky top-0 h-screen">
      <div>
        <h1 className="text-2xl font-bold text-blue-600 mb-8">
          <Link to="/">SureBetSlips</Link>
        </h1>
        <nav className="flex flex-col space-y-2">
          <Link to="/" className="flex items-center space-x-3 text-lg p-3 rounded-full hover:bg-gray-200"><span>🏠</span><span>Home</span></Link>
          <Link to="/leaderboard" className="flex items-center space-x-3 text-lg p-3 rounded-full hover:bg-gray-200"><span>🏆</span><span>Leaderboard</span></Link>
          {token && (
            <>
              <Link to="/profile" className="flex items-center space-x-3 text-lg p-3 rounded-full hover:bg-gray-200"><span>👤</span><span>Profile</span></Link>
              <Link to="/ai-punters" className="flex items-center space-x-3 text-lg p-3 rounded-full hover:bg-gray-200"><span>🤖</span><span>AI Punters</span></Link>
              <Link to="/subscriptions" className="flex items-center space-x-3 text-lg p-3 rounded-full hover:bg-gray-200"><span>💳</span><span>Subscriptions</span></Link>
              <Link to="/settings" className="flex items-center space-x-3 text-lg p-3 rounded-full hover:bg-gray-200"><span>⚙️</span><span>Settings</span></Link>
            </>
          )}
        </nav>

        {token && (
          <div className="pt-4">
            <Link to="/post-betslip" className="w-full block text-center bg-blue-500 text-white font-bold py-3 px-4 rounded-full hover:bg-blue-600">
              Post Bet
            </Link>
          </div>
        )}
      </div>

      {/* Bottom section for profile or login */}
      <div className="mb-4">
        {token ? (
          user && (
            <div>
              <Link to="/profile" className="flex items-center p-2 rounded-full hover:bg-gray-200">
                {user.avatar_url ? (
                  <img src={user.avatar_url} alt="Your profile" className="w-10 h-10 rounded-full object-cover" />
                ) : (
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="ml-3 font-bold">{user.username}</span>
              </Link>
              <button onClick={handleLogout} className="w-full mt-4 text-center border border-gray-300 font-bold py-2 px-4 rounded-full hover:bg-gray-200 text-sm">
                Logout
              </button>
            </div>
          )
        ) : (
          <Link to="/login" className="w-full block text-center bg-blue-500 text-white font-bold py-3 px-4 rounded-full hover:bg-blue-600">Login</Link>
        )}
      </div>
    </aside>
  );
};

export default LeftSidebar;