'use client';

import React, { useEffect } from 'react';

import { useMap } from '@/app/shared/contexts/Map';

import { useParams, useSearchParams } from 'next/navigation';
import HighlightText from '../../common/HighlightText';
import useSearchPlaces from '@/app/_hooks/useSearchPlaces';
import { SearchType } from '@/app/shared/types/map';
import { useRefreshStore } from '@/app/store/client/refresh';
import { useModalStore } from '@/app/store/client/modal';

const SearchResult = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get('type') || 'SEARCH';
  const mapContext = useMap();
  const keyword = decodeURIComponent(useParams().keyword as string);
  const { refreshKey } = useRefreshStore();
  const { searchPlaces, places } = useSearchPlaces();
  const { setOpenInfo } = useModalStore();

  useEffect(() => {
    const hasMapData = mapContext?.mapData;

    if (hasMapData) {
      searchPlaces(keyword, type as SearchType);
    }
    // mapContext?.mapData 의존성 배열 추가 - 새로고침 시에도 검색 결과 불러옴
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword, mapContext?.mapData, type, refreshKey]);

  const CategoryFilter = ({ category }: { category: string }) => {
    const categories = category.split(' > ');
    return (
      <span className='break-all text-sm font-light text-gray-500'>
        {categories[categories.length - 1]}
      </span>
    );
  };

  return (
    <>
      <ul className='flex max-h-60 shrink-0 basis-full flex-col overflow-y-scroll border-t border-solid border-gray-200 bg-white lg:max-h-full'>
        {places &&
          places.map((place: any) => (
            <li
              key={place.id}
              className='hover:bg-hover flex items-start border-b border-solid border-gray-200 px-6 py-4 lg:py-6'
            >
              <button
                className='flex basis-full flex-col'
                onClick={() => setOpenInfo(place.id)}
              >
                <div className='items-center gap-1'>
                  <span className='mr-1 lg:text-base'>
                    <HighlightText
                      text={place.place_name}
                      highlight={keyword}
                    />
                  </span>
                  <CategoryFilter category={place.category_name} />
                </div>

                <span className='mt-2 text-xs lg:text-sm'>
                  <HighlightText
                    text={place.address_name}
                    highlight={keyword}
                  />
                </span>
                {place.road_address_name !== '' && (
                  <span className='text-xs text-gray-500'>
                    <HighlightText
                      text={place.road_address_name}
                      highlight={keyword}
                    />
                  </span>
                )}
              </button>
            </li>
          ))}
      </ul>
    </>
  );
};

export default SearchResult;
