import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { Link } from 'react-router-dom';

const DeleteAccount = () => {
  const { user } = useAuth();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleDelete = (e) => {
    e.preventDefault();
    if (!password) {
      setMessage('Please enter your password to confirm.');
      return;
    }
    // TODO: Add API call to delete account
    console.log('Deleting account...');
    setMessage('Account deletion initiated. You will be logged out shortly.');
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b flex items-center">
        <Link to="/settings" className="mr-4 text-gray-600 hover:text-gray-800 text-2xl font-bold">
          &larr;
        </Link>
        <h1 className="text-xl font-bold text-red-600">Delete Account</h1>
      </div>

      <form onSubmit={handleDelete} className="p-8">
        <p className="text-sm text-gray-600 mb-4">Signed in as <span className="font-semibold">{user?.username || '—'}</span></p>
        <div className="space-y-6">
          <div className="p-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
            <span className="font-medium">Danger Zone!</span> Deleting your account is permanent and cannot be undone. All your data, including bet slips and profile information, will be permanently removed.
          </div>

          {message && <div className="p-3 rounded-md bg-blue-100 text-blue-800">{message}</div>}

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Confirm with your password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500" />
          </div>

          <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
            Permanently Delete My Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeleteAccount;