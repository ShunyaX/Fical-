'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import Link from 'next/link';


import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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

export default function Slider({ mainAnime }: { mainAnime: any[] }) { 
  if (!mainAnime || mainAnime.length === 0) return null;

  return (
    <section className="w-full max-w-[860px] mx-auto">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
      >
        {mainAnime.map((anime: Anime, idx: number) => (
          <SwiperSlide key={anime.mal_id}>
            
            <Link href={`/anime/${anime.mal_id}`} className="block">
              <section className="overflow-hidden relative rounded-3xl h-[470px] md:h-[400px] w-full flex gap-8 justify-between cursor-pointer group">
                
              
                <div className='absolute inset-0 -z-10'>
                  <Image 
                    fill 
                    src={anime?.images?.jpg?.large_image_url || anime?.images?.jpg?.image_url} 
                    priority={idx === 0} 
                    alt={anime?.title} 
                    className="w-full h-full object-cover md:opacity-30 -z-10 transition-transform duration-500 group-hover:scale-105"
                  />
                 
                  <div className="hidden md:flex absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent"></div>
                  <div className="absolute md:hidden inset-0 bg-gradient-to-t from-black/90 via-black/80 to-transparent"></div>
                </div>

              
                <div className="md:w-[60%] absolute w-full px-7 py-2 bottom-8 z-10 font-medium text-white">
                  <h2 className="mb-3 text-3xl md:text-4xl font-pop font-medium text-white">{anime?.title}</h2>
                  
                  <div className='flex gap-1 mt-2'>
                    <p className='bg-slate-900/80 backdrop-blur-md rounded-full text-xs font-pop font-light text-center p-2'>⭐ {anime?.score}</p>
                    <p className='bg-slate-900/80 backdrop-blur-md rounded-full text-xs font-pop font-light text-center p-2'>{anime.genres?.[0]?.name ?? "Anime"}</p>
                  </div>

                  <div className='line-clamp-2 mt-2'>
                    <p className="text-white/80 text-xs font-light font-nunito">{anime?.synopsis}</p>
                  </div>

                  <div className='flex gap-2 items-center mt-4'>
                    <div className="text-white border-2 border-red-500 text-sm font-pop rounded-full bg-red-600 px-6 py-2 hover:bg-red-700 transition-colors"> 
                       Watch now 
                    </div>

                    <div className='rounded-xl border-2 border-gray-600 bg-zinc-800 p-2 hover:bg-red-600'>
                        <img src="/add.png" alt="Add" className="w-5 h-6 object-contain" />
                    </div>
                  </div>
                </div>

                <div className="hidden md:block absolute right-10 top-1/2 -translate-y-1/2 w-[260px] h-[360px] rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl transition-transform duration-300 group-hover:scale-105 hover:border-red-900">
                  <Image 
                    fill 
                    src={anime?.images?.jpg?.image_url} 
                    alt={anime?.title} 
                    className="object-cover object-top" 
                  />
                </div>
              </section>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}