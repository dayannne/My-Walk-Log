import SearchResult from '@/app/_component/place/search/SearchResult';

export interface SearchResultLayoutProps {
  children: React.ReactNode;
}

const SearchResultLayout = ({ children }: SearchResultLayoutProps) => {
  return (
    <>
      <SearchResult />
      {children}
    </>
  );
};

export default SearchResultLayout;
