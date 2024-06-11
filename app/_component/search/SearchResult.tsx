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
            key={index}
            className='item cursor-pointer'
            onClick={() => handleClick(place.id)}
          >
            <span className={`markerbg marker_${index + 1}`} />
            <div className='info'>
              <h5>{place.place_name}</h5>
              <span>{place.road_address_name || place.address_name}</span>
              <span className='tel'>{place.phone}</span>
            </div>
          </li>
        ))}
    </ul>
  );
};

export default SearchResult;
