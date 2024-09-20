'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useEffect, useState } from 'react';
import { usePlaceMenuStore } from '@/app/store/client/place';
import useSmallScreenCheck from '@/app/_hooks/useSmallScreenCheck';
import DiaryList from '../diary/DiaryList';
import EmptyDiaries from '../diary/EmpryDiaries';
import EmptyReviews from '../review/EmptyReviews';
import ReviewList from '../review/ReviewList';
import PlaceAdditionalInfo from './PlaceAdditionalInfo';
import PlaceBasicInfo from './PlaceBasicInfo';
import PlaceDetailMenu from './PlaceDetailMenu';
import PlaceDiaryAlbum from './PlaceDiaryAlbum';
import PlaceFindWayInfo from './PlaceFindWayInfo';
import PleceReviewSummary from './PleceReviewSummary';
import Image from 'next/image';
import { useGetPlace } from '@/app/store/server/place';
import { motion } from 'framer-motion';
import { useModalStore } from '@/app/store/client/modal';

const PlaceDetail = ({ placeId }: { placeId: string }) => {
  const { placeMenu } = usePlaceMenuStore();
  const queryOptions = useGetPlace(placeId);
  const { data: place } = useSuspenseQuery(queryOptions);
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
        <div className='flex h-full w-full flex-col gap-2 bg-[#f0f0f3] lg:overflow-y-scroll'>
          <PlaceBasicInfo place={place} placeId={placeId} />
          <PlaceAdditionalInfo place={place} />
          <PlaceDetailMenu />
          {placeMenu === 0 && (
            <>
              <PlaceDiaryAlbum placeId={placeId} place={place} />
              <PleceReviewSummary placeId={placeId} place={place} />
              <PlaceFindWayInfo place={place} />
            </>
          )}
          {placeMenu === 1 && (
            <>
              {place?.reviews?.length === 0 ? (
                <EmptyReviews url={`${placeId}/review/form`} />
              ) : (
                <ReviewList reviews={place?.reviews} type='PLACE' />
              )}
            </>
          )}
          {placeMenu === 2 && (
            <>
              {place?.diaries?.length === 0 ? (
                <EmptyDiaries />
              ) : (
                <DiaryList diaries={place?.diaries} />
              )}
            </>
          )}
          <button
            className='hover:border-olive-green absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-r-lg lg:top-4'
            onClick={handleCloseButton}
          >
            <Image
              src='/icons/icon-cancel(white).svg'
              alt='취소 버튼'
              width={28}
              height={28}
            />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PlaceDetail;
