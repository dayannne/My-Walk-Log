'use client';

import React from 'react';

import { useMap } from '@/app/shared/contexts/Map';
import usePlaceDetail from '@/app/_hooks/usePlaceDetail';

const SearchResult = () => {
  const mapContext = useMap();
  const { handleClick } = usePlaceDetail();

  return (
    <ul id='placesList'>
      {mapContext?.places &&
        mapContext?.places?.map((place: any, index: number) => (
          <li
            key={place.id}
            className='item cursor-pointer'
            onClick={() => handleClick(place.id)}
          >
            <span className={`markerbg marker_${index + 1}`} />
            <div className=''>
              <h5>{place.placeName}</h5>
              <span>{place.address}</span>
              {place.roadAdress && <span>{place.roadAdress}</span>}
              <span className='tel'>{place.phone}</span>
            </div>
          </li>
        ))}
    </ul>
  );
};

export default SearchResult;
