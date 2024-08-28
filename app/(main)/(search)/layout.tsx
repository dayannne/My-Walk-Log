'use client';

import SearchForm from '@/app/_component/search/SearchForm';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/app/_component/common/Header';

export interface layoutProps {
  children: React.ReactNode;
}

const SearchResultLayout = ({ children }: layoutProps) => {
  return (
    <>
      <Header title='산책 장소 찾기' />
      <SearchForm />
      {children}
    </>
  );
};

export default SearchResultLayout;
