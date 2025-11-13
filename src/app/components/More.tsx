'use client';
import React from 'react';
import Image from 'next/image';
import { useState } from 'react';

const moreanime = async () => {
  const res = await fetch("https://api.jikan.moe/v4/top/anime?type=ova");
  const data = await res.json();
  return data.data;
}

export default async function Animeid({More}:{anime:any}) {
  const anime = await moreanime();

  return (
    <div className="relative p-4 px-6 flex flex-col items-center h-[600px]">
        <div className="h-[500px] overflow-hidden blur-sm absolute inset-0 -z-10" style={{
          backgroundImage: `url(${anime.images.jpg.large_image_url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }} >
        
        </div>

        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/70 to-transparent"></div>  
          
          <div className='flex justify-end items-center w-full'>
        <img src={anime.images.jpg.large_image_url} alt={anime.name} className="md:drop-shadow-2xl rounded-xl max-w-xs" />
          </div>
          
          
        
        
        <div className="flex flex-col items-start font-pop absolute">
          <div className='text-sm w-1/4 p-12 '>
          <h1 className=" font-bold text-white">{anime.title}</h1>
        
          <span className="text-white font-pop">{anime.type} - {anime.episodes} episodes</span>
          <span className="p-2 text-white bg-zinc-600 rounded-md">A</span>
          <span className="p-2 text-white  rounded-md">{}</span>
          <span className="p-2 text-white rounded-md">*comedy,drama, sci-fi</span>
          <p className="text-white mt-2 line-clamp-3 text-wrap">{anime.synopsis}</p>
          

        </div>
        <div className="flex gap-4 mt-2 md:flex items-start justify-start">
          <div>
            <button className="bg-red-600 text-white p-3 w-auto rounded-md mt-4 flex items-center justify-center font-pop gap-5"><img src="/play.png" className=" w-10 h-10"/>Start watching E1</button>
          </div>
          <button className="bg-transparent border-red-600 border-2 text-white p-3  rounded-md mt-4 flex items-center justify-center font-pop gap-5"><img src="/add.png" className=" w-10 h-10"/></button>
        </div>
        </div>

         
        
        <h1 className="text-2xl font-bold text-left text-white mt-6">Episodes:</h1>
        <div className="flex flex-col items-center mt-10">
          <div className="bg-gray-800 p-4 rounded-md w-full">
            <img></img>
            <h2 className="text-xl font-bold text-white">Episode 1</h2>
            <p className="text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>



        </div>
  );
}