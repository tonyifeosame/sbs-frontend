import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:8080';

const UserProfileImage = () => {
  const [profile, setProfile] = useState<{ username: string; avatar_url: string } | null>(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return;

    const fetchProfile = async () => {
      try {
        const response = await fetch(`${API_URL}/profile`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (response.ok) {
          setProfile(await response.json());
        }
      } catch (err) {
        console.error("Failed to fetch profile for image:", err);
      }
    };

    fetchProfile();
  }, [token]);

  if (!profile) {
    return <div className="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0"></div>;
  }

  return profile.avatar_url ? (
    <img src={profile.avatar_url} alt="Your profile" className="w-12 h-12 rounded-full object-cover" />
  ) : (
    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold text-xl">
      {profile.username.charAt(0).toUpperCase()}
    </div>
  );
};

export default UserProfileImage;