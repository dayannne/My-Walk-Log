'use client';

import ReactDOMServer from 'react-dom/server';
import React, { useEffect } from 'react';
import { useMap } from '../common/Map';
import { fetchPlaceDetail } from '@/app/api/map';
import { filterPlacesByKeyword } from '@/app/shared/function/filter';
import { FILTER_CATEGORIES } from '@/app/shared/constant';
import { MapComponent } from 'react-kakao-maps-sdk';

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
      clearMarkersAndOverlays();

      const filteredPlaces = filterPlacesByKeyword(data, FILTER_CATEGORIES);

      if (filteredPlaces.length === 0) {
        return alert('검색 결과가 존재하지 않습니다.');
      }

      mapContext?.setPlaces(filteredPlaces);

      displayMarkers(filteredPlaces);
    } else {
      handleSearchError(status);
    }
  };
  const displayMarkers = (places: any[]) => {
    let markers: kakao.maps.Marker[] = [];
    let overlays: kakao.maps.CustomOverlay[] = [];

    const bounds = new kakao.maps.LatLngBounds();

    // 현재 활성화된 오버레이를 저장할 변수
    let currentOverlay: kakao.maps.CustomOverlay | null = null;

    places.forEach((place, index) => {
      const content = <Label placeName={place.place_name} />;
      const position = new kakao.maps.LatLng(place.y, place.x);

      const imageSrc = '/icons/icon-marker.svg',
        imageSize = new kakao.maps.Size(40, 40),
        imageOption = { offset: new kakao.maps.Point(19.3, 40) };

      // 마커 이미지
      const markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption,
      );
      const marker = new kakao.maps.Marker({
        map: mapContext?.mapData as kakao.maps.Map,
        position: position,
        image: markerImage,
      });

      const customOverlay = new kakao.maps.CustomOverlay({
        position: position,
        content: ReactDOMServer.renderToString(content),
      });

      kakao.maps.event.addListener(marker, 'click', () => {
        // 현재 활성화된 오버레이가 있으면 제거
        if (currentOverlay) {
          currentOverlay.setMap(null);
        }
        // 클릭된 마커의 오버레이를 표시하고 현재 활성화된 오버레이로 설정
        customOverlay.setMap(mapContext?.mapData as kakao.maps.Map);
        currentOverlay = customOverlay;
      });

      markers.push(marker);
      overlays.push(customOverlay);
      bounds.extend(position);
    });

    mapContext?.setMarkers(markers);
    mapContext?.setOverlays(overlays);
    mapContext?.mapData?.setBounds(bounds);
  };

  const clearMarkersAndOverlays = () => {
    if (mapContext?.markers) {
      mapContext?.markers.forEach((marker) => marker.setMap(null));
      mapContext?.setMarkers([]);
    }

    if (mapContext?.overlays) {
      mapContext?.overlays.forEach((overlay) => overlay.setMap(null));
      mapContext?.setOverlays([]);
    }
  };

  const handleSearchError = (status: kakao.maps.services.Status) => {
    if (status === kakao.maps.services.Status.ZERO_RESULT) {
      alert('검색 결과가 존재하지 않습니다.');
    } else if (status === kakao.maps.services.Status.ERROR) {
      alert('검색 결과 중 오류가 발생했습니다.');
    }
  };

  const Label = ({ placeName }: { placeName: string }) => (
    <div className='label'>
      <span className='left'></span>
      <span className='center'>{placeName}</span>
      <span className='right'></span>
    </div>
  );

  const handleClick = async (placeId: string) => {
    const result = await fetchPlaceDetail(placeId);
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
