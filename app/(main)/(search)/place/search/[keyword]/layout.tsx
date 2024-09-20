import SearchResult from '@/app/_component/place/search/SearchResult';

export interface layoutProps {
  children: React.ReactNode;
}

const SearchResultLayout = ({ children }: layoutProps) => {
  return (
    <>
      <SearchResult />
      {children}
    </>
  );
};

export default SearchResultLayout;
