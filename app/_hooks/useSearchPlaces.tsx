import { useEffect } from 'react';

import { filterPlacesByKeyword } from '@/app/shared/function/filter';
import { FILTER_CATEGORIES } from '@/app/shared/constant';
import { useMap } from '../_component/common/Map';
import MarkerInfo from '../_component/common/MarkerInfo';
import ReactDOMServer from 'react-dom/server';

import useMarkerClusterer from './useMarkerClusterer';
import usePlaceDetail from './usePlaceDetail';

const useSearchPlaces = () => {
  const mapContext = useMap();
  const location = mapContext?.mapData?.getCenter();
  const { handleClick } = usePlaceDetail();
  const { clusterer } = useMarkerClusterer();

  const searchPlaces = (keyword: string) => {
    if (keyword !== '') {
      const { mapData, setKeyword, setPrevKeyword, setPrevLocation } =
        mapContext!;

      const places = new kakao.maps.services.Places();
      const bounds = mapData?.getBounds();

      places.keywordSearch(keyword, searchPlacesCB, {
        location,
        bounds,
      });

      setPrevKeyword((prev) => [...prev, keyword]);
      setPrevLocation(mapData?.getCenter() as kakao.maps.LatLng);
      mapContext?.markerClusterer?.clear();
    }
  };

  // keywordSearch 콜백 함수
  const searchPlacesCB = (
    data: any,
    status: kakao.maps.services.Status,
    pagination: any,
  ) => {
    if (status === kakao.maps.services.Status.OK) {
      clearMarkersAndInfo();

      const filteredPlaces = filterPlacesByKeyword(data, FILTER_CATEGORIES);

      if (filteredPlaces.length === 0) {
        alert('검색 결과가 존재하지 않습니다.');
      }

      mapContext?.setPlaces(filteredPlaces);
      displayMarkers(filteredPlaces);
    } else {
      if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 존재하지 않습니다.');
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert('검색 결과 중 오류가 발생했습니다.');
      }
    }
  };

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

  return { searchPlaces };
};

export default useSearchPlaces;
