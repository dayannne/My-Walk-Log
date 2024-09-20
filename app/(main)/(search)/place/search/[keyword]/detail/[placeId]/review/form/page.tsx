'use client';

import ReviewForm from '@/app/_component/review/ReviewForm';

const ReviewFormPage = ({ params }: { params: { placeId: string } }) => {
  const { placeId } = params;

  return (
    <>
      <ReviewForm placeId={placeId} />
    </>
  );
};

export default ReviewFormPage;
