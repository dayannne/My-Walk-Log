import Header from '@/components/Header';
import LogoutButton from '@/components/common/Button/LogoutButton';
import getQueryClient from '@/shared/utils/getQueryCLient';
import { getMyProfile } from '@/store/server/profile';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

export interface layoutProps {
  children: React.ReactNode;
  params: { userId: string };
}

const ProfileLayout = async ({ children, params }: layoutProps) => {
  return (
    <div className='flex h-full w-full flex-col'>
      <Header title='나의 프로필'>
        <LogoutButton />
      </Header>
      <div className='flex basis-full flex-col overflow-y-scroll bg-white'>
        {children}
      </div>
    </div>
  );
};

export default ProfileLayout;
