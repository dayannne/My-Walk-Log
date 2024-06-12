'use client';

import SearchForm from '@/app/_component/search/SearchForm';
import SearchResult from '@/app/_component/search/SearchResult';
import { useSearchParams } from 'next/navigation';

export interface layoutProps {}

const SearchResultLayout = ({}: layoutProps) => {
  const searchParams = useSearchParams();

  return (
    <div>
      <SearchForm />
      <SearchResult />
    </div>
  );
};

export default SearchResultLayout;
