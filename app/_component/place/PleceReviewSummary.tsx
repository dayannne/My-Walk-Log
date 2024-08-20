'use client';

import Link from 'next/link';
import Image from 'next/image';
import { IReview } from '@/app/shared/types/review';
import { useUserStore } from '@/app/store/client/user';
import { WALK_DURATIONS } from '@/app/shared/constant';
import {
  filterEntryFee,
  filterPlaceKeywords,
} from '@/app/shared/function/filter';
import { formatDate } from '@/app/shared/function/format';
import { Carousel } from '@material-tailwind/react';
import { type } from 'os';
import { usePlaceMenuStore } from '@/app/store/client/place';
import { useState } from 'react';

interface PlaceReviewProps {
  placeId: string;
  place: any;
}

const PleceReviewSummary = ({ placeId, place }: PlaceReviewProps) => {
  const { user } = useUserStore();
  const { setPlaceMenu } = usePlaceMenuStore();
  const [flipped, setFlipped] = useState(true);

  const reviews = place?.reviews || [];

  if (reviews && reviews.length === 0) return null;

  return (
    <div className='flex flex-col gap-4 bg-white px-4 py-5 text-sm'>
      <div className='mb-2 flex justify-between'>
        <button
          value={1}
          className='text-base font-semibold'
          onClick={(e) => setPlaceMenu(parseInt(e.currentTarget.value))}
        >
          리뷰 <span className='text-gray-500'>{reviews?.length}</span>
        </button>
        {user &&
          reviews?.length > 0 &&
          !reviews?.some((review: any) => review.authorId === user.id) && (
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
      <ul className='pb-4'>
        {reviews.map((review: any, index: number) => (
          <>
            {index < 3 && (
              <li
                key={review.id}
                className={`flex items-start gap-3 border-solid border-gray-200 ${index !== reviews.length - 1 && 'border-b'}`}
              >
                <div className='basis-full'>
                  <div className='mb-2 flex items-center gap-2'>
                    <Image
                      className='w-8 shrink-0'
                      key={`user_${review.authorId}_profile_image`}
                      src={review.author.profileImage}
                      alt='프로필 이미지'
                      width={500}
                      height={500}
                    />
                    <div className='flex basis-full flex-col'>
                      <span className='text-sm font-semibold'>
                        {review.author.username}
                      </span>
                      <span className='text-xs text-gray-600'>
                        {`${formatDate(review.createdAt).year}년 ${
                          formatDate(review.createdAt).month
                        }월 ${formatDate(review.createdAt).day}일 (${
                          formatDate(review.createdAt).dayOfWeek
                        })`}
                      </span>
                    </div>
                  </div>
                  <div className='flex flex-col gap-2 text-sm'>
                    <button
                      className={`${flipped === true && 'text-overflow'}`}
                      onClick={() => {
                        setFlipped((prev) => !prev);
                      }}
                    >
                      <p className='text-left'>
                        {review.description
                          .split('\n')
                          .map((str: string, idx: number) => (
                            <>
                              {str}
                              <br />
                            </>
                          ))}
                      </p>
                    </button>
                    <div className='flex flex-wrap gap-1'>
                      {review.keywords.length > 0 && (
                        <>
                          <span className='bg-hover rounded-md p-1 text-xs'>
                            {filterPlaceKeywords(reviews[0].keywords)[0].value}
                          </span>
                          <span className='bg-hover rounded-md p-1 text-xs'>
                            + {review.keywords.length - 1}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                {review.reviewImages.length > 0 && (
                  <Image
                    className='object-c aspect-square h-24 w-auto rounded-xl object-cover object-center pt-2'
                    src={review.reviewImages[0]}
                    alt='일기 상세 사진'
                    width={300}
                    height={300}
                  />
                )}
              </li>
            )}
          </>
        ))}
      </ul>
      <div className='flex w-full items-center justify-center before:h-[1px] before:flex-1 before:bg-gray-200 before:content-[""] after:h-[1px] after:flex-1 after:bg-gray-200 after:content-[""]'>
        <button
          className='bg-hover text-olive-green flex items-center gap-1 rounded-full px-4 py-2 text-sm'
          value={1}
          onClick={(e) => setPlaceMenu(parseInt(e.currentTarget.value))}
        >
          장소 리뷰 더보기
          <Image
            className='w-4 rotate-180'
            src='/icons/icon-arrow-left(green).svg'
            alt='리뷰 더보기'
            width={24}
            height={24}
          />
        </button>
      </div>
    </div>
  );
};

export default PleceReviewSummary;
