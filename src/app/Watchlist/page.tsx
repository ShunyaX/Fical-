"use client";

import { useEffect, useState } from "react";
import Animecard from "../components/Animecard";

export default function WatchlistPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchList() {
      const res = await fetch("/api/watchlist");
      const data = await res.json();
      setItems(data.items || []);
    }

    fetchList();
  }, []);

  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl font-bold mb-4">Your Watchlist</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((anime) => (
          <Animecard key={anime} anime={anime} />
        ))}
      </div>
    </div>
  );
}
