'use client';

import { ReactNode } from 'react';

import SearchForm from '../search/SearchForm';
import SearchCategory from '../search/SearchCategory';
import SearchAgainButton from '../search/SearchAgainButton';
import MapProvider from '@/app/shared/contexts/Map';

interface ContainerProps {
  children: ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return (
    <>
      <MapProvider>
        <div className='bg-white flex flex-col w-80 min-w-80  gap-4 shadow-2xl z-10'>
          <SearchForm />
          {children}
          <SearchAgainButton />
          <SearchCategory />
        </div>
      </MapProvider>
    </>
  );
};

export default Container;
