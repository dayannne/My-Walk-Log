'use client';

import Container from '@/app/_component/common/Container';
import ProfileMenu from '@/app/_component/profile/ProfileMenu';
import { useProfileStore } from '@/app/store/client/profile';
import Image from 'next/image';
import Link from 'next/link';

import { usePathname, useRouter } from 'next/navigation';
export interface layoutProps {
  children: React.ReactNode;
}

const ProfileLayout = ({ children }: layoutProps) => {
  const router = useRouter();
  const pathname = usePathname().split('/');

  const { profile } = useProfileStore();

  const address = JSON.parse(profile.address);

  return (
    <div className='flex h-full flex-col'>
      <div className='text-olive-green flex items-center gap-2 bg-white p-4 shadow-sm'>
        나의 프로필
      </div>
      <div className='flex basis-full flex-col overflow-y-scroll'>
        {profile && (
          <div className='flex flex-col gap-2 p-6'>
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
                  <span className='bg-hover text-olive-green border-olive-green rounded-md border border-solid px-[2px] py-[1px] text-xs'>
                    {address.areaName.split(' ').pop()}
                  </span>
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
                      <>
                        {str}
                        <br />
                      </>
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
      </div>
      <div className='basis-full'> {children}</div>
    </div>
  );
};

export default ProfileLayout;
