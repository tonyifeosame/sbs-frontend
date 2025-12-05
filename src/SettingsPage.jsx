import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

const settingsSections = [
  { name: 'Your Account', path: 'account', description: 'Manage your email, phone, and password.' },
  { name: 'Profile', path: 'profile', description: 'Edit your profile photo, username, and bio.' },
  { name: 'Notifications', path: 'notifications', description: 'Choose your notification preferences.' },
  { name: 'Privacy & Safety', path: 'privacy', description: 'Control your account privacy and who can interact with you.' },
  { name: 'Feed Preferences', path: 'feed', description: 'Customize what you see in your feed.' },
  { name: 'Security', path: 'security', description: 'Manage 2FA and see login history.' },
];

const advancedSettingsSections = [
  { name: 'Creator / Pundit Tools', path: 'pundit-tools', description: 'Manage subscriptions and premium content.' },
  { name: 'Wallet / Payments', path: 'wallet', description: 'Manage withdrawal and deposit methods.' },
  { name: 'AI Personalization', path: 'ai-personalization', description: 'Adjust AI-driven recommendations.' },
];

const dangerZoneSections = [
  { name: 'Delete Account', path: 'delete', description: 'Permanently delete your account.' },
];

const SettingsPage = () => {
  const location = useLocation();
  const { user, isLoading } = useAuth();

  // Show the menu only on the main /settings path
  const isMainMenu = location.pathname === '/settings' || location.pathname === '/settings/';

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        {isLoading ? (
          <div className="p-6">Loading...</div>
        ) : !user ? (
          <div className="p-6 text-red-500">You must be logged in to view Settings.</div>
        ) : isMainMenu ? (
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b">
              <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
            </div>
            <ul className="divide-y divide-gray-200">
              {settingsSections.map((section) => (
                <li key={section.path}>
                  <NavLink
                    to={section.path}
                    className={({ isActive }) => `block ${isActive ? 'bg-gray-50 border-l-4 border-indigo-500' : 'hover:bg-gray-50'}`}>
                    <div className="p-6">
                      <p className="font-semibold text-gray-800">{section.name}</p>
                      <p className="text-sm text-gray-600">{section.description}</p>
                    </div>
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="p-6 border-t">
              <h2 className="text-lg font-semibold text-gray-800">Advanced</h2>
            </div>
            <ul className="divide-y divide-gray-200">
              {advancedSettingsSections.map((section) => (
                <li key={section.path}>
                  <NavLink to={section.path} className={({ isActive }) => `block ${isActive ? 'bg-gray-50 border-l-4 border-indigo-500' : 'hover:bg-gray-50'}`}>
                    <div className="p-6">
                      <p className="font-semibold text-gray-800">{section.name}</p>
                      <p className="text-sm text-gray-600">{section.description}</p>
                    </div>
                  </NavLink>
                </li>
              ))}
            </ul>
            <ul className="divide-y divide-gray-200 border-t">
              {dangerZoneSections.map((section) => (
                <li key={section.path}>
                  <NavLink to={section.path} className={({ isActive }) => `block ${isActive ? 'bg-red-50 border-l-4 border-red-500' : 'hover:bg-red-50'}`}>
                    <div className="p-6 text-red-600">
                      <p className="font-semibold">{section.name}</p>
                    </div>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};

export default SettingsPage;