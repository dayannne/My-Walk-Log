'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import PlaceFindWayInfo from '@/app/_component/place/PlaceFindWayInfo';
import { useGetPlace } from '@/app/store/server/place';
import PlaceReview from '@/app/_component/place/PleceReview';
import { usePlaceStore } from '@/app/store/client/user';
import { useEffect } from 'react';

const PlaceDetailPage = ({ params }: { params: { placeId: string } }) => {
  const placeId = params.placeId;
  const { setPlace } = usePlaceStore();
  const queryOptions = useGetPlace(placeId);
  const { data: place } = useSuspenseQuery(queryOptions);

  useEffect(() => {
    if (place) {
      setPlace(place);
    }
  }, [place, setPlace]);

  return (
    <div className='flex flex-col gap-2'>
      {/* 4. 리뷰 */}
      <PlaceReview placeId={placeId} place={place} />
      {/* 5. 찾아가는 길 */}
      <PlaceFindWayInfo place={place} />
    </div>
  );
};

export default PlaceDetailPage;
