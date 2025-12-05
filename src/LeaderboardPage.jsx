import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LeaderboardPage = () => {
  const [activeTab, setActiveTab] = useState('human');

  // Placeholder data for human pundits
  const humanPundits = [
    {
      rank: 1,
      profilePicture: 'https://via.placeholder.com/150',
      username: 'Top Pundit',
      handle: 'toppundit',
      bio: 'Expert in sports betting with a passion for helping others win.',
      winRate: 68,
      last10Games: '7W - 3L',
      currentStreak: '🔥 W4',
      avgOdds: '2.1x',
    },
    {
      rank: 2,
      profilePicture: 'https://via.placeholder.com/150',
      username: 'Second Best',
      handle: 'secondbest',
      bio: 'Consistent winner with a focus on value bets.',
      winRate: 65,
      last10Games: '6W - 4L',
      currentStreak: '🔥 W2',
      avgOdds: '1.9x',
    },
    {
      rank: 3,
      profilePicture: 'https://via.placeholder.com/150',
      username: 'Third Place',
      handle: 'thirdplace',
      bio: 'Specializing in high-odds accumulators.',
      winRate: 62,
      last10Games: '5W - 5L',
      currentStreak: '🔥 W1',
      avgOdds: '2.5x',
    },
  ];

  // Placeholder data for AI punters
  const aiPunters = [
    {
      rank: 1,
      profilePicture: 'https://via.placeholder.com/150',
      username: 'AI-Punter-001',
      winRate: 72,
      totalPredictions: 1500,
    },
    {
      rank: 2,
      profilePicture: 'https://via.placeholder.com/150',
      username: 'AI KingOver2.5',
      winRate: 70,
      totalPredictions: 1200,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">

        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Top Pundits & AI Rankings</h1>
          <p className="text-gray-600 mt-2">See the best performers on SBS based on verified win rates and bet slip history.</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <button
            className={`px-4 py-2 rounded-l-lg ${activeTab === 'human' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'}`}
            onClick={() => setActiveTab('human')}
          >
            Human Pundits
          </button>
          <button
            className={`px-4 py-2 rounded-r-lg ${activeTab === 'ai' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'}`}
            onClick={() => setActiveTab('ai')}
          >
            AI Punters
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Time</label>
              <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                <option>Today</option>
                <option>This Week</option>
                <option>This Month</option>
                <option>All Time</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                <option>Win Rate</option>
                <option>Total Wins</option>
                <option>Streak</option>
                <option>Followers</option>
                <option>Average Odds</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Sort by</label>
              <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                <option>Descending</option>
                <option>Ascending</option>
              </select>
            </div>
          </div>
        </div>

        {/* Leaderboard Cards */}
        {activeTab === 'human' && (
          <div className="space-y-6">
            {humanPundits.map((pundit, index) => (
              <div key={index} className={`bg-white rounded-lg shadow-md p-6 ${pundit.rank === 1 ? 'border-4 border-yellow-400' : ''}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="text-2xl font-bold mr-4">{pundit.rank === 1 ? '🥇' : pundit.rank === 2 ? '🥈' : pundit.rank === 3 ? '🥉' : `#${pundit.rank}`}</div>
                    <img src={pundit.profilePicture} alt="Pundit Profile" className="rounded-full w-16 h-16 mr-4" />
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">{pundit.username}</h2>
                      <p className="text-gray-600">@{pundit.handle}</p>
                      <p className="text-gray-700 text-sm">{pundit.bio}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-indigo-600">{pundit.winRate}% win rate</p>
                    <p className="text-gray-600">Last 10 Games: {pundit.last10Games}</p>
                    <p className="text-gray-600">Current Streak: {pundit.currentStreak}</p>
                    <p className="text-gray-600">Avg Odds: {pundit.avgOdds}</p>
                  </div>
                  <div className="text-right">
                    <Link to="#" className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-full hover:bg-indigo-700">
                      View Profile
                    </Link>
                    <Link to="#" className="mt-2 block text-sm text-indigo-600 hover:underline">
                      Subscribe to Punter
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'ai' && (
          <div className="space-y-6">
            {aiPunters.map((pundit, index) => (
              <div key={index} className={`bg-white rounded-lg shadow-md p-6 ${pundit.rank === 1 ? 'border-4 border-yellow-400' : ''}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="text-2xl font-bold mr-4">{pundit.rank === 1 ? '🥇' : pundit.rank === 2 ? '🥈' : `#${pundit.rank}`}</div>
                    <img src={pundit.profilePicture} alt="AI Pundit Profile" className="rounded-full w-16 h-16 mr-4" />
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">{pundit.username}</h2>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-indigo-600">{pundit.winRate}% win rate</p>
                    <p className="text-gray-600">Total Predictions: {pundit.totalPredictions}</p>
                  </div>
                  <div className="text-right">
                    <Link to="#" className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-full hover:bg-indigo-700">
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Trending Section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Trending</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Trending Games</h3>
            <p className="text-gray-600">Chelsea vs Arsenal – 1X most predicted today (+340 slips)</p>
            <p className="text-gray-600">Real Madrid over 1.5 goals trending</p>
            <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Hot Punter of The Day</h3>
            <div className="flex items-center">
              <img src="https://via.placeholder.com/150" alt="Hot Pundit" className="rounded-full w-12 h-12 mr-4" />
              <div>
                <p className="font-bold">Hot Pundit</p>
                <p className="text-sm text-gray-500">🔥 W5</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LeaderboardPage;