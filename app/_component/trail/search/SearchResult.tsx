'use client';

import useSearchTrail from '@/app/_hooks/useSearchTrail';
import { useGetTrail } from '@/app/store/server/trail';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import HighlightText from '../../common/HighlightText';
import { useModalStore } from '@/app/store/client/modal';
import TrailModal from '../TrailModal';

export interface SearchResultProps {}

const SearchResult = ({}: SearchResultProps) => {
  const keyword = decodeURIComponent(useParams().keyword as string);
  const queryOptions = useGetTrail(keyword);
  const { data: trails } = useSuspenseQuery(queryOptions);
  const { displayTrailMarkers } = useSearchTrail();
  const { openInfo, handleOpenInfo, handleCloseInfo } = useModalStore();

  useEffect(() => {
    if (trails && keyword) {
      console.log(trails, keyword);
      displayTrailMarkers(trails);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trails, keyword]);

  return (
    <>
      <ul className='flex max-h-60 shrink-0 flex-col overflow-y-scroll border-t border-solid border-gray-200 bg-white lg:max-h-full'>
        {trails?.map((trail: any) => (
          <li
            key={trail.ESNTL_ID}
            className='hover:bg-hover flex items-start border-b border-solid border-gray-200 px-6 py-4 lg:py-6'
          >
            <button
              className='flex basis-full flex-col'
              onClick={() => handleOpenInfo(trail)}
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
              <span className='mt-2 text-xs lg:text-sm'>
                <HighlightText text={trail.LNM_ADDR} highlight={keyword} />
              </span>
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
      {openInfo && <TrailModal />}
    </>
  );
};

export default SearchResult;
