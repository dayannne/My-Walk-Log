import Header from '@/app/_component/common/Header';
import SearchForm from '@/app/_component/trail/search/SearchForm';

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
