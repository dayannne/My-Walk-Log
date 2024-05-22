import { ReactNode } from 'react';

const SearchLayout = ({ children }: { children: ReactNode }) => {
  return <div className='z-10 w-96 h-full bg-white'>{children}</div>;
};

export default SearchLayout;
