'use client';

import Container from '@/app/_component/common/Container';
import SearchForm from '@/app/_component/search/SearchForm';
import SearchResult from '@/app/_component/search/SearchResult';
import { useSearchParams } from 'next/navigation';

export interface layoutProps {}

const SearchResultLayout = ({}: layoutProps) => {
  const searchParams = useSearchParams();

  return (
    <Container>
      <SearchForm />
      <SearchResult />
    </Container>
  );
};

export default SearchResultLayout;
