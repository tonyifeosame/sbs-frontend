import React, { useRef, useState } from 'react';
import { uploadAvatar } from './profileService';
import { useAuth } from './AuthContext';

const Profile = () => {
  const { user, isLoading, login } = useAuth(); // Using login to refresh context
  // Local state for UI feedback during upload
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError('');
    setMessage('Uploading...');

    try {
      const data = await uploadAvatar(file);
      setMessage(data.message);
      // To refresh the user data across the app, we can re-trigger the fetch in AuthContext.
      // A simple way is to call login again with the existing token.
      const token = localStorage.getItem('token');
      if (token) login(token);
    } catch (err: any) {
      setError(err.message);
      setMessage('');
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  if (isLoading) return <p className="p-4">Loading profile...</p>;
  if (!user) return <p className="p-4 text-red-500">You are not logged in.</p>;

  return (
    <div className="p-4">
      <div className="flex items-center mb-6">
        {user.avatar_url ? (
            <img src={user.avatar_url} alt="Your profile" className="w-24 h-24 rounded-full object-cover mr-6" />
        ) : (
            <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold text-4xl mr-6">
                {user.username.charAt(0).toUpperCase()}
            </div>
        )}
        <div>
            <h2 className="text-3xl font-bold">{user.username}</h2>
            <button onClick={handleUploadClick} className="mt-2 text-sm text-blue-600 hover:underline">Change Profile Picture</button>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
        </div>
      </div>
      {message && <p className="text-green-500 mb-4">{message}</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <p className="text-lg text-gray-700">Wins: <span className="font-bold text-green-600">{user.wins ?? 0}</span></p>
      <p className="text-lg text-gray-700">Losses: <span className="font-bold text-red-600">{user.losses ?? 0}</span></p>
    </div>
  );
};

export default Profile;