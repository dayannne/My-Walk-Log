'use client';

import { useSearchParams } from 'next/navigation';

export interface pageProps {}

const SearchResultPage = ({}: pageProps) => {
  const searchParams = useSearchParams();

  console.log(searchParams);

  return <div></div>;
};

export default SearchResultPage;
