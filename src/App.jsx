import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import HomePage from './HomePage';
import AboutPage from './AboutPage';
import SettingsPage from './SettingsPage';
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
import SubscriptionPage from './SubscriptionPage';
import LeaderboardPage from './LeaderboardPage';
import ProfilePage from './pages/ProfilePage'; // Import the new page
import Navbar from './Navbar';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <main className="pt-16"> {/* Add padding to offset the fixed navbar */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/subscribe" element={<SubscriptionPage />} />
            <Route path="/profile/:username" element={<ProfilePage />} /> {/* Dynamic profile route */}
            <Route path="/profile" element={<ProfilePage />} /> {/* A generic profile route for the logged-in user */}

            <Route path="/settings" element={<SettingsPage />}>
              {/* Nested routes for each settings section */}
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
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  );
}

export default App;
                       