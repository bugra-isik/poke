import { create } from "zustand";

interface myObject {
  sideNav: boolean;
  openSideNav: () => void;
  closeSideNav: () => void;
}

export const myStore = create<myObject>((set) => ({
  sideNav: false,
  openSideNav: () => set((e) => ({ sideNav: true })),
  closeSideNav: () => set((e) => ({ sideNav: false })),
}));
