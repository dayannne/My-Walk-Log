import Header from '@/components/Header';
import SearchForm from '@/components/common/place/search/SearchForm';

export interface PlaceLayoutProps {
  children: React.ReactNode;
}

const PlaceLayout = ({ children }: PlaceLayoutProps) => {
  return <>{children}</>;
};

export default PlaceLayout;
