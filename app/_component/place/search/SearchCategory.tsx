'use client';

import { useRefreshStore } from '@/app/store/client/refresh';

import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export interface SearchCategoryProps {}

const SearchCategory = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { setRefreshKey } = useRefreshStore();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget;
    const currUrl = `${decodeURIComponent(pathname)}?${searchParams.toString()}`;
    const newUrl = `/place/search/${value}?type=SEARCH_CATEGORY`;

    if (currUrl === newUrl) {
      setRefreshKey();
      router.refresh();
    } else router.push(`/place/search/${value}?type=SEARCH_CATEGORY`);
  };

  return (
    <ul className='sm-md:bottom-2 absolute right-0 z-10 flex flex-col flex-wrap items-end gap-3 px-5 py-4 text-xs font-medium lg:top-2 lg:flex-row lg:items-center lg:text-sm'>
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
          value='수목원'
        >
          <Image src='/icons/icon-tree.svg' alt='' width={20} height={20} />
          수목원
        </button>
      </li>
    </ul>
  );
};

export default SearchCategory;
