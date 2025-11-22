'use client';
import React from 'react';
import Image from 'next/image';
import { useState } from 'react';

export default function Animeid({anime}:{anime:any}) {
  const [open, isopen] = useState(false);

  return (
    <div className="relative overflow-hidden px-10 flex flex-col items-center h-full md:h-[530px] ">
        <div className="h-[540px] overflow-hidden md:blur-sm absolute inset-0 -z-10" style={{
          backgroundImage: `url(${anime.images.jpg.image_url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transformOrigin: "center center",
        }} >
        
        </div>

        <div className=" absolute inset-0 -z-10 bg-gradient-to-l from-black/10 to-black pb-10 hidden sm:hidden md:block"></div>  
        <div className=" absolute inset-0 -z-10 bg-gradient-to-b from-black/10 to-black/70 pb-10 hidden sm:hidden md:block"></div>
        <div className=" absolute inset-0 -z-10 bg-gradient-to-b from-black/10 to-transparent pb-10 hidden sm:hidden md:block"></div>    
          
          <div className='hidden md:flex justify-end items-center w-full -z-10 md:mt-5'>
        <img  alt={anime.title} src={anime?.images?.jpg.large_image_url} className="md:drop-shadow-3xl shadow-cyan-500/50 border-4 rounded-3xl max-w-80 mt-4 mr-5 " />
          </div>
          
          
        
        
        <div className="flex flex-col items-center justify-end md:items-start text-xs font-pop mt-64 md:mt-0 md:absolute md:top-32 md:left-12 ">
          <div className='w-[90%] md:w-[580px]'>
          <h1 className=" font-medium text-2xl md:text-4xl mb-4 text-center md:text-left text-white">{anime.title}</h1>
           <div className='text-xs flex gap-1 items-center justify-center md:justify-start '>
          <span className=" text-white bg-red-900/20 rounded-md p-1">{anime.type} - {anime.episodes} episodes</span>
          <span className=" text-white bg-red-900/20 rounded-md p-1">A</span>
          <span className=" text-white rounded-md">{}</span>
          <span className=" text-white bg-red-900/20 rounded-md p-1">*comedy,drama, sci-fi</span>
          </div>
          <p className="text-white mt-2 line-clamp-3 text-wrap">{anime.synopsis}</p>
          
          

        </div>
        <div className=" text-xs flex gap-4 mt-2  md:flex items-start justify-start">
          <div>
            <div className=" absolute inset-0 -z-10 bg-gradient-to-b from-black/10 to-black pb-10 md:hidden"></div>  
            <button className="bg-red-600 text-white p-3 w-[250px] rounded-xl mt-4 flex items-center justify-center font-pop gap-5"><Image width={20} height={20} alt='play.png' src="/play.png" className=" w-6 h-6"/>Start watching E1</button>
          </div>
          <button className="bg-transparent border-red-600 border-2 text-white p-3 w-12 rounded-xl mt-4 flex items-center justify-center font-pop gap-2"><Image width={20} height={20} alt='add.png' src="/add.png" className="w-5 h-5"/></button>
          
        </div>
        <button className="bg-blue-900 text-white p-3 w-full md:w-[315px] rounded-xl mt-4 flex items-center justify-center font-pop gap-2" onClick={()=>{isopen(true)}}><Image width={20} height={20} alt='info.png' src="/info.png" className=" w-6 h-6"/>More Details</button>
        </div>

         {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-zinc-900 p-4 rounded-lg  w-[95%] max-w-[800px] scrollbar-hide
                    max-h-[70vh] overflow-y-auto text-white">
              <h2 className="text-lg font-bold mb-2">{anime.title}</h2>
              <p>{anime.synopsis}</p>
              <button className="mt-4 bg-blue-500 text-white p-2 rounded" onClick={() => isopen(false)}>Close</button>
            </div>
          </div>
        )}



        </div>
  );
}