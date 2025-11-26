"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Movielist from "../../components/movielist";
import Pulse from "../../components/Pulse";

export default function Movies() {

  const { name } = useParams() as { name: string };
  

  const [page, setPage] = useState(1);
  const [animeList, setAnimeList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

    


  const fetchCategory = async () => {
    setLoading(true);

    const endpoints: any = {
      trending: `https://api.jikan.moe/v4/top/anime?page=${page}`,
      airing: `https://api.jikan.moe/v4/seasons/now?page=${page}`,
      sfw: `https://api.jikan.moe/v4/anime?sfw&page=${page}`,
      spring: `https://api.jikan.moe/v4/seasons/2018/spring?page=${page}`,
      upcoming: `https://api.jikan.moe/v4/seasons/upcoming?page=${page}`,
    };

    const url = endpoints[name];
    const res = await fetch(url);
    const data = await res.json();

    setAnimeList(data?.data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchCategory();
  }, [page]);

  return (
    <div>
      <h1 className="text-3xl text-center text-white font-karl font-semibold pt-14 pb-2 underline decoration-red-500 decoration-4 underline-offset-8">
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </h1>

      {loading ? (
        <>
        <Pulse />
        </>
      ) : (
        <Movielist animee={animeList} />
      )}

      <span className="flex justify-between mx-12">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className={`bg-red-700 text-white text-sm p-2 md:w-[100px] w-[150px] rounded-xl mt-4 mb-10 
            ${page === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          Previous
        </button>

        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="bg-red-700 text-white text-sm p-2 md:w-[100px] w-[150px] rounded-xl mt-4 mb-10"
        >
          Load More
        </button>
      </span>
    </div>
  );
}
