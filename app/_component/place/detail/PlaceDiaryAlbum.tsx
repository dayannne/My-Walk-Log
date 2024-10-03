'use client';

import Image from 'next/image';
import { usePlaceMenuStore } from '@/app/store/client/place';

interface PlaceDiaryAlbumProps {
  place: any;
}

const PlaceDiaryAlbum = ({ place }: PlaceDiaryAlbumProps) => {
  const { setPlaceMenu } = usePlaceMenuStore();

  const diaries = place?.diaries || [];

  if (diaries && diaries.length === 0) return null;

  return (
    <div className='flex flex-col gap-4 bg-white px-4 py-5 text-sm'>
      <div className='mb-2 flex justify-between'>
        <button
          value={2}
          className='text-base font-semibold'
          onClick={(e) => setPlaceMenu(parseInt(e.currentTarget.value))}
        >
          일기 <span className='text-gray-500'>{diaries?.length}</span>
        </button>
      </div>
      <div className='grid grid-cols-3 gap-3'>
        {diaries?.map((diary: any) => (
          <button
            className='relative'
            key={diary.id}
            value={2}
            onClick={(e) => setPlaceMenu(parseInt(e.currentTarget.value))}
          >
            <Image
              className='aspect-square h-auto w-full rounded-md object-cover object-center'
              src={diary.diaryImages[0]}
              width={100}
              height={100}
              alt='리뷰 사진'
            />
            {diary.diaryImages.length > 1 && (
              <Image
                className='absolute right-1 top-1'
                src='/icons/icon-album.svg'
                width={24}
                height={24}
                alt='리뷰 사진'
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PlaceDiaryAlbum;
