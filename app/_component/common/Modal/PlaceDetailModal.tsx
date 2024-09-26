'use client';

import { useEffect, useState } from 'react';
import { usePlaceDetailStore } from '@/app/store/client/place';
import useSmallScreenCheck from '@/app/_hooks/useSmallScreenCheck';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useModalStore } from '@/app/store/client/modal';
import ReviewForm from '../../review/ReviewForm';
import PlaceDetail from '../../place/detail/PlaceDetail';

const PlaceDetailModal = ({ placeId }: { placeId: string }) => {
  const { placeDetailState } = usePlaceDetailStore();
  const { screenSize } = useSmallScreenCheck();
  const { setOpenInfo } = useModalStore();
  const handleCloseButton = () => {
    setOpenInfo(null);
  };

  const [initialX, setInitialX] = useState<number>(
    screenSize <= 1023 ? 120 : -120,
  );

  useEffect(() => {
    setInitialX(screenSize <= 1023 ? 240 : -120);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenSize]);

  // URL이 변경되거나 새로고침 시 openInfo를 null로 설정

  return (
    <motion.div
      className='sm-md:z-10 absolute top-0 h-full w-full overflow-y-scroll lg:-right-96 lg:-z-10 lg:w-96 lg:overflow-y-hidden lg:py-3 lg:pl-4'
      initial={{ x: initialX }}
      animate={{ x: 0 }}
      transition={{ ease: 'easeOut', duration: 0.5 }}
    >
      <div className='h-full w-full rounded-xl border-l border-solid border-gray-200 lg:overflow-hidden lg:shadow-2xl'>
        {placeDetailState === 0 && <PlaceDetail placeId={placeId} />}
        {placeDetailState === 1 && <ReviewForm placeId={placeId} />}
      </div>
    </motion.div>
  );
};

export default PlaceDetailModal;
