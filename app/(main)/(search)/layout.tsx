'use client';

import Container from '@/app/_component/common/Container';
import SearchForm from '@/app/_component/search/SearchForm';

export interface layoutProps {
  children: React.ReactNode;
}

const SearchResultLayout = ({ children }: layoutProps) => {
  return (
    <>
      <SearchForm />
      {children}
    </>
  );
};

export default SearchResultLayout;
