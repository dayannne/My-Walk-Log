'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { usePlaceMenuStore } from '@/app/store/client/place';
import DiaryList from '../../diary/DiaryList';
import EmptyDiaries from '../../diary/EmpryDiaries';
import EmptyReviews from '../../review/EmptyReviews';
import ReviewList from '../../review/ReviewList';
import PlaceAdditionalInfo from './PlaceAdditionalInfo';
import PlaceBasicInfo from './PlaceBasicInfo';
import PlaceDetailMenu from './PlaceDetailMenu';
import PlaceDiaryAlbum from './PlaceDiaryAlbum';
import PlaceFindWayInfo from './PlaceFindWayInfo';
import PleceReviewSummary from './PleceReviewSummary';
import Image from 'next/image';
import { useGetPlace } from '@/app/store/server/place';
import { useModalStore } from '@/app/store/client/modal';
import { usePathname } from 'next/navigation';
import CloseButton from '../../common/Button/CloseButton';

const PlaceDetail = ({ placeId }: { placeId: string }) => {
  const pathname = usePathname();
  const { placeMenu } = usePlaceMenuStore();
  const queryOptions = useGetPlace(placeId);
  const { data: place } = useSuspenseQuery(queryOptions);

  // URL이 변경되거나 새로고침 시 openInfo를 null로 설정

  return (
    <div
      className={`z-10 flex h-full w-full flex-col gap-2 bg-[#f0f0f3] ${pathname.includes('detail') && 'overflow-y-scroll'} lg:overflow-y-scroll`}
    >
      <PlaceBasicInfo place={place} placeId={placeId} />
      <PlaceAdditionalInfo place={place} />
      <PlaceDetailMenu />
      {placeMenu === 0 && (
        <>
          <PlaceDiaryAlbum placeId={placeId} place={place} />
          <PleceReviewSummary place={place} />
          <PlaceFindWayInfo place={place} />
        </>
      )}
      {placeMenu === 1 && (
        <>
          {place?.reviews?.length === 0 ? (
            <EmptyReviews />
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
    </div>
  );
};

export default PlaceDetail;
