'use client';

import ProfileDiaryList from '@/app/_component/diary/ProfileDiaryList';
import { useProfileStore, useUserStore } from '@/app/store/client/user';
import { useGetMyProfile } from '@/app/store/server/profile';
import { useSuspenseQuery } from '@tanstack/react-query';

import { useEffect } from 'react';

export interface ProfilePageProps {}

const ProfilePage = ({}: ProfilePageProps) => {
  const { user } = useUserStore();

  const { setProfile } = useProfileStore();

  const queryOptions = useGetMyProfile(user?.id as number);
  const { data: profile } = useSuspenseQuery(queryOptions);

  useEffect(() => {
    if (profile) {
      setProfile(profile);
    }
  }, [profile, setProfile]);

  const { diaries } = profile;
  return (
    <>
      <ProfileDiaryList diaries={diaries} />
    </>
  );
};

export default ProfilePage;
