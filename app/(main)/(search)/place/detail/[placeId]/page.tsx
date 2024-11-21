'use client';

import Loading from '@/components/common/Loading';
import PlaceDetail from '@/components/common/place/detail/PlaceDetail';
import ReviewForm from '@/components/review/ReviewForm';
import { usePlaceDetailStore } from '@/store/client/place';
import { useGetPlace } from '@/store/server/place';
import { useSuspenseQuery } from '@tanstack/react-query';

const PlaceDetailPage = ({ params }: { params: { placeId: string } }) => {
  const { placeId } = params;
  const placeDetailState = usePlaceDetailStore(
    (state) => state.placeDetailState,
  );
  const queryOptions = useGetPlace(placeId);

  const { data: placeDetail, isLoading } = useSuspenseQuery(queryOptions);

  return (
    <>
      {isLoading ? (
        <Loading isLoading />
      ) : (
        <>
          {placeDetailState === 0 && (
            <PlaceDetail placeId={placeId} placeDetail={placeDetail} />
          )}
          {placeDetailState === 1 && <ReviewForm placeId={placeId} />}
        </>
      )}
    </>
  );
};

export default PlaceDetailPage;
