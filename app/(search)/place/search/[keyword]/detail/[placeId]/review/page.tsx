'use client';

import {
  useCreateReviewLike,
  useDeleteReviewLike,
  useGetReviews,
} from '@/app/store/server/review';
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { Carousel } from '@material-tailwind/react';
import Image from 'next/image';
import { formatDate } from '@/app/shared/function/format';
import {
  filterEntryFee,
  filterPlaceKeywords,
} from '@/app/shared/function/filter';
import { WALK_DURATIONS } from '@/app/shared/constant';
import { useUserStore } from '@/app/store/client/user';
import EmptyReviews from '@/app/_component/review/EmptyReviews';

export interface pageProps {}

const PlaceReviewPage = ({ params }: { params: { placeId: string } }) => {
  const { placeId } = params;
  const { user } = useUserStore();
  const queryClient = useQueryClient();
  const queryOptions = useGetReviews(placeId);
  const { data: reviews } = useSuspenseQuery(queryOptions);
  const { mutate: createLike } = useCreateReviewLike();
  const { mutate: deleteLike } = useDeleteReviewLike();

  if (!reviews) return null;

  if (reviews.length === 0) return <EmptyReviews placeId={placeId} />;

  return (
    <div className='bg-white'>
      <ul>
        {reviews.map((review: any) => (
          <li key={review.id} className='flex flex-col gap-3 p-3'>
            <div className='flex items-center gap-2'>
              <Image
                className='w-9 shrink-0'
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
                  리뷰 {review.author.reviews.length}
                </span>
              </div>
              <div className='bg-hover text-olive-green shrink-0 rounded-lg px-3 py-1 text-xs font-medium'>
                팔로우
              </div>
            </div>

            {review.reviewImages.length > 0 && (
              <Carousel
                className='h-48 overflow-hidden rounded-xl'
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                navigation={({ setActiveIndex, activeIndex, length }) => (
                  <div className='absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2'>
                    {new Array(length).fill('').map((_, i) => (
                      <span
                        key={i}
                        className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                          activeIndex === i ? 'w-8 bg-white' : 'w-4 bg-white/50'
                        }`}
                        onClick={() => setActiveIndex(i)}
                      />
                    ))}
                  </div>
                )}
              >
                {review.reviewImages.map((image: string, idx: number) => (
                  <Image
                    className='h-full w-full object-cover object-center'
                    key={idx}
                    src={image}
                    alt='리뷰 이미지'
                    width={500}
                    height={500}
                  />
                ))}
              </Carousel>
            )}

            <div className='flex flex-col gap-2 text-sm'>
              <div className='flex items-center gap-1 text-xs text-gray-600'>
                <span className='flex gap-1'>
                  입장료
                  <span className='font-medium'>
                    {filterEntryFee(review.entryFee)}
                  </span>
                </span>
                <span className='mt-[2px] h-3 w-[1px] bg-gray-400'></span>
                <span className='flex gap-1'>
                  산책 시간
                  <span className='font-medium'>
                    {WALK_DURATIONS[review.walkDuration as number]}
                  </span>
                </span>
              </div>
              <div>
                {review.description
                  .split('\n')
                  .map((str: string, idx: number) => (
                    <p key={idx}>{str}</p>
                  ))}
              </div>
              <div className='flex flex-wrap gap-1'>
                {review.keywords.length > 0 &&
                  filterPlaceKeywords(review.keywords).map(
                    ({ key, value }: { key: number; value: string }) => (
                      <span
                        className='bg-hover rounded-md p-1 text-xs'
                        key={key}
                      >
                        {value}
                      </span>
                    ),
                  )}
              </div>
            </div>

            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-1'>
                <button
                  onClick={() =>
                    review.likedBy.some((id: number) => id === user?.id) ===
                    true
                      ? deleteLike({
                          reviewId: review.id,
                          userId: user?.id as number,
                        })
                      : createLike({
                          reviewId: review.id,
                          userId: user?.id as number,
                        })
                  }
                >
                  <Image
                    className='w-6'
                    src={
                      review.likedBy.some((id: number) => id === user?.id) ===
                      true
                        ? '/icons/icon-heart-fill.svg'
                        : '/icons/icon-heart.svg'
                    }
                    alt='리뷰 이미지'
                    width={32}
                    height={32}
                  />
                </button>
                <span className='text-sm'>좋아요</span>
              </div>

              <span className='text-xs text-gray-600'>
                {formatDate(review.createdAt)}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaceReviewPage;
