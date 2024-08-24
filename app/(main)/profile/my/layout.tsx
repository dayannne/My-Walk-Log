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

  return (
    <div className='flex h-full flex-col'>
      <div className='text-olive-green flex items-center gap-2 bg-white p-4 shadow-sm'>
        나의 프로필
      </div>
      <div className='flex basis-full flex-col overflow-y-scroll'>
        <div>
          {profile && (
            <div className='p-6'>
              <div className='flex flex-col items-center gap-2'>
                <Image
                  className='w-20 rounded-full object-cover object-center'
                  src={profile.profileImage}
                  alt='프로필 이미지'
                  width={300}
                  height={300}
                />
                <div className='flex basis-full flex-col items-center gap-2'>
                  <span className='flex items-center gap-1 font-semibold'>
                    {profile.username}
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
                    <span className='text-xs text-gray-600'>
                      리뷰 {profile.reviews.length}
                    </span>
                    <span className='h-3 w-[1px] bg-gray-300'></span>
                    <span className='text-xs text-gray-600'>
                      일기 {profile.diaries.length}
                    </span>
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
            </div>
          )}
          <ProfileMenu />
        </div>
        {children}
      </div>
    </div>
  );
};

export default ProfileLayout;
