import React, { useState } from 'react';
import { login } from './authService';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const data = await login(username, password);
      localStorage.setItem('token', data.token);
      setMessage('Login successful! You can now access your profile.');
      // In a real app, you would redirect the user, e.g., window.location.href = '/profile';
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
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="p-2 border border-gray-300 rounded-md" />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors">Login</button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {message && <p className="text-green-500 mt-4">{message}</p>}
    </div>
  );
};

export default Login;