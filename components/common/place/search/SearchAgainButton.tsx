'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { useMap } from '@/shared/contexts/Map';
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { useRefreshStore } from '@/store/client/refresh';

export interface SearchAgainButtonProps {}

const SearchAgainButton = () => {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const keyword = params?.keyword
    ? decodeURIComponent(params?.keyword as string)
    : null;
  const mapContext = useMap();
  const { setRefreshKey } = useRefreshStore();
  const { currLocation, prevLocation, setPrevLocation, mapData } = mapContext!;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currlat = currLocation?.getLat();
    const currlng = currLocation?.getLng();

    const prevLat = prevLocation?.getLat();
    const prevLng = prevLocation?.getLng();

    if (
      keyword &&
      keyword !== '' &&
      (currlat !== prevLat || currlng !== prevLng)
    ) {
      setIsVisible(true);
      setPrevLocation(mapData?.getCenter() as kakao.maps.LatLng);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currLocation]);

  const handleSearchAgain = () => {
    const currUrl = `${decodeURIComponent(pathname)}?${searchParams.toString()}`;
    const newUrl = `/place/search/${keyword}?type=SEARCH_AGAIN`;
    setIsVisible(false);
    if (currUrl === newUrl) {
      setRefreshKey();
      router.refresh();
    } else router.push(`/place/search/${keyword}?type=SEARCH_AGAIN`);
  };
  return (
    <>
      {isVisible && (
        <button
          onClick={handleSearchAgain}
          className='border-olive-green bg-olive-green absolute bottom-12 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full border-2 p-3 text-sm text-white shadow-lg lg:px-5 lg:py-4 lg:text-lg'
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
