'use client';

import React from 'react';

import { useMap } from '@/app/shared/contexts/Map';

import Link from 'next/link';
import Image from 'next/image';

import { useParams } from 'next/navigation';

const SearchResult = () => {
  const mapContext = useMap();

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
      <span className='text-base'>
        {parts.map((part, index) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <strong className='font-bold' key={index}>
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
    const categories = category.split(` > `);
    return (
      <span className='text-sm font-light text-gray-500'>
        {categories[categories.length - 1]}
      </span>
    );
  };

  return (
    <ul className='flex basis-full flex-col overflow-y-scroll border-t border-solid border-gray-200'>
      {mapContext?.places &&
        mapContext?.places?.map((place: any, index: number) => (
          <li
            key={place.id}
            className='hover:bg-hover relative border-b border-solid border-gray-200 p-6'
          >
            <button className='absolute right-4 top-6 w-6'>
              <Image
                className='w-full'
                src={
                  place.placeDetail.currentUserLiked
                    ? `/icons/icon-star-fill.svg`
                    : `/icons/icon-star.svg`
                }
                width={32}
                height={32}
                alt='별모양 버튼'
              />
            </button>
            <Link
              className='flex flex-col'
              href={`/place/search/${keyword}/detail/${place.id}`}
            >
              <div className='flex items-center gap-2'>
                <HighlightText
                  placeId={place.id}
                  text={place.placeName}
                  highlight={mapContext?.keyword}
                />
                <CategoryFilter category={place.categoryName}></CategoryFilter>
              </div>
              <span className='mb-2 mt-1 flex items-center gap-2 text-sm font-light text-gray-800'>
                <span>별점 {place.placeDetail.eval}</span>
                <span className='mb-[2px] text-gray-400'>|</span>
                <span>좋아요 {place.placeDetail.likedCount}</span>
                <span className='mb-[2px] text-gray-400'>|</span>
                <span>리뷰 수{place.reviews.length}</span>
              </span>
              <span className='text-sm'>{place.address}</span>
              {place.roadAdress && (
                <span className='text-sm text-gray-500'>
                  ({place.roadAdress})
                </span>
              )}
              <span className='tel'>{place.phone}</span>
            </Link>
          </li>
        ))}
    </ul>
  );
};

export default SearchResult;
