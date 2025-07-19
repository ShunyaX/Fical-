'use client';

import React from 'react';
import Latest from './components/latest';
import { useRouter } from 'next/navigation';



export default async function Home() {
  const router = useRouter();
  const res = await fetch('https://api.jikan.moe/v4/anime/');
  const data = await res.json();
   const animeList = data.data;
  
  return (
    <div className=' min-h-screen px-3 py-10 scroll-smooth ' >
      <section className="px-10 py-7">
      <Latest/>
      <div>
        <h1 className="text-3xl font-bold text-white mt-10 font-pop">Trending:</h1>
        <div className = ' rounded-2xl justify-start items-start  mt-10 whitespace-nowrap overflow-scroll scrollbar-hide scroll smooth'>
          <div className='flex gap-6 snap-proximity '>
          {animeList.map((a:any)=> {
            return (
              <button className='w-52 inline-block flex-shrink-0 gap-5 justify-start snap-center' key={a.mal_id} onClick={() => router.push(`anime/${a.mal_id}`)}>
              <img src={a.images.jpg.large_image_url} alt={a.title} className='w-full h-80 rounded-2xl object-cover' />
              <p className='text-white px-2 text-lg truncate font-pop mt-2'>{a.title}</p>
              <div className='mt-1 text-sm'>
              <p className=" text-gray-400">
                  {a.genres && a.genres.length > 0 ? a.genres[0].name : "-"}
               </p>
              <span className='text-yellow-400 bg-grey-600 px-3 font-pop text-xs mt-2'>⭐{a.score?a.score:"-"}</span>
               </div>
              </button>
              
            );
            })}
            </div>

        </div>
        
      </div>
      </section>
      

     </div>
  );
}
