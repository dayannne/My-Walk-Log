'use client';

import React, { useEffect } from 'react';

import { useMap } from '@/shared/contexts/Map';

import { useParams, useSearchParams } from 'next/navigation';
import HighlightText from '../../../HighlightText';
import useSearchPlaces from '@/hooks/useSearchPlaces';
import { SearchType } from '@/shared/types/map';
import { useRefreshStore } from '@/store/client/refresh';
import { useModalStore } from '@/store/client/modal';
import Image from 'next/image';
import Loading from '../../Loading';

const SearchResult = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get('type') || 'SEARCH';
  const mapContext = useMap();
  const keyword = decodeURIComponent(useParams().keyword as string);
  const refreshKey = useRefreshStore((state) => state.refreshKey);
  const setOpenInfo = useModalStore((state) => state.setOpenInfo);
  const { searchPlaces, places, isLoading } = useSearchPlaces();

  useEffect(() => {
    const hasMapData = mapContext?.mapData;

    if (hasMapData) {
      searchPlaces(keyword, type as SearchType);
    }
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
      {isLoading ? (
        <Loading isLoading={isLoading} />
      ) : places ? (
        places.length > 0 ? (
          <ul className='flex max-h-60 shrink-0 basis-full flex-col overflow-y-scroll border-t border-solid border-gray-200 bg-white lg:max-h-full'>
            {places &&
              places.map(
                (place: kakao.maps.services.PlacesSearchResultItem) => (
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
                ),
              )}
          </ul>
        ) : (
          <div className='flex h-full max-h-60 flex-col items-center justify-center gap-2 border-t border-solid border-gray-200 bg-white p-10 lg:max-h-full'>
            <Image
              className='h-12 w-12'
              src='/icons/icon-marker.svg'
              alt='미니 로고 이미지'
              width={120}
              height={120}
            />
            <span className='text-olive-green'>검색 결과가 없어요.</span>
          </div>
        )
      ) : (
        <></>
      )}
    </>
  );
};

export default SearchResult;
