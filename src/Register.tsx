import React, { useState } from 'react';
import { register } from './authService';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const data = await register(username, password, email);
      setMessage(data.message);
    } catch (err: any) {
      setError(err.message || 'Registration failed. The username may already be taken.');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="mb-1 text-gray-700">Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required className="p-2 border border-gray-300 rounded-md" />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-gray-700">Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="p-2 border border-gray-300 rounded-md" />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-gray-700">Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="p-2 border border-gray-300 rounded-md" />
        </div>
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition-colors">Register</button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {message && <p className="text-green-500 mt-4">{message}</p>}
    </div>
  );
};

export default Register;