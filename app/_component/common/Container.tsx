'use client';

import { ReactNode } from 'react';

import SearchForm from '../search/SearchForm';
import SearchAgainButton from './SearchAgainButton';
import MapProvider from '@/app/shared/contexts/Map';

interface ContainerProps {
  children: ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return (
    <MapProvider>
      <div className='bg-white flex flex-col w-96 h-full gap-4 shadow-2xl z-10 '>
        <SearchForm />
        {children}
        <SearchAgainButton />
      </div>
    </MapProvider>
  );
};

export default Container;
