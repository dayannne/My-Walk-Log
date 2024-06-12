import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
export interface NavigationProps {}

const Navigation = ({}: NavigationProps) => {
  const pathname = usePathname();

  return (
    <nav className='w-16 list-none flex flex-col text-xs'>
      <li>
        <Link
          className={`h-16 flex flex-col items-center justify-center border border-olive-green basis-full text-olive-green p-2 
              ${
                pathname.includes('place')
                  ? 'bg-olive-green text-white'
                  : 'text-olive-green'
              }`}
          href={'/place'}
        >
          <Image
            src={
              pathname.includes('place')
                ? `/icons/icon-marker(white).svg`
                : `/icons/icon-marker(full).svg`
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
          className={`h-16 flex flex-col items-center justify-center border border-olive-green basis-full text-olive-green p-2  ${
            pathname.includes('trail')
              ? 'bg-olive-green text-white'
              : 'text-olive-green'
          }`}
          href={'/trail'}
        >
          <Image
            src={
              pathname.includes('trail')
                ? `/icons/icon-walk(white).svg`
                : `/icons/icon-walk.svg`
            }
            width={30}
            height={30}
            alt='마커 아이콘'
          />
          산책로
        </Link>
      </li>
    </nav>
  );
};

export default Navigation;
