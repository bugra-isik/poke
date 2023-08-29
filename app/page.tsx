"use client";

import api from "@/api/posts";
import List from "@/components/list";
import SideNav from "@/components/sideNav";
import { Pagination } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { myStore } from "./store";

export default function Home() {
  const { pokemon, setPokemon, pokeData, setPokeData } = myStore();
  const [delay, setDelay] = useState(false);

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
  }, [pokeData, setPokemon]);

  pokemon &&
    setTimeout(() => {
      setDelay(true);
    }, 1000);

  return (
    <main
      id="main"
      className={`flex h-full min-h-screen w-full flex-col justify-between font-sans text-theme5`}
    >
      {delay ? (
        <>
          <Pagination
            className={`mx-auto mb-0 mt-2 max-w-fit scale-80 pb-0 text-black lg:hidden `}
            total={64}
            initialPage={1}
            showControls
            color="success"
            onChange={(e) => {
              setPokeData((e - 1) * 20);
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
          <section className={`mt-5 flex grow justify-between`}>
            <ul
              className={`mx-5 grid grow grid-cols-2 justify-items-center gap-5 pb-5 lg:grid-cols-5 lg:pb-0`}
            >
              <List />
            </ul>
            <SideNav />
          </section>
          <Pagination
            className={`mx-auto mb-0 mt-5 hidden max-w-fit pb-5 text-black lg:block lg:scale-100 `}
            total={64}
            initialPage={1}
            showControls
            color="success"
            onChange={(e) => {
              setPokeData((e - 1) * 20);
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
        </>
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
