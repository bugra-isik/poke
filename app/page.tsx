"use client";

import api from "@/api/posts";
import List from "@/components/list";
import SideNav from "@/components/sideNav";
import { Pagination } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import MyContext from "./context";
import { myStore } from "./store";

export default function Home() {
  const {pokemon, setPokemon, pokeData, setPokeData } = myStore();
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
      className={`flex h-screen flex-col justify-between font-sans text-theme5`}
    >
      <MyContext.Provider value={{}}>
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
              className={`mx-auto mb-0 mt-5 max-w-fit pb-5 text-black `}
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
                cursor: "bg-theme4 text-theme5 cursor-not-allowed",
                ellipsis: "text-theme5",
                chevronNext: "text-theme5",
              }}
            />
          </>
        ) : (
          <div className={`flex h-screen items-center justify-center`}>
            <i>
              <AiOutlineLoading3Quarters
                className={`animate-spin text-[10dvw] text-theme5`}
              />
            </i>
          </div>
        )}
      </MyContext.Provider>
    </main>
  );
}
