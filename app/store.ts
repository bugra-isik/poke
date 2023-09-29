import { create } from "zustand";

export type PokemonItem = {
  name: string;
  url: string;
};

type MyObject = {
  sideNav: boolean;
  openSideNav: () => void;
  closeSideNav: () => void;
  pag: number;
  setPag: (x: number) => void;
  pokemonList: PokemonItem[];
  setPokemonList: (x: PokemonItem[]) => void;
  pokeUrl: string;
  setPokeUrl: (x: string) => void;
  pokeListURL: string;
  setPokeListURL: (x: number) => void;
};

export const myStore = create<MyObject>((set) => ({
  sideNav: false,
  openSideNav: () => set({ sideNav: true }),
  closeSideNav: () => set({ sideNav: false }),
  pag: 0,
  setPag: (x) => set({ pag: x }),
  pokemonList: [],
  setPokemonList: (x) => set({ pokemonList: x }),
  pokeUrl: "https://pokeapi.co/api/v2/pokemon/1/",
  setPokeUrl: (x) => set({ pokeUrl: x }),
  pokeListURL: `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20`,
  setPokeListURL: (x) =>
    set({
      pokeListURL: `https://pokeapi.co/api/v2/pokemon/?offset=${x}&limit=20`,
    }),
}));
