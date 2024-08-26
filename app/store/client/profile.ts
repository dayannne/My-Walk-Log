import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProfileState {
  profile: any | null;
  setProfile: (newProfile: any | null) => void;
  clearProfile: () => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profile: null,
      setProfile: (newProfile) => set({ profile: newProfile }),
      clearProfile: () => set({ profile: null }),
    }),
    {
      name: 'profile-storage',
      getStorage: () => localStorage,
    },
  ),
);

interface ProfileMenuState {
  profileMenu: number;
  setProfileMenu: (userData: number) => void;
}

export const useProfileMenuStore = create<ProfileMenuState>((set) => ({
  profileMenu: 0,
  setProfileMenu: (newProfile: number) => set({ profileMenu: newProfile }),
}));
