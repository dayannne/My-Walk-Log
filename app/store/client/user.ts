import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IUser } from '../../shared/types/auth';

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
      name: 'user-storage',
      storage: {
        getItem: (name) => {
          const item = localStorage.getItem(name);
          return item ? JSON.parse(item) : null;
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          localStorage.removeItem(name);
        },
      },
    },
  ),
);
