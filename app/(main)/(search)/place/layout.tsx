import Header from '@/app/_component/common/Header';
import SearchForm from '@/app/_component/place/search/SearchForm';

export interface PlaceLayoutProps {
  children: React.ReactNode;
}

const PlaceLayout = ({ children }: PlaceLayoutProps) => {
  return <>{children}</>;
};

export default PlaceLayout;
