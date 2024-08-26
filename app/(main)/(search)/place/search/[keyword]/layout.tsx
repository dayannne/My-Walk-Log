'use client';

import { useEffect, useRef } from 'react';
import useSearchPlaces from '@/app/_hooks/useSearchPlaces';
import { useParams, usePathname } from 'next/navigation';
import { useMap } from '@/app/shared/contexts/Map';
import SearchResult from '@/app/_component/search/SearchResult';

export interface layoutProps {
  children: React.ReactNode;
}

const SearchResultLayout = ({ children }: layoutProps) => {
  const mapContext = useMap();
  const { searchPlaces } = useSearchPlaces();
  const keyword = decodeURIComponent(useParams().keyword as string);
  const pathname = usePathname().split('/')[4];

  useEffect(() => {
    const isDetailPage = pathname === 'detail';
    const hasMapData = mapContext?.mapData;

    if (isDetailPage && hasMapData) {
      searchPlaces(keyword, 'SEARCH');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword, mapContext?.mapData, pathname]);

  return (
    <>
      <SearchResult />
      {children}
    </>
  );
};

export default SearchResultLayout;
