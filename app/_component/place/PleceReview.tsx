'use client';

import Link from 'next/link';
import Image from 'next/image';
import { IReview } from '@/app/shared/types/review';
import { useUserStore } from '@/app/store/client/user';

interface PlaceReviewProps {
  placeId: string;
  place: any;
}

const PlaceReview = ({ placeId, place }: PlaceReviewProps) => {
  const { user } = useUserStore();

  const reviews = place?.reviews || [];

  if (reviews && reviews.length === 0) return null;

  return (
    <div className='flex flex-col gap-4 bg-white px-4 py-5 text-sm'>
      <div className='mb-2 flex justify-between'>
        <Link href={`${placeId}/review`} className='text-base font-semibold'>
          리뷰 <span className='text-gray-500'>{reviews?.length}</span>
        </Link>
        {user &&
          reviews?.length > 0 &&
          !reviews?.some((review: IReview) => review.authorId === user.id) && (
            <Link
              className='text-olive-green border-olive-green flex shrink-0 items-center justify-center gap-1 rounded-lg border border-solid px-2 py-1 text-xs shadow-md'
              href={`${placeId}/review/form`}
            >
              <Image
                src='/icons/icon-pencil.svg'
                width={16}
                height={16}
                alt='리뷰 쓰기 아이콘'
              />
              리뷰 쓰기
            </Link>
          )}
      </div>
      <div className='grid grid-cols-3 gap-3'>
        {reviews?.map((review: IReview) => (
          <Link href={`${placeId}/review`} key={review.id}>
            <Image
              className='aspect-square w-full rounded-sm object-cover object-center'
              src={review.reviewImages[0]}
              width={100}
              height={100}
              alt='리뷰 사진'
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PlaceReview;
