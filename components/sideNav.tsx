"use client";

import MyContext from "@/app/context";
import { useContext, useEffect, useMemo, useState } from "react";
import api from "@/api/posts";
import Image from "next/image";
import {
  GiHearts,
  GiPiercingSword,
  GiPointySword,
  GiShield,
  GiBoltShield,
  GiMetalBoot,
} from "react-icons/gi";

import { myStore } from "@/app/store";
import { motion } from "framer-motion";
import { BsChevronCompactDown } from "react-icons/bs";
import { after } from "node:test";

export default function SideNav() {
  ////////////////////////////////////////////////////////////////
  const { sideNav, openSideNav, closeSideNav } = myStore();
  const { pokeUrl } = useContext<any>(MyContext);
  const [list, setList] = useState<any>();
  const [abilities, setAbilities] = useState<any>();
  const [chevronAnimation, setChevronAnimation] = useState(true);
  const [chevronHidden, setChevronHidden] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get(pokeUrl);
        const data = response.data;
        setList(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPosts();
  }, [pokeUrl]);

  const src =
    list?.sprites?.other?.dream_world?.front_default ||
    list?.sprites?.other?.["official-artwork"]?.front_default ||
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png";

  useEffect(() => {
    const fetchAbilities = async () => {
      if (list) {
        try {
          const response1 = await api.get(list.abilities[0]?.ability?.url);
          const response2 = await api.get(list.abilities[1]?.ability?.url);
          const data1 = response1.data;
          const data2 = response2.data;
          setAbilities([data1, data2]);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchAbilities();
  }, [list]);

  const icon = [
    <GiHearts className={`text-red-500`} key={GiHearts} />,
    <GiPiercingSword className={`text-amber-500`} key={GiPiercingSword} />,
    <GiShield className={`text-blue-500`} key={GiShield} />,
    <GiPointySword className={`text-orange-500`} key={GiPointySword} />,
    <GiBoltShield className={`text-indigo-500`} key={GiBoltShield} />,
    <GiMetalBoot className={`text-zinc-400`} key={GiMetalBoot} />,
  ];

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

  const statNames = ["Hp", "Atk", "Def", "Ult. Atk", "Ult. Def", "Speed"];

  const stats = list?.stats.map((item: any, index: any) => (
    <li
      key={index}
      className={`flex h-20 items-center justify-between rounded-lg bg-theme1 px-1 text-2xl`}
    >
      <div className={`flex items-center gap-1`}>
        <i>{icon[index]}</i>
        <div>{statNames[index]}</div>
      </div>
      <div>{item.base_stat}</div>
    </li>
  ));

  const chevron = useMemo(
    () =>
      setInterval(() => {
        setChevronAnimation((e) => !e);
      }, 500),
    [],
  );

  const sideNavState = sideNav
    ? "translate-x-0 bg-black/50"
    : "translate-x-full bg-black/0";

  return (
    <>
      <div
        className={`${sideNavState} fixed inset-0 z-50 transition-colors duration-300`}
        onClick={() => closeSideNav()}
      />
      <motion.nav
        id="bg"
        className={`${
          sideNav ? "translate-x-0" : "translate-x-full"
        } fixed inset-y-0 right-0 z-50 flex w-1/3 select-none flex-col
         items-center justify-between border-l border-theme1 bg-theme2 px-5 pb-5 drop-shadow-2xl transition duration-1000`}
      >
        <h1 className={`p-3 text-5xl font-black `}>
          {list?.name.toUpperCase()}
        </h1>
        {src && (
          <div className={`relative h-80 w-80`}>
            <Image className={``} src={src} fill alt="pokemon" />
          </div>
        )}
        <ul
          onScroll={() => setChevronHidden(true)}
          className={`relative flex max-h-60 w-full cursor-move flex-col gap-y-10
           overflow-y-scroll hyphens-auto rounded-lg bg-theme4 p-2 text-justify scrollbar-hide`}
        >
          <i onLoad={() => chevron} hidden={chevronHidden}>
            <BsChevronCompactDown
              className={`${
                chevronAnimation ? "translate-y-5" : "translate-y-0"
              } absolute bottom-10 right-3 h-10 w-10 text-theme1 transition ease-in`}
            />
          </i>
          <h1
            className={`rounded-t bg-theme3 py-2 text-center text-3xl font-black text-theme1`}
          >
            ABILITIES
          </h1>
          {abilites}
        </ul>
        <ul
          className={`grid  w-full cursor-crosshair grid-cols-3 gap-x-5 gap-y-2 `}
        >
          {stats}
        </ul>
      </motion.nav>
    </>
  );
}
