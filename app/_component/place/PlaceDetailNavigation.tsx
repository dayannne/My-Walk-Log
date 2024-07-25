import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface PlaceDetailNavigationProps {
  placeId: string;
  keyword: string;
}

const PlaceDetailNavigation = ({
  placeId,
  keyword,
}: PlaceDetailNavigationProps) => {
  const pathname = usePathname().split('/');

  return (
    <nav className='bg-white pb-1'>
      <ul className='flex border-b border-solid border-gray-200 bg-white shadow-sm'>
        <li className='h-full basis-full py-2 text-center text-sm'>
          <Link
            href={`/place/search/${keyword}/detail/${placeId}`}
            className={`${!pathname.includes('review') && !pathname.includes('diary') && 'border-b-2'} border-solid border-b-black py-2`}
          >
            정보
          </Link>
        </li>
        <li className='basis-full py-2 text-center text-sm'>
          <Link
            href={`${placeId}/review`}
            className={`${pathname.includes('review') && 'border-b-2'} border-solid border-b-black py-2`}
          >
            리뷰
          </Link>
        </li>
        <li className='basis-full py-2 text-center text-sm'>
          <Link
            href={`${placeId}/diary`}
            className={`${pathname.includes('diary') && 'border-b-2'} border-solid border-b-black py-2`}
          >
            일기
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default PlaceDetailNavigation;
