import { create } from 'zustand';

interface PlaceState {
  placeId: string | null;
  setPlaceId: (newPlace: string | null) => void;
  clearPlace: () => void;
}

export const usePlaceIdStore = create<PlaceState>((set) => ({
  placeId: null,
  setPlaceId: (newPlaceId: string | null) => set({ placeId: newPlaceId }),
  clearPlace: () => set({ placeId: null }),
}));

interface PlaceMenuState {
  placeMenu: number;
  setPlaceMenu: (userData: number) => void;
}

export const usePlaceMenuStore = create<PlaceMenuState>((set) => ({
  placeMenu: 0,
  setPlaceMenu: (newMenu: number) => set({ placeMenu: newMenu }),
}));

interface PlaceDetailState {
  placeDetail: any;
  setPlaceDetail: (placeDetail: any) => void;
  placeDetailState: number;
  setPlaceDetailState: (userData: number) => void;
}

export const usePlaceDetailStore = create<PlaceDetailState>((set) => ({
  placeDetail: {},
  placeDetailState: 0,
  setPlaceDetail: (newPlaceDetail: any) => set({ placeDetail: newPlaceDetail }),
  setPlaceDetailState: (newState: number) =>
    set({ placeDetailState: newState }),
}));
