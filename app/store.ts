import { create } from "zustand";

interface MyObject {
  sideNav: boolean;
  openSideNav: () => void;
  closeSideNav: () => void;
  pag: number;
  setPag: (x: number) => void;
}

export const myStore = create<MyObject>((set) => ({
  sideNav: false,
  openSideNav: () => set({ sideNav: true }),
  closeSideNav: () => set({ sideNav: false }),
  pag: 0,
  setPag: (x) => set({ pag: x }),
}));
