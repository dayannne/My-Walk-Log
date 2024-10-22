import { ITrail } from '@/shared/types/trail';
import { create } from 'zustand';

interface ModalState<T = unknown> {
  open: boolean;
  setOpen: (open: boolean) => void;
  openId: number | null;
  setOpenId: (open: number | null) => void;
  openInfo: T | null; // 제네릭 사용
  setOpenInfo: (info: T | null) => void;
  handleOpenInfo: (info: T) => void;
  handleCloseInfo: () => void;
}

export const useModalStore = create<ModalState<string | ITrail>>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
  openId: null,
  setOpenId: (id) => set({ openId: id }),
  openInfo: null,
  setOpenInfo: (info) => set({ openInfo: info }),
  handleOpenInfo: (info) => set({ open: true, openInfo: info }),
  handleCloseInfo: () => set({ open: false, openInfo: null }),
}));
