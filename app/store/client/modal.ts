import { create } from 'zustand';

interface ModalState {
  open: boolean;
  setOpen: (open: boolean) => void;
  openId: number | null;
  setOpenId: (open: number | null) => void;
  openInfo: any | null;
  setOpenInfo: (info: any | null) => void;
  handleOpenInfo: (info: any) => void;
  handleCloseInfo: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
  openId: null,
  setOpenId: (info) => set({ openId: info }),
  openInfo: null,
  setOpenInfo: (info) => set({ openInfo: info }),
  handleOpenInfo: (info) => set({ open: true, openInfo: info }),
  handleCloseInfo: () => set({ open: false, openInfo: null }),
}));
