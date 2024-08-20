'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
export interface NavigationProps {}

const Navigation = ({}: NavigationProps) => {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState('');

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const { id } = e.currentTarget;
    setIsHovered(id);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setIsHovered('');
  };

  return (
    <nav className='flex w-16 basis-full list-none flex-col text-xs'>
      <li>
        <Link
          id='feed'
          className={`border-olive-green flex h-[72px] basis-full flex-col items-center justify-center gap-1 border p-2 ${
            pathname.includes('feed')
              ? 'bg-olive-green text-white'
              : 'hover:text-olive-green text-black'
          }`}
          href={'/feed'}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
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
      <li>
        <Link
          id='place'
          className={`border-olive-green flex h-[72px] basis-full flex-col items-center justify-center gap-1 border p-2 ${
            pathname.includes('place')
              ? 'bg-olive-green text-white'
              : 'hover:text-olive-green text-black'
          }`}
          href={'/place'}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
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
      {/* <li>
        <Link
          id='trail'
          className={`border-olive-green flex h-[72px] basis-full flex-col items-center justify-center gap-1 border p-2 ${
            pathname.includes('trail')
              ? 'bg-olive-green text-white'
              : 'hover:text-olive-green text-black'
          } `}
          href={'/trail'}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
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
          />
          산책로
        </Link>
      </li> */}
    </nav>
  );
};

export default Navigation;
