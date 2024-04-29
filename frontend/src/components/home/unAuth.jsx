import React from 'react';

const UnAuth = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
        <h3 className="text-2xl font-bold text-center text-red-600">Unauthorized Access !! :(</h3>
      </div>
    </div>
  );
};

export default UnAuth;
