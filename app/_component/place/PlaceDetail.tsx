'use client';

import PlaceDetailMenu from '@/app/_component/place/PlaceDetailMenu';
import PlaceAdditionalInfo from '@/app/_component/place/PlaceAdditionalInfo';
import PlaceBasicInfo from '@/app/_component/place/PlaceBasicInfo';

import { usePlaceMenuStore } from '@/app/store/client/place';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useParams, usePathname, useRouter } from 'next/navigation';

import { useGetDiary } from '@/app/store/server/diary';
import { useGetPlace } from '@/app/store/server/place';
import { useGetReviews } from '@/app/store/server/review';
import { useSuspenseQuery } from '@tanstack/react-query';
import DiaryList from '@/app/_component/diary/DiaryList';
import EmptyDiaries from '@/app/_component/diary/EmpryDiaries';
import PlaceDiaryAlbum from '@/app/_component/place/PlaceDiaryAlbum';
import PlaceFindWayInfo from '@/app/_component/place/PlaceFindWayInfo';
import PleceReviewSummary from '@/app/_component/place/PleceReviewSummary';
import EmptyReviews from '@/app/_component/review/EmptyReviews';
import ReviewList from '@/app/_component/review/ReviewList';
import useSmallScreenCheck from '@/app/_hooks/useSmallScreenCheck';
import { useState, useEffect } from 'react';
import ReviewForm from '../review/ReviewForm';

const PlaceDetail = ({ placeId }: { placeId: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const keyword = decodeURIComponent(useParams()?.keyword as string);
  const { placeMenu } = usePlaceMenuStore();
  const { screenSize } = useSmallScreenCheck();
  const placeQueryOptions = useGetPlace(placeId);
  const reviewQueryOptions = useGetReviews(placeId);
  const diaryQueryOptions = useGetDiary(placeId);
  const { data: place } = useSuspenseQuery(placeQueryOptions);
  const { data: reviews } = useSuspenseQuery(reviewQueryOptions);
  const { data: diaries } = useSuspenseQuery(diaryQueryOptions);

  const [initialX, setInitialX] = useState<number>(
    screenSize <= 1023 ? 120 : -120,
  );

  const handleCloseButton = () => {
    router.push(`/place/search/${keyword}`);
  };

  useEffect(() => {
    setInitialX(screenSize <= 1023 ? 240 : -240);
  }, [screenSize]);

  return (
    <>
      <div className='flex h-full w-full flex-col gap-2 bg-[#f0f0f3] lg:overflow-y-scroll'>
        {/* 1. 장소 이미지 & 기본 정보 */}
        <PlaceBasicInfo place={place} placeId={placeId} />
        {/* 2. 장소 추가 정보 */}
        <PlaceAdditionalInfo place={place} />
        {/* 3. 네비게이션 메뉴 */}
        <PlaceDetailMenu />
        {/* 정보 */}
        {placeMenu === 0 && (
          <>
            {/* 4. 일기 */}
            <PlaceDiaryAlbum placeId={placeId} place={place} />
            {/* 5. 리뷰 */}
            <PleceReviewSummary placeId={placeId} place={place} />
            {/* 6. 찾아가는 길 */}
            <PlaceFindWayInfo place={place} />
          </>
        )}
        {/* 리뷰 */}
        {placeMenu === 1 && (
          <>
            {reviews?.length === 0 ? (
              <EmptyReviews url={`${placeId}/review/form`} />
            ) : (
              <ReviewList reviews={reviews} type='PLACE' />
            )}
          </>
        )}
        {/* 일기 */}
        {placeMenu === 2 && (
          <>
            {diaries?.length === 0 ? (
              <EmptyDiaries />
            ) : (
              <DiaryList diaries={diaries} />
            )}
          </>
        )}
        {/* 상세페이지 닫기 버튼 */}
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
    </>
  );
};

export default PlaceDetail;
