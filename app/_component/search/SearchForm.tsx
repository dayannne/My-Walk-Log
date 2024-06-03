'use client';

import React, { useState } from 'react';
import SearchIcon from '@/public/icons/icon_search.svg';
import Logo from '@/public/icons/icon-logo(white).svg';

import Image from 'next/image';

interface SearchProps {
  onSearch: (keyword: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.currentTarget.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(keyword);
  };

  return (
    <div className='p-4 bg-olive-green border-b border-olive-green'>
      <Image src={Logo} alt='' className='pl-1 mb-1' />
      <form
        onSubmit={handleSubmit}
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
          <Image fill={true} src='/icons/icon-search.svg' alt='' />
        </button>
      </form>
    </div>
  );
};

export default Search;
