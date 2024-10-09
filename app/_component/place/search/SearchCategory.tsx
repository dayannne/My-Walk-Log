'use client';

import { useRefreshStore } from '@/app/store/client/refresh';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export interface SearchCategoryProps {}

const SearchCategory = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { setRefreshKey } = useRefreshStore();
  const keyword = decodeURIComponent(pathname.split('/').pop() as string);

  // 이미지 상태를 관리하기 위한 state
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget;
    const currUrl = `${decodeURIComponent(pathname)}?${searchParams.toString()}`;
    const newUrl = `/place/search/${value}?type=SEARCH_CATEGORY`;

    if (currUrl === newUrl) {
      setRefreshKey();
      router.refresh();
    } else {
      router.push(`/place/search/${value}?type=SEARCH_CATEGORY`);
    }
  };

  const categories = [
    { name: '공원', fileName: 'park' },
    { name: '하천', fileName: 'river' },
    { name: '산', fileName: 'mountain' },
    { name: '호수', fileName: 'lake' },
    { name: '수목원', fileName: 'tree' },
  ];

  return (
    <ul className='sm-md:bottom-4 absolute right-4 z-10 flex flex-col flex-wrap items-end gap-3 text-xs font-medium lg:top-4 lg:flex-row lg:items-center lg:text-sm'>
      {categories.map(({ name, fileName }) => (
        <li className='shrink-0' key={fileName}>
          <button
            className={`hover:text-olive-green flex items-center gap-2 rounded-full bg-white px-3 py-1 text-gray-500 shadow-md ${keyword === name ? 'text-olive-green' : 'text-gray-500'}`}
            onClick={handleClick}
            value={name}
            onMouseEnter={() => setHoveredCategory(name)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <Image
              src={`/icons/icon-${fileName}${hoveredCategory === name || keyword === name ? '' : '(gray)'}.svg`}
              alt={name}
              width={20}
              height={20}
            />
            {name}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default SearchCategory;
