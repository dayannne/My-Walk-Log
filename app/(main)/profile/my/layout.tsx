'use client';

import Container from '@/app/_component/common/Container';

export interface layoutProps {
  children: React.ReactNode;
}

const ProfileLayout = ({ children }: layoutProps) => {
  return <Container>{children}</Container>;
};

export default ProfileLayout;
