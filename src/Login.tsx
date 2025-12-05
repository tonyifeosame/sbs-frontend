import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from './authService';
import { useAuth } from './AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Trim username to remove leading/trailing whitespace
      const data = await login(username.trim(), password);
      await auth.login(data.token);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to log in. Please check your credentials.');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="mb-1 text-gray-700">Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required className="p-2 border border-gray-300 rounded-md" />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-gray-700">Password:</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="p-2 border border-gray-300 rounded-md w-full"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-3 flex items-center text-sm text-gray-600">
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors">Login</button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      <p className="mt-6 text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
          Register here
        </Link>
      </p>
    </div>
  );
};

export default Login;