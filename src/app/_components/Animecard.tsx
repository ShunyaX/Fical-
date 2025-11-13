'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


interface AnimeCardProps {
    mal_id: number;
    title: string;
    images:{
        jpg : {
            large_image_url: string;
        }
    };
    genres: { name: string }[];
    score: number | null;
    synopsis: string;
    season?: number;
    episodes?: number;
    heading?:string;
}


export default function Animecard({anime,heading}:{anime: AnimeCardProps, heading?: string,}) {
  const router = useRouter();

  const handlePlayClick = (anime: AnimeCardProps) => {
    router.push(`/anime/${anime.mal_id}`);
  };

  return (
    
    <div className=''>
    <div className='flex items-center justify-between font-pop font-black  '>
    {heading && <p className=''>{heading}</p>}
    
    </div>

    <Link href={`/anime/${anime.mal_id}`} className={`w-40 flex flex-col group relative font-pop overflow-y-auto snap-proximity scroll-smooth `}> 
      
      <span className='w-40 h-60 rounded-lg overflow-hidden '>
        <Image 
          width={200} 
          height={300} 
          src={anime.images.jpg.large_image_url} 
          alt={anime.title} 
          className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105' 
        />
      </span>

        <div className=' flex flex-col absolute inset-0 items-start justify-
                   opacity-0 group-hover:opacity-100 transition-opacity duration-300
                   bg-zinc-900 bg-opacity-95 rounded-b-xl p-1 text-white font-pop'>
        <p className='text-white text-sm mt-2 font-pop font-bold'>{anime.title}</p>
        <div className='flex flex-col text-[9px] justify-between items-start mt-2'>
          
        <p className=''>⭐{anime.score || 'N/A'}</p>
        <span className='mt-2 text-xs font-pop'>
        <p className='text-zinc-400'>{anime.genres && anime.genres.length > 0 ? anime.genres[0].name : "N/A"}</p>
        <p className='text-zinc-400'>{anime.episodes || "N/A"} Episodes</p>
        <p className='line-clamp-5 text-[12px] mt-1'>{anime.synopsis}</p>
        </span>

        <div className='absolute bottom-3 left-2 flex gap-3'>  
      <button>
        <Image src="/play.png" alt="Play" onClick={() =>handlePlayClick(anime)} className="w-6 h-6 transition duration-200 hover:brightness-110 hover:saturate-200 hover:invert hover:sepia hover:hue-rotate-20" />
      </button>
      <button><Image src="/add.png" alt="Add" className="w-6 h-6 transition duration-200 hover:brightness-110 hover:saturate-200 hover:invert hover:sepia hover:hue-rotate-20
      " /></button>
       </div>
        </div>
         

       
      </div>
     

     
      <span className='flex flex-col mt-1 p-1 '>
        <h2 className='text-white truncate text-sm font-medium'>
          {anime.title}
        </h2>
        <p className='text-gray-400 text-xs flex-grow'>
          {anime.genres && anime.genres.length > 0 ? anime.genres[0].name : "N/A"}
        </p>
        
      </span>
      
    </Link> 
    
    </div>
  );
}
