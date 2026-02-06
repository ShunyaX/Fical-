'use client';

import React, { useState, useEffect, KeyboardEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Animecard, { AnimeCardProps } from '../components/Animecard';

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const [input, setInput] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [acttag, setActTag] = useState<string>('All');

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
      let url = `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}`;

      if( acttag === 'Anime' ){
        url += "&type=movie";
      }

      if( acttag === 'Manga' ){
        url = `https://api.jikan.moe/v4/manga?q=${encodeURIComponent(query)}`;
      }

      const res = await fetch(url);
      const data = await res.json();
      setResults(data.data);
    };

    if (query.trim()) fetchAnime();
  }, [query, acttag]);

  return (
    <div className="min-h-screen py-5">
      <div className="pt-12 md:px-40 px-8">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value) }
          onKeyDown={handleKeyPress}
          placeholder="Search..."
          className="bg-zinc-600 text-white p-4 rounded-xl w-full outline-none text-lg font-pop"
        />
      </div>

      <div className="flex gap-2 mt-2 justify-center">
        {['All', 'Anime', 'Manga'].map((tag) => (
          <button key={tag} onClick={() => setActTag(tag)} className={` rounded-2xl p-3 shadow-2xl text-white text-nunito transition-all duration-300 ${tag === acttag ? "bg-red-800" : "bg-slate-600"}`}>
            {tag}
          </button>
        ))}
      </div>

      <h1 className="font-pop font-semibold mt-32 text-white text-center">{query && `${acttag} Results for "${query}"`}
        
      </h1>

      <div className="mt-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5  gap-4 place-items-center px-4">
        {results.map((anime,index) => (
           <Animecard key={anime.mal_id} anime={anime as AnimeCardProps} />
        ))}
      </div>
    </div>
  );
}
