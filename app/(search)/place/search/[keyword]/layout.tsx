'use client';

import { useEffect } from 'react';
import useSearchPlaces from '@/app/_hooks/useSearchPlaces';
import { useParams } from 'next/navigation';
import { useMap } from '@/app/shared/contexts/Map';
import SearchResult from '@/app/_component/search/SearchResult';

export interface layoutProps {
  children: React.ReactNode;
}

const SearchResultLayout = ({ children }: layoutProps) => {
  const mapContext = useMap();
  const { searchPlaces } = useSearchPlaces();
  const keyword = decodeURIComponent(useParams().keyword as string);

  useEffect(() => {
    if (mapContext?.mapData && keyword) {
      mapContext.setKeyword(keyword as string);
      searchPlaces(keyword as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword, mapContext?.mapData]);

  return (
    <>
      <SearchResult />
      {children}
    </>
  );
};

export default SearchResultLayout;
