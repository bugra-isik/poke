import api from "@/api/posts";
import Image from "next/image";
import { useCallback, useEffect, useState, useRef, ReactElement } from "react";
import {
  GiBoltShield,
  GiHearts,
  GiMetalBoot,
  GiPiercingSword,
  GiPointySword,
  GiShield,
} from "react-icons/gi";

import { myStore } from "@/app/store";
import axios from "axios";
import { ImSpinner8 } from "react-icons/im";

type list = {
  abilities: [{ ability: { url: string } }];
  name: string;
  stats: string[];
  sprites: {
    other: {
      dream_world: { front_default: string };
      "official-artwork": { front_default: string };
    };
  };
};

type abilities = { name: string };

export default function SideNav() {
  const { sideNav, pokeUrl, closeSideNav } = myStore();
  const [list, setList] = useState<list | undefined>();
  const [abilities, setAbilities] = useState<abilities[]>();
  const [chevronAnimation, setChevronAnimation] = useState(true);
  const [chevronHidden, setChevronHidden] = useState(false);

  const fetchPokeDetails = useCallback(async () => {
    await api
      .get(pokeUrl)
      .then((e) => setList(e.data))
      .catch((e) => console.error(e));
  }, [pokeUrl]);

  useEffect(() => {
    fetchPokeDetails();
  }, [fetchPokeDetails]);

  useEffect(() => {
    const abilityUrl = list?.abilities.map((e) => e.ability.url);
    abilityUrl &&
      axios
        .all([axios.get(abilityUrl[0]), axios.get(abilityUrl[1])])
        .then(
          axios.spread((res1, res2) => setAbilities([res1.data, res2.data])),
        );
  }, [list?.abilities]);

  const src =
    list?.sprites?.other?.dream_world?.front_default ||
    list?.sprites?.other?.["official-artwork"]?.front_default;
  // "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png";

  const abilites = abilities?.map((item: any, index: any) => (
    <div className={`flex flex-col gap-2`} key={index}>
      <li className={`text-2xl font-bold text-theme1`}>
        {item.name.toUpperCase()}
      </li>
      {item.effect_entries.map((item: any, index: any) => {
        if (item.language.name === "en") {
          return (
            <div className={`text-theme2`} key={index}>
              {item.effect}
            </div>
          );
        }
      })}
    </div>
  ));

  const [image, setImage] = useState<ReactElement>();

  useEffect(() => {
    src && setImage(<Image className={``} src={src} fill alt="pokemon" />);
  }, [src]);

  const statNames = ["Hp", "Atk", "Def", "Ult. Atk", "Ult. Def", "Speed"];
  const statFontSizeTw = "2xl:text-lg xl:text-base lg:text-xs text-base";

  const stats = list?.stats?.map((item: any, index: any) => (
    <li
      key={index}
      className={`flex h-10 items-center justify-between rounded-lg bg-theme1 px-3 text-2xl transition duration-300 hover:scale-[1.18]`}
    >
      <div className={`flex items-center gap-1`}>
        <div className={`${statFontSizeTw} whitespace-nowrap`}>
          {statNames[index]}
        </div>
      </div>
      <div className={`${statFontSizeTw} font-arcade`}>{item.base_stat}</div>
    </li>
  ));

  const sideNavState = sideNav
    ? "translate-x-0 bg-black/50"
    : "translate-x-full bg-black/0";

  return (
    <>
      <div
        className={`${sideNavState} fixed inset-0 z-50 transition-colors duration-300`}
        onClick={() => {
          closeSideNav();
          setImage(<div />);
        }}
      />
      <nav
        id="bg"
        className={`${
          sideNav ? "" : "translate-x-full"
        } fixed inset-y-0 right-0 z-50 flex w-4/5 select-none flex-col items-center
         justify-between gap-3 border-l border-theme1 bg-theme2 px-5 pb-5 drop-shadow-2xl transition duration-300 lg:w-1/3`}
      >
        <h1
          className={`p-3 text-3xl font-black sm:text-5xl md:text-7xl lg:text-5xl`}
        >
          {list?.name.toUpperCase()}
        </h1>

        <div className={`relative w-48 basis-1/3 sm:w-60 md:w-96 lg:w-80`}>
          {image?.type == "div" ? (
            <ImSpinner8
              className={`absolute h-full w-full animate-spin text-theme1/50`}
            />
          ) : (
            image
          )}
        </div>

        <ul
          onScroll={() => setChevronHidden(true)}
          className={`max-h-100 relative flex w-full cursor-n-resize flex-col gap-y-10 overflow-y-scroll hyphens-auto
           rounded-lg bg-theme4 px-2 py-0 text-justify scrollbar-hide`}
        >
          <h1
            className={`-mx-5 rounded-t bg-theme3 py-2 text-center text-3xl font-black text-theme1`}
          >
            ABILITIES
          </h1>
          {abilites}
        </ul>
        <ul
          className={`grid w-full cursor-crosshair grid-cols-2 gap-5 sm:grid-cols-3`}
        >
          {stats}
        </ul>
      </nav>
    </>
  );
}
