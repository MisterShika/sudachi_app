import React from 'react';

const ClearToken = () => {
  const handleClearToken = () => {
    localStorage.removeItem('authToken');
  };

  return (
    <button onClick={handleClearToken}>Clear Token</button>
  );
};

export default ClearToken;