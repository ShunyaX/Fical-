"use client"

import { useRouter } from "next/navigation"
import Image from "next/image" 

interface Anime {
    mal_id: number;
    title: string;
    images: {
        jpg: {
            large_image_url: string;
        }
    }
    star: string;
}


export default function Movielist({ animes }: { animes: Anime[] }) {
    const router = useRouter()

    return (
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4'>
            {animes.map((a: Anime) => (
                <div key={a.mal_id} className='cursor-pointer'  onClick={() => router.push(`/anime/${a.mal_id}`)}>
                    <Image
                        src={a.images.jpg.large_image_url}
                        alt={a.title}
                        width={200}
                        height={300}
                        className="w-full h-auto rounded-md "
                    />
                    <h3 className='text-white mt-2'>{a.title}</h3>
                    <p className='text-yellow-400'>{a.star}</p>
                </div>
            ))}
        </div>
    )
}