import React, { useEffect } from 'react';
import { useMap } from '@/app/shared/contexts/Map';
import useGeolocation from '@/app/_hooks/useGeolocation';
import SearchCategory from '../search/SearchCategory';
import SearchAgainButton from '../search/SearchAgainButton';

const MapContainer: React.FC = () => {
  const { location } = useGeolocation();

  const { mapEl, setMapData, setCurrLocation, setPrevLocation } = useMap()!;

  useEffect(() => {
    if (!mapEl) return;

    // 지도 초기화 및 이벤트 설정
    const { kakao } = window;

    kakao?.maps.load(() => {
      const center = new kakao.maps.LatLng(
        location?.latitude as number,
        location?.longitude as number,
      );
      const mapElement = mapEl.current;
      if (mapElement) {
        const options = {
          center: center,
          level: 3,
        };
        const kakaoMap = new kakao.maps.Map(mapElement, options);

        // 지도 중심이 변경될 때마다 현재 위치 갱신
        kakao.maps.event.addListener(kakaoMap, 'dragend', () => {
          const latlng = kakaoMap.getCenter();
          setCurrLocation(latlng);
        });

        // 이전 위치 설정
        setPrevLocation(kakaoMap.getCenter());

        // 지도 데이터 저장
        setMapData(kakaoMap);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location?.latitude, location?.longitude]);

  return <div id='map' ref={mapEl} className='relative h-full w-full'></div>;
};

export default MapContainer;
