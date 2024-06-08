import useSearchPlaces from '@/app/_hooks/useSearchPlaces';
import { useMap } from './Map';
import { useEffect, useState } from 'react';
import { Latlng } from '@/app/shared/types/map';
import Image from 'next/image';

export interface SearchAgainButtonProps {
  onSearch: (keyword: string) => void;
}

const SearchAgainButton = ({ onSearch }: SearchAgainButtonProps) => {
  const mapContext = useMap();
  const { keyword, currLocation, prevLocation, setPrevLocation, mapData } =
    mapContext!;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currlat = currLocation?.getLat();
    const currlng = currLocation?.getLng();

    const prevLat = prevLocation?.getLat();
    const prevLng = prevLocation?.getLng();

    if (keyword != '' && (currlat !== prevLat || currlng !== prevLng)) {
      setIsVisible(true);
      setPrevLocation(mapData?.getCenter() as kakao.maps.LatLng);
    }
  }, [currLocation]);

  const handleSearchAgain = () => {
    onSearch(mapContext?.keyword as string);
    setIsVisible(false);
  };
  return (
    <>
      {isVisible && (
        <button
          onClick={handleSearchAgain}
          className='flex items-center gap-2 rounded-full py-4 px-5 absolute bottom-12 left-2/4 border shadow-lg bg-white border-olive-green text-base font-medium'
        >
          현재 위치에서 재검색하기
          <Image
            src='/icons/icon-reset.svg'
            alt='리셋 아이콘'
            width={18}
            height={18}
          />
        </button>
      )}
    </>
  );
};

export default SearchAgainButton;
