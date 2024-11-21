'use client';

import useSearchTrail from '@/hooks/useSearchTrail';
import { useGetTrail } from '@/store/server/trail';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import HighlightText from '../../HighlightText';
import { useModalStore } from '@/store/client/modal';
import TrailModal from '../TrailModal';
import { useMap } from '@/shared/contexts/Map';
import { ITrail } from '@/shared/types/trail';
import Image from 'next/image';
import Loading from '@/components/common/Loading';

export interface SearchResultProps {}

const SearchResult = ({}: SearchResultProps) => {
  const mapContext = useMap();
  const keyword = decodeURIComponent(useParams().keyword as string);
  const queryOptions = useGetTrail(keyword);
  const { data: trails, isLoading } = useSuspenseQuery(queryOptions);
  const { displayTrailMarkers } = useSearchTrail();
  const openInfo = useModalStore((state) => state.openInfo);
  const handleOpenInfo = useModalStore((state) => state.handleOpenInfo);

  // 산책로 마커
  useEffect(() => {
    const hasMapData = mapContext?.mapData;
    if (hasMapData && trails && keyword) {
      if (trails.length > 0) displayTrailMarkers(trails);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapContext?.mapData, trails, keyword]);

  return (
    <>
      {isLoading ? (
        <Loading isLoading={isLoading} />
      ) : (
        <>
          {trails && trails.length > 0 ? (
            <ul className='flex max-h-60 shrink-0 flex-col overflow-y-scroll border-t border-solid border-gray-200 bg-white lg:max-h-full'>
              {trails?.map((trail: ITrail) => (
                <li
                  key={trail.ESNTL_ID}
                  className='hover:bg-hover flex items-start border-b border-solid border-gray-200 px-6 py-4 lg:py-6'
                >
                  <button
                    className='flex basis-full flex-col'
                    onClick={() => {
                      const position = new kakao.maps.LatLng(
                        parseFloat(trail.COURS_SPOT_LA as string),
                        parseFloat(trail.COURS_SPOT_LO as string),
                      );
                      mapContext?.mapData?.panTo(position);
                      handleOpenInfo(trail);
                    }}
                  >
                    <div className='items-center gap-1'>
                      <span className='mr-1 lg:text-base'>
                        [
                        <HighlightText
                          text={trail.WLK_COURS_FLAG_NM}
                          highlight={keyword}
                        />
                        ]
                      </span>
                      {trail.WLK_COURS_NM}
                    </div>
                    {trail.LNM_ADDR && (
                      <span className='mt-2 text-xs lg:text-sm'>
                        <HighlightText
                          text={trail.LNM_ADDR}
                          highlight={keyword}
                        />
                      </span>
                    )}
                    {/* 난이도 / 거리 / 소요시간 */}
                    <div className='mt-2 flex items-center gap-1 text-xs font-light text-gray-800'>
                      <span>{trail.COURS_LEVEL_NM}</span>
                      <span className='mb-[2px] text-gray-400'>|</span>

                      <span>{trail.COURS_LT_CN}</span>
                      <span className='mb-[2px] text-gray-400'>|</span>

                      <span>{trail.COURS_TIME_CN}</span>
                    </div>
                  </button>
                </li>
              ))}
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
          )}
          {openInfo && <TrailModal />}
        </>
      )}
    </>
  );
};

export default SearchResult;
