'use client';

import ProfileDiaryList from '@/app/_component/diary/ProfileDiaryList';
import { useUserStore } from '@/app/store/client/user';
import {
  useProfileMenuStore,
  useProfileStore,
} from '@/app/store/client/profile';
import { useGetMyProfile } from '@/app/store/server/profile';
import { useSuspenseQuery } from '@tanstack/react-query';

import { useEffect } from 'react';
import ReviewList from '@/app/_component/review/ReviewList';

export interface ProfilePageProps {}

const ProfilePage = ({}: ProfilePageProps) => {
  const { user } = useUserStore();

  const { setProfile } = useProfileStore();
  const { profileMenu } = useProfileMenuStore();

  const queryOptions = useGetMyProfile(user?.id as number);
  const { data: profile } = useSuspenseQuery(queryOptions);

  useEffect(() => {
    if (profile) {
      setProfile(profile);
    }
  }, [profile, setProfile]);

  const { diaries, reviews } = profile;
  return (
    <>
      {profileMenu === 0 && <ProfileDiaryList diaries={diaries} />}
      {profileMenu === 1 && <div></div>}
      {profileMenu === 2 && <ReviewList reviews={reviews} type='PROFILE' />}
    </>
  );
};

export default ProfilePage;
