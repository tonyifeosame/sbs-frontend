import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useAuth } from "./AuthContext";

const API_URL = 'http://localhost:8080';

interface BetSlip {
  id: number;
  username: string;
  avatar_url: string;
  is_verified: boolean;
  description: string;
  image_url: string;
  betslip_code: string;
  platform: string;
  status: 'won' | 'lost' | 'pending';
  created_at: string;
}




const Home = () => {
  const [betslips, setBetslips] = useState<BetSlip[]>([]);
  const [error, setError] = useState('');
  const { token, user } = useAuth();

  useEffect(() => {
    // Fetch the main betslip feed
    const fetchBetslips = async () => {
      try {
        const response = await fetch(`${API_URL}/betslips`);
        if (!response.ok) {
          throw new Error('Failed to fetch betslips');
        }
        const data = await response.json();
        // Ensure that we always set an array, even if the API returns null
        setBetslips(data || []);
      } catch (err: any) {
        setError(err.message);
      }
    };
    fetchBetslips();
  }, [token]);

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'won': return 'text-green-500';
      case 'lost': return 'text-red-500';
      default: return 'text-yellow-500';
    }
  };

  return (
    <div className="bg-white">
      {/* Top Bar */}
      <div className="sticky top-0 bg-white bg-opacity-80 backdrop-blur-md z-10">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold">Home</h2>
        </div>
        <div className="flex">
          <div className="flex-1 text-center font-bold p-4 hover:bg-gray-200 cursor-pointer border-b-4 border-blue-500">
            For You
          </div>
          <div className="flex-1 text-center font-bold p-4 text-gray-500 hover:bg-gray-200 cursor-pointer">
            Following
          </div>
        </div>
      </div>

      {/* "Create Post" box - only shows if logged in */}
      {token && (
        <div className="p-4 border-b border-gray-200 flex space-x-4">
          {user?.avatar_url ? (
            <img src={user.avatar_url} alt="Your profile" className="w-12 h-12 rounded-full object-cover" />
          ) : (
            <div className="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0 flex items-center justify-center text-gray-600 font-bold text-xl">
              {user?.username.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="flex-1">
            <Link to="/post-betslip">
              <div className="w-full p-3 bg-gray-100 rounded-full text-gray-500 cursor-pointer hover:bg-gray-200">
                What's happening?
              </div>
            </Link>
          </div>
        </div>
      )}

      {/* Betslip Feed */}
      <div>
        {error && <p className="p-4 text-red-500">{error}</p>}
        {betslips.map((slip) => (
          <div key={slip.id} className="p-4 border-b border-gray-200 flex space-x-4">
            {/* Avatar */}
            <Link to={`/users/${slip.username}`} className="flex-shrink-0">
              <div>
                {slip.avatar_url ? (
                  <img src={slip.avatar_url} alt={`${slip.username}'s avatar`} className="w-12 h-12 rounded-full object-cover hover:opacity-90 transition-opacity" />
                ) : (
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold text-xl hover:bg-gray-400 transition-colors">
                    {slip.username.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            </Link>

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-center space-x-1">
                <Link to={`/users/${slip.username}`} className="font-bold hover:underline">
                  {slip.username}
                </Link>
                {slip.is_verified && <span title="Verified Punter" className="text-blue-500">✔️</span>}
              </div>
              {slip.description && <p className="my-2">{slip.description}</p>}
              {slip.image_url && (
                <img src={slip.image_url} alt="Bet slip" className="mt-2 rounded-2xl border border-gray-200 max-h-96" />
              )}
              <p className={`mt-2 text-sm font-semibold ${getStatusClass(slip.status)}`}>
                Status: {slip.status.charAt(0).toUpperCase() + slip.status.slice(1)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
