"use client";

import { useEffect, useState } from "react";
import Animecard from "../components/Animecard";
import { useWatchlist } from "../context/WatchlistContext";
import { useSession } from "next-auth/react";

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
  const {data : session} = useSession();
  const {ids} = useWatchlist();

  const [items, setItems] = useState<watchlist[]>([]);

  useEffect(() => {
    if(!session) return;
    if (session) {
      fetch("/api/watchlist")
        .then(res => res.json())
        .then(data => setItems(data.items || []));
    }
  }, [session]);

  const watchlistAnime = items.filter(item => ids.includes(item.animeId));

  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl font-bold mb-4">Your Watchlist</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
       {session && watchlistAnime.map((items) => (
            <Animecard key={items._id} anime={items as any} />
          ))}
      </div>
    </div>
  );
}
