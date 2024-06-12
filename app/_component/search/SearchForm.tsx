'use client';

import React, { useState } from 'react';
import Image from 'next/image';

import { useMap } from '@/app/shared/contexts/Map';
import useSearchPlaces from '@/app/_hooks/useSearchPlaces';

import { usePathname, useRouter } from 'next/navigation';

const SearchForm = () => {
  const router = useRouter();
  const pathname = usePathname().split('/').pop();
  const mapContext = useMap();
  const { searchPlaces } = useSearchPlaces();
  const { keyword, setKeyword } = mapContext!;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchPlaces(keyword);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.currentTarget.value);
  };

  return (
    <div className='p-4  border-b border-olive-green'>
      <Image
        src='/icons/icon-logo(default).svg'
        alt=''
        className='pl-1 mb-2 '
        width={140}
        height={80}
      />
      <form
        onSubmit={onSubmit}
        className='h-9 bg-white py-1 pl-2 pr-3 flex border rounded-lg border-olive-green border-solid box-content shadow-md justify-between gap-1 '
      >
        <input
          type='text'
          value={keyword}
          onChange={handleInputChange}
          size={15}
          className='pl-1 basis-full rounded-full outline-none '
          placeholder='장소 검색하기'
        />
        <button
          type='submit'
          className='shrink-0 relative w-4 flex items-center justify-center'
        >
          <Image fill={true} src='/icons/icon-search.svg' alt='검색 아이콘' />
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
