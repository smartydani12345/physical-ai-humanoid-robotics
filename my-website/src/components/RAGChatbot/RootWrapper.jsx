import React from 'react';
import RAGChatbot from './RAGChatbot';

// Root wrapper component that will be used in theme configuration
const RootWrapper = ({ children }) => {
  return (
    <>
      {children}
      <RAGChatbot initialOpen={false} />
    </>
  );
};

export default RootWrapper;