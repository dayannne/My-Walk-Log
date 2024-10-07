import Header from '@/app/_component/common/Header';
import LogoutButton from '@/app/_component/common/Button/LogoutButton';
import getQueryClient from '@/app/shared/utils/getQueryCLient';
import { getMyProfile } from '@/app/store/server/profile';
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
