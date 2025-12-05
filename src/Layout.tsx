import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md">
      {children}
    </div>
  );
};

export default Layout;