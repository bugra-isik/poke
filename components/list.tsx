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
          onClick={() => {
            openSideNav();
            setPokeUrl(i.url);
          }}
          className={`item relative inset-0 flex w-full cursor-pointer select-none flex-col items-center justify-center gap-2 overflow-hidden rounded-lg bg-theme3 shadow-2xl backdrop-blur-3xl transition ease-out hover:scale-110 hover:duration-1000`}
        >
          <button className={`relative h-2/3 w-full`}>
            <div className={`relative m-auto h-full w-1/3`}>
              <Image src={src} fill alt="pokemon" quality={20} />
            </div>
          </button>
          <p className={`text-theme5`}>
            {data.id}.{" "}
            {`${data.name.charAt(0).toUpperCase()}${data.name.slice(1)} `}
          </p>
        </li>
      );
    });

    setList(nameList);
  }, [pokemon, setPokeUrl, pokeData, openSideNav, closeSideNav]);

  return <>{list}</>;
}
