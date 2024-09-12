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
  places: IPlaceInfo[];
  setPlaces: React.Dispatch<React.SetStateAction<IPlaceInfo[]>>;
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

export interface Latlng {
  latitude: number;
  longitude: number;
}

export interface IMarker {
  position: { lat: number; lng: number };
  content: string;
}

export interface IPlaceInfo {
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
