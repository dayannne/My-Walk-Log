'use client';

import 'react-kakao-maps-sdk';

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

interface MapProps {
  children?: ReactNode;
}

interface IMapContextValue {
  mapData: kakao.maps.Map | null;
}

const MapContext = createContext<IMapContextValue | null>({
  mapData: null,
  // TODO: useMap으로 다룰 데이터 추가
});

const Map = ({ children }: MapProps) => {
  // TODO: 이후 use로직으로 location값 가져오기
  const location = {
    latitude: 33.450701,
    longitude: 126.570667,
  };

  const mapRef = useRef<HTMLDivElement>(null);

  const [map, setMap] = useState<kakao.maps.Map | null>(null);

  useEffect(() => {
    const { kakao } = window;

    kakao?.maps.load(() => {
      const mapElement = mapRef.current;
      const options = {
        center: new kakao.maps.LatLng(location.latitude, location.longitude),
        level: 3,
        smooth: true,
      };
      const kakaoMap = new kakao.maps.Map(
        mapElement as HTMLDivElement,
        options,
      );
      setMap(kakaoMap);
    });
  }, [location.latitude, location.longitude]);

  const values = useMemo(
    () => ({
      mapData: map as kakao.maps.Map,
    }),
    [map],
  );

  return (
    <MapContext.Provider value={values}>
      <div id='map' ref={mapRef} className='w-full h-full'>
        {children}
      </div>
    </MapContext.Provider>
  );
};

export default Map;

export const useMap = () => useContext(MapContext);
