const API_URL = 'http://localhost:8080';

export const fetchPunterPlans = async (username: string) => {
  const res = await fetch(`${API_URL}/punters/${encodeURIComponent(username)}/plans`);
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(text || `Failed to fetch plans: ${res.status}`);
  }
  return res.json();
};

export const subscribeToPunter = async (username: string, plan: string, token: string) => {
  const res = await fetch(`${API_URL}/users/${encodeURIComponent(username)}/subscribe`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ plan }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(text || `Failed to subscribe: ${res.status}`);
  }
  return res.json();
};

export const fetchMySubscriptions = async (token: string) => {
  const res = await fetch(`${API_URL}/me/subscriptions`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(text || `Failed to fetch subscriptions: ${res.status}`);
  }
  return res.json();
};

export default { fetchPunterPlans, subscribeToPunter, fetchMySubscriptions };
