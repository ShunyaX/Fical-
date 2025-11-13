
    import Animeid from "@/app/components/Animeid";
    import Image from "next/image";
    import { useState } from "react";
    import React from 'react'

  interface Props {
    params: { category: string };
  }


  export default async function Anime({params: { category }}: Props) {

    const res = await fetch(`https://api.jikan.moe/v4/anime/${category}`);
    const data = await res.json();
    const anime = data.data;
    return (
        <Animeid anime={anime} />
    
    );
  }   