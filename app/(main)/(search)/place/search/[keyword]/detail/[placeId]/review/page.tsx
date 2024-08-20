'use client';

import { useGetReviews } from '@/app/store/server/review';
import { useSuspenseQuery } from '@tanstack/react-query';
import EmptyReviews from '@/app/_component/review/EmptyReviews';
import ReviewList from '@/app/_component/review/ReviewList';

export interface pageProps {}

const PlaceReviewPage = ({ params }: { params: { placeId: string } }) => {
  const { placeId } = params;
  const queryOptions = useGetReviews(placeId);
  const { data: reviews } = useSuspenseQuery(queryOptions);

  if (!reviews) return null;

  if (reviews.length === 0) return <EmptyReviews placeId={placeId} />;

  return (
    <div className='bg-white'>
      <ReviewList reviews={reviews} type='PLACE' />
    </div>
  );
};

export default PlaceReviewPage;
