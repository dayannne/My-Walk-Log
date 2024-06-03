'use client';

import React from 'react';

interface SearchLayoutProps {
  children: React.ReactNode;
}

const SearchLayout: React.FC<SearchLayoutProps> = ({ children }) => {
  return (
    <div className='bg-white flex flex-col w-96 h-full gap-4 shadow-2xl z-10 '>
      {children}
    </div>
  );
};

export default SearchLayout;
