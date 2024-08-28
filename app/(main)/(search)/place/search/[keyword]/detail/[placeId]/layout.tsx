'use client';

import PlaceDetail from '@/app/_component/place/PlaceDetail';
import useSmallScreenCheck from '@/app/_hooks/useSmallScreenCheck';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export interface PlaceDetailLayoutProps {
  children: React.ReactNode;
}

const PlaceDetailLayout = ({ children }: PlaceDetailLayoutProps) => {
  const { screenSize } = useSmallScreenCheck();
  const [initialX, setInitialX] = useState<number>(
    screenSize <= 1023 ? 120 : -120,
  );

  useEffect(() => {
    setInitialX(screenSize <= 1023 ? 240 : -120);
  }, [screenSize]);

  return (
    <motion.div
      //   className='relative top-0 h-full w-full overflow-y-hidden lg:absolute lg:left-0 lg:max-w-96 lg:overflow-auto lg:py-3 lg:pl-3'
      className='absolute top-0 z-20 h-full w-full overflow-y-scroll lg:absolute lg:-right-96 lg:-z-10 lg:w-96 lg:overflow-y-hidden lg:py-3 lg:pl-4'
      initial={{ x: initialX }}
      animate={{ x: 0 }}
      transition={{ ease: 'easeOut', duration: 0.5 }}
    >
      <div className='h-full w-full rounded-xl border-l border-solid border-gray-200 lg:overflow-hidden lg:shadow-2xl'>
        {children}
      </div>
    </motion.div>
  );
};

export default PlaceDetailLayout;
