'use client';

import { useUserStore } from '@/app/store/client/user';
import { useGetMyProfile } from '@/app/store/server/profile';
import { useSuspenseQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export interface ProfilePageProps {}

const ProfilePage = ({}: ProfilePageProps) => {
  const router = useRouter();
  const { user } = useUserStore();
  const pathname = usePathname().split('/');
  const queryOptions = useGetMyProfile(user?.id as number);
  const { data: place } = useSuspenseQuery(queryOptions);

  const { username, reviews, diaries, profileImage } = place;
  return (
    <div>
      <div className='bg-olive-green flex items-center gap-2 p-4 text-white shadow-sm'>
        <button onClick={() => router.back()}>
          <Image
            src='/icons/icon-arrow-left.svg'
            alt='프로필 이미지'
            width={24}
            height={24}
          />
        </button>
        나의 프로필
      </div>
      <div className='p-6'>
        <div className='flex flex-col items-center gap-2'>
          <Image
            className='w-20 rounded-full object-cover object-center'
            src={place.profileImage}
            alt='프로필 이미지'
            width={300}
            height={300}
          />
          <div className='flex basis-full flex-col items-center gap-2'>
            <span className='font-semibold'>{username}</span>
            <div className='flex items-center gap-2'>
              <span className='text-xs text-gray-600'>
                리뷰 {reviews.length}
              </span>
              <span className='h-3 w-[1px] bg-gray-300'></span>
              <span className='text-xs text-gray-600'>
                일기 {diaries.length}
              </span>
            </div>
          </div>
          <Link
            className='text-olive-green border-olive-green mt-2 flex shrink-0 items-center justify-center gap-1 rounded-lg border border-solid px-3 py-2 text-sm font-medium shadow-md'
            href={`my/diary/form`}
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
      <nav>
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
              href={`review`}
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
    </div>
  );
};

export default ProfilePage;
