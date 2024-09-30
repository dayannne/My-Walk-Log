'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useUserStore } from '@/app/store/client/user';
import { useState } from 'react';
import useSearchPlaces from '@/app/_hooks/useSearchPlaces';
import useSearchTrail from '@/app/_hooks/useSearchTrail';

const Navigation = () => {
  const pathname = usePathname();
  const { user } = useUserStore();
  const [isHovered, setIsHovered] = useState('');
  const { clearMarkersAndInfo } = useSearchPlaces();
  const { clearMarkers } = useSearchTrail();

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const { id } = e.currentTarget;
    setIsHovered(id);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setIsHovered('');
  };
  return (
    <nav
      className={`flex list-none border-solid border-gray-200 text-xs lg:w-16 lg:flex-col lg:border-r-[1.5px] ${pathname.includes('diary') && pathname.includes('detail') && 'sm-md:hidden'} `}
    >
      <li className='hidden basis-full lg:block lg:basis-auto'>
        <Link
          className='h-20 w-full items-center justify-center border-b border-solid border-gray-200 p-1 lg:flex'
          href='/'
          onClick={() => {
            clearMarkers();
            clearMarkersAndInfo();
          }}
        >
          <Image
            src='/icons/icon-logo-mini(default).svg'
            alt=''
            width={32}
            height={32}
          />
        </Link>
      </li>
      <li className='basis-full lg:basis-auto'>
        <Link
          id='feed'
          className={`border-olive-green flex h-full basis-full flex-col items-center justify-center gap-1 border p-2 lg:h-[72px] ${
            pathname.includes('feed')
              ? 'bg-olive-green text-white'
              : 'hover:text-olive-green text-black'
          }`}
          href={'/feed'}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => {
            clearMarkers();
            clearMarkersAndInfo();
          }}
        >
          <Image
            src={
              pathname.includes('feed')
                ? `/icons/icon-feed(white).svg`
                : isHovered === 'feed'
                  ? `/icons/icon-feed(hover).svg`
                  : `/icons/icon-feed.svg`
            }
            width={30}
            height={30}
            alt='마커 아이콘'
          />
          피드
        </Link>
      </li>
      <li className='basis-full lg:basis-auto'>
        <Link
          id='place'
          className={`border-olive-green flex h-full basis-full flex-col items-center justify-center gap-1 border p-2 lg:h-[72px] ${
            pathname.includes('place')
              ? 'bg-olive-green text-white'
              : 'hover:text-olive-green text-black'
          }`}
          href={'/place/search'}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => {
            clearMarkers();
            clearMarkersAndInfo();
          }}
        >
          <Image
            src={
              pathname.includes('place')
                ? `/icons/icon-marker(white).svg`
                : isHovered === 'place'
                  ? `/icons/icon-marker(hover).svg`
                  : `/icons/icon-marker(gray).svg`
            }
            width={30}
            height={30}
            alt='마커 아이콘'
          />
          장소
        </Link>
      </li>
      <li className='basis-full lg:basis-auto'>
        <Link
          id='trail'
          className={`border-olive-green flex h-full basis-full flex-col items-center justify-center gap-1 border p-2 lg:h-[72px] ${
            pathname.includes('trail')
              ? 'bg-olive-green text-white'
              : 'hover:text-olive-green text-black'
          } `}
          href={'/trail'}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => {
            clearMarkers();
            clearMarkersAndInfo();
          }}
        >
          <Image
            src={
              pathname.includes('trail')
                ? `/icons/icon-walk(white).svg`
                : isHovered === 'trail'
                  ? `/icons/icon-walk(hover).svg`
                  : `/icons/icon-walk.svg`
            }
            width={30}
            height={30}
            alt='산책로 아이콘'
            onClick={clearMarkersAndInfo}
          />
          산책로
        </Link>
      </li>
      <li className={`basis-full lg:flex lg:flex-col lg:justify-end`}>
        {user ? (
          <Link
            href={`/profile/my`}
            className={`flex basis-full flex-col items-center justify-center gap-1 border-solid border-gray-300 p-2 lg:h-20 lg:basis-auto lg:border-t ${
              pathname.includes('profile')
                ? 'bg-olive-green text-white'
                : 'hover:text-olive-green text-black'
            } `}
            onClick={() => {
              clearMarkers();
              clearMarkersAndInfo();
            }}
          >
            <Image
              className='aspect-square rounded-full object-cover'
              src={
                user.profileImage ? user.profileImage : '/icons/icon-user.svg'
              }
              alt=''
              width={32}
              height={32}
            />
            <span
              className={`lg:hidden ${
                pathname.includes('profile') ? 'text-white' : 'text-black'
              }`}
            >
              프로필
            </span>
          </Link>
        ) : (
          <Link
            href='/login'
            className={`-solid flex basis-full flex-col items-center justify-center gap-1 border border-t border-gray-300 p-2 lg:h-20 lg:basis-auto`}
            onClick={() => {
              clearMarkers();
              clearMarkersAndInfo();
            }}
          >
            <Image
              className='rounded-full'
              src={'/icons/icon-login.svg'}
              alt=''
              width={32}
              height={32}
            />
            <span className='lg:hidden'>로그인</span>
          </Link>
        )}
      </li>
    </nav>
  );
};

export default Navigation;
