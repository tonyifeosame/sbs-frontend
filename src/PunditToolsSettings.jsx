import React from 'react';
import { useAuth } from './AuthContext';
import { Link } from 'react-router-dom';

const PunditToolsSettings = () => {
  const { user } = useAuth();

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b flex items-center">
        <Link to="/settings" className="mr-4 text-gray-600 hover:text-gray-800 text-2xl font-bold">
          &larr;
        </Link>
        <h1 className="text-xl font-bold text-gray-800">Creator / Pundit Tools</h1>
      </div>

      <div className="p-8">
        <p className="text-sm text-gray-600 mb-4">Signed in as <span className="font-semibold">{user?.username || '—'}</span></p>
        <p className="text-gray-600">Settings for Pundit Mode, subscriptions, and premium content will go here.</p>
      </div>
    </div>
  );
};

export default PunditToolsSettings;