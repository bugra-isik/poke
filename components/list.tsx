import api from "@/api/posts";
import MyContext from "@/app/context";
import { myStore } from "@/app/store";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import { ImSpinner2 } from "react-icons/im";

export default function List() {
  const { pokemon, setPokeUrl, pokeData } = useContext<any>(MyContext);
  const [list, setList] = useState();
  const { sideNav, openSideNav, closeSideNav } = myStore();

  useEffect(() => {
    const nameList: any = pokemon?.map(async (i: any, index: any) => {
      const res = await api.get(i.url);
      const data = res.data;

      const src =
        data?.sprites?.other?.dream_world?.front_default ||
        data?.sprites?.other?.["official-artwork"]?.front_default ||
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png";

      return (
        <li
          key={index}
          className={`item relative inset-0 flex w-full select-none flex-col items-center justify-center gap-2 overflow-hidden bg-green-500`}
        >
          <button
            className={`relative h-2/3 w-full transition ease-out hover:scale-125`}
            onClick={() => {
              openSideNav();
              setPokeUrl(i.url);
            }}
            // onMouseEnter={(e) => {
            //   e.currentTarget.classList.remove("duration-100");
            //   e.currentTarget.classList.add("duration-1000");
            // }}
            // onMouseLeave={(e) => {
            //   e.currentTarget.classList.remove("duration-1000");
            //   e.currentTarget.classList.add("duration-100");
            // }}
          >
            {/* <div>
              <ImSpinner2 className={`h-20 w-20 animate-spin text-red-950`} />
            </div> */}
            <Image src={src} fill alt="pokemon" />
          </button>
          {data.id}. Pokémon
        </li>
      );
    });

    setList(nameList);
  }, [pokemon, setPokeUrl, pokeData, openSideNav, closeSideNav]);

  return <>{list}</>;
}
