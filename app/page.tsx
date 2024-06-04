'use client';

import ClientOnly from './_component/common/ClientOnly';
import { useMap } from './_component/common/Map';
import Search from './_component/search/SearchForm';
import SearchResult from './_component/search/SearchResult';

export default function Home() {
  const isEmpty = false;
  const mapContext = useMap();

  const onSearch = (keyword: string) => {
    mapContext?.setKeyword(keyword);
    mapContext?.setPrevKeyword(keyword);
  };

  if (isEmpty) {
  }
  return (
    <ClientOnly>
      <Search onSearch={onSearch} />
      <SearchResult />
    </ClientOnly>
  );
}
