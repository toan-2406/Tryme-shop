import React from 'react';

const InfinityLoader = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-6 h-6 border-4 border-t-0 border-blue-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default InfinityLoader;