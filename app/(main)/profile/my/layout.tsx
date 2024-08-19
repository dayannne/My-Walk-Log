'use client';

import Container from '@/app/_component/common/Container';
import { useProfileStore } from '@/app/store/client/user';
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
    <Container>
      <div className='flex h-full flex-col'>
        <div className='text-olive-green flex items-center gap-2 bg-white p-4 shadow-sm'>
          <button onClick={() => router.back()} className='mt-[2px]'>
            <Image
              src='/icons/icon-arrow-left(green).svg'
              alt='프로필 이미지'
              width={24}
              height={24}
            />
          </button>
          나의 프로필
        </div>
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
                <span className='font-semibold'>{profile.username}</span>
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
        <nav className='z-10'>
          <ul className='flex bg-white shadow-sm'>
            <li className='h-full basis-full py-2 text-center text-sm'>
              <Link
                href={`/profile/my`}
                className={`${!pathname.includes('review') && !pathname.includes('diary') && 'border-b-2'} border-solid border-b-black py-2`}
              >
                일기
              </Link>
            </li>
            <li className='basis-full py-2 text-center text-sm'>
              <Link
                href={`my/review`}
                className={`${pathname.includes('review') && 'border-b-2'} border-solid border-b-black py-2`}
              >
                리뷰
              </Link>
            </li>
            <li className='basis-full py-2 text-center text-sm'>
              <Link
                href={`likedPlaces`}
                className={`${pathname.includes('likedPlaces') && 'border-b-2'} border-solid border-b-black py-2`}
              >
                장소
              </Link>
            </li>
          </ul>
        </nav>
        {children}
      </div>
    </Container>
  );
};

export default ProfileLayout;
