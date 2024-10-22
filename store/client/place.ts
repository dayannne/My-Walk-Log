import { IPlace } from '@/shared/types/place';
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
  placeDetail: IPlace | null;
  setPlaceDetail: (placeDetail: IPlace | null) => void;
  placeDetailState: number;
  setPlaceDetailState: (userData: number) => void;
}

export const usePlaceDetailStore = create<PlaceDetailState>((set) => ({
  placeDetail: null,
  placeDetailState: 0,
  setPlaceDetail: (newPlaceDetail: IPlace | null) =>
    set({ placeDetail: newPlaceDetail }),
  setPlaceDetailState: (newState: number) =>
    set({ placeDetailState: newState }),
}));
