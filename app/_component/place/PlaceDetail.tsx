import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { useParams, useRouter } from 'next/navigation';
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

const PlaceDetail = ({ place, placeId }: { place: any; placeId: string }) => {
  const router = useRouter();
  const keyword = decodeURIComponent(useParams()?.keyword as string);
  const { placeMenu } = usePlaceMenuStore();

  const handleCloseButton = () => {
    router.push(`/place/search/${keyword}`);
  };

  return (
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
  );
};

export default PlaceDetail;
