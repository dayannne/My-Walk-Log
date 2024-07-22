'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { IPlace } from '@/app/shared/types/map';
import useGeolocation from '@/app/_hooks/useGeolocation';

interface MapProps {
  children?: React.ReactNode;
}

interface IMapContextValue {
  mapData: kakao.maps.Map | null;

  markerClusterer: kakao.maps.MarkerClusterer | null;
  setMarkerClusterer: (markers: kakao.maps.MarkerClusterer | null) => void;
  overlays: kakao.maps.CustomOverlay[];
  setOverlays: (markers: kakao.maps.CustomOverlay[]) => void;
  places: IPlace[];
  setPlaces: React.Dispatch<React.SetStateAction<IPlace[]>>;

  prevKeyword: string[];
  setPrevKeyword: React.Dispatch<React.SetStateAction<string[]>>;
  currLocation: kakao.maps.LatLng | null;
  setCurrLocation: React.Dispatch<
    React.SetStateAction<kakao.maps.LatLng | null>
  >;
  prevLocation: kakao.maps.LatLng | null;
  setPrevLocation: React.Dispatch<
    React.SetStateAction<kakao.maps.LatLng | null>
  >;
}

const MapContext = createContext<IMapContextValue | null>({
  mapData: null,
  markerClusterer: null,
  setMarkerClusterer: () => {},
  overlays: [],
  setOverlays: () => {},
  places: [],
  setPlaces: () => {},
  prevKeyword: [],
  setPrevKeyword: () => {},
  currLocation: null,
  setCurrLocation: () => {},
  prevLocation: null,
  setPrevLocation: () => {},
});

const MapProvider: React.FC<MapProps> = ({ children }) => {
  const { location } = useGeolocation();

  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [markerClusterer, setMarkerClusterer] =
    useState<kakao.maps.MarkerClusterer | null>(null);
  const [overlays, setOverlays] = useState<kakao.maps.CustomOverlay[]>([]);
  const [prevKeyword, setPrevKeyword] = useState<string[]>([]);
  const [places, setPlaces] = useState<IPlace[]>([]);
  const [prevLocation, setPrevLocation] = useState<kakao.maps.LatLng | null>(
    null,
  );
  const [currLocation, setCurrLocation] = useState<kakao.maps.LatLng | null>(
    null,
  );

  useEffect(() => {
    const { kakao } = window;

    kakao?.maps.load(() => {
      const mapElement = mapRef.current;
      // 컴포넌트 mount 후 DOM 요소에 접근
      if (mapElement) {
        const options = {
          center: new kakao.maps.LatLng(
            location?.latitude as number,
            location?.longitude as number,
          ),
          level: 3,
          smooth: true,
          tileAnimation: false,
        };
        // 지도 생성
        const kakaoMap = new kakao.maps.Map(mapElement, options);

        // 현재 중심좌표 값 갱신
        kakao.maps.event.addListener(kakaoMap, 'dragend', function () {
          const latlng = kakaoMap.getCenter();
          setCurrLocation(latlng);
        });

        setMap(kakaoMap);
      }
    });
  }, [location?.latitude, location?.longitude]);

  const values: IMapContextValue = useMemo(
    () => ({
      currLocation,
      setCurrLocation,
      prevLocation,
      setPrevLocation,
      mapData: map,
      markerClusterer,
      setMarkerClusterer,
      overlays,
      setOverlays,
      places,
      setPlaces,
      prevKeyword,
      setPrevKeyword,
    }),
    [
      currLocation,
      prevLocation,
      map,
      markerClusterer,
      overlays,
      places,
      prevKeyword,
    ],
  );

  return (
    <>
      {location && (
        <MapContext.Provider value={values}>
          <div className='flex h-full w-full'>
            {children}
            <div id='map' ref={mapRef} className='h-full w-full'></div>
          </div>
        </MapContext.Provider>
      )}
    </>
  );
};

export default MapProvider;

export const useMap = () => useContext(MapContext);
