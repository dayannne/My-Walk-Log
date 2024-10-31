import { IPlace } from '@/shared/types/place';
import { create } from 'zustand';

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
