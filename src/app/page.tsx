import React, { Suspense } from 'react';

import Animelist from './components/Animelist';
import Homeloader from './components/Homeloader';
import connect from './lib/config';
import Pulse from './components/Pulse';
import Slider from './components/Slider';

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Fical - Watch Anime",
  description: "Fical",
  icons: { icon: "/favicon.ico" },
};

export default async function Home() {
  await connect();

  return (
    <div className="min-h-screen">


      <div className="flex flex-col gap-10 px-8 mt-8">
        <Suspense fallback={<Pulse />}>
        <Slider />
      </Suspense>
    </div><div className="flex flex-col gap-8 mt-12 ml-6">
        <Suspense fallback={<Pulse />}>
          <Homeloader />
        </Suspense>
      </div>

    </div>
  );
}
