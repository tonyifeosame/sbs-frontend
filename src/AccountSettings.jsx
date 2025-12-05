import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { Link } from 'react-router-dom';

// Placeholder API functions
const updateUserEmail = async (currentPassword, newEmail) => {
  console.log('Updating email:', { currentPassword, newEmail });
  return { success: true, message: 'Verification link sent to your new email!' };
};

const updateUserPassword = async (currentPassword, newPassword) => {
  console.log('Updating password');
  return { success: true, message: 'Password updated successfully!' };
};

const AccountSettings = () => {
  const { user } = useAuth();
  const [newEmail, setNewEmail] = useState('');
  const [passwordForEmail, setPasswordForEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = async (e) => {
    e.preventDefault();
    setMessage('');
    if (!newEmail || !passwordForEmail) {
      setMessage('Please fill in all fields to change your email.');
      return;
    }
    try {
      const result = await updateUserEmail(passwordForEmail, newEmail);
      setMessage(result.message);
      setNewEmail('');
      setPasswordForEmail('');
    } catch (error) {
      setMessage(error.message || 'An error occurred.');
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setMessage('');
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setMessage('Please fill in all fields to change your password.');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setMessage('New passwords do not match.');
      return;
    }
    try {
      const result = await updateUserPassword(currentPassword, newPassword);
      setMessage(result.message);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (error) {
      setMessage(error.message || 'An error occurred.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b flex items-center">
        <Link to="/settings" className="mr-4 text-gray-600 hover:text-gray-800 text-2xl font-bold">
          &larr;
        </Link>
        <h1 className="text-xl font-bold text-gray-800">Your Account</h1>
      </div>

      <div className="p-8">
        <p className="text-sm text-gray-600 mb-4">Signed in as <span className="font-semibold">{user?.username || '—'}</span></p>
        {message && <div className="mb-6 p-3 rounded-md bg-blue-100 text-blue-800">{message}</div>}

        {/* Change Email Form */}
        <form onSubmit={handleEmailChange} className="mb-8 border-b border-gray-200 pb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Change Email Address</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">New Email Address</label>
              <input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Current Password (for verification)</label>
              <input type="password" value={passwordForEmail} onChange={(e) => setPasswordForEmail(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <button type="submit" className="w-full sm:w-auto justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Update Email
            </button>
          </div>
        </form>

        {/* Change Password Form */}
        <form onSubmit={handlePasswordChange}>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Change Password</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Current Password</label>
              <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">New Password</label>
              <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
              <input type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <button type="submit" className="w-full sm:w-auto justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountSettings;