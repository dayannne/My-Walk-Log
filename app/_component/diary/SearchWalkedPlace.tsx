import React, { useRef, useState, useEffect } from 'react';
import { FILTER_CATEGORIES } from '@/app/shared/constant';
import { filterPlacesByKeyword } from '@/app/shared/function/filter';
import Image from 'next/image';

interface Props {
  selectedPlace: kakao.maps.services.PlacesSearchResultItem | null;
  setSelectedPlace: (
    place: kakao.maps.services.PlacesSearchResultItem | null,
  ) => void;
}

const SearchWalkedPlace = ({ selectedPlace, setSelectedPlace }: Props) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const kakaoMapRef = useRef<kakao.maps.Map | null>(null);
  const markerRef = useRef<kakao.maps.Marker | null>(null);
  const [places, setPlaces] = useState<kakao.maps.services.PlacesSearchResult>(
    [],
  );
  const [placeName, setPlaceName] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlaceName(e.currentTarget.value);
    if (e.currentTarget.value !== '') {
      const ps = new kakao.maps.services.Places();
      ps.keywordSearch(e.currentTarget.value, (data, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const filteredPlaces = filterPlacesByKeyword(data);
          setPlaces(filteredPlaces);
        } else {
          setPlaces([]);
        }
      });
    } else {
      setPlaces([]);
    }
  };
  const handleSelectPlace = (
    place: kakao.maps.services.PlacesSearchResultItem,
  ) => {
    setPlaceName(place.place_name);
    setSelectedPlace(place);
    setTimeout(() => {
      setPlaces([]);
    }, 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (!kakaoMapRef.current && mapRef.current) {
      const options = {
        center: new kakao.maps.LatLng(37.5665, 126.978),
        level: 5,
      };
      kakaoMapRef.current = new kakao.maps.Map(mapRef.current, options);
    }
  }, []);

  useEffect(() => {
    if (places.length === 0 && kakaoMapRef.current) {
      const position = new kakao.maps.LatLng(
        parseFloat(selectedPlace?.y as string),
        parseFloat(selectedPlace?.x as string),
      );
      kakaoMapRef.current.setCenter(position);

      // 기존 마커를 제거
      if (markerRef.current) {
        markerRef.current.setMap(null);
      }

      const imageSrc = '/icons/icon-marker.svg';
      const imageSize = new kakao.maps.Size(56, 56);
      const imageOption = { offset: new kakao.maps.Point(27, 54) };
      const markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption,
      );

      // 새 마커 생성
      const marker = new kakao.maps.Marker({
        position: position,
        image: markerImage,
      });

      marker.setMap(kakaoMapRef.current);
      markerRef.current = marker; // 새 마커를 ref에 저장
    }
  }, [selectedPlace, places]);

  return (
    <div className='flex flex-col gap-3'>
      <div className='relative flex max-h-56 w-full flex-col rounded-lg border border-solid border-gray-500 text-sm shadow-sm'>
        <Image
          className='absolute left-2 top-5 w-5 -translate-y-1/2'
          src='/icons/icon-search.svg'
          alt=''
          width={20}
          height={20}
        />
        <input
          className={`w-full rounded-lg px-2 py-3 pl-8 text-xs focus:outline-none ${places.length > 0 && 'rounded-bl-none rounded-br-none border-b border-solid border-gray-300'}`}
          type='text'
          value={placeName}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
          placeholder='장소명으로 검색 (ex.서울숲)'
        />
        {places.length > 0 && (
          <ul className='flex-col overflow-y-scroll rounded-b-lg'>
            {places.map((place) => (
              <li key={place.id}>
                <button
                  type='button'
                  className='hover:bg-hover group flex w-full cursor-pointer flex-col px-2 py-2'
                  onClick={() => handleSelectPlace(place)}
                >
                  <span className='place-name text-xs'>{place.place_name}</span>
                  <span className='text-xs text-gray-500'>
                    {place.address_name}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {selectedPlace && (
        <div
          id='walked-map'
          ref={mapRef}
          className='aspect-square h-56 w-full'
        />
      )}
    </div>
  );
};

export default SearchWalkedPlace;
