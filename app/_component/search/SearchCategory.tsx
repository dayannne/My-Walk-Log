import useSearchPlaces from '@/app/_hooks/useSearchPlaces';
import { useMap } from '@/app/shared/contexts/Map';

import Image from 'next/image';

export interface SearchCategoryProps {}

const SearchCategory = () => {
  const mapContext = useMap();

  const { searchPlaces } = useSearchPlaces();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget;
    mapContext?.setKeyword(value);
    searchPlaces(value);
  };

  return (
    <ul className='flex items-center gap-3  py-4 px-5 absolute top-4 left-0 font-medium text-sm'>
      <li className='shrink-0'>
        <button
          className='flex items-center gap-2 bg-white py-1 px-3 rounded-full shadow-md focus:text-olive-green'
          onClick={handleClick}
          value='공원'
        >
          <Image src='/icons/icon-park.svg' alt='' width={20} height={20} />
          공원
        </button>
      </li>
      <li className='shrink-0'>
        <button
          className='flex items-center gap-2 bg-white py-1 px-3 rounded-full shadow-md focus:text-olive-green'
          onClick={handleClick}
          value='하천'
        >
          <Image src='/icons/icon-river.svg' alt='' width={20} height={20} />
          하천
        </button>
      </li>
      <li className='shrink-0'>
        <button
          className='flex items-center gap-2 bg-white py-1 px-3 rounded-full shadow-md focus:text-olive-green'
          onClick={handleClick}
          value='산'
        >
          <Image src='/icons/icon-mountain.svg' alt='' width={20} height={20} />
          산
        </button>
      </li>
      <li className='shrink-0'>
        <button
          className='flex items-center gap-2 bg-white py-1 px-3 rounded-full shadow-md focus:text-olive-green'
          onClick={handleClick}
          value='호수'
        >
          <Image src='/icons/icon-lake.svg' alt='' width={20} height={20} />
          호수
        </button>
      </li>
      <li className='shrink-0'>
        <button
          className='flex items-center gap-2 bg-white py-1 px-3 rounded-full shadow-md focus:text-olive-green'
          onClick={handleClick}
          value='저수지'
        >
          저수지
        </button>
      </li>
    </ul>
  );
};

export default SearchCategory;
