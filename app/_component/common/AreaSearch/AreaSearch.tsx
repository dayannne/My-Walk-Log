import React, { useEffect, useState } from 'react';
import AreaCode from '../../../../public/data/area-code.json';
import { Area } from '@/app/shared/types/place';
import { filterAreaData } from '@/app/shared/function/filter';
import { useGetArea } from '@/app/store/server/area';
import { useSuspenseQuery } from '@tanstack/react-query';
import AreaSearchMap from './AreaSearchMap';
import useGeolocation from '@/app/_hooks/useGeolocation';
import { Latlng } from '@/app/shared/types/map';
import Image from 'next/image';
import { calculateCenter } from '@/app/shared/function/calculator';
import { IAddress } from '@/app/shared/types/profile';

interface AreaSearchProps {
  address: IAddress | null;
  setAddress: (address: IAddress | null) => void;
}

function AreaSearch({ address, setAddress }: AreaSearchProps) {
  const { location } = useGeolocation();

  const [areaName, setAreaName] = useState<string | null>(null);
  const [filteredResults, setFilteredResults] = useState<Area[]>([]);
  const [currLocation, setCurrLocation] = useState<Latlng | null>(null);
  const [selectedCode, setSelectedCode] = useState<number | null>(null);

  const queryOptions = useGetArea({
    areaCode: selectedCode as number,
    location: currLocation as Latlng,
  });

  const { data: areaInfo } = useSuspenseQuery(queryOptions);

  const data = filterAreaData(AreaCode as Area[]);

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

  const handleSelectArea = (item: Area) => {
    setCurrLocation(null);
    setSelectedCode(Math.floor(item.법정동코드 / 100));
    setAreaName(item.법정동명);
    setFilteredResults([]);
  };

  const handleSearchCurrLocation = () => {
    setSelectedCode(null);
    setCurrLocation(location);
    setFilteredResults([]);
  };

  useEffect(() => {
    if (areaInfo) {
      const position = calculateCenter(areaInfo.bbox);
      const areaData = areaInfo?.features[0]?.properties;
      const polygonPaths: number[][] =
        areaInfo?.features[0]?.geometry?.coordinates[0][0];
      const newAddress = {
        code: areaData.emd_cd,
        areaName: areaData.full_nm,
        center: position,
        polygonPaths: polygonPaths,
      };

      setAddress(newAddress);
      setSelectedCode(areaData.emd_cd);
      setAreaName(areaData.full_nm);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [areaInfo]);

  return (
    <div className='flex flex-col gap-2'>
      <button
        className={`border-olive-green flex w-full items-center rounded-lg border border-solid px-2 py-3 text-sm ${currLocation && 'bg-olive-green text-white outline-none'}`}
        type='button'
        onClick={handleSearchCurrLocation}
      >
        <Image
          src={
            currLocation
              ? '/icons/icon-my-location(white).svg'
              : '/icons/icon-my-location.svg'
          }
          alt=''
          width={24}
          height={24}
        />
        <span className='basis-full'>현재 위치로 검색하기</span>
      </button>
      <div className='flex max-h-56 w-full flex-col rounded-lg border border-solid border-gray-500 text-sm shadow-sm'>
        <div className='relative'>
          <Image
            className='absolute left-2 top-1/2 w-5 -translate-y-1/2'
            src='/icons/icon-search.svg'
            alt=''
            width={20}
            height={20}
          />
          {address && (
            <input
              className={`w-full rounded-lg px-2 py-3 pl-8 focus:outline-none ${filteredResults.length > 0 && 'rounded-b-none border-b border-solid border-gray-400'}`}
              type='text'
              value={areaName || address.areaName}
              onChange={handleSearchChange}
              placeholder='동명(읍,면)으로 검색 (ex.고색동)'
            />
          )}
        </div>
        {filteredResults.length > 0 && (
          <ul className='flex-col overflow-y-scroll rounded-b-lg'>
            {filteredResults.map((item) => (
              <li key={item.법정동코드}>
                <button
                  type='button'
                  className='hover:bg-hover group flex w-full cursor-pointer flex-col px-2 py-3'
                  onClick={() => handleSelectArea(item)}
                >
                  <span>{item.법정동명}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {address && <AreaSearchMap address={address} />}
    </div>
  );
}

export default AreaSearch;
