"use client";

import React from "react";
import Animecard, { AnimeCardProps } from "./Animecard";

export default function Movielist({
  animee,
}: {
  animee: AnimeCardProps[];
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 py-8 gap-14 px-12">
      {animee.map((an) => (
        <Animecard key={an.mal_id} anime={an} />
      ))}
    </div>
  );
}
