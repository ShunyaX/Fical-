'use client';

import React, { useState, useEffect, KeyboardEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const [input, setInput] = useState('');
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = () => {
    if (input.trim()) {
      router.push(`/search?q=${encodeURIComponent(input.trim())}`);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    const fetchAnime = async () => {
      const res = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data.data);
    };

    if (query.trim()) fetchAnime();
  }, [query]);

  return (
    <div className="min-h-screen py-5">
      <div className="pt-12 md:px-40 px-8">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Search..."
          className="bg-zinc-600 text-white p-4 rounded-xl w-full outline-none text-lg font-pop"
        />
      </div>

      <div className="flex gap-2 mt-2 justify-center">
        {['All', 'Movies', 'Manga'].map((tag) => (
          <button key={tag} className="bg-slate-600 rounded-2xl p-3 shadow-2xl text-white text-nunito active:outline-red-900 hover:bg-slate-700 transition-all duration-300">
            {tag}
          </button>
        ))}
      </div>

      <h1 className="font-pop font-semibold mt-32 text-white text-center">
        Search Results for "{query}"
      </h1>

      <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 place-items-center px-4">
        {results.map((anime,index) => (
          <button
            key={`${anime.mal_id}_${index}`}
            onClick={() => router.push(`/anime/${anime.mal_id}`)}
            className="relative w-44 h-56 md:w-60 md:h-80 rounded-xl overflow-hidden shadow-2xl"
          >
            <div
              className="absolute inset-0 bg-cover bg-center blur-sm scale-110 z-0"
              style={{ backgroundImage: `url(${anime.images.jpg.large_image_url})` }}
            />

            <div className="relative z-10 flex justify-center items-center md:h-48 h-38 bg-black/10">
              <Image
                src={anime.images.jpg.large_image_url}
                alt={anime.title}
                className="object-contain h-full"
              />
            </div>

            <div className="relative z-10 px-3 py-5 bg-zinc-800/90 backdrop-blur-sm font-nunito text-white h-32 flex flex-col justify-between">
              <h2 className="font-semibold text-sm truncate">{anime.title}</h2>
              <p className="text-gray-300 text-xs line-clamp-2">
                {anime.synopsis?.slice(0, 100)}...
              </p>
              <span className="text-yellow-400 text-sm font-semibold">
                ⭐ {anime.score ?? "-"}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
