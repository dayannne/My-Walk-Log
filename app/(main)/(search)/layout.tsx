'use client';

import Container from '@/app/_component/common/Container';
import SearchForm from '@/app/_component/search/SearchForm';

export interface layoutProps {
  children: React.ReactNode;
}

const SearchResultLayout = ({ children }: layoutProps) => {
  return (
    <>
      <div className='text-olive-green flex items-center gap-2 bg-white p-4 shadow-sm'>
        산책 장소 찾기
      </div>
      <SearchForm />
      {children}
    </>
  );
};

export default SearchResultLayout;
