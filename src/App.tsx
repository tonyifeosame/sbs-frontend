import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import UserProfile from './UserProfile';
import Profile from './Profile'; 
import AccountSettings from './AccountSettings';
import ProfileSettings from './ProfileSettings';
import NotificationsSettings from './NotificationsSettings';
import PrivacySettings from './PrivacySettings';
import FeedSettings from './FeedSettings';
import SecuritySettings from './SecuritySettings';
import PunditToolsSettings from './PunditToolsSettings';
import WalletSettings from './WalletSettings';
import AIPersonalizationSettings from './AIPersonalizationSettings';
import DeleteAccount from './DeleteAccount';
import SettingsPage from './SettingsPage'; // full settings hub with nested pages
import CreatePost from './CreatePost';
import Subscriptions from './Subscriptions'; // Import the new Subscriptions component
import Leaderboard from './Leaderboard';
import Layout from './Layout';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
// removed accidental Go code block that was pasted into this TSX file
import Debug from './Debug'; // Import the new debug component
import { AuthProvider } from './AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="bg-gray-100 min-h-screen">
          <div className="container mx-auto flex justify-center">
            <LeftSidebar />
            <main className="w-full max-w-2xl border-x border-gray-200">
              <Routes>
                <Route path="/" element={<Layout><Home /></Layout>} />
                <Route path="/login" element={<Layout><Login /></Layout>} />
                <Route path="/register" element={<Layout><Register /></Layout>} />
                <Route path="/profile" element={<Layout><Profile /></Layout>} />
                <Route path="/users/:username" element={<Layout><UserProfile /></Layout>} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/post-betslip" element={<CreatePost />} />
                <Route path="/ai-punters" element={<Layout><div>AI Punters page coming soon!</div></Layout>} />
                <Route path="/subscriptions" element={<Layout><Subscriptions /></Layout>} />
                <Route path="/settings" element={<Layout><SettingsPage /></Layout>}>
                  <Route index element={<div className="p-8">Select a section from the Settings menu.</div>} />
                  <Route path="account" element={<AccountSettings />} />
                  <Route path="profile" element={<ProfileSettings />} />
                  <Route path="notifications" element={<NotificationsSettings />} />
                  <Route path="privacy" element={<PrivacySettings />} />
                  <Route path="feed" element={<FeedSettings />} />
                  <Route path="security" element={<SecuritySettings />} />
                  <Route path="pundit-tools" element={<PunditToolsSettings />} />
                  <Route path="wallet" element={<WalletSettings />} />
                  <Route path="ai-personalization" element={<AIPersonalizationSettings />} />
                  <Route path="delete" element={<DeleteAccount />} />
                </Route>
              <Route path="/debug" element={<Layout><Debug /></Layout>} />
              </Routes>
            </main>
            <RightSidebar />
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;