import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// --- Placeholder Data ---
const profileData = {
  isOwner: false, // Set to true to see "Edit Profile" button
  isPundit: true,
  bannerUrl: 'https://via.placeholder.com/1500x500/1a202c/4a5568?text=Stadium',
  avatarUrl: 'https://via.placeholder.com/150',
  displayName: 'Pro Punter',
  username: 'propunter_1',
  bio: 'Top-rated pundit specializing in Premier League football. Join my subscribers for exclusive slips!',
  location: 'Lagos, Nigeria',
  joinedDate: 'November 2025',
  followers: 12500,
  following: 89,
};

const statsData = {
  winRate: 62,
  totalSlips: 147,
  wins: 91,
  losses: 56,
  currentStreak: 4,
  bestStreak: 8,
  avgOdds: 2.41,
};

const badges = [
  { name: 'Verified Punter', icon: '✔️' },
  { name: '10-Day Streak', icon: '🔥' },
  { name: 'Top 10 Leaderboard', icon: '🏆' },
];

const slipsData = [
  { id: 1, odds: 3.5, type: '1X2', status: 'WIN', comments: 12, likes: 45, score: '3-1' },
  { id: 2, odds: 2.1, type: 'Over 2.5', status: 'LOSS', comments: 5, likes: 10, score: '1-0' },
  { id: 3, odds: 1.8, type: 'GG', status: 'PENDING', comments: 2, likes: 8, score: null },
];

// --- Sub-Components ---

const StatCard = ({ label, value, icon }) => (
  <div className="bg-gray-50 p-4 rounded-lg text-center">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-2xl font-bold text-gray-800">
      {icon && <span className="mr-2">{icon}</span>}
      {value}
    </p>
  </div>
);

const SlipCard = ({ slip }) => {
  const statusStyles = {
    WIN: 'bg-green-100 text-green-800 border-green-300',
    LOSS: 'bg-red-100 text-red-800 border-red-300',
    PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="font-bold">Odds: {slip.odds}x</p>
          <p className="text-sm text-gray-600">Bet Type: {slip.type}</p>
        </div>
        <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${statusStyles[slip.status]}`}>
          {slip.status}
        </span>
      </div>
      {slip.score && <p className="text-lg font-bold text-center my-2">Final Score: {slip.score}</p>}
      <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between text-sm text-gray-500">
        <span>{slip.comments} Comments</span>
        <span>{slip.likes} Likes</span>
      </div>
    </div>
  );
};


// --- Main Profile Page Component ---

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('Slips');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Slips':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {slipsData.map(slip => <SlipCard key={slip.id} slip={slip} />)}
          </div>
        );
      case 'Wins':
        return <div className="text-center p-8 text-gray-500">Filtered list of winning slips will appear here.</div>;
      case 'Losses':
        return <div className="text-center p-8 text-gray-500">Filtered list of losing slips will appear here.</div>;
      case 'Stats':
        return <div className="text-center p-8 text-gray-500">Detailed stats and graphs will appear here.</div>;
      case 'Subscriptions':
        return <div className="text-center p-8 text-gray-500">Subscription plans or earnings dashboard will appear here.</div>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* 1. Profile Header */}
      <div className="bg-white shadow-sm">
        <div className="relative">
          <img src={profileData.bannerUrl} alt="Profile Banner" className="w-full h-48 object-cover" />
          <div className="absolute -bottom-16 left-8">
            <img src={profileData.avatarUrl} alt="Profile Avatar" className="w-32 h-32 rounded-full border-4 border-white bg-gray-200" />
          </div>
        </div>

        {/* User Info and Action Buttons */}
        <div className="pt-20 px-8 pb-4">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{profileData.displayName}</h1>
              <p className="text-gray-500">@{profileData.username}</p>
              <p className="mt-2 text-gray-700 max-w-lg">{profileData.bio}</p>
              <div className="flex items-center text-sm text-gray-500 mt-2 space-x-4">
                <span>📍 {profileData.location}</span>
                <span>📅 Member since {profileData.joinedDate}</span>
              </div>
            </div>
            <div>
              {profileData.isOwner ? (
                <button className="px-4 py-2 font-semibold border border-gray-300 rounded-full">Edit Profile</button>
              ) : (
                <div className="flex space-x-2">
                  <button className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-full hover:bg-blue-600">Follow</button>
                  {profileData.isPundit && (
                    <button className="px-4 py-2 font-semibold text-white bg-indigo-600 rounded-full hover:bg-indigo-700">Subscribe</button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Social Section */}
          <div className="flex space-x-4 mt-4 text-sm">
            <p><span className="font-bold">{profileData.followers}</span> Followers</p>
            <p><span className="font-bold">{profileData.following}</span> Following</p>
          </div>
        </div>
      </div>

      <div className="p-8 max-w-7xl mx-auto">
        {/* 2. Betting Stats Summary */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Betting Stats</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            <StatCard label="Win Rate" value={`${statsData.winRate}%`} />
            <StatCard label="Total Slips" value={statsData.totalSlips} />
            <StatCard label="Wins" value={statsData.wins} />
            <StatCard label="Losses" value={statsData.losses} />
            <StatCard label="Current Streak" value={`W${statsData.currentStreak}`} icon="🔥" />
            <StatCard label="Best Streak" value={`W${statsData.bestStreak}`} />
            <StatCard label="Avg Odds" value={`${statsData.avgOdds}x`} />
          </div>
        </div>

        {/* 5. Badges Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Badges</h2>
          <div className="flex flex-wrap gap-4">
            {badges.map(badge => (
              <div key={badge.name} className="flex items-center bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                <span className="mr-2">{badge.icon}</span>
                {badge.name}
              </div>
            ))}
          </div>
        </div>

        {/* 3. Profile Tabs */}
        <div className="border-b border-gray-300 mb-6">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {['Slips', 'Wins', 'Losses', 'Stats', 'Subscriptions'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`${
                  activeTab === tab
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* 4. Tab Content */}
        <div>
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;