import Image from "next/image";
import React from "react";
import Slider from "./Slider";


async function fetchLatestAnime() {
  const res = await fetch("https://api.jikan.moe/v4/anime?order_by=popularity");
  if (!res.ok) return [];
  const data = await res.json();
   return data.data.slice(0,10);

}

export default async function Latest() {
    const latestAnime = await fetchLatestAnime();
    
    
  return (
    <Slider anime={latestAnime} />
  );
}