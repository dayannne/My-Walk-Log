'use client';

import React, {
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
  useEffect,
} from 'react';
import { IMapContextValue, IPlaceInfo } from '@/app/shared/types/map';
import useGeolocation from '@/app/_hooks/useGeolocation';

interface MapProps {
  children?: React.ReactNode;
}

const MapContext = createContext<IMapContextValue | null>(null);

const MapProvider: React.FC<MapProps> = ({ children }) => {
  const { location } = useGeolocation();
  const mapEl = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [markers, setMarkers] = useState<kakao.maps.Marker[]>([]);
  const [markerClusterer, setMarkerClusterer] =
    useState<kakao.maps.MarkerClusterer | null>(null);
  const [overlays, setOverlays] = useState<kakao.maps.CustomOverlay[]>([]);
  const [prevKeyword, setPrevKeyword] = useState<string[]>([]);
  const [places, setPlaces] = useState<IPlaceInfo[]>([]);
  const [prevLocation, setPrevLocation] = useState<kakao.maps.LatLng | null>(
    null,
  );
  const [currLocation, setCurrLocation] = useState<kakao.maps.LatLng | null>(
    null,
  );

  useEffect(() => {
    const { kakao } = window;

    kakao?.maps.load(() => {
      const mapElement = mapEl.current;
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
        const kakaoMap = new kakao.maps.Map(mapElement, options);

        kakao.maps.event.addListener(kakaoMap, 'dragend', () => {
          const latlng = kakaoMap.getCenter();
          setCurrLocation(latlng);
        });

        setMap(kakaoMap);
      }
    });
  }, [location?.latitude, location?.longitude]);

  const values: IMapContextValue = useMemo(
    () => ({
      mapEl,
      mapData: map,
      setMapData: setMap,
      markers,
      setMarkers,
      markerClusterer,
      setMarkerClusterer,
      overlays,
      setOverlays,
      places,
      setPlaces,
      prevKeyword,
      setPrevKeyword,
      currLocation,
      setCurrLocation,
      prevLocation,
      setPrevLocation,
    }),
    [
      map,
      markers,
      markerClusterer,
      overlays,
      places,
      prevKeyword,
      currLocation,
      prevLocation,
    ],
  );

  return (
    <>
      {location && (
        <MapContext.Provider value={values}>{children}</MapContext.Provider>
      )}
    </>
  );
};

export default MapProvider;

export const useMap = () => useContext(MapContext);
