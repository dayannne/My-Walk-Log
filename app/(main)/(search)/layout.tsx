'use client';

import SearchForm from '@/app/_component/search/SearchForm';
import Header from '@/app/_component/common/Header';
import { usePathname } from 'next/navigation';

export interface layoutProps {
  children: React.ReactNode;
}

const SearchResultLayout = ({ children }: layoutProps) => {
  const pathname = usePathname();
  return (
    <>
      <div
        className={`sm-md:overflow-y-hidden relative z-20 flex w-full shrink-0 flex-col ${pathname.includes('detail') && 'basis-full'} bg-white lg:flex lg:w-96 lg:min-w-96 lg:basis-auto`}
      >
        <Header title='산책 장소 찾기' />
        <SearchForm />

        {children}
      </div>
    </>
  );
};

export default SearchResultLayout;
