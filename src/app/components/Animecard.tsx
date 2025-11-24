"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export interface AnimeCardProps {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      image_url?: string;
      large_image_url?: string;
    };
  };
  genres: { name: string }[];
  score: number | null;
  synopsis: string;
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
  const router = useRouter();
  const [saved, setSaved] = useState(false);

  const handlePlayClick = (anime: AnimeCardProps) => {
    router.push(`/anime/${anime.mal_id}`);
  };


  const handlesave = async () =>{
    if(!saved){
      await fetch('api/Watchlist',{
        method:'POST',
        body:JSON.stringify({
          animeId: anime.mal_id,
          title: anime.title,
          image: anime.images.jpg.image_url
        }),
      });
      setSaved(true);
    }else{
      await fetch('api/Watchlist/{anime.mal_id}',{
        method:'DELETE',
      });
      setSaved(false);
    }
  }
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
        href={`/anime/${anime.mal_id}`}
        prefetch={false}
        className="w-40 flex flex-col group relative font-pop snap-proximity scroll-smooth"
      >
        <span className="relative w-40 h-60 rounded-lg overflow-hidden">
          <Image
            fill
            src={anime.images.jpg.image_url || "/placeholder.png"}
            alt={anime.title}
            sizes="(max-width: 768px) 170px, 170px"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
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

          <div className="flex flex-col text-[9px] justify-between items-start mt-2">
            <p>⭐{anime.score || "N/A"}</p>

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

            <div className="absolute bottom-3 left-2 flex gap-3">
              <button>
                <Image
                  width={200}
                  height={200}
                  src="/play.png"
                  alt="Play"
                  onClick={() => handlePlayClick(anime)}
                  className="
                    w-6 h-6 transition duration-200 
                    hover:brightness-110 hover:saturate-200 
                    hover:invert hover:sepia hover:hue-rotate-20
                  "
                />
              </button>

              <button>
                <Image
                  width={200}
                  height={200}
                  src={saved ? "/saved.png" : "/add.png"}
                  alt="Add"
                  onClick= {(e) => {
                      e.preventDefault();
                      handlesave();
                    }}
                  className="
                    w-6 h-6 transition-all
                    hover:brightness-90 
                    hover:saturate-200
                  "
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
