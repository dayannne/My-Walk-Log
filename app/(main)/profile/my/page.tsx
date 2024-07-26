'use client';

import { useUserStore } from '@/app/store/client/user';
import { useGetMyProfile } from '@/app/store/server/profile';
import { useSuspenseQuery } from '@tanstack/react-query';
export interface ProfilePageProps {}

const ProfilePage = ({}: ProfilePageProps) => {
  const { user } = useUserStore();
  const queryOptions = useGetMyProfile(user?.id as number);
  const { data: place } = useSuspenseQuery(queryOptions);
  return (
    <div>
    </div>
  );
};

export default ProfilePage;
