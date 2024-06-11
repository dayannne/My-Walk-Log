'use client';

import { useMap } from './shared/contexts/Map';
import useSearchPlaces from './_hooks/useSearchPlaces';
import ClientOnly from './_component/common/ClientOnly';
import SearchResult from './_component/search/SearchResult';

export default function Home() {
  const isEmpty = false;
  const mapContext = useMap();
  const { searchPlaces } = useSearchPlaces();

  const onSearch = (keyword: string) => {
    mapContext?.setKeyword(keyword);
    searchPlaces(keyword);
  };

  if (isEmpty) {
  }
  return (
    <ClientOnly>
      <SearchResult />
    </ClientOnly>
  );
}
