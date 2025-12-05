import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const API_URL = 'http://localhost:8080';

const bettingPlatforms = [
  { name: "SportyBet", logo: "/logos/sportybet.png" },
  { name: "Bet9ja", logo: "/logos/bet9ja.png" },
  { name: "1xBet", logo: "/logos/1xbet.png" },
  { name: "BetKing", logo: "/logos/betking.png" },
  { name: "Nairabet", logo: "/logos/nairabet.png" },
  { name: "Betway", logo: "/logos/betway.png" },
  { name: "Merrybet", logo: "/logos/merrybet.png" },
  { name: "22Bet", logo: "/logos/22bet.png" },
];

const CreatePost = () => {
  const [postType, setPostType] = useState<'betslip' | 'text'>('betslip');
  const [description, setDescription] = useState('');
  const [platform, setPlatform] = useState(bettingPlatforms[0].name); // Set a default platform for immediate display
  const [totalOdds, setTotalOdds] = useState('');
  const [stake, setStake] = useState('');
  const [betslipCode, setBetslipCode] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const { user, token, isLoading } = useAuth();
  const navigate = useNavigate();

  const selectedPlatformDetails = bettingPlatforms.find(p => p.name === platform);

  useEffect(() => {
    // Redirect to login if not authenticated and not loading
    if (!isLoading && !token) {
      navigate('/login');
    }
  }, [token, isLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('Posting...');

    const postData = {
      post_type: postType,
      description,
      platform: postType === 'betslip' ? platform : null,
      betslip_code: postType === 'betslip' ? betslipCode : null,
      total_odds: postType === 'betslip' && totalOdds ? parseFloat(totalOdds) : null,
      stake: postType === 'betslip' && stake ? parseFloat(stake) : null,
    };

    try {
      const response = await fetch(`${API_URL}/betslip`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to post betslip.');
      }

      setMessage('Betslip posted successfully!');
      setTimeout(() => navigate('/'), 2000); // Redirect to home after 2s
    } catch (err: any) {
      setError(err.message);
      setMessage('');
    }
  };

  // Show a loading state while auth status is being determined
  if (isLoading) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4 border-b border-gray-200 flex space-x-4">
      {user?.avatar_url ? (
        <img src={user.avatar_url} alt="Your profile" className="w-12 h-12 rounded-full object-cover" />
      ) : (
        <div className="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0"></div>
      )}
      <div className="flex-1">
        <div className="flex border-b mb-4">
          <button onClick={() => setPostType('betslip')} className={`flex-1 p-3 font-bold ${postType === 'betslip' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}>
            Post Betslip
          </button>
          <button onClick={() => setPostType('text')} className={`flex-1 p-3 font-bold ${postType === 'text' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}>
            Post Update
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full text-xl p-2 bg-transparent outline-none resize-none"
            placeholder={postType === 'betslip' ? "Write something about your bet..." : "What's happening?"}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          {postType === 'betslip' && (
            <div className="grid grid-cols-2 gap-4 my-4">
              <div className="flex items-center space-x-2 p-2 border rounded-md">
                {selectedPlatformDetails && (
                  <img src={selectedPlatformDetails.logo} alt={selectedPlatformDetails.name} className="w-8 h-8 object-contain" />
                )}
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  required
                  className="bg-transparent w-full outline-none"
                >
                  <option value="" disabled>Select Platform...</option>
                  {bettingPlatforms.map(p => (
                    <option key={p.name} value={p.name}>{p.name}</option>
                  ))}
                </select>
              </div>
              <input type="text" placeholder="Bet Slip Code" value={betslipCode} onChange={(e) => setBetslipCode(e.target.value)} className="p-2 border rounded-md" />
              <input type="number" placeholder="Total Odds (optional)" value={totalOdds} onChange={(e) => setTotalOdds(e.target.value)} className="p-2 border rounded-md" />
              <input type="number" placeholder="Stake (optional)" value={stake} onChange={(e) => setStake(e.target.value)} className="p-2 border rounded-md" />
            </div>
          )}
          <div className="flex justify-between items-center pt-2">
            <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-6 rounded-full hover:bg-blue-600 disabled:opacity-50">
              Post
            </button>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {message && <p className="text-green-500 mt-2">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default CreatePost;