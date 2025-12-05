import React from 'react';
import { Link } from 'react-router-dom';

const SubscriptionPage = () => {
  // Placeholder data for the pundit
  const pundit = {
    profilePicture: 'https://via.placeholder.com/150',
    username: 'SBS Pundit',
    handle: 'sbspundit',
    bio: 'Expert in sports betting with a passion for helping others win.',
    winRate: 63,
    followersCount: 12000,
    subscribersCount: 350,
  };

  // Placeholder data for subscription tiers
  const subscriptionTiers = [
    {
      name: 'Basic',
      price: '₦500 - ₦1,500',
      access: [
        'View premium slips',
        'Comment on premium posts',
      ],
    },
    {
      name: 'VIP',
      price: '₦2,000 - ₦4,000',
      access: [
        'All Basic tier benefits',
        'Early slip access (before the public)',
        'Win-rate breakdown',
        'Direct Q&A with pundit',
      ],
    },
    {
      name: 'Platinum',
      price: '₦5,000 - ₦10,000+',
      access: [
        'Everything in lower tiers',
        'Exclusive high-odds accumulator slips',
        'Personalized predictions',
        'Private group (Telegram/WhatsApp or in-app)',
      ],
    },
  ];

  // Placeholder data for premium posts
  const premiumPosts = [
    {
      odds: '3.5x',
      match: 'Barcelona vs Sevilla',
      caption: 'Subscribe to unlock full slip',
      image: 'https://via.placeholder.com/300x200',
    },
    {
      odds: '2.8x',
      match: 'Real Madrid vs Atletico',
      caption: 'Subscribe to unlock full slip',
      image: 'https://via.placeholder.com/300x200',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">

        {/* Pundit Header */}
        <div className="p-8 border-b">
          <div className="flex items-center mb-4">
            <img src={pundit.profilePicture} alt="Pundit Profile" className="rounded-full w-16 h-16 mr-4" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{pundit.username}</h1>
              <p className="text-gray-600">@{pundit.handle}</p>
            </div>
          </div>
          <p className="text-gray-700 mb-2">{pundit.bio}</p>
          <p className="text-indigo-600 font-semibold mb-2">🔵 {pundit.winRate}% Win Rate in last 30 slips</p>
          <div className="flex space-x-4">
            <p className="text-gray-600">{pundit.followersCount} Followers</p>
            <p className="text-gray-600">{pundit.subscribersCount} Subscribers</p>
          </div>
        </div>

        {/* Subscription Tiers */}
        <div className="p-8 border-b">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Subscription Tiers</h2>
          <div className="space-y-6">
            {subscriptionTiers.map((tier, index) => (
              <div key={index} className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800">{tier.name}</h3>
                <p className="text-gray-600 mb-4">Price: {tier.price} / month</p>
                <ul className="list-disc list-inside text-gray-600 mb-4">
                  {tier.access.map((accessItem, i) => (
                    <li key={i}>{accessItem}</li>
                  ))}
                </ul>
                <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Subscribe / Upgrade
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* What Subscribers Get */}
        <div className="p-8 border-b">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">What Subscribers Get</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">🔒 Premium slips</h3>
              <p className="text-gray-600">High-quality bet slips only visible to subscribers.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">📈 Detailed analytics</h3>
              <p className="text-gray-600">Win rates, monthly performance charts, etc.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">⏱️ Early access slips</h3>
              <p className="text-gray-600">Subscribers see slips before non-subscribers.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">💬 Direct community</h3>
              <p className="text-gray-600">Private chat or comment space.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">📊 "Bet of the Day"</h3>
              <p className="text-gray-600">Given by pundit only to subscribers.</p>
            </div>
          </div>
        </div>

        {/* Payment Section */}
        <div className="p-8 border-b">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Payment Section</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Select Subscription Tier</label>
              <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                {subscriptionTiers.map((tier, index) => (
                  <option key={index}>{tier.name} - {tier.price} / month</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Choose Payment Method</label>
              <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                <option>Paystack (Recommended for Nigeria)</option>
                <option>Flutterwave</option>
                <option>Credit/Debit card</option>
              </select>
            </div>
            <div className="flex items-center">
              <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
              <label className="ml-2 block text-sm text-gray-900">Recurring billing</label>
            </div>
            <p className="text-gray-600 text-sm">Renews Jan 1, 2026</p>
            <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Subscribe Now
            </button>
          </div>
        </div>

        {/* Refund & Cancellation UI */}
        <div className="p-8 border-b">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Refund & Cancellation</h2>
          <p className="text-gray-600 mb-4">Cancel anytime — no penalty.</p>
          <p className="text-gray-600">Next billing date: Jan 1, 2025</p>
          <p className="text-gray-600">Subscription history: <Link to="#" className="text-indigo-600 hover:text-indigo-800">View</Link></p>
          <button className="mt-4 w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Turn Off Auto-Renew
          </button>
        </div>

        {/* Preview Posts / Samples */}
        <div className="p-8 border-b">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Preview Premium Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {premiumPosts.map((post, index) => (
              <div key={index} className="relative">
                <img src={post.image} alt="Premium Slip" className="w-full h-48 object-cover rounded-md blur-md" />
                <div className="absolute inset-0 flex flex-col justify-center items-center">
                  <p className="text-white text-lg font-semibold">Odds: {post.odds}. Match: {post.match}</p>
                  <p className="text-white text-center">{post.caption}</p>
                  <button className="mt-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Subscribe to unlock full slip
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pundit Stats Section */}
        <div className="p-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Pundit Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">30-Day Win Rate: <span className="font-semibold">{pundit.winRate}%</span></p>
            </div>
            <div>
              <p className="text-gray-600">Last 10 Predicts: <span className="font-semibold">7 Wins / 3 Losses</span></p>
            </div>
            <div>
              <p className="text-gray-600">Average Odds: <span className="font-semibold">2.4x</span></p>
            </div>
            <div>
              <p className="text-gray-600">Best Winning Streak: <span className="font-semibold">6</span></p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SubscriptionPage;