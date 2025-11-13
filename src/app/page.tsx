import React from 'react';
import Latest from './_components/Latest';
import Animelist from './_components/Animelist';
import connect from './lib/config';

export const metadata = {
  title: "Fical - Watch Anime",
  description: "Fical",
};

// ✔ STEP 1: Fetch all anime at once
async function getAllAnime() {
  const urls = {
    spring: "https://api.jikan.moe/v4/seasons/2018/spring?sfw",
    airing: "https://api.jikan.moe/v4/seasons/now?sfw",
    trending: "https://api.jikan.moe/v4/top/anime?sfw",
    upcoming: "https://api.jikan.moe/v4/seasons/upcoming?sfw",
    sfw: "https://api.jikan.moe/v4/anime?sfw",
  };

  // 5 API calls ek saath
  const responses = await Promise.all(
    Object.values(urls).map((url) => fetch(url).then((r) => r.json()))
  );

  return {
    spring: responses[0].data,
    airing: responses[1].data,
    trending: responses[2].data,
    upcoming: responses[3].data,
    sfw: responses[4].data,
  };
}

export default async function Home() {

  connect();


  const { spring, airing, trending, upcoming, sfw } = await getAllAnime();

  return (
    <div className='min-h-screen'>

      {/* TOP SECTION (LATEST) */}
      <div className='flex flex-col gap-10 px-8 mt-8'>
        <Latest />
      </div>

      {/* CATEGORY SECTIONS */}
      <div className='flex flex-col gap-8 mt-12 ml-6'>
        <Animelist heading="Spring Anime" anime={spring} />
        <Animelist heading="Airing Anime" anime={airing} />
        <Animelist heading="Trending Anime" anime={trending} />
        <Animelist heading="Upcoming Anime" anime={upcoming} />
        <Animelist heading="SFW Anime" anime={sfw} />
      </div>

    </div>
  );
}
