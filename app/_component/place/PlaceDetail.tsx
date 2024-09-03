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

const PlaceDetail = ({ placeId }: { placeId: string }) => {
  const { data: place } = useSuspenseQuery({
    queryKey: ['place', placeId],
    queryFn: async () => {
      const response = await fetch(`/api/place/${placeId}`);
      return response.json();
    },
  });
  const { data: reviews } = useSuspenseQuery({
    queryKey: ['reviews', placeId],
    queryFn: async () => {
      const response = await fetch(`/api/place/${placeId}/review`);
      return response.json();
    },
  });
  const { data: diaries } = useSuspenseQuery({
    queryKey: ['diaries', placeId],
    queryFn: async () => {
      const response = await fetch(`/api/place/${placeId}/diary`);
      return response.json();
    },
  });

  const router = useRouter();
  const keyword = decodeURIComponent(useParams()?.keyword as string);
  const { placeMenu } = usePlaceMenuStore();
  const { screenSize } = useSmallScreenCheck();

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
          {reviews?.length === 0 ? (
            <EmptyReviews url={`${placeId}/review/form`} />
          ) : (
            <ReviewList reviews={reviews} type='PLACE' />
          )}
        </>
      )}
      {placeMenu === 2 && (
        <>
          {diaries?.length === 0 ? (
            <EmptyDiaries />
          ) : (
            <DiaryList diaries={diaries} />
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
