import React from 'react';
import { useAuth } from './AuthContext';

const Debug = () => {
  const { token, user, isLoading } = useAuth();

  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg m-4">
      <h2 className="text-xl font-bold mb-4">Auth Context Debugger</h2>
      <pre className="bg-gray-900 p-3 rounded">
        {JSON.stringify({
          isLoading,
          token,
          user,
        }, null, 2)}
      </pre>
    </div>
  );
};

export default Debug;