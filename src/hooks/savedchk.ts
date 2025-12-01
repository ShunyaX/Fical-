"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function useWatchlist(anime: any) {
  const { data: session } = useSession();
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!session) return;

      const res = await fetch("/api/watchlist");
      const data = await res.json();

      if (data.items?.some((i: any) => i.animeId == anime.mal_id)) {
        setSaved(true);
      }
    };

    load();
  }, [session]);

  const toggleWatchlist = async (e?: any) => {
    if (e) e.preventDefault();

    if (!session) {
      alert("Please login first");
      return;
    }

    if (saved) {
      await fetch(`/api/watchlist/${anime.mal_id}`, { method: "DELETE" });
      setSaved(false);
    } else {
      await fetch(`/api/watchlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          animeId: anime.mal_id,
          title: anime.title,
          image: anime.images.jpg.image_url,
          score: anime.score,
          genres: anime.genres?.[0] || [],
          episodes: anime.episodes,
          synopsis: anime.synopsis,
        }),
      });
      setSaved(true);
    }
  };

  return { saved, toggleWatchlist };
}
