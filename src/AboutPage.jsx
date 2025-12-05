import React from 'react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          About Our Company
        </h1>
        <p className="text-gray-600 mb-6">
          Welcome to our company! We are dedicated to providing the best service
          and products to our customers. Our team is passionate and works hard
          to meet your needs.
        </p>

        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-3">
            Our Mission
          </h2>
          <p className="text-gray-600">
            Our mission is to innovate and lead in our industry, delivering
            unparalleled value and building long-lasting relationships with our
            clients and partners.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;