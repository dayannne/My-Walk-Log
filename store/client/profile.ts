import { create } from 'zustand';

interface ProfileMenuState {
  profileMenu: number;
  setProfileMenu: (userData: number) => void;
}

export const useProfileMenuStore = create<ProfileMenuState>((set) => ({
  profileMenu: 0,
  setProfileMenu: (newProfile: number) => set({ profileMenu: newProfile }),
}));
