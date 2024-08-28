'use client';

import PlaceDetail from '@/app/_component/place/PlaceDetail';

const PlaceDetailPage = ({ params }: { params: { placeId: string } }) => {
  const { placeId } = params;
  return (
    <>
      <PlaceDetail placeId={placeId} />
    </>
  );
};

export default PlaceDetailPage;
