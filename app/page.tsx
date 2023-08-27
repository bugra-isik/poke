"use client";

import { useCallback, useEffect, useState } from "react";
import api from "@/api/posts";
import MyContext from "./context";
import { Pagination } from "@mui/material";
import List from "@/components/list";
import SideNav from "@/components/sideNav";

export default function Home() {
  const [pokemon, setPokemon] = useState<[]>();
  const [pag, setPag] = useState(0);
  const [pokeUrl, setPokeUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon/1/",
  );
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

  const handle = (x: any, y: any) => setPag((y - 1) * 20);
  const tailwind = ["hidden translate-x-full", "flex translate-x-0"];
  return (
    <main className={`flex h-screen flex-col justify-between font-sans bg-layer1 text-white`}>
      <MyContext.Provider value={{ pokemon, pokeUrl, setPokeUrl, pokeData }}>
        <section className={`mt-5 flex grow justify-between`}>
          <ul
            className={`mx-5 grid grow grid-cols-4 justify-items-center gap-5`}
          >
            <List />
          </ul>
          <SideNav/>
        </section>
        <Pagination
          className={`my-10 flex w-screen justify-center`}
          count={64}
          variant="text"
          shape="rounded"
          color="primary"
          size="large"
          onChange={handle}
        />
      </MyContext.Provider>
    </main>
  );
}
