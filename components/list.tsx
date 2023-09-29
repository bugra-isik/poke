"use client";
import { PokemonItem, myStore } from "@/app/store";
import Image from "next/image";
import { useRef, useState } from "react";
import { ImSpinner8 } from "react-icons/im";

const getImageURLs = (id: string) => {
  return {
    main: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`,
    secondary: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
  };
};

const getID = (pokemon: PokemonItem) => {
  const id = pokemon.url.split("pokemon/")[1].replace("/", "");
  return id;
};
export default function List() {
  const { openSideNav, pokemonList, setPokeUrl } = myStore();

  const pokemons = pokemonList.map((p) => {
    const id = getID(p);
    const { main, secondary } = getImageURLs(id);
    return {
      ...p,
      mainSrc: main,
      secondarySrc: secondary,
      id,
    };
  });

  return (
    <ul
      className={`mx-5 grid grow grid-cols-2 justify-items-center gap-5 pb-5 lg:grid-cols-5 lg:pb-0`}
    >
      {pokemons.map((pokemon) => {
        let src = pokemon.secondarySrc;
        return (
          <li
            key={pokemon.id}
            onClick={() => {
              openSideNav();
              setPokeUrl(pokemon.url);
            }}
            className={`item relative inset-0 flex h-20 w-full cursor-pointer select-none flex-col items-center justify-center gap-2 overflow-hidden rounded-lg bg-theme2 shadow-2xl backdrop-blur-3xl transition ease-out hover:duration-1000 sm:h-40 md:h-48 lg:h-auto lg:hover:scale-110`}
          >
            <button className={`relative h-2/3 w-full`}>
              <div className={`relative m-auto h-full w-1/3`}>
                <ImSpinner8
                  id={pokemon.name}
                  className={`absolute h-full w-full animate-spin text-theme1/50`}
                />
                <Image
                  id={pokemon.id}
                  src={src}
                  fill
                  alt={pokemon.name}
                  onLoad={() => document.getElementById(pokemon.name)?.remove()}
                />
              </div>
            </button>
            <p className={`text-theme5`}>
              {pokemon.id}. <span className="capitalize">{pokemon.name}</span>
            </p>
          </li>
        );
      })}
    </ul>
  );
}
