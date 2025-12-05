import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register, login as authLogin } from './authService';
import { useAuth } from './AuthContext';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      // The authService `register` function needs to be updated to send all fields
      await register({
        username, password, email, fullName, phone, dob, gender, country, state
      });
      // On successful registration, try to auto-login (if login succeeds we'll redirect)
      try {
        const loginRes = await authLogin(username.trim(), password);
        if (loginRes?.token) {
          await auth.login(loginRes.token);
        }
      } catch (e) {
        // If auto-login fails, just continue to home / prompt login
        console.warn('Auto-login after register failed', e);
      }
      navigate('/'); // Redirect to home page
    } catch (err: any) {
      setError(err.message || 'Registration failed. The username may already be taken.');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="mb-1 text-gray-700">Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required className="p-2 border border-gray-300 rounded-md" />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-gray-700">Full Name:</label>
          <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required className="p-2 border border-gray-300 rounded-md" />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-gray-700">Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="p-2 border border-gray-300 rounded-md" />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-gray-700">Phone Number:</label>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="p-2 border border-gray-300 rounded-md" />
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
        <div className="flex flex-col">
          <label className="mb-1 text-gray-700">Confirm Password:</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required className="p-2 border border-gray-300 rounded-md w-full" />
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 px-3 flex items-center text-sm text-gray-600">
              {showConfirmPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-gray-700">Date of Birth:</label>
          <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} required className="p-2 border border-gray-300 rounded-md" />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-gray-700">Gender (optional):</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)} className="p-2 border border-gray-300 rounded-md bg-white">
            <option value="">Select...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-gray-700">Country:</label>
          <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} required className="p-2 border border-gray-300 rounded-md" />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-gray-700">State/City:</label>
          <input type="text" value={state} onChange={(e) => setState(e.target.value)} required className="p-2 border border-gray-300 rounded-md" />
        </div>
        <div className="md:col-span-2">
          <button type="submit" className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition-colors">Register</button>
        </div>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default Register;