'use client';

import PlaceDetail from '@/components/common/place/detail/PlaceDetail';
import ReviewForm from '@/components/review/ReviewForm';
import { usePlaceDetailStore } from '@/store/client/place';

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
