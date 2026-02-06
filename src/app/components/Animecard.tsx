"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useWatchlist } from "../context/WatchlistContext";
import Loading from "../Login/loading";

export interface AnimeCardProps {
  mal_id?: number;
  title: string;
  animeId?: number;
  image?: string;
  images: {
    jpg: {
      image_url?: string;
      large_image_url?: string;
    };
  };
  genres?: { name: string }[];
  score?: number | null;
  synopsis?: string;
  season?: number;
  episodes?: number;
  heading?: string;
}

export default function Animecard({
  anime,
  heading,
}: {
  anime: AnimeCardProps;
  heading?: string;
}) {
  const { ids, toggleWatchlist,LoadingId } = useWatchlist();
  const isloading = LoadingId === (anime.mal_id || anime.animeId);
  const isSaved = useMemo(() => ids.includes(anime.mal_id || anime.animeId), [ids, anime.mal_id, anime.animeId]);
  
  const pathname = usePathname();
  const isWatchlist = pathname === "/watchlist";
  
  const displayImage = anime.images?.jpg?.image_url || anime.image || "/placeholder.png";
  const Id = anime.mal_id || anime.animeId;
  const displayTitle = anime.title;
  const displayGenre = anime.genres?.[0]?.name || anime.genres?.[0] || "Anime";
  return (
    <div className="">
      <div className="flex items-center justify-between font-pop font-black">
        {heading && (
          <Link href="#" className="">
            {heading}
          </Link>
        )}
      </div>

      <Link
        href={`/anime/${Id}`}
        className="w-40 flex flex-col group relative font-pop snap-proximity scroll-smooth"
      >
        <span className="relative w-40 h-60 rounded-lg overflow-hidden">
          <Image
            fill
            src={displayImage}
            alt={anime.title || "Anime Image"}
            sizes="(max-width: 768px) 170px, 170px"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {isSaved && !isloading &&  (
             <div className="absolute top-2 right-2 bg-red-600 p-1 rounded-full shadow-md animate-in fade-in zoom-in">
                <div className="w-2 h-2 bg-white rounded-full"></div>
             </div>
          )}
        </span>

        <div
          className="
            flex flex-col w-full absolute inset-0 items-start opacity-0 group-hover:opacity-100 transition-opacity duration-300
            bg-zinc-900 bg-opacity-95 rounded-b-xl p-1 text-white font-pop
          "
        >
          <p className="text-white text-sm line-clamp-3 mt-2  font-pop font-bold">
            {anime.title}
          </p>

          <div className="flex flex-col text-xs justify-between items-start mt-2">
            <p className="text-yellow-400">⭐{anime.score || "N/A"}</p>

            <span className="mt-2 text-xs font-pop">
              <p className="text-zinc-400">
                {anime.genres && anime.genres.length > 0
                  ? anime.genres[0].name
                  : "N/A"}
              </p>

              <p className="text-zinc-400">
                {anime.episodes || "N/A"} Episodes
              </p>

              <p className="line-clamp-3 text-[12px] mt-1">
                {anime.synopsis}
              </p>
            </span>

            <div className="absolute bottom-3 left-2 flex gap-4">
              <div className="hover:scale-110 transition active:scale-95">
              <Image width={24} height={24} src="/play.png" alt="Play" className="w-6 h-6" />
            </div>

              <button
              disabled={isloading}
               onClick={async (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  try{
                    await toggleWatchlist(anime);
                  }catch(e){
                    <Link href="/login" className="text-red-500 hover:underline"/>
                  }
                }}
                 aria-label={isSaved ? "Remove from Watchlist" : "Add to Watchlist"} className="hover:scale-110 transition active:scale-95">
                <Image
                  width={200}
                  height={200}
                  src={isSaved ? "/saved.png" : "/add.png"}
                  alt="Add"
                  className={`w-6 h-6 ${isloading && !isSaved && !isWatchlist? "animate-pulse opacity-70" : ""} ${isSaved ? 'drop-shadow-[0_0_5px_rgba(220,38,38,0.8)]' : ''}`}
                />
              </button>
            </div>
          </div>
        </div>

        <span className="flex flex-col mt-1 p-1">
          <h2 className="text-white truncate text-sm font-medium">
            {anime.title}
          </h2>

          <p className="text-gray-400 text-xs flex-grow">
            {anime.genres && anime.genres.length > 0
              ? anime.genres[0].name
              : "N/A"}
          </p>
        </span>
      </Link>
    </div>
  );
}
