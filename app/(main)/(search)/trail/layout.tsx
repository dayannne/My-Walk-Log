import Header from '@/components/Header';
import SearchForm from '@/components/trail/search/SearchForm';

export interface TrailLayoutProps {
  children: React.ReactNode;
}

const TrailLayout = ({ children }: TrailLayoutProps) => {
  return (
    <>
      <Header title='산책로 찾기' />
      <SearchForm />
      {children}
    </>
  );
};

export default TrailLayout;
