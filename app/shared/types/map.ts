export interface IMapContextValue {
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

export interface Latlng {
  latitude: number;
  longitude: number;
}

export interface IMarker {
  position: { lat: number; lng: number };
  content: string;
}

export interface IPlace {
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
  reviews: [];
  placeDetail: any;
}

export type SearchType = 'SEARCH_AGAIN' | 'SEARCH' | 'SEARCH_CATEGORY';
