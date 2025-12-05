import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

// Mock data for AI Punters the user is subscribed to
const mockSubscriptions = [
  { id: 1, name: 'AI_BetMaster_3000', avatar: '/avatars/ai-1.png', endDate: '2024-12-31' },
  { id: 2, name: 'QuantumPunter', avatar: '/avatars/ai-2.png', endDate: '2025-01-15' },
];

const Subscriptions = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <p className="p-4">Loading...</p>;
  }

  if (!user) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Manage Your Subscriptions</h2>
        <p className="text-gray-600 mb-6">You must be logged in to view your subscriptions.</p>
        <Link to="/login" className="bg-blue-500 text-white font-bold py-2 px-6 rounded-full hover:bg-blue-600">
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-3xl font-bold mb-8">Your Subscriptions</h2>

      {/* Active Subscriptions Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4 border-b pb-3">Active Subscriptions</h3>
        {mockSubscriptions.length > 0 ? (
          <div className="space-y-4">
            {mockSubscriptions.map(sub => (
              <div key={sub.id} className="flex items-center justify-between p-3 rounded-md hover:bg-gray-50">
                <div className="flex items-center">
                  <img src={sub.avatar} alt={sub.name} className="w-12 h-12 rounded-full object-cover mr-4" />
                  <div>
                    <p className="font-bold">{sub.name}</p>
                    <p className="text-sm text-gray-500">Renews on: {new Date(sub.endDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <button className="text-sm text-blue-600 hover:underline">Manage</button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">You have no active subscriptions. <Link to="/ai-punters" className="text-blue-600 hover:underline">Discover Punters</Link></p>
        )}
      </div>
    </div>
  );
};

export default Subscriptions;