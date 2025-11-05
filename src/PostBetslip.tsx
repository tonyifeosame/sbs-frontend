import React, { useState } from 'react';
import { postBetslip } from './betslipService';

interface Game {
  home: string;
  away: string;
  market: string;
  odds: number;
  prediction: string;
}

const PostBetslip = () => {
  const [platform, setPlatform] = useState('demo');
  const [games, setGames] = useState<Game[]>([
    { home: '', away: '', market: '', odds: 1.5, prediction: '' },
  ]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleGameChange = (index: number, field: keyof Game, value: string | number) => {
    const newGames = [...games];
    newGames[index] = { ...newGames[index], [field]: value };
    setGames(newGames);
  };

  const addGame = () => {
    setGames([...games, { home: '', away: '', market: '', odds: 1.5, prediction: '' }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      const data = await postBetslip(platform, games);
      setMessage(data.message || 'Betslip posted successfully!');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Post a New Betslip</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col">
          <label className="mb-1 text-gray-700">Platform:</label>
          <input type="text" value={platform} onChange={(e) => setPlatform(e.target.value)} required className="p-2 border border-gray-300 rounded-md" />
        </div>

        {games.map((game, index) => (
          <div key={index} className="border border-gray-300 p-4 rounded-md space-y-3 bg-gray-50">
            <h4 className="text-xl font-medium text-gray-800">Game {index + 1}</h4>
            <div className="flex flex-col">
              <label className="mb-1 text-gray-700">Home Team:</label>
              <input type="text" value={game.home} onChange={(e) => handleGameChange(index, 'home', e.target.value)} required className="p-2 border border-gray-300 rounded-md" />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 text-gray-700">Away Team:</label>
              <input type="text" value={game.away} onChange={(e) => handleGameChange(index, 'away', e.target.value)} required className="p-2 border border-gray-300 rounded-md" />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 text-gray-700">Market:</label>
              <input type="text" placeholder="e.g., 1X2, Over/Under 2.5" value={game.market} onChange={(e) => handleGameChange(index, 'market', e.target.value)} required className="p-2 border border-gray-300 rounded-md" />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 text-gray-700">Prediction:</label>
              <input type="text" placeholder="e.g., Home Win, Over 2.5" value={game.prediction} onChange={(e) => handleGameChange(index, 'prediction', e.target.value)} required className="p-2 border border-gray-300 rounded-md" />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 text-gray-700">Odds:</label>
              <input type="number" step="0.01" value={game.odds} onChange={(e) => handleGameChange(index, 'odds', parseFloat(e.target.value))} required className="p-2 border border-gray-300 rounded-md" />
            </div>
          </div>
        ))}

        <button type="button" onClick={addGame} className="bg-gray-200 text-gray-800 p-2 rounded-md hover:bg-gray-300 transition-colors w-full">Add Another Game</button>
        <div className="border-t border-gray-300 pt-4">
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors">Post Betslip</button>
        </div>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {message && <p className="text-green-500 mt-4">{message}</p>}
    </div>
  );
};

export default PostBetslip;