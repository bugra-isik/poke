"use client";

import MyContext from "@/app/context";
import { useContext, useEffect, useState } from "react";
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

export default function SideNav() {
  ////////////////////////////////////////////////////////////////
  const { sideNav, openSideNav, closeSideNav } = myStore();
  const { pokeUrl } = useContext<any>(MyContext);
  const [list, setList] = useState<any>();
  const [abilities, setAbilities] = useState<any>();

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
    <GiHearts key={GiHearts} />,
    <GiPiercingSword key={GiPiercingSword} />,
    <GiShield key={GiShield} />,
    <GiPointySword key={GiPointySword} />,
    <GiBoltShield key={GiBoltShield} />,
    <GiMetalBoot key={GiMetalBoot} />,
  ];

  const abilites = abilities?.map((item: any, index: any) => (
    <div className={`flex flex-col gap-2`} key={index}>
      <li className={`text-2xl font-black`}>{item.name.toUpperCase()}</li>
      {item.effect_entries.map((item: any, index: any) => {
        if (item.language.name === "en") {
          return (
            <div className={``} key={index}>
              {item.effect}
            </div>
          );
        }
      })}
    </div>
  ));

  const stats = list?.stats.map((item: any, index: any) => (
    <li
      key={index}
      className={`bg-layer1 flex items-center justify-between rounded-lg px-1 text-2xl`}
    >
      <div className={`flex items-center gap-1`}>
        <i>{icon[index]}</i>
        <div>{item.stat.name.toUpperCase()}</div>
      </div>
      <div>{item.base_stat}</div>
    </li>
  ));

  const sideNavState = sideNav ? "translate-x-0" : "translate-x-full";

  return (
    <>
      <div
        className={`${sideNavState} bg-layer1/50 fixed inset-0 z-50`}
        onClick={() => closeSideNav()}
      />
      <nav
        key={list?.order}
        className={` fixed inset-y-0 right-0 z-50 flex w-1/3 select-none flex-col items-center justify-between bg-red-500 px-5 pb-5  transition duration-300 ${sideNavState}`}
      >
        <h1 className={`bg-layer1 p-3 text-5xl font-black `}>
          {list?.name.toUpperCase()}
        </h1>
        <div className={`relative h-80 w-80`}>
          <Image className={``} src={src} fill alt="pokemon" />
        </div>
        <ul
          className={`bg-layer1 flex max-h-60 w-full flex-col gap-y-10 overflow-y-scroll hyphens-auto rounded-lg p-2 text-justify`}
        >
          <h1 className={`text-center text-3xl font-black`}>ABILITIES</h1>
          {abilites}
        </ul>
        <ul className={`grid  w-full grid-cols-3 gap-x-5 gap-y-2 `}>{stats}</ul>
      </nav>
    </>
  );
}
