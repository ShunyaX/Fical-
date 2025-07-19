"use client";
import React from 'react';
import { useRouter } from 'next/navigation';


export default async function Movies() {
  const router = useRouter();
    const res = await fetch("https://api.jikan.moe/v4/top/anime?type=ova" );
    const data = await res.json();
    const movie = data.data;
    const movieswithimages = movie.filter((m: any) => m.images?.jpg?.large_image_url);

  return (
    <div className="items-center justify-center min-h-screen py-10 px-10">
        <h1 className="text-white font-bold text-2xl md:text-3xl font-nunito">Top Movies</h1>
     <div className="grid grid-cols-2 mt-10 md:grid-cols-4 gap-10 place-items-center rounded-3xl">
        {movieswithimages.map((m: any, index: number) => (
  <button key={`${m.mal_id}_${index}`} onClick={() => router.push(`anime/${m.mal_id}_${index}`)} className="w-48 h-72 md:w-48 md:h-72 py-2 shadow-slate-300 shadow-lg drop-shadow-md flex flex-col rounded-2xl">
    <img
      src={m.images.jpg.large_image_url}
      alt={m.title}
      className="w-full h-52 md:h-56 object-cover rounded-2xl px-1"
    />
   <div className="bg-black p-2 rounded-md flex flex-col items-start">
    <p className='text-white bg-inherit mt-2 px-3 font-pop '>{m.title}</p>
    <span className='text-yellow-400 bg-grey-600 px-3 font-pop text-xs mt-2'>⭐{m.score?m.score:"-"}</span>
    </div>
  </button>
  
))}



     </div>
    </div>
  );
}