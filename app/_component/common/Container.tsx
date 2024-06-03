'use client';

import { ReactNode } from 'react';
import MapProvider from './Map';
import SearchLayout from '../search/SearchLayout';

interface ContainerProps {
  children: ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return (
    <MapProvider>
      <SearchLayout>{children}</SearchLayout>
    </MapProvider>
  );
};

export default Container;
