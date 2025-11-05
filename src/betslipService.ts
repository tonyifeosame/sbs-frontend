const API_URL = 'http://localhost:8080';

interface Game {
  home: string;
  away: string;
  market: string;
  odds: number;
  prediction: string;
}

export const postBetslip = async (platform: string, games: Game[]) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('You must be logged in to post a betslip.');

  const response = await fetch(`${API_URL}/betslip`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ platform, games }),
  });

  if (!response.ok) throw new Error('Failed to post betslip.');
  return response.json();
};