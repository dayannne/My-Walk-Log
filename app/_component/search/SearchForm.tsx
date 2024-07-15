'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { useMap } from '@/app/shared/contexts/Map';
import useSearchPlaces from '@/app/_hooks/useSearchPlaces';

import { useParams, usePathname, useRouter } from 'next/navigation';

const SearchForm = () => {
  const router = useRouter();
  const prevKeyword = decodeURIComponent(useParams().keyword as string);
  const { searchPlaces } = useSearchPlaces();

  const [keyword, setKeyword] = useState(prevKeyword ? prevKeyword : '');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchPlaces(keyword, 'SEARCH');
    router.push(`/place/search/${keyword}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.currentTarget.value);
  };

  useEffect(() => {
    setKeyword(prevKeyword);
  }, [prevKeyword]);

  return (
    <div className='border-olive-green border-b p-4'>
      <Image
        src='/icons/icon-logo(default).svg'
        alt=''
        className='mb-2 pl-1'
        width={140}
        height={80}
      />
      <form
        onSubmit={onSubmit}
        className='border-olive-green box-content flex h-9 justify-between gap-1 rounded-lg border border-solid bg-white py-1 pl-2 pr-3 shadow-md'
      >
        <input
          type='text'
          value={keyword}
          onChange={handleInputChange}
          size={15}
          className='basis-full rounded-full pl-1 outline-none'
          placeholder='장소 검색하기'
        />
        <button
          type='submit'
          className='relative flex w-4 shrink-0 items-center justify-center'
        >
          <Image fill={true} src='/icons/icon-search.svg' alt='검색 아이콘' />
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
