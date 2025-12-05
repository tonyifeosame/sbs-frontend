import React, { useState, useEffect } from 'react';
import Sparkline from './Sparkline';

const API_URL = 'http://localhost:8080';

interface Punter {
  user: string;
  wins: number;
  losses: number;
  rate: number;
}

const Leaderboard = () => {
  const [punters, setPunters] = useState<Punter[]>([]);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'human', 'ai'
  const [timeframe, setTimeframe] = useState('week');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setError('');
      let url = `${API_URL}/leaderboard`;
      if (filter !== 'all') {
        url += `?type=${filter}`;
      }

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch leaderboard data.');
        }
        const data = await response.json();
        setPunters(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchLeaderboard();
  }, [filter]);

  const mockSpark = (seed: number) => {
    // produce a small sparkline dataset based on index
    const base = [2,3,4,5,6,5,6,7,8,7];
    return base.map((n, i) => Math.max(1, n + ((seed + i) % 3) - 1));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
        <div className="md:flex md:items-start md:justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Top Pundits & AI Rankings</h2>
            <p className="text-sm text-gray-500 mt-1">See the best performers on SBS based on verified win rates and bet slip history.</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <div className="flex rounded-md bg-gray-100 p-1 text-xs">
              <button className={`px-3 py-1 rounded ${filter === 'human' ? 'bg-white shadow-sm text-indigo-700' : 'text-gray-600'}`} onClick={() => setFilter('human')}>Human</button>
              <button className={`px-3 py-1 rounded ${filter === 'ai' ? 'bg-white shadow-sm text-indigo-700' : 'text-gray-600'}`} onClick={() => setFilter('ai')}>AI</button>
              <button className={`px-3 py-1 rounded ${filter === 'all' ? 'bg-white shadow-sm text-indigo-700' : 'text-gray-600'}`} onClick={() => setFilter('all')}>All</button>
            </div>
            <select value={timeframe} onChange={e => setTimeframe(e.target.value)} className="text-xs border rounded px-3 py-1 bg-white">
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="all">All Time</option>
            </select>
          </div>
        </div>
        <div className="flex space-x-2 mb-6">
          <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}>All Punters</button>
          <button onClick={() => setFilter('human')} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filter === 'human' ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}>Humans</button>
          <button onClick={() => setFilter('ai')} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filter === 'ai' ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}>AI</button>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <div className="mt-4 space-y-4">
          {punters.length === 0 ? (
            <div className="p-6 text-center text-gray-500">No punters found.</div>
          ) : (
            <div className="space-y-4">
              {punters.map((p, i) => (
                <div key={p.user} className={`${i === 0 ? 'bg-gradient-to-r from-yellow-50 via-white to-white border-yellow-300' : 'bg-white'} rounded-lg border p-4 shadow-sm flex items-center justify-between` }>
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${i === 0 ? 'text-yellow-700 bg-yellow-100' : 'bg-gray-100 text-gray-700'}`}>{i+1}</div>
                    <div>
                      <div className="font-semibold">{p.user}</div>
                      <div className="text-sm text-gray-500">Short bio or location — (mock)</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <div className="text-lg font-bold text-indigo-600">{p.rate.toFixed(0)}%</div>
                      <div className="text-xs text-gray-500">Win Rate</div>
                    </div>
                    <div className="hidden md:block text-sm text-gray-500 text-center">
                      <div><strong>{p.wins}</strong> wins</div>
                      <div><strong>{p.losses}</strong> losses</div>
                    </div>
                    <div className="w-24 hidden sm:block">
                      <Sparkline points={mockSpark(i)} />
                    </div>
                    <div>
                      <button className={`px-3 py-1 rounded ${i===0 ? 'bg-yellow-600 text-white' : 'bg-indigo-600 text-white'}`}>{i===0 ? 'View #1' : 'View Profile'}</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;