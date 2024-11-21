import React from 'react';
import Image from 'next/image';
import { IArea } from '@/shared/types/place';
import { filterAreaData } from '@/shared/function/filter';
import AreaCode from '../../../public/data/area-code.json';

interface AreaSearchInputProps {
  areaName: string | null;
  setAreaName: (name: string | null) => void;
  setFilteredResults: (results: IArea[]) => void;
  filteredResults: IArea[];
  onSelect: (item: IArea) => void; // Add this prop
}

const AreaSearchInput = ({
  areaName,
  setAreaName,
  setFilteredResults,
  filteredResults,
  onSelect,
}: AreaSearchInputProps) => {
  const data = filterAreaData(AreaCode as IArea[]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.currentTarget.value;
    setAreaName(term);

    if (term) {
      const results = data.filter((item) => item.법정동명.includes(term));
      setFilteredResults(results);
    } else {
      setFilteredResults([]);
    }
  };

  const preventFileInputOpen = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  return (
    <div className='flex max-h-56 w-full flex-col rounded-md border border-solid border-gray-300 text-sm shadow-sm'>
      <div className='relative'>
        <Image
          className='absolute left-2 top-1/2 w-5 -translate-y-1/2'
          src='/icons/icon-search.svg'
          alt=''
          width={20}
          height={20}
        />
        <input
          className={`w-full rounded-lg px-2 py-3 pl-8 focus:outline-none ${filteredResults.length > 0 && 'rounded-b-none border-b border-solid border-gray-400'}`}
          type='text'
          value={areaName ?? ''}
          onChange={handleSearchChange}
          placeholder='동명(읍,면)으로 검색 (ex.고색동)'
          onKeyDown={preventFileInputOpen}
        />
      </div>
      {filteredResults.length > 0 && (
        <ul className='flex-col overflow-y-scroll rounded-b-lg'>
          {filteredResults.map((item) => (
            <li key={item.법정동코드}>
              <button
                type='button'
                className='hover:bg-hover group flex w-full cursor-pointer flex-col px-2 py-3'
                onClick={() => onSelect(item)}
              >
                <span>{item.법정동명}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AreaSearchInput;
