'use client'

import { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface WatchlistContextType {
  ids: any[];
  toggleWatchlist: (anime: any) => Promise<void>;
  LoadingId: number | null;
}

export const WatchlistContext = createContext<WatchlistContextType | null>(null);

export const WatchlistProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const [ids, setids] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [LoadingId, setLoadingId] = useState<number | null>(null);


  useEffect(()=>{
     if(session){
        fetch("/api/watchlist")
        .then(res=>res.json())
        .then(data=>setids(data.items.map((i: any) => i.animeId)))
        .catch(e=>console.error("Error fetching watchlist:", e))
        .finally(()=>setLoading(false));
     }else{
        setids([]);
        setLoading(false);
     }
  },[session]);

  const toggleWatchlist = async (anime: any) => {

    if(!session) alert("Please log in to manage your watchlist");
    const Id = anime.mal_id || anime.animeId;
    const issaved = ids.includes(Id);

    setLoadingId(Id);

  

    

    const method = issaved? "DELETE" : "POST";
    const url = issaved? `/api/watchlist/${Id}` : "/api/watchlist";

    
     

    try {
        const res = await fetch(url,{
            method,
            headers: method === "POST"? { "Content-Type": "application/json" } : undefined,
            body:issaved? undefined : JSON.stringify({
                animeId: Id,
                title: anime.title,
                image: anime?.images.jpg.image_url,
                score: anime.score,
                genres: anime.genres?.map((g: any) => g.name) || [],
                episodes: anime.episodes,
                synopsis: anime.synopsis,
        }),
     });

      if (!res.ok) {
      throw new Error("Failed to update watchlist");
    }

  setids(prev => issaved ? prev.filter(id => id !== Id) : [...prev, Id]);

    } catch (e) {
        setids(ids);
        console.error("Error updating watchlist:", e);
        setLoadingId(null);
    } finally{ setLoadingId(null); }
  };
  

    return (
    <WatchlistContext.Provider value={{ ids, toggleWatchlist, LoadingId }}>
      {children}
    </WatchlistContext.Provider>
    );
};

export const useWatchlist = () => {
    const context = useContext(WatchlistContext);
    if(!context) {
        throw new Error("useWatchlist must be used within a WatchlistProvider");
    }
    return context;
};