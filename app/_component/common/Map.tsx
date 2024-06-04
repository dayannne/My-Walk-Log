'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import useGeolocation from '@/app/_hooks/useGeolocation';

import { IPlace } from '@/app/shared/types/map';

interface MapProps {
  children?: React.ReactNode;
}

interface IMapContextValue {
  mapRef: React.MutableRefObject<HTMLDivElement | null>;
  mapData: kakao.maps.Map | null;
  markers: kakao.maps.Marker[];
  setMarkers: (markers: kakao.maps.Marker[]) => void;
  overlays: kakao.maps.CustomOverlay[];
  setOverlays: (markers: kakao.maps.CustomOverlay[]) => void;
  places: IPlace[];
  setPlaces: React.Dispatch<React.SetStateAction<IPlace[]>>;
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  prevKeyword: string;
  setPrevKeyword: React.Dispatch<React.SetStateAction<string>>;
}

const MapContext = createContext<IMapContextValue | null>({
  mapRef: { current: null },
  mapData: null,
  markers: [],
  setMarkers: () => {},
  overlays: [],
  setOverlays: () => {},
  places: [],
  setPlaces: () => {},
  keyword: '',
  setKeyword: () => {},
  prevKeyword: '',
  setPrevKeyword: () => {},
});

const MapProvider: React.FC<MapProps> = ({ children }) => {
  const { location } = useGeolocation();

  const mapRef = useRef<HTMLDivElement>(null);

  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [markers, setMarkers] = useState<kakao.maps.Marker[]>([]);
  const [overlays, setOverlays] = useState<kakao.maps.CustomOverlay[]>([]);
  const [keyword, setKeyword] = useState<string>('');
  const [prevKeyword, setPrevKeyword] = useState<string>('');
  const [places, setPlaces] = useState<IPlace[]>([]); // 장소 배열 상태 추가

  useEffect(() => {
    const { kakao } = window;

    kakao?.maps.load(() => {
      const mapElement = mapRef.current;
      const options = {
        center: new kakao.maps.LatLng(
          location?.latitude as number,
          location?.longitude as number,
        ),
        level: 3,
        smooth: true,
        tileAnimation: false,
      };
      let zoomControl = new kakao.maps.ZoomControl();
      // 지도 생성
      const kakaoMap = new kakao.maps.Map(
        mapElement as HTMLDivElement,
        options,
      );

      kakaoMap.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
      setMap(kakaoMap);
    });
  }, [location?.latitude, location?.longitude]);

  const values: IMapContextValue = useMemo(
    () => ({
      mapRef,
      mapData: map,
      markers,
      setMarkers,
      overlays,
      setOverlays,
      places,
      setPlaces,
      keyword,
      setKeyword,
      prevKeyword,
      setPrevKeyword,
    }),
    [map, markers, overlays, places, keyword, prevKeyword], // places 배열 추가
  );

  return (
    <>
      {location && (
        <MapContext.Provider value={values}>
          <div className='w-full h-full flex'>
            {children}
            <div id='map' ref={mapRef} className='w-full h-full'></div>
          </div>
        </MapContext.Provider>
      )}
    </>
  );
};

export default MapProvider;

export const useMap = () => useContext(MapContext);
