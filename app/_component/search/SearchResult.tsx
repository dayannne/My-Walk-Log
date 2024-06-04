'use client';

import ReactDOMServer from 'react-dom/server';
import React, { useEffect } from 'react';
import { useMap } from '../common/Map';
import { fetchPlaceDetail } from '@/app/api/map';
import { filterPlacesByKeyword } from '@/app/shared/function/filter';
import { FILTER_CATEGORIES } from '@/app/shared/constant';
import { MapComponent } from 'react-kakao-maps-sdk';
import useGeolocation from '@/app/_hooks/useGeolocation';

const SearchResult = () => {
  const mapContext = useMap();
  const { location } = useGeolocation();

  useEffect(() => {
    if (mapContext && mapContext?.keyword !== '') {
      const { keyword, mapData } = mapContext;

      // 장소 검색 서비스 객체
      const places = new kakao.maps.services.Places();
      // 현재 지도의 영역값
      const bounds = mapData?.getBounds();

      places.keywordSearch(keyword, placesSearchCB, {
        // 검색 기준 위치
        location: new kakao.maps.LatLng(
          location?.latitude as number,
          location?.longitude as number,
        ),
        // 검색할 사각형 영역
        bounds: bounds,
      });
    }
  }, [mapContext?.keyword]);

  /* 검색 결과를 받을 콜백함수 */
  const placesSearchCB = (
    data: any,
    status: kakao.maps.services.Status,
    pagination: any,
  ) => {
    if (status === kakao.maps.services.Status.OK) {
      // 이전 마커 & 커스텀 오버레이 삭제
      clearMarkersAndOverlays();

      // 검색 결과 필터링 (산책 가능 장소)
      const filteredPlaces = filterPlacesByKeyword(data, FILTER_CATEGORIES);

      if (filteredPlaces.length === 0) {
        return alert('검색 결과가 존재하지 않습니다.');
      }

      // 장소 저장
      mapContext?.setPlaces(filteredPlaces);
      // 마커 & 커스텀 오버레이 띄우기
      displayMarkers(filteredPlaces);
    } else {
      if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 존재하지 않습니다.');
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert('검색 결과 중 오류가 발생했습니다.');
      }
    }
  };

  /* 마커 & 커스텀 오버레이 띄우기 */
  const displayMarkers = (places: any[]) => {
    let markers: kakao.maps.Marker[] = [];
    let overlays: kakao.maps.CustomOverlay[] = [];

    // 커스텀 오버레이 객체 생성
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
    });

    mapContext?.setMarkers(markers);
    mapContext?.setOverlays(overlays);
  };

  /* 이전 마커 & 커스텀 오버레이 삭제 */
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
