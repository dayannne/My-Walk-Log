'use client';

import ClientOnly from './_component/common/ClientOnly';
import { useMap } from './_component/common/Map';
import SearchAgainButton from './_component/common/SearchAgainButton';
import Search from './_component/search/SearchForm';
import SearchResult from './_component/search/SearchResult';
import useSearchPlaces from './_hooks/useSearchPlaces';

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
      <Search onSearch={onSearch} />
      <SearchResult />
      <SearchAgainButton onSearch={onSearch} />
    </ClientOnly>
  );
}
