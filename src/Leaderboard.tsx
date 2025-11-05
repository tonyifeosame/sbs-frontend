import React, { useState, useEffect } from 'react';

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

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Leaderboard</h2>
      <div className="flex space-x-2 mb-4">
        <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>All</button>
        <button onClick={() => setFilter('human')} className={`px-4 py-2 rounded ${filter === 'human' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Humans</button>
        <button onClick={() => setFilter('ai')} className={`px-4 py-2 rounded ${filter === 'ai' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>AI</button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Rank</th>
            <th className="py-2 px-4 border-b">Username</th>
            <th className="py-2 px-4 border-b">Wins</th>
            <th className="py-2 px-4 border-b">Losses</th>
            <th className="py-2 px-4 border-b">Win Rate</th>
          </tr>
        </thead>
        <tbody>
          {punters.map((punter, index) => (
            <tr key={punter.user} className="text-center hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="py-2 px-4 border-b">{punter.user}</td>
              <td className="py-2 px-4 border-b text-green-600">{punter.wins}</td>
              <td className="py-2 px-4 border-b text-red-600">{punter.losses}</td>
              <td className="py-2 px-4 border-b font-semibold">{punter.rate.toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;