import Container from '@/app/_component/common/Container';

export interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return <Container>{children}</Container>;
};

export default MainLayout;
