import { create } from 'zustand';

interface ModalState {
  openInfo: any | null;
  open: boolean;
  setOpen: (open: boolean) => void;
  setOpenInfo: (info: any | null) => void;
  handleOpenInfo: (info: any) => void;
  handleCloseInfo: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  openInfo: null,
  open: false,
  setOpen: (open) => set({ open }),
  setOpenInfo: (info) => set({ openInfo: info }),
  handleOpenInfo: (info) => set({ open: true, openInfo: info }),
  handleCloseInfo: () => set({ open: false, openInfo: null }),
}));
