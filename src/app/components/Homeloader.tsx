import Animelist from "./Animelist";
import Slider from "./Slider";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function endpoint() {
  const urls = {
    spring: "https://api.jikan.moe/v4/seasons/2018/spring?sfw",
    airing: "https://api.jikan.moe/v4/seasons/now?sfw",
    trending: "https://api.jikan.moe/v4/top/anime?sfw",
    upcoming: "https://api.jikan.moe/v4/seasons/upcoming?sfw",
    sfw: "https://api.jikan.moe/v4/anime?sfw",
  };

  const results: Record<string, any> = {
    spring: [],
    airing: [],
    trending: [],
    upcoming: [],
    sfw: [],
  };

  try {
    for (const [key, url] of Object.entries(urls)) {
      

      const res = await fetch(url, { next: { revalidate: 3600 } });

      if (res.ok) {
        const data = await res.json();
        results[key] = data.data || [];
      } else {
        console.error(`Failed ${key}: ${res.status}`);
      }

      await delay(400);
    }

    return results;

  } catch (error) {
    console.error("Critical API Error:", error);
    return results;
  }
}

export default async function HomePage() {
  const { spring, airing, trending, upcoming, sfw } = await endpoint();
 
  return (
    <div className="space-y-10">
      <Animelist heading="Spring Anime" anime={spring} />
      <Animelist heading="Airing Anime"  anime={airing} />
      <Animelist heading="Trending Anime" anime={trending} />
      <Animelist heading="Upcoming Anime" anime={upcoming} />
      <Animelist heading="SFW Anime" anime={sfw} />
    </div>
  );
}
