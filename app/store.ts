import { create } from "zustand";

interface MyObject {
  sideNav: boolean;
  openSideNav: () => void;
  closeSideNav: () => void;
  pag: number;
  setPag: (x: number) => void;
  pokemon: string[];
  setPokemon: (x: string[]) => void;
  pokeUrl: string;
  setPokeUrl: (x: string) => void;
  pokeData: string;
  setPokeData: (x: number) => void;
}

export const myStore = create<MyObject>((set) => ({
  sideNav: false,
  openSideNav: () => set({ sideNav: true }),
  closeSideNav: () => set({ sideNav: false }),
  pag: 0,
  setPag: (x) => set({ pag: x }),
  pokemon: [],
  setPokemon: (x) => set({ pokemon: x }),
  pokeUrl: "https://pokeapi.co/api/v2/pokemon/1/",
  setPokeUrl: (x) => set({ pokeUrl: x }),
  pokeData: `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20`,
  setPokeData: (x) =>
    set({
      pokeData: `https://pokeapi.co/api/v2/pokemon/?offset=${x}&limit=20`,
    }),
}));
