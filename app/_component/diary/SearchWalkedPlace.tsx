import React, { useRef, useState, useEffect } from 'react';
import { FILTER_CATEGORIES } from '@/app/shared/constant';
import { filterPlacesByKeyword } from '@/app/shared/function/filter';

interface Props {
  selectedPlace: any;
  setSelectedPlace: (place: any) => void;
}

const SearchWalkedPlace = ({ selectedPlace, setSelectedPlace }: Props) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [places, setPlaces] = useState<any[]>([]);
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

  const handleSelectPlace = (place: any) => {
    setPlaceName(place.place_name);
    setSelectedPlace(place);
    setPlaces([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (selectedPlace && mapRef.current) {
      const position = new kakao.maps.LatLng(selectedPlace.y, selectedPlace.x);
      const options = {
        center: position,
        level: 5,
      };
      const kakaoMap = new kakao.maps.Map(mapRef.current, options);

      const imageSrc = '/icons/icon-marker.svg',
        imageSize = new kakao.maps.Size(56, 56),
        imageOption = { offset: new kakao.maps.Point(27, 54) };
      const markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption,
      );

      const marker = new kakao.maps.Marker({
        map: kakaoMap,
        position: position,
        image: markerImage,
      });

      marker.setMap(kakaoMap);
      kakaoMap.panTo(position);
    }
  }, [selectedPlace]);

  return (
    <div className='flex flex-col gap-3'>
      <div className='flex max-h-56 w-full flex-col rounded-lg border border-solid border-gray-500 text-sm shadow-sm'>
        <input
          className={`w-full rounded-lg px-2 py-3 focus:outline-none ${places.length > 0 && 'border-b border-solid border-gray-400'}`}
          type='text'
          value={placeName}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
          placeholder='검색어를 입력하세요'
        />
        {places.length > 0 && (
          <ul className='flex-col overflow-y-scroll rounded-b-lg'>
            {places.map((place) => (
              <li key={place.id}>
                <button
                  className='hover:bg-hover group flex w-full cursor-pointer flex-col px-2 py-3'
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.preventDefault();
                    handleSelectPlace(place);
                  }}
                >
                  <span className='place-name'>{place.place_name}</span>
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
