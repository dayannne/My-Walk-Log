import { create } from 'zustand';

interface ProfileState {
  profile: any | null;
  setProfile: (newProfile: any | null) => void;
  clearProfile: () => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  setProfile: (newProfile: any | null) => set({ profile: newProfile }),
  clearProfile: () => set({ profile: null }),
}));

interface ProfileMenuState {
  profileMenu: number;
  setProfileMenu: (userData: number) => void;
}

export const useProfileMenuStore = create<ProfileMenuState>((set) => ({
  profileMenu: 0,
  setProfileMenu: (newProfile: number) => set({ profileMenu: newProfile }),
}));
