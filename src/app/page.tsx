import React, { Suspense } from 'react';
import Homeloader from './components/Homeloader';
import connect from './lib/config';
import Pulse from './components/Pulse';
import Slider from './components/Slider';
import Footer from './components/Footer';
import BannerLoading from './components/BannerLoading';


export const revalidate = 300;

export const metadata = {
  title: "Fical - Watch Anime",
  description: "Fical",
  icons: { icon: "/favicon.ico" },
};

async function getAnime() {
  const res = await fetch("https://api.jikan.moe/v4/top/anime?sfw", { next: { revalidate: 3600 } });
  const data = await res.json();
  return data?.data?.slice(0, 5) || [];
}

export default async function Home() {
  const mainAnime = await getAnime();
  await connect();


  return (
    <div className="min-h-screen">
      <div className="flex flex-col gap-10 px-8 mt-8">
        <Suspense fallback={<BannerLoading />}>
          <Slider mainAnime={mainAnime} />
        </Suspense>
        
    </div><div className="flex flex-col gap-8 mt-12 ml-6">
        <Suspense fallback={<Pulse />}>
          <Homeloader />
        </Suspense>
      </div>
      <Footer />

    </div>
  );
}
