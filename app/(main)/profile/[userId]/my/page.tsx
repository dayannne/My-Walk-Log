'use client';

import ProfileDiaryList from '@/components/diary/ProfileDiaryList';
import { useUserStore } from '@/store/client/user';
import { useProfileMenuStore } from '@/store/client/profile';
import { useGetMyProfile } from '@/store/server/profile';
import { useSuspenseQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';

import { Fragment, useEffect, useState } from 'react';
import ReviewList from '@/components/review/ReviewList';
import EmptyReviews from '@/components/review/EmptyReviews';
import EmptyDiaries from '@/components/diary/EmpryDiaries';
import EmptyLikedPlaces from '@/components/profile/EmptyLikedPlaces';
import LikedPlaceList from '@/components/profile/LikedPlaceList';
import ProfileMenu from '@/components/profile/ProfileMenu';
import { useModalStore } from '@/store/client/modal';
import PlaceDetailModal from '@/components/common/Modal/PlaceDetailModal';

export interface ProfilePageProps {
  params: { userId: string };
}

const ProfilePage = ({ params }: ProfilePageProps) => {
  const userId = parseInt(params?.userId);
  const queryOptions = useGetMyProfile(userId);
  const { data: profile } = useSuspenseQuery(queryOptions);
  const openInfo = useModalStore((state) => state.openInfo);
  const setOpenInfo = useModalStore((state) => state.setOpenInfo);
  const profileMenu = useProfileMenuStore((state) => state.profileMenu);

  const [loading, setLoading] = useState(true);

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
              className='h-20 w-20 shrink-0 rounded-full object-cover object-center'
              src={profile?.profileImage}
              alt='프로필 이미지'
              width={300}
              height={300}
            />
            <div className='flex basis-full flex-col gap-2'>
              <span className='flex items-center gap-1 font-semibold'>
                <span> {profile?.username}</span>
                <Link
                  className='mt-[2px]'
                  href={`/profile/${parseInt(params?.userId)}/edit`}
                >
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
                  리뷰 {profile?.reviews?.length}
                </span>
                <span className='h-3 w-[1px] bg-gray-300'></span>
                <span className='text-xs text-gray-600'>
                  일기 {profile?.diaries?.length}
                </span>
              </div>
              <p className='text-xs'>
                {profile?.introduction
                  ?.split('\n')
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
        (diaries?.length > 0 ? (
          <ProfileDiaryList diaries={diaries} />
        ) : (
          <EmptyDiaries />
        ))}
      {profileMenu === 1 &&
        (likedPlaces?.length > 0 ? (
          <LikedPlaceList likedPlaces={likedPlaces} />
        ) : (
          <EmptyLikedPlaces />
        ))}
      {profileMenu === 2 &&
        (reviews?.length > 0 ? (
          <ReviewList reviews={reviews} type='PROFILE' />
        ) : (
          <EmptyReviews url='/place/search' />
        ))}
      {!loading && openInfo && (
        <PlaceDetailModal placeId={openInfo as string} />
      )}
    </>
  );
};

export default ProfilePage;
