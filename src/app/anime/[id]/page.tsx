
    import Animeid from "@/app/components/Animeid";
    import React from 'react'

  interface Props {
    params: Promise<{ id: string }>;
  }


  export default async function Anime({params}: Props) {
    
    const { id } = await params;
    const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
    const data = await res.json();
    const anime = data.data;
    return (
        <Animeid anime={anime} />
    
    );
  }   