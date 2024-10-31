import React from 'react';
import Image from 'next/image';
import { Latlng } from '@/shared/types/map';
import useGeolocation from '@/hooks/useGeolocation';

interface LocationSearchProps {
  currLocation: Latlng | null;
  setCurrLocation: (location: Latlng | null) => void;
}

const LocationSearch = ({
  currLocation,
  setCurrLocation,
}: LocationSearchProps) => {
  const { location } = useGeolocation();
  const handleSearchCurrLocation = () => {
    setCurrLocation(location);
  };

  return (
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
  );
};

export default LocationSearch;
