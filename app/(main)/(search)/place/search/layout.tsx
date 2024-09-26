import Header from '@/app/_component/common/Header';
import SearchForm from '@/app/_component/place/search/SearchForm';

export interface PlaceLayoutProps {
  children: React.ReactNode;
}

const PlaceSearchLayout = ({ children }: PlaceLayoutProps) => {
  return (
    <>
      <Header title='산책 장소 찾기' />
      <SearchForm />
      {children}
    </>
  );
};

export default PlaceSearchLayout;
