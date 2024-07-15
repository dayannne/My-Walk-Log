import { useEffect, useState } from 'react';
import Image from 'next/image';

import useSearchPlaces from '@/app/_hooks/useSearchPlaces';

import { useMap } from '@/app/shared/contexts/Map';
import { useParams } from 'next/navigation';

export interface SearchAgainButtonProps {}

const SearchAgainButton = () => {
  const mapContext = useMap();
  const { searchPlaces } = useSearchPlaces();
  const keyword = decodeURIComponent(useParams()?.keyword as string);
  const { currLocation, prevLocation, setPrevLocation, mapData } = mapContext!;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currLocation]);

  const handleSearchAgain = () => {
    searchPlaces(keyword, 'SEARCH_AGAIN');
    setIsVisible(false);
  };
  return (
    <>
      {isVisible && (
        <button
          onClick={handleSearchAgain}
          className='border-olive-green bg-olive-green absolute bottom-12 left-1/2 flex translate-x-[80px] items-center gap-2 rounded-full border-2 px-5 py-4 text-lg text-white shadow-lg'
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
