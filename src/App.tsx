import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import PostBetslip from './PostBetslip';
import Leaderboard from './Leaderboard';
import Layout from './Layout';

function App() {
  // A real app would have a more sophisticated way to manage auth state
  const token = localStorage.getItem('token');

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-800">
        <header className="flex justify-between items-center px-8 py-4 bg-white shadow-sm sticky top-0 z-10">
          <h1 className="text-2xl font-bold text-gray-900">
            <Link to="/">SureBetSlips</Link>
          </h1>
          <nav className="flex items-center space-x-4 text-gray-700 font-medium">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <Link to="/leaderboard" className="hover:text-blue-600">Leaderboard</Link>
          </nav>
          {token ? (
            <div className="flex items-center space-x-4">
              <Link to="/profile" className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-100">Profile</Link>
              <Link to="/post-betslip" className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">Post Bet</Link>
            </div>
          ) : (
            <div className="flex space-x-3">
              <Link to="/login" className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-100">Login</Link>
              <Link to="/register" className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">Register</Link>
            </div>
          )}
        </header>
        <main className="p-8">
           <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Layout><Login /></Layout>} />
          <Route path="/register" element={<Layout><Register /></Layout>} />
          <Route path="/profile" element={<Layout><Profile /></Layout>} />
          <Route path="/leaderboard" element={<Layout><Leaderboard /></Layout>} />
          <Route path="/post-betslip" element={<Layout><PostBetslip /></Layout>} />
        </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;