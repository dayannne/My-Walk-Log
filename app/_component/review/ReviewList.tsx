'use client';

import { WALK_DURATIONS } from '@/app/shared/constant';
import { filterEntryFee } from '@/app/shared/function/filter';
import { formatDate, formatPlaceKeyword } from '@/app/shared/function/format';
import { useUserStore } from '@/app/store/client/user';
import { useReviewLike, useDeleteReview } from '@/app/store/server/review';
import { Carousel } from '@material-tailwind/react';
import Image from 'next/image';
import ConfirmModal from '../common/Modal/ConfirmModal';
import MenuModal from '../common/Modal/MenuModal';
import { usePathname } from 'next/navigation';
import { useModalStore } from '@/app/store/client/modal';

export interface ReviewListProps {
  reviews: any;
  type: 'PLACE' | 'PROFILE';
}

const ReviewList = ({ reviews, type }: ReviewListProps) => {
  const { user } = useUserStore();
  const pathname = usePathname().split('/');
  const { mutate: toggleLike } = useReviewLike();
  const { mutate: deleteReview } = useDeleteReview();
  const { openId, setOpenId, setOpenInfo } = useModalStore();

  const handleConfirm = (reviewId: number) => {
    deleteReview({ reviewId, userId: user?.id as number });
  };

  return (
    <>
      {reviews && (
        <ul className='bg-white'>
          {reviews.map((review: any) => (
            <li
              key={review.id}
              className='flex flex-col gap-3 border-b border-solid border-gray-200 p-4'
            >
              {type === 'PLACE' && (
                <div className='flex items-center gap-2'>
                  <Image
                    className='h-9 w-9 shrink-0 rounded-full object-cover'
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
                  {/* <div className='bg-hover text-olive-green shrink-0 rounded-lg px-3 py-1 text-xs font-medium'>
                  팔로우
                </div> */}
                </div>
              )}
              {review.reviewImages.length === 1 && (
                <Image
                  className='object-c aspect-video h-48 w-full rounded-xl object-cover object-center'
                  src={review.reviewImages[0]}
                  alt='리뷰 상세 사진'
                  width={300}
                  height={300}
                />
              )}
              {review.reviewImages.length > 1 && (
                <Carousel
                  className='aspect-video overflow-hidden rounded-xl'
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  navigation={({ setActiveIndex, activeIndex, length }) => (
                    <div className='z-1 absolute bottom-4 left-2/4 flex -translate-x-2/4 gap-2'>
                      {new Array(length).fill('').map((_, i) => (
                        <span
                          key={i}
                          className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                            activeIndex === i
                              ? 'w-8 bg-white'
                              : 'w-4 bg-white/50'
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
                <div className='flex items-center gap-1 text-xs'>
                  <span className='flex gap-1 text-gray-600'>
                    입장료
                    <span className='font-medium text-gray-600'>
                      {filterEntryFee(review.entryFee)}
                    </span>
                  </span>
                  <span className='mt-[2px] h-3 w-[1px] bg-gray-400'></span>
                  <span className='flex gap-1 text-gray-600'>
                    산책 시간
                    <span className='font-medium text-gray-600'>
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
                    formatPlaceKeyword(review.keywords).map(
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
                {pathname.includes('my') && (
                  <button
                    type='button'
                    className='border-olive-green bg-hover flex items-center rounded-lg border border-solid p-2'
                    onClick={() => setOpenInfo(review.placeId)}
                  >
                    <div className='flex basis-full items-center gap-2'>
                      <Image
                        src='/icons/icon-marker.svg'
                        alt='마커 이미지'
                        width={32}
                        height={32}
                      />
                      <div className='flex flex-col items-start'>
                        <span className='text-sm font-medium'>
                          {review.placeName}
                        </span>
                        <span className='text-xs text-gray-600'>
                          {review.placeAddress}
                        </span>
                      </div>
                    </div>
                    <Image
                      className='rotate-180'
                      src='/icons/icon-arrow-left(green).svg'
                      alt='바로가기'
                      width={24}
                      height={24}
                    />
                  </button>
                )}
              </div>

              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-1'>
                  <button
                    onClick={() =>
                      toggleLike({
                        reviewId: review.id,
                        userId: user?.id as number,
                      })
                    }
                  >
                    <Image
                      src={
                        review.likedBy.some((id: number) => id === user?.id) ===
                        true
                          ? '/icons/icon-heart-fill.svg'
                          : '/icons/icon-heart.svg'
                      }
                      alt='리뷰 이미지'
                      width={24}
                      height={24}
                    />
                  </button>
                  <span className='text-sm'>{review.likedBy.length}</span>
                </div>

                {user?.id && user?.id === review.authorId && (
                  <MenuModal
                    firstMenu='리뷰 삭제하기'
                    firstMenuClose={() => setOpenId(review.id)}
                  />
                )}
              </div>
            </li>
          ))}
          <ConfirmModal
            description='정말로 삭제하시겠습니까?'
            onConfirm={() => handleConfirm(openId as number)}
            open={Boolean(openId)}
            handleClose={() => setOpenId(null)}
          />
        </ul>
      )}
    </>
  );
};

export default ReviewList;
