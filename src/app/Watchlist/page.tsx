"use client";

import { useEffect, useState } from "react";
import Animecard from "../components/Animecard";
import Movielist from "../components/movielist";

interface watchlist {
  _id: string;
  animeId: number;
  title: string;
  image: string;
  score: number;
  episodes: number;
  synopsis: string;
  genres: string[];
}

export default function WatchlistPage() {
  const [items, setItems] = useState<watchlist[]>([]);

  useEffect(() => {
    async function fetchList() {
      const res = await fetch("/api/watchlist");
      const data = await res.json();
      setItems(data.items || []);
    }

    fetchList();
  }, []);

  console.log(items);

  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl font-bold mb-4">Your Watchlist</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
       {items.map((items) => (
            <Animecard key={items._id} anime={items as any} />
          ))}
      </div>
    </div>
  );
}
