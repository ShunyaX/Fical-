'use client';

import { useRouter } from 'next/navigation';    
import Image from 'next/image';
import { useState,useEffect } from 'react';

import {Swiper,SwiperSlide } from 'swiper/react';
import {Autoplay,Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


type Anime = {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      image_url: string;
      large_image_url: string;
    };
  };
  genres: { name: string }[];
  score?: number;
  synopsis?: string;
};


export default function Slider() { 
  const [anime, setAnime] = useState<Anime[]>([]);
  
   const router = useRouter();
   useEffect(() => {
    async function fetchTrending() {
      const res = await fetch("https://api.jikan.moe/v4/top/anime?sfw");
      const data = await res.json();
      setAnime(data?.data?.slice(0, 5) || []);
    }
    fetchTrending();
  }, []);

  if (!anime || anime.length === 0) return null;

    return (
      
        <section className="">
      <Swiper
        modules={[Navigation, Pagination,Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        grabCursor={true}
        loop={true}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
          
        }}

        breakpoints={{
          640: { slidesPerView: 1,
                 centeredSlides: true,
           },
          768: { slidesPerView: 1,
                  centeredSlides: false,
          },
          1024: { slidesPerView: 1,
                   centeredSlides: false,
          },
        }}
      >
        
        {anime.map((anime: Anime, idx: number) => (
          
          <SwiperSlide key={idx} onClick={() => router.push(`/anime/${anime.mal_id}`)}>
            <section className="overflow-hidden md:mx-auto relative rounded-3xl h-[470px] md:h-[400px] md:w-[860px] flex gap-8 justify-between max-w-6xl mx-auto cursor-pointer ">
            <div className='absolute inset-0 -z-10'>
              <Image fill src={anime?.images?.jpg?.image_url} alt={anime?.title} className="w-full h-full object-cover blur-sm -z-10"/>
              <div className="absolute inset-0 bg-gradient-to-l from-black/40 via-black/30 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/10 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
            </div>
            

            
      <div className= "md:w-[60%] absolute w-full px-7 py-2 bottom-8 z-10 font-medium text-white ">

        <h2 className="mb-3 text-4xl font-pop font-medium text-white ">{anime?.title}</h2>
          

        <span className='flex gap-1 mt-2'>
        <p className='bg-slate-900 rounded-full text-xs font-pop font-light text-center p-2'>⭐{anime?.score}</p>
        <p className='bg-slate-900 rounded-full text-xs font-pop font-light text-center p-2'>{anime.genres?.[0]?.name ?? "unknown"}</p>
        </span>
        <div className='line-clamp-2 md:text-wrap'>
        <p className="text-white text-xs font-light font-nunito mt-2 ">{anime?.synopsis}</p>
        </div>
        <div className='flex gap-2 items-center'>
        <button className="text-white border-2 border-red-500 text-sm font-pop rounded-full bg-red-600 px-4 py-2 mt-4 hover:bg-red-700 " > Watch now </button>
        <button className='rounded-xl bg-zinc-800 text-base font-pop px-3 py-2 mt-4 hover:bg-zinc-900'><img src="/add.png" alt="Add" className="w-5 h-6 object-contain" /></button>
        </div>
        </div>
        
        <div className="absolute inset-0 rounded-3xl md:inset-[5%]">
          <Image fill src={anime?.images?.jpg?.image_url} alt={anime?.title} className="object-contain object-top md:object-right " />
              <div className="md:hidden absolute inset-0 bg-gradient-to-l from-black/90 via-black/30 to-transparent"></div>
              <div className="md:hidden absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
              <div className="md:hidden absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
              <div className="md:hidden absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

        </div>
 

        
      
        
      
    
      </section>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
    

    );
    }