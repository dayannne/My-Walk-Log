import { create } from 'zustand';

interface RefreshState {
  refreshKey: number;
  setRefreshKey: () => void;
}

export const useRefreshStore = create<RefreshState>((set) => ({
  refreshKey: 0,
  setRefreshKey: () => set((state) => ({ refreshKey: state.refreshKey + 1 })),
}));
