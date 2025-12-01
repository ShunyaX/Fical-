import {Suspense} from 'react';
import Animelist from './Animelist';
import Pulse from './Pulse';

async function Fetchapi({url,heading}:{url:string,heading:string}) {
   const res = await fetch(url,{next:{revalidate:3600}});
   const data =  await res.json();
   return <Animelist anime = {data.data} heading={heading}/>;
}

export default function Homeloader() {
  return(
    <>
      <Suspense fallback={<Pulse />}>
        <Fetchapi 
          heading="Top Anime" 
          url="https://api.jikan.moe/v4/top/anime" 
        />
      </Suspense>

      <Suspense fallback={<Pulse />}>
        <Fetchapi 
          heading="Airing Now" 
          url="https://api.jikan.moe/v4/seasons/now?sfw" 
        />
      </Suspense>

      <Suspense fallback={<Pulse />}>
        <Fetchapi 
          heading="Top Rated" 
          url="https://api.jikan.moe/v4/anime?sfw" 
        />
      </Suspense>

      <Suspense fallback={<Pulse />}>
        <Fetchapi 
          heading="Upcoming" 
          url="https://api.jikan.moe/v4/seasons/upcoming" 
        />
      </Suspense>
    </>
  );
}

