'use client';

import { ReactNode } from 'react';

import Header from './Header';
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
        <div className='z-10 flex bg-white shadow-2xl'>
          <Header />
          <div className='relative flex w-80 min-w-80 flex-col gap-4 bg-white'>
            {children}
          </div>
          <div className='basis-full'>
            <SearchCategory />
          </div>
          <SearchAgainButton />
        </div>
      </MapProvider>
    </>
  );
};

export default Container;
