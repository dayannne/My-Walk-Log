import Container from '@/app/_component/common/Container';

export interface layoutProps {
  children: React.ReactNode;
}

const DiaryFormLayout = ({ children }: layoutProps) => {
  return <Container>{children}</Container>;
};

export default DiaryFormLayout;
