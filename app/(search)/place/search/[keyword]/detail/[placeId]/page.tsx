'use client';

import PlaceFindWayInfo from '@/app/_component/place/PlaceFindWayInfo';
import { IReview } from '@/app/shared/types/review';
import { usePlaceStore, useUserStore } from '@/app/store/client/user';
import Image from 'next/image';
import Link from 'next/link';

export interface pageProps {}

const PlaceDetailPage = ({ params }: { params: { placeId: string } }) => {
  const placeId = params.placeId;
  const { user } = useUserStore();

  const { place } = usePlaceStore();

  if (!place) return null;
  // 데이터 추출
  const { reviews } = place;

  return (
    <>
      {/* 4. 리뷰 */}
      {reviews.length > 0 && (
        <div className='flex flex-col gap-4 bg-white px-4 py-5 text-sm'>
          <div className='mb-2 flex justify-between'>
            <Link
              href={`${placeId}/review`}
              className='text-base font-semibold'
            >
              리뷰 <span className='text-gray-500'>{reviews.length}</span>
            </Link>
            {user &&
              !reviews.some(
                (review: IReview) => review.authorId === user.id,
              ) && (
                <Link
                  className='text-olive-green border-olive-green flex shrink-0 items-center justify-center gap-1 rounded-lg border border-solid px-2 py-1 text-xs shadow-md'
                  href={`${placeId}/review/form`}
                >
                  <Image
                    className=''
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
            {reviews.map((review: IReview) => (
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
      )}
      {/* 5. 찾아가는 길 */}
      <PlaceFindWayInfo place={place} />
    </>
  );
};

export default PlaceDetailPage;
