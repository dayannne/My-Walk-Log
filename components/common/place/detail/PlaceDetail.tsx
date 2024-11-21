'use client';

import { usePlaceMenuStore } from '@/store/client/place';
import DiaryList from '../../../diary/DiaryList';
import EmptyDiaries from '../../../diary/EmpryDiaries';
import EmptyReviews from '../../../review/EmptyReviews';
import ReviewList from '../../../review/ReviewList';
import PlaceAdditionalInfo from './PlaceAdditionalInfo';
import PlaceBasicInfo from './PlaceBasicInfo';
import PlaceDetailMenu from './PlaceDetailMenu';
import PlaceDiaryAlbum from './PlaceDiaryAlbum';
import PlaceFindWayInfo from './PlaceFindWayInfo';
import PleceReviewSummary from './PleceReviewSummary';
import { usePathname } from 'next/navigation';
import { IPlace } from '@/shared/types/place';

const PlaceDetail = ({
  placeId,
  placeDetail,
}: {
  placeId: string;
  placeDetail: IPlace;
}) => {
  const pathname = usePathname();
  const placeMenu = usePlaceMenuStore((state) => state.placeMenu);

  return (
    <>
      <div
        className={`z-10 flex h-full w-full flex-col gap-2 bg-[#f0f0f3] ${pathname.includes('detail') && 'overflow-y-scroll'} lg:overflow-y-scroll`}
      >
        <PlaceBasicInfo place={placeDetail} placeId={placeId} />
        <PlaceAdditionalInfo place={placeDetail} />
        <PlaceDetailMenu />
        {placeMenu === 0 && (
          <>
            <PlaceDiaryAlbum place={placeDetail} />
            <PleceReviewSummary place={placeDetail} />
            <PlaceFindWayInfo place={placeDetail} />
          </>
        )}
        {placeMenu === 1 && (
          <>
            {placeDetail?.reviews?.length === 0 ? (
              <EmptyReviews placeDetail={placeDetail} />
            ) : (
              <ReviewList reviews={placeDetail?.reviews} type='PLACE' />
            )}
          </>
        )}
        {placeMenu === 2 && (
          <>
            {placeDetail?.diaries?.length === 0 ? (
              <EmptyDiaries />
            ) : (
              <DiaryList diaries={placeDetail?.diaries} />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default PlaceDetail;
