import React from 'react';

import Animelist from './components/Animelist';
import Homeloader from './components/Homeloader';
import connect from './lib/config';
import Slider from './components/Slider';

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Fical - Watch Anime",
  description: "Fical",
};



export default async function Home() {

  connect();


  return (
    <div className='min-h-screen'>

      
      <div className='flex flex-col gap-10 px-8 mt-8'>
       <Slider  />
      </div>

     
      <div className='flex flex-col gap-8 mt-12 ml-6'>
        <Homeloader/>
      </div>

    </div>
  );
}
