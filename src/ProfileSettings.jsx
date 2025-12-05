import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { Link } from 'react-router-dom';

const ProfileSettings = () => {
  const { user } = useAuth();
  const [username, setUsername] = useState(user ? `@${user.username}` : '@current_user');
  const [bio, setBio] = useState('This is my current bio.');
  const [location, setLocation] = useState('Planet Earth');
  const [message, setMessage] = useState('');

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setMessage('Profile updated successfully!');
    // TODO: Add API call to update profile
    console.log({ username, bio, location });
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b flex items-center">
        <Link to="/settings" className="mr-4 text-gray-600 hover:text-gray-800 text-2xl font-bold">
          &larr;
        </Link>
        <h1 className="text-xl font-bold text-gray-800">Edit Profile</h1>
      </div>

      <form onSubmit={handleProfileUpdate} className="p-8">
        <p className="text-sm text-gray-600 mb-4">Signed in as <span className="font-semibold">{user?.username || '—'}</span></p>
        {message && <div className="mb-6 p-3 rounded-md bg-green-100 text-green-800">{message}</div>}

        {/* Profile & Cover Photo */}
        <div className="mb-8 space-y-4">
            <h2 className="text-lg font-semibold text-gray-700">Profile & Cover Photo</h2>
            <div>
                <label className="block text-sm font-medium text-gray-700">Profile Photo</label>
                <input type="file" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"/>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB.</p>
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-700">Cover Photo</label>
                <input type="file" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"/>
            </div>
        </div>

        <div className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">@</span>
              <input type="text" id="username" value={username.replace('@','')} onChange={(e) => setUsername(`@${e.target.value}`)} className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300" />
            </div>
          </div>

          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
            <textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} rows="3" maxLength="160" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"></textarea>
            <p className="text-xs text-gray-500 mt-1">{160 - bio.length} characters remaining</p>
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
            <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
          </div>

          <div>
            <button type="submit" className="w-full sm:w-auto justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Save Profile
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileSettings;