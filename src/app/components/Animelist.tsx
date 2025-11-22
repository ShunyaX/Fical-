'use client'
import React from 'react'
import Animecard from './Animecard';
import Pulse from './Pulse';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
    heading?: string;
}


export default function Animelist({anime, heading}:{anime: AnimeCardProps[], heading?: string}) {
    const router = useRouter();
    const [time, settime] = React.useState(false);

    React.useEffect(() => {
        const t = setTimeout(() => settime(true), 5000);
        return () => clearTimeout(t);
    }, []);
  return (
         <div>
            <div className='flex items-center justify-between pr-5'>
        {heading && <Link href={`/movielist/${heading.split(" ")[0].toLowerCase()}`}  className='text-lg mb-3 font-pop text-white'>{heading}{" >>"}</Link>}
        </div>
        <div className='flex gap-4 overflow-scroll scroll-smooth scrollbar-hide'>

            
        {anime && anime.length > 0 ? (
                    anime.map((a:any,idx:number) => (
                        <Animecard key={`${a.mal_id}-${idx}`} anime={a} />
                    ))
                ) :!time? (
                    
                    [...Array(6)].map((_, i) => <Pulse key={i} />)
                ) : (
                    <p className='text-white text-center'>Failed to load. please refresh the page </p>
                )}
        </div>
        </div>
        
     
  )
}
