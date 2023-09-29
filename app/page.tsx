"use client";

import api from "@/api/posts";
import List from "@/components/list";
import SideNav from "@/components/sideNav";
import { Pagination } from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { myStore } from "./store";

export default function Home() {
  const { pokemonList, setPokemonList, pokeListURL, setPokeListURL } =
    myStore();
  const [delay, setDelay] = useState(false);

  const fetchPosts = useCallback(async () => {
    try {
      const response = await api.get(pokeListURL);
      const data: [] = response.data.results;
      setPokemonList(data);
    } catch (error) {
      console.error(error);
    }
  }, [pokeListURL, setPokemonList]);

  useEffect(() => {
    fetchPosts();
  }, [pokeListURL, fetchPosts]);

  pokemonList.length !== 0 &&
    setTimeout(() => {
      setDelay(true);
    }, 1000);

  return (
    <main
      id="main"
      className={`flex h-full min-h-screen w-full flex-col justify-between font-dmSans text-theme5`}
    >
      {delay ? (
        <section className={`flex grow flex-col-reverse lg:flex-col`}>
          <section className={`mt-5 flex grow justify-between`}>
            <List />
            <SideNav />
          </section>
          <Pagination
            className={`mx-auto mb-0 mt-5 scale-75 pb-5 text-black sm:scale-95 md:scale-100 lg:block`}
            total={64}
            initialPage={1}
            showControls
            color="success"
            onChange={(index) => {
              setPokeListURL((index - 1) * 20);
            }}
            classNames={{
              item: "bg-theme3 text-theme5 hover:text-theme1 hover:bg-theme3 deneme",
              prev: "bg-theme3 text-theme5",
              next: "bg-theme3",
              cursor: "bg-theme4 text-theme1 cursor-not-allowed",
              ellipsis: "text-theme5",
              chevronNext: "text-theme5",
            }}
          />
        </section>
      ) : (
        <div className={`flex h-screen items-center justify-center`}>
          <i>
            <AiOutlineLoading3Quarters
              className={`animate-spin text-[25dvw] text-theme5 lg:text-[10dvw]`}
            />
          </i>
        </div>
      )}
    </main>
  );
}
