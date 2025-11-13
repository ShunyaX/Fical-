
    import Animeid from "@/app/_components/Animeid";
    import React from 'react'

  interface Props {
    params: { id: string };
  }


  export default async function Anime({params: { id }}: Props) {
    

    const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
    const data = await res.json();
    const anime = data.data;
    return (
        <Animeid anime={anime} />
    
    );
  }   