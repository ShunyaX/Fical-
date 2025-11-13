import React from 'react';
import Movielist from '../_components/movielist';



const trendinganime = async () =>{
    const res = await fetch('https://api.jikan.moe/v4/top/anime?type=tv');
    const data = await res.json();
    return data.data;
    
}
export default async function Movies() {
  
  const animee = await trendinganime();
    
    

  return (
        <div>
            <h1 className="text-2xl text-white font-bold p-4">Trending Movies</h1>
            <Movielist animes={animee} />
        </div>
  );
}