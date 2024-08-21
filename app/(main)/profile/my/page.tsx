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
import EmptyReviews from '@/app/_component/review/EmptyReviews';
import EmptyDiaries from '@/app/_component/diary/EmpryDiaries';
import EmptyLikedPlaces from '@/app/_component/profile/EmptyLikedPlaces';
import LikedPlaceList from '@/app/_component/profile/LikedPlaceList';

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

  const { diaries, reviews, likedPlaces } = profile;
  return (
    <>
      {profileMenu === 0 &&
        (diaries.length > 0 ? (
          <ProfileDiaryList diaries={diaries} />
        ) : (
          <EmptyDiaries />
        ))}
      {profileMenu === 1 &&
        (likedPlaces.length > 0 ? (
          <LikedPlaceList likedPlaces={likedPlaces} />
        ) : (
          <EmptyLikedPlaces />
        ))}
      {profileMenu === 2 &&
        (reviews.length > 0 ? (
          <ReviewList reviews={reviews} type='PROFILE' />
        ) : (
          <EmptyReviews url='/place' />
        ))}
    </>
  );
};

export default ProfilePage;
