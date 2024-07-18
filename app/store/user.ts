import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IUser } from '../shared/types/auth';

interface UserState {
  user: IUser | null;
  setUser: (userData: IUser | null) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (userData: IUser | null) => set({ user: userData }),
    }),
    {
      name: 'user-storage', // 스토리지에 저장되는 항목의 이름 (고유해야 함)
      getStorage: () => localStorage, // 저장 메커니즘 지정
    },
  ),
);

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
