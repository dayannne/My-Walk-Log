'use client';

import PlaceDetail from '@/app/_component/place/PlaceDetail';
import useSmallScreenCheck from '@/app/_hooks/useSmallScreenCheck';
import { motion } from 'framer-motion';

import { useEffect, useState } from 'react';

const PlaceDetailPage = ({ params }: { params: { placeId: string } }) => {
  const { placeId } = params;
  const { screenSize } = useSmallScreenCheck();
  const [initialX, setInitialX] = useState<number>(
    screenSize <= 1023 ? 120 : -120,
  );

  useEffect(() => {
    setInitialX(screenSize <= 1023 ? 240 : -120);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenSize]);

  return (
    <>
      <motion.div
        className='sm-md:z-10 absolute top-0 h-full w-full overflow-y-scroll lg:-right-96 lg:-z-10 lg:w-96 lg:overflow-y-hidden lg:py-3 lg:pl-4'
        initial={{ x: initialX }}
        animate={{ x: 0 }}
        transition={{ ease: 'easeOut', duration: 0.5 }}
      >
        <div className='h-full w-full rounded-xl border-l border-solid border-gray-200 lg:overflow-hidden lg:shadow-2xl'>
          <PlaceDetail placeId={placeId} />
        </div>
      </motion.div>
    </>
  );
};

export default PlaceDetailPage;
