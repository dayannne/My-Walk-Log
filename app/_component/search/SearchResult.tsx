'use client';

import React from 'react';

import { useMap } from '@/app/shared/contexts/Map';

import Link from 'next/link';
import Image from 'next/image';

import { useParams } from 'next/navigation';
import { useUserStore } from '@/app/store/client/user';

const SearchResult = () => {
  const mapContext = useMap();
  const { user } = useUserStore();
  const keyword = decodeURIComponent(useParams().keyword as string);

  const HighlightText = ({
    placeId,
    text,
    highlight,
  }: {
    placeId: string;
    text: string;
    highlight: string;
  }) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));

    return (
      <span className='mr-1 lg:text-base'>
        {parts.map((part, index) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <strong className='font-bold' key={`${placeId}-${index}`}>
              {part}
            </strong>
          ) : (
            part
          ),
        )}
      </span>
    );
  };

  const CategoryFilter = ({ category }: { category: string }) => {
    const categories = category.split(' > ');
    return (
      <span className='break-all text-sm font-light text-gray-500'>
        {categories[categories.length - 1]}
      </span>
    );
  };

  return (
    <ul className='flex max-h-60 shrink-0 flex-col overflow-y-scroll border-t border-solid border-gray-200 bg-white lg:max-h-full'>
      {mapContext?.places &&
        mapContext?.places.map((place: any) => (
          <li
            key={place.id}
            className='hover:bg-hover flex items-start border-b border-solid border-gray-200 px-6 py-4 lg:py-6'
          >
            <Link
              className='flex basis-full flex-col'
              href={`/place/search/${keyword}/detail/${place.id}`}
            >
              <div className='max-w-60 items-center gap-1'>
                <HighlightText
                  placeId={place.id}
                  text={place.placeName}
                  highlight={keyword}
                />
                <CategoryFilter category={place.categoryName} />
              </div>
              <span className='mb-2 mt-1 flex items-center gap-2 text-xs font-light text-gray-800 lg:text-sm'>
                <span>찜 {place.placeDetail.likedBy.length}</span>
                <span className='mb-[2px] text-gray-400'>|</span>
                <span>리뷰 수 {place.reviews.length}</span>
                <span className='mb-[2px] text-gray-400'>|</span>
                <span>일기 수 {place.diaries.length}</span>
              </span>
              <span className='text-xs lg:text-sm'>{place.address}</span>
              {place.roadAdress && (
                <span className='text-sm text-gray-500'>
                  ({place.roadAdress})
                </span>
              )}
              <span className='tel'>{place.phone}</span>
            </Link>
            {user?.id && (
              <div className='w-5'>
                <Image
                  className='w-full'
                  src={
                    place.placeDetail.likedBy.includes(user?.id)
                      ? '/icons/icon-star-fill.svg'
                      : '/icons/icon-star.svg'
                  }
                  width={32}
                  height={32}
                  alt='별모양 버튼'
                />
              </div>
            )}
          </li>
        ))}
    </ul>
  );
};

export default SearchResult;
