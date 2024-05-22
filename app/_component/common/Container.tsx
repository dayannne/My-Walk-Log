'use client';

import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}
const Container = ({ children }: ContainerProps) => {
  return <div className='w-full h-full'>{children}</div>;
};

export default Container;
