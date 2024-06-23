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
    <nav className='w-16 list-none flex flex-col text-xs basis-full'>
      <li>
        <Link
          id='place'
          className={`h-[72px] flex flex-col gap-1 items-center justify-center border border-olive-green basis-full p-2 
              ${
                pathname.includes('place')
                  ? 'bg-olive-green text-white'
                  : 'text-black hover:text-olive-green'
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
                : `/icons/icon-marker(black).svg`
            }
            width={30}
            height={30}
            alt='마커 아이콘'
          />
          장소
        </Link>
      </li>
      <li>
        <Link
          id='trail'
          className={`h-[72px] flex flex-col gap-1 items-center justify-center border border-olive-green basis-full p-2 
            ${
              pathname.includes('trail')
                ? 'bg-olive-green text-white'
                : 'text-black hover:text-olive-green'
            }
          `}
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
      </li>
    </nav>
  );
};

export default Navigation;
