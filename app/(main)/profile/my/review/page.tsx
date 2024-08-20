'use client';

import ReviewList from '@/app/_component/review/ReviewList';
import { useProfileStore } from '@/app/store/client/user';

export interface ProfileReviewPageProps {}

const ProfileReviewPage = ({}: ProfileReviewPageProps) => {
  const { profile } = useProfileStore();
  return (
    <>{profile && <ReviewList reviews={profile.reviews} type='PROFILE' />}</>
  );
};

export default ProfileReviewPage;
