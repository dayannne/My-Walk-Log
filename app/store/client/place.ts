import { create } from 'zustand';

interface PlaceState {
  place: any | null;
  setPlace: (newPlace: any | null) => void;
  clearPlace: () => void;
}

export const usePlaceStore = create<PlaceState>((set) => ({
  place: null,
  setPlace: (newPlace: any | null) => set({ place: newPlace }),
  clearPlace: () => set({ place: null }),
}));

interface PlaceMenuState {
  placeMenu: number;
  setPlaceMenu: (userData: number) => void;
}

export const usePlaceMenuStore = create<PlaceMenuState>((set) => ({
  placeMenu: 0,
  setPlaceMenu: (newPlace: number) => set({ placeMenu: newPlace }),
}));
