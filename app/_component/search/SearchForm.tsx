'use client';

import React, { useState } from 'react';
import Image from 'next/image';

import { useMap } from '@/app/shared/contexts/Map';
import useSearchPlaces from '@/app/_hooks/useSearchPlaces';

import Logo from '@/public/icons/icon-logo(white).svg';

const SearchForm = () => {
  const mapContext = useMap();
  const { searchPlaces } = useSearchPlaces();
  const [keyword, setKeyword] = useState('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mapContext?.setKeyword(keyword);
    searchPlaces(keyword);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.currentTarget.value);
  };

  return (
    <div className='p-4 bg-olive-green border-b border-olive-green'>
      <Image src={Logo} alt='' className='pl-1 mb-1' />
      <form
        onSubmit={onSubmit}
        className='h-9 bg-white py-1 pl-2 pr-3 flex border rounded-lg border-olive-green box-content shadow-md justify-between gap-1'
      >
        <input
          type='text'
          value={keyword}
          onChange={handleInputChange}
          size={15}
          className='pl-1 basis-full rounded-full outline-none '
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
