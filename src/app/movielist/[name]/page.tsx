import React from 'react';
import Movielist from '../../components/movielist';

async function category(name:string){
   const endpoints:any = {
    trending: "https://api.jikan.moe/v4/top/anime",
    airing: "https://api.jikan.moe/v4/seasons/now",
    sfw: "https://api.jikan.moe/v4/anime?sfw",
    spring: "https://api.jikan.moe/v4/seasons/2018/spring",
    upcoming: "https://api.jikan.moe/v4/seasons/upcoming",

   } 

   const url = endpoints[name];
   const res = await fetch(url);
   const data = await res.json();
   if (!data || !data.data) return [];  
   return data.data;
}


export default async function Movies({params}:any) {
  const {name} = params;
  const animee = await category(name);
    
    

  return (
        <div>
            <h1 className="text-3xl text-center text-white font-karl font-semibold pt-14 pb-2 underline decoration-red-500 decoration-4 underline-offset-8">{name.charAt(0).toUpperCase() + name.slice(1)}</h1>
            <Movielist animee={animee} />
            <span className='flex justify-between mx-12'>
            <button className="bg-red-700 text-white text-sm p-2 md:w-[100px] w-[150px] rounded-xl mt-4 mb-10 flex items-center justify-center font-pop gap-2 ">Previous</button> 
            <button className="bg-red-700 text-white text-sm p-2 md:w-[100px] w-[150px] rounded-xl mt-4 mb-10 flex items-center justify-center font-pop gap-2">Load More</button> 
            </span>
            </div>
        
  );
}