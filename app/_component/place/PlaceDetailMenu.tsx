import { usePlaceMenuStore } from '@/app/store/client/place';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface PlaceDetailMenuProps {
  placeId: string;
  keyword: string;
}

const PlaceDetailMenu = ({ placeId, keyword }: PlaceDetailMenuProps) => {
  const { placeMenu, setPlaceMenu } = usePlaceMenuStore();

  return (
    <nav className='flex list-none bg-white shadow-sm'>
      <li className='box-border h-full basis-full pt-2 text-center text-sm'>
        <button
          value={0}
          className={`${placeMenu === 0 && 'border-b-2'} border-solid border-b-black pb-2`}
          onClick={(e) => setPlaceMenu(parseInt(e.currentTarget.value))}
        >
          정보
        </button>
      </li>
      <li className='box-border h-full basis-full pt-2 text-center text-sm'>
        <button
          value={1}
          className={`${placeMenu === 1 && 'border-b-2'} border-solid border-b-black pb-2`}
          onClick={(e) => setPlaceMenu(parseInt(e.currentTarget.value))}
        >
          리뷰
        </button>
      </li>
      <li className='box-border h-full basis-full pt-2 text-center text-sm'>
        <button
          value={2}
          className={`${placeMenu === 2 && 'border-b-2'} border-solid border-b-black pb-2`}
          onClick={(e) => setPlaceMenu(parseInt(e.currentTarget.value))}
        >
          일기
        </button>
      </li>
    </nav>
  );
};

export default PlaceDetailMenu;
