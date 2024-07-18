'use client';

import PlaceFindWayInfo from '@/app/_component/place/PlaceFindWayInfo';
import { usePlaceStore } from '@/app/store/user';
import Image from 'next/image';
import Link from 'next/link';

export interface pageProps {}

const PlaceDetailPage = ({ params }: { params: { placeId: string } }) => {
  const placeId = params.placeId;

  const { place } = usePlaceStore();

  if (!place) return null;

  // 데이터 추출
  const { reviews } = place;

  return (
    <>
      {/* 4. 리뷰 */}
      {reviews.length === 0 && (
        <div className='flex flex-col gap-4 bg-white px-4 py-5 text-sm'>
          <div className='mb-2 flex justify-between'>
            <span className='text-base font-semibold'>
              리뷰 <span className='text-gray-500'>{reviews.length}</span>
            </span>
            <Link href={`${placeId}/review/form`}>리뷰 쓰기</Link>
          </div>
        </div>
      )}
      {/* 5. 찾아가는 길 */}
      <PlaceFindWayInfo place={place} />
    </>
  );
};

export default PlaceDetailPage;
