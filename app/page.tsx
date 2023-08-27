"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Pagination,
  PaginationItem,
  PaginationCursor,
} from "@nextui-org/react";
import api from "@/api/posts";
import MyContext from "./context";
import List from "@/components/list";
import SideNav from "@/components/sideNav";
import { myStore } from "./store";
import { ImSpinner2 } from "react-icons/im";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { CssVariable } from "next/dist/compiled/@next/font";

export default function Home() {
  const [pokemon, setPokemon] = useState<[]>();
  const [pokeUrl, setPokeUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon/1/",
  );
  const { pag, setPag } = myStore();
  const [delay, setDelay] = useState(false);

  const pokeData = `https://pokeapi.co/api/v2/pokemon/?offset=${pag}&limit=20`;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get(pokeData);
        const data: [] = response.data.results;
        setPokemon(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPosts();
  }, [pokeData]);

  pokemon &&
    setTimeout(() => {
      setDelay(true);
    }, 1000);

  const zort = {
    color: "#f1c",
  };

  return (
    <main
      id="main"
      className={`flex h-screen flex-col justify-between bg-theme1 font-sans text-theme5`}
    >
      <MyContext.Provider value={{ pokemon, pokeUrl, setPokeUrl, pokeData }}>
        {delay ? (
          <>
            <section className={`mt-5 flex grow justify-between`}>
              <ul
                className={`mx-5 grid grow grid-cols-5 justify-items-center gap-5`}
              >
                <List />
              </ul>
              <SideNav />
            </section>
            <Pagination
              className={`mx-auto mb-0 mt-5 max-w-fit pb-5`}
              total={64}
              initialPage={1}
              showControls
              color="success"
              onChange={(e) => {
                setPag((e - 1) * 20);
              }}
              classNames={{ item: zort }}
            />
          </>
        ) : (
          <div className={`flex h-screen items-center justify-center`}>
            <i>
              <AiOutlineLoading3Quarters
                className={`animate-spin text-[25dvw] text-white`}
              />
            </i>
          </div>
        )}
      </MyContext.Provider>
    </main>
  );
}
