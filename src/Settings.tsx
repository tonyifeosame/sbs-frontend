import React from 'react';
import { useAuth } from './AuthContext';

const Settings = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <p className="p-4">Loading...</p>;
  }

  if (!user) {
    return <p className="p-4 text-red-500">You must be logged in to view settings.</p>;
  }

  const SettingSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="border-b border-gray-200 pb-6 mb-6">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );

  const SettingItem = ({ label, description, action }: { label: string, description: string, action: React.ReactNode }) => (
    <div className="flex justify-between items-center">
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <div>{action}</div>
    </div>
  );

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-3xl font-bold mb-8">Settings</h2>

      <SettingSection title="Account">
        <SettingItem label="Email Address" description="user.email@example.com" action={<button className="text-blue-600 hover:underline">Change</button>} />
        <SettingItem label="Password" description="Last changed 1 month ago" action={<button className="text-blue-600 hover:underline">Change</button>} />
      </SettingSection>

      <SettingSection title="Profile & Privacy">
        <SettingItem label="Private Account" description="When your account is private, only people you approve can see your posts." action={<button className="bg-gray-200 px-3 py-1 rounded-full">Toggle</button>} />
        <SettingItem label="Blocked Accounts" description="Manage the accounts you've blocked." action={<button className="text-blue-600 hover:underline">Manage</button>} />
      </SettingSection>

      <SettingSection title="Theme">
        <SettingItem label="Interface Theme" description="Select your preferred theme." action={<button className="text-blue-600 hover:underline">Change</button>} />
      </SettingSection>

    </div>
  );
};

export default Settings;