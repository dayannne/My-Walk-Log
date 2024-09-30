'use client';

import PlaceDetail from '@/app/_component/place/detail/PlaceDetail';
import ReviewForm from '@/app/_component/review/ReviewForm';
import { usePlaceDetailStore } from '@/app/store/client/place';

const PlaceDetailPage = ({ params }: { params: { placeId: string } }) => {
  const { placeId } = params;
  const { placeDetailState } = usePlaceDetailStore();

  return (
    <>
      {placeDetailState === 0 && <PlaceDetail placeId={placeId} />}
      {placeDetailState === 1 && <ReviewForm placeId={placeId} />}
    </>
  );
};

export default PlaceDetailPage;
