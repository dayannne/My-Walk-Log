import ReactDOMServer from 'react-dom/server';

import { useMap } from '../shared/contexts/Map';
import useMarkerClusterer from './useMarkerClusterer';

import { filterPlacesByKeyword } from '@/app/shared/function/filter';

import MarkerInfo from '../_component/common/MarkerInfo';
import { useParams, useRouter } from 'next/navigation';
import { useCreatePlace } from '../store/server/place';
import { SearchType } from '../shared/types/map';

const useSearchPlaces = () => {
  const router = useRouter();
  const mapContext = useMap();
  const { mutate: createPlace } = useCreatePlace();
  const { createClusterer } = useMarkerClusterer();
  const location = mapContext?.mapData?.getCenter();
  const keyword = decodeURIComponent(useParams()?.keyword as string);

  const searchPlaces = (keyword: string, type: SearchType) => {
    if (keyword !== '') {
      const { mapData, setPrevKeyword, setPrevLocation } = mapContext!;

      const places = new kakao.maps.services.Places();
      const bounds = mapData?.getBounds();

      places.keywordSearch(keyword, searchPlacesCB, {
        location: type === 'SEARCH_AGAIN' ? location : undefined,
        bounds:
          type === 'SEARCH_AGAIN' || type === 'SEARCH_CATEGORY'
            ? bounds
            : undefined,
      });

      setPrevKeyword((prev) => [...prev, keyword]);
      setPrevLocation(mapData?.getCenter() as kakao.maps.LatLng);

      mapContext?.markerClusterer?.clear();
    }
  };

  // keywordSearch 콜백 함수
  const searchPlacesCB = async (
    data: any,
    status: kakao.maps.services.Status,
    pagination: any,
  ) => {
    if (status === kakao.maps.services.Status.OK) {
      clearMarkersAndInfo();

      const filteredPlaces = filterPlacesByKeyword(data);

      if (filteredPlaces.length === 0) {
        return alert('검색 결과가 존재하지 않습니다.');
      }

      mapContext?.setPlaces(filteredPlaces);
      displayMarkers(filteredPlaces);
      createPlace(filteredPlaces);
    } else {
      if (status === kakao.maps.services.Status.ZERO_RESULT) {
        return alert('검색 결과가 존재하지 않습니다.');
      } else if (status === kakao.maps.services.Status.ERROR) {
        return alert('검색 결과 중 오류가 발생했습니다.');
      }
    }
  };

  const displayMarkers = (places: any[]) => {
    let overlays: kakao.maps.CustomOverlay[] = [];
    let bounds = new kakao.maps.LatLngBounds();

    places.forEach((place, index) => {
      const position = new kakao.maps.LatLng(place.y, place.x);

      // LatLngBounds 객체에 좌표를 추가
      bounds.extend(position);

      const markerInfoContent = <MarkerInfo placeName={place.place_name} />;
      const markerInfo = document.createElement('div');
      markerInfo.innerHTML = ReactDOMServer.renderToString(markerInfoContent);
      markerInfo.addEventListener('click', () => {
        mapContext?.mapData?.panTo(position);
        router.push(`/place/search/${keyword}/detail/${place.id}`);
      });
      const newMarkerInfo = new kakao.maps.CustomOverlay({
        position: position,
        content: markerInfo,
        yAnchor: 1.5,
        clickable: true,
      });

      overlays.push(newMarkerInfo);
      newMarkerInfo.setMap(mapContext?.mapData as kakao.maps.Map);
    });

    // 마커 클러스터러 생성
    const newClusterer = createClusterer(overlays);

    mapContext?.setOverlays(overlays);
    mapContext?.setMarkerClusterer(newClusterer);
    // 검색된 장소 위치를 기준으로 지도 범위를 재설정
    mapContext?.mapData?.setBounds(bounds);
  };

  const clearMarkersAndInfo = () => {
    if (mapContext?.overlays) {
      mapContext?.overlays.forEach((overlay) => overlay.setMap(null));
      mapContext?.setOverlays([]);
    }
  };

  return { searchPlaces, displayMarkers };
};

export default useSearchPlaces;
