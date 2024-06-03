'use client';

import React, { useEffect } from 'react';
import { useMap } from '../common/Map';
import { fetchPlaceDetail } from '@/app/api/map';

const SearchResult = () => {
  const mapContext = useMap();

  useEffect(() => {
    if (mapContext && mapContext?.keyword !== '') {
      const { keyword } = mapContext;
      var ps = new kakao.maps.services.Places();
      ps.keywordSearch(keyword, placesSearchCB);
    }
  }, [mapContext?.keyword]);

  const placesSearchCB = (
    data: any,
    status: kakao.maps.services.Status,
    pagination: any,
  ) => {
    if (status === kakao.maps.services.Status.OK) {
      mapContext?.setPlaces(data);

      const bounds = new kakao.maps.LatLngBounds();
      let markers = [];

      for (var i = 0; i < data.length; i++) {
        // @ts-ignore
        markers.push({
          position: {
            lat: data[i].y,
            lng: data[i].x,
          },
          content: data[i].place_name,
        });
        // @ts-ignore
        bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
      }

      // @ts-ignore
      mapContext?.setMarkers(markers);

      // 검색된 장소 위치를 기준으로 지도 범위를 재설정
      mapContext?.mapData?.setBounds(bounds);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      alert('검색 결과가 존재하지 않습니다.');
      return;
    } else if (status === kakao.maps.services.Status.ERROR) {
      alert('검색 결과 중 오류가 발생했습니다.');
      return;
    }
  };

  const handleClick = async (placeId: string) => {
    const result = await fetchPlaceDetail(placeId);
    console.log(result);
  };

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
