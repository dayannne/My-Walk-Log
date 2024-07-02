'use client';

import Container from '@/app/_component/common/Container';
import SearchForm from '@/app/_component/search/SearchForm';
import { useSearchParams } from 'next/navigation';

export interface layoutProps {
  children: React.ReactNode;
}

const SearchResultLayout = ({ children }: layoutProps) => {
  return (
    <Container>
      <SearchForm />
      {children}
    </Container>
  );
};

export default SearchResultLayout;
