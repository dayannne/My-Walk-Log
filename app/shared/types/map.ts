export interface IMapContextValue {
  mapEl: React.RefObject<HTMLDivElement> | null;
  mapData: kakao.maps.Map | null;
  setMapData: React.Dispatch<React.SetStateAction<kakao.maps.Map | null>>;
  markers: kakao.maps.Marker[];
  setMarkers: (overlays: kakao.maps.Marker[]) => void;
  markerClusterer: kakao.maps.MarkerClusterer | null;
  setMarkerClusterer: (markers: kakao.maps.MarkerClusterer | null) => void;
  overlays: kakao.maps.CustomOverlay[];
  setOverlays: (overlays: kakao.maps.CustomOverlay[]) => void;
  places: IAddressInfo[];
  setPlaces: React.Dispatch<React.SetStateAction<IAddressInfo[]>>;
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

export enum KakaoMapStatus {
  OK = 'OK',
  ZERO_RESULT = 'ZERO_RESULT',
  ERROR = 'ERROR',
}

export interface Latlng {
  latitude: number;
  longitude: number;
}

export interface IMarker {
  position: { lat: number; lng: number };
  content: string;
}

export interface IRegion {
  region_type: string;
  code: string;
  address_name: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  region_4depth_name: string;
  x: number;
  y: number;
}

export interface IAddress {
  code: string;
  areaName: string;
  center: number[];
  polygonPaths: number[][];
}

export interface IAddressInfo {
  address_name: string;
  category_group_code?: string;
  category_group_name?: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
}

export type SearchType = 'SEARCH_AGAIN' | 'SEARCH' | 'SEARCH_CATEGORY';
