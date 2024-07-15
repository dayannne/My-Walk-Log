import useSearchPlaces from '@/app/_hooks/useSearchPlaces';
import { useMap } from '@/app/shared/contexts/Map';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export interface SearchCategoryProps {}

const SearchCategory = () => {
  const router = useRouter();
  const mapContext = useMap();

  const { searchPlaces } = useSearchPlaces();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget;
    mapContext?.setKeyword(value);
    searchPlaces(value);
    router.push(`/place/search/${value}`);
  };

  return (
    <ul className='absolute right-0 top-4 flex items-center gap-3 px-5 py-4 text-sm font-medium'>
      <li className='shrink-0'>
        <button
          className='focus:text-olive-green flex items-center gap-2 rounded-full bg-white px-3 py-1 shadow-md'
          onClick={handleClick}
          value='공원'
        >
          <Image src='/icons/icon-park.svg' alt='' width={20} height={20} />
          공원
        </button>
      </li>
      <li className='shrink-0'>
        <button
          className='focus:text-olive-green flex items-center gap-2 rounded-full bg-white px-3 py-1 shadow-md'
          onClick={handleClick}
          value='하천'
        >
          <Image src='/icons/icon-river.svg' alt='' width={20} height={20} />
          하천
        </button>
      </li>
      <li className='shrink-0'>
        <button
          className='focus:text-olive-green flex items-center gap-2 rounded-full bg-white px-3 py-1 shadow-md'
          onClick={handleClick}
          value='산'
        >
          <Image src='/icons/icon-mountain.svg' alt='' width={20} height={20} />
          산
        </button>
      </li>
      <li className='shrink-0'>
        <button
          className='focus:text-olive-green flex items-center gap-2 rounded-full bg-white px-3 py-1 shadow-md'
          onClick={handleClick}
          value='호수'
        >
          <Image src='/icons/icon-lake.svg' alt='' width={20} height={20} />
          호수
        </button>
      </li>
      <li className='shrink-0'>
        <button
          className='focus:text-olive-green flex items-center gap-2 rounded-full bg-white px-3 py-1 shadow-md'
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
