import ReactDOMServer from 'react-dom/server';
import { useState } from 'react';
import { useMap } from '../shared/contexts/Map';
import useMarkerClusterer from './useMarkerClusterer';
import { filterPlacesByKeyword } from '@/shared/function/filter';
import MarkerInfo from '../components/MarkerInfo';
import { useCreatePlace } from '../store/server/place';
import { SearchType } from '../shared/types/map';
import { useModalStore } from '../store/client/modal';

const useSearchPlaces = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [places, setPlaces] = useState<kakao.maps.services.PlacesSearchResult | null>(
   null,
  );
  const mapContext = useMap();
  const setOpenInfo = useModalStore((state) => state.setOpenInfo);
  const { mutate: createPlace } = useCreatePlace();
  const { createClusterer } = useMarkerClusterer();
  const location = mapContext?.mapData?.getCenter();

  const searchPlaces = (keyword: string, type: SearchType) => {
    if (keyword !== '') {
      setIsLoading(true);
      const { mapData, setPrevKeyword, setPrevLocation } = mapContext!;

      const placesService = new kakao.maps.services.Places();
      const bounds = mapData?.getBounds();

      placesService.keywordSearch(
        keyword,
        (data, status, pagination) =>
          searchPlacesCB(data, status, pagination, type),
        {
          location:
            type === 'SEARCH_AGAIN' || type === 'SEARCH_CATEGORY'
              ? location
              : undefined,
          bounds:
            type === 'SEARCH_AGAIN' || type === 'SEARCH_CATEGORY'
              ? bounds
              : undefined,
        },
      );

      setPrevKeyword((prev) => [...prev, keyword]);
      setPrevLocation(mapData?.getCenter() as kakao.maps.LatLng);

      mapContext?.markerClusterer?.clear();
    }
  };

  const searchPlacesCB = async (
    data: kakao.maps.services.PlacesSearchResult,
    status: kakao.maps.services.Status,
    pagination: kakao.maps.Pagination,
    type: SearchType, // 추가된 type 인수
  ) => {
    if (status === kakao.maps.services.Status.OK) {
      clearMarkersAndInfo();

      const filteredPlaces = filterPlacesByKeyword(data);

      setPlaces(filteredPlaces);
      displayMarkers(filteredPlaces, type);
      createPlace(filteredPlaces);
    } else {
      if (status === kakao.maps.services.Status.ZERO_RESULT) {
        return setPlaces([]);
      } else if (status === kakao.maps.services.Status.ERROR) {
        return alert('검색 결과 중 오류가 발생했습니다.');
      }
    }
    setIsLoading(false);
  };

  const displayMarkers = (
    places: kakao.maps.services.PlacesSearchResult,
    type: SearchType,
  ) => {
    let overlays: kakao.maps.CustomOverlay[] = [];
    let bounds = new kakao.maps.LatLngBounds();

    places.forEach((place, index) => {
      const position = new kakao.maps.LatLng(
        parseFloat(place.y),
        parseFloat(place.x),
      );

      // LatLngBounds 객체에 좌표를 추가
      bounds.extend(position);

      const markerInfoContent = <MarkerInfo placeName={place.place_name} />;
      const markerInfo = document.createElement('div');
      markerInfo.innerHTML = ReactDOMServer.renderToString(markerInfoContent);
      markerInfo.addEventListener('click', () => {
        mapContext?.mapData?.panTo(position);
        setOpenInfo(place.id);
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

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정 (type에 따라 설정)
    if (type !== 'SEARCH_AGAIN' && type !== 'SEARCH_CATEGORY') {
      mapContext?.mapData?.setBounds(bounds);
    }
  };

  const clearMarkersAndInfo = () => {
    if (mapContext?.markerClusterer) {
      mapContext?.markerClusterer.setMap(null);
      mapContext?.setMarkerClusterer(null);
    }
    if (mapContext?.overlays) {
      mapContext?.overlays.forEach((overlay) => overlay.setMap(null));
      mapContext?.setOverlays([]);
    }
  };

  return {
    searchPlaces,
    displayMarkers,
    clearMarkersAndInfo,
    places,
    isLoading,
  }; // places 반환
};

export default useSearchPlaces;
