'use client';

import { useModalStore } from '@/app/store/client/modal';

export interface layoutProps {
  children: React.ReactNode;
}

const SearchResultLayout = ({ children }: layoutProps) => {
  const { openInfo } = useModalStore();
  return (
    <>
      <div
        className={`sm-md:overflow-y-hidden relative z-20 flex w-full shrink-0 flex-col ${openInfo && 'basis-full'} bg-white lg:flex lg:w-96 lg:min-w-96 lg:basis-auto`}
      >
        {children}
      </div>
    </>
  );
};

export default SearchResultLayout;
