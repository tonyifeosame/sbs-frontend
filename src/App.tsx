import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import PostBetslip from './PostBetslip';
import Leaderboard from './Leaderboard';

function App() {
  // A real app would have a more sophisticated way to manage auth state
  const token = localStorage.getItem('token');

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
        <nav className="mb-8 p-4 bg-white shadow-md rounded-lg flex space-x-4">
          <Link to="/" className="text-blue-600 hover:text-blue-800">Home</Link> |
          <Link to="/leaderboard" className="text-blue-600 hover:text-blue-800">Leaderboard</Link> |
          <Link to="/register" className="text-blue-600 hover:text-blue-800">Register</Link>
          {token ? (
            <>
              <Link to="/profile" className="text-blue-600 hover:text-blue-800">Profile</Link>
              <Link to="/post-betslip" className="text-blue-600 hover:text-blue-800">Post Bet</Link>
            </>
          ) : <Link to="/login" className="text-blue-600 hover:text-blue-800">Login</Link>}
        </nav>
        <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md">
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/post-betslip" element={<PostBetslip />} />
        </Routes>
      </div>
      </div>
    </Router>
  );
}

export default App;