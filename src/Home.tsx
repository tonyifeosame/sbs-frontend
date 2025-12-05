import React from "react";

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row justify-between items-center py-16 max-w-6xl mx-auto">
        <div className="max-w-lg mb-10 md:mb-0">
          <h2 className="text-4xl font-extrabold mb-4 leading-snug">
            Turn bet prediction into a{" "}
            <span className="text-blue-600">community-driven</span> experience
          </h2>
          <p className="text-gray-600 mb-6 text-lg">
            Post your bet slips, track outcomes, and build your reputation in the betting community.
          </p>
          <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
            Get Started
          </button>
        </div>

        {/* Profile Card */}
        <div className="bg-white shadow-lg rounded-2xl p-6 text-center w-full md:w-80">
          <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold mb-2">John Doe</h3>
          <div className="flex justify-center space-x-8 mb-4">
            <div>
              <p className="text-2xl font-bold">30</p>
              <p className="text-gray-500 text-sm">Wins</p>
            </div>
            <div>
              <p className="text-2xl font-bold">10</p>
              <p className="text-gray-500 text-sm">Losses</p>
            </div>
          </div>
          <a
            href="/profile"
            className="text-blue-600 hover:underline font-medium text-sm"
          >
            View Profile
          </a>
        </div>
      </section>

      {/* Recent Bet Slips */}
      <section className="bg-white p-8 shadow-sm rounded-2xl max-w-5xl mx-auto mb-16">
        <h3 className="text-2xl font-bold mb-6">Recent Bet Slips</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b pb-3">
            <div>
              <p className="font-medium">Man City vs Arsenal</p>
              <p className="text-sm text-gray-500">Posted by John Doe</p>
            </div>
            <span className="text-green-600 font-semibold">Won</span>
          </div>

          <div className="flex justify-between items-center border-b pb-3">
            <div>
              <p className="font-medium">Barcelona vs Madrid</p>
              <p className="text-sm text-gray-500">Posted by Jane Doe</p>
            </div>
            <span className="text-red-600 font-semibold">Lost</span>
          </div>

          <div className="flex justify-between items-center border-b pb-3">
            <div>
              <p className="font-medium">Liverpool vs Chelsea</p>
              <p className="text-sm text-gray-500">Posted by Alex</p>
            </div>
            <span className="text-yellow-500 font-semibold">Pending</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
