'use client';

import ProfileDiaryList from '@/app/_component/diary/ProfileDiaryList';
import { useUserStore } from '@/app/store/client/user';
import {
  useProfileMenuStore,
  useProfileStore,
} from '@/app/store/client/profile';
import { useGetMyProfile } from '@/app/store/server/profile';
import { useSuspenseQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';

import { Fragment, useEffect, useState } from 'react';
import ReviewList from '@/app/_component/review/ReviewList';
import EmptyReviews from '@/app/_component/review/EmptyReviews';
import EmptyDiaries from '@/app/_component/diary/EmpryDiaries';
import EmptyLikedPlaces from '@/app/_component/profile/EmptyLikedPlaces';
import LikedPlaceList from '@/app/_component/profile/LikedPlaceList';
import ProfileMenu from '@/app/_component/profile/ProfileMenu';
import { useModalStore } from '@/app/store/client/modal';
import PlaceDetail from '@/app/_component/place/PlaceDetail';

export interface ProfilePageProps {}

const ProfilePage = ({}: ProfilePageProps) => {
  const { user } = useUserStore();
  const { setProfile } = useProfileStore();
  const { profileMenu } = useProfileMenuStore();
  const { openInfo, setOpenInfo } = useModalStore();

  const queryOptions = useGetMyProfile(user?.id as number);
  const { data: profile } = useSuspenseQuery(queryOptions);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile) {
      setProfile(profile);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  useEffect(() => {
    if (loading) {
      setOpenInfo(null);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const { diaries, reviews, likedPlaces, address } = profile;
  return (
    <>
      {profile && (
        <div className='flex flex-col gap-2 bg-white p-6'>
          <div className='flex items-center gap-3'>
            <Image
              className='h-20 w-20 rounded-full object-cover object-center'
              src={profile.profileImage}
              alt='프로필 이미지'
              width={300}
              height={300}
            />
            <div className='flex basis-full flex-col gap-2'>
              <span className='flex items-center gap-1 font-semibold'>
                <span> {profile.username}</span>
                <Link className='mt-[2px]' href={`/profile/edit`}>
                  <Image
                    src='/icons/icon-pencil.svg'
                    width={16}
                    height={16}
                    alt='프로필 수정하기'
                  />
                </Link>
              </span>
              <div className='flex items-center gap-2'>
                {address?.areaName && (
                  <span className='bg-hover text-olive-green border-olive-green rounded-md border border-solid px-[2px] py-[1px] text-xs'>
                    {address?.areaName.split(' ').pop()}
                  </span>
                )}
                <span className='text-xs text-gray-600'>
                  리뷰 {profile.reviews.length}
                </span>
                <span className='h-3 w-[1px] bg-gray-300'></span>
                <span className='text-xs text-gray-600'>
                  일기 {profile.diaries.length}
                </span>
              </div>
              <p className='text-xs'>
                {profile.introduction
                  .split('\n')
                  .map((str: string, idx: number) => (
                    <Fragment key={idx}>
                      {str}
                      <br />
                    </Fragment>
                  ))}
              </p>
            </div>
          </div>
          <Link
            className='text-olive-green border-olive-green mt-2 flex shrink-0 items-center justify-center gap-1 rounded-lg border border-solid px-3 py-2 text-sm font-medium shadow-md'
            href={`/diary/form`}
          >
            <Image
              className=''
              src='/icons/icon-logo-mini(default).svg'
              width={16}
              height={16}
              alt='다이어리 아이콘'
            />
            산책일기 쓰기
          </Link>
        </div>
      )}
      <ProfileMenu />
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
      {!loading && openInfo && <PlaceDetail placeId={openInfo} />}
    </>
  );
};

export default ProfilePage;
