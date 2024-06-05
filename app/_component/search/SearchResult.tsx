'use client';

import ReactDOMServer from 'react-dom/server';
import React, { useEffect } from 'react';
import { useMap } from '../common/Map';
import { fetchPlaceDetail } from '@/app/api/map';
import { filterPlacesByKeyword } from '@/app/shared/function/filter';
import { FILTER_CATEGORIES } from '@/app/shared/constant';
import { MapComponent } from 'react-kakao-maps-sdk';
import useGeolocation from '@/app/_hooks/useGeolocation';
import MarkerInfo from '../common/MarkerInfo';
import useMarkerClusterer from '@/app/_hooks/useMarkerClusterer';

const SearchResult = () => {
  const mapContext = useMap();
  const { location } = useGeolocation();
  const { clusterer } = useMarkerClusterer();

  useEffect(() => {
    if (mapContext && mapContext?.keyword !== '') {
      const { keyword, mapData, setKeyword } = mapContext;

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
      setKeyword('');
    }

    return mapContext?.markerClusterer?.clear();
  }, [mapContext?.keyword]);

  /* 검색 결과를 받을 콜백함수 */
  const placesSearchCB = (
    data: any,
    status: kakao.maps.services.Status,
    pagination: any,
  ) => {
    if (status === kakao.maps.services.Status.OK) {
      // 이전 마커 & 마커 인포윈도우 삭제
      clearMarkersAndInfo();

      // 검색 결과 필터링 (산책 가능 장소)
      const filteredPlaces = filterPlacesByKeyword(data, FILTER_CATEGORIES);

      if (filteredPlaces.length === 0) {
        return alert('검색 결과가 존재하지 않습니다.');
      }

      // 장소 저장
      mapContext?.setPlaces(filteredPlaces);
      // 마커 & 마커 인포윈도우 & 마커 클러스터러 띄우기
      displayMarkers(filteredPlaces);
    } else {
      if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 존재하지 않습니다.');
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert('검색 결과 중 오류가 발생했습니다.');
      }
    }
  };

  /* 마커 & 마커 인포윈도우 & 클러스터러 띄우기 */
  const displayMarkers = (places: any[]) => {
    let markers: kakao.maps.Marker[] = [];
    let overlays: kakao.maps.CustomOverlay[] = [];

    // 마커 인포윈도우 객체 생성
    let currentMarkerInfo: kakao.maps.CustomOverlay | null = null;

    places.forEach((place, index) => {
      const position = new kakao.maps.LatLng(place.y, place.x);

      // 마커 이미지
      const imageSrc = '/icons/icon-marker.svg',
        imageSize = new kakao.maps.Size(56, 56),
        imageOption = { offset: new kakao.maps.Point(26.5, 54) };
      const markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption,
      );
      // 마커
      const marker = new kakao.maps.Marker({
        map: mapContext?.mapData as kakao.maps.Map,
        position: position,
        image: markerImage,
      });
      kakao.maps.event.addListener(marker, 'click', () => {
        // 현재 활성화된 오버레이가 있으면 제거
        if (currentMarkerInfo) {
          currentMarkerInfo.setMap(null);
        } else {
        }
        // 클릭된 마커의 오버레이를 표시하고 현재 활성화된 오버레이로 설정
        mapContext?.mapData?.panTo(marker.getPosition());
        newMarkerInfo.setMap(mapContext?.mapData as kakao.maps.Map);
        currentMarkerInfo = newMarkerInfo;
      });

      // 마커 인포윈도우
      const markerInfoContent = (
        <MarkerInfo placeId={place.id} placeName={place.place_name} />
      );
      const markerInfo = document.createElement('div');
      markerInfo.innerHTML = ReactDOMServer.renderToString(markerInfoContent);
      markerInfo.addEventListener('click', () => {
        handleClick(place.id);

        mapContext?.mapData?.panTo(marker.getPosition());
      });
      const newMarkerInfo = new kakao.maps.CustomOverlay({
        position: position,
        content: markerInfo,
        yAnchor: 2.8,
        clickable: true,
      });

      markers.push(marker);
      overlays.push(newMarkerInfo);
    });

    // 마커 클러스터러 생성
    const newClusterer = new kakao.maps.MarkerClusterer({
      ...clusterer,
      markers: markers,
    });

    // 마커 클러스터러에 클릭이벤트를 등록
    // 클릭할 때마다 zoomLevel을 1씩 확대
    kakao.maps.event.addListener(
      newClusterer,
      'clusterclick',
      (cluster: { getCenter: () => any }) => {
        const level = mapContext?.mapData?.getLevel()! - 1;
        // 지도를 클릭된 클러스터의 마커의 위치를 기준으로 확대
        mapContext?.mapData?.setLevel(level, { anchor: cluster.getCenter() });
      },
    );

    mapContext?.setMarkers(markers);
    mapContext?.setOverlays(overlays);
    mapContext?.setMarkerClusterer(newClusterer);
  };

  /* 이전 마커 & 마커 인포윈도우 삭제 */
  const clearMarkersAndInfo = () => {
    if (mapContext?.markers) {
      mapContext?.markers.forEach((marker) => marker.setMap(null));
      mapContext?.setMarkers([]);
      mapContext?.setMarkerClusterer(null);
    }

    if (mapContext?.overlays) {
      mapContext?.overlays.forEach((overlay) => overlay.setMap(null));
      mapContext?.setOverlays([]);
    }
  };

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
