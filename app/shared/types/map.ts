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

export type SearchType = 'SEARCH_AGAIN' | 'SEARCH';
