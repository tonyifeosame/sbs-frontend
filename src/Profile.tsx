import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:8080';

const Profile = () => {
  const [profile, setProfile] = useState<{ wins: number; losses: number } | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You are not logged in.');
        return;
      }

      try {
        const response = await fetch(`${API_URL}/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile data.');
        }
        const data = await response.json();
        setProfile(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchProfile();
  }, []);

  if (error) return <p className="text-red-500 p-4">{error}</p>;
  if (!profile) return <p className="p-4">Loading profile...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Your Profile</h2>
      <p className="text-lg text-gray-700">Wins: <span className="font-bold text-green-600">{profile.wins}</span></p>
      <p className="text-lg text-gray-700">Losses: <span className="font-bold text-red-600">{profile.losses}</span></p>
    </div>
  );
};

export default Profile;