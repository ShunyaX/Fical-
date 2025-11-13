import Animelist from "./Animelist";
import Slider from "./Slider";


async function endpoint() {
  const urls = {
    spring: "https://api.jikan.moe/v4/seasons/2018/spring?sfw",
    airing: "https://api.jikan.moe/v4/seasons/now?sfw",
    trending: "https://api.jikan.moe/v4/top/anime?sfw",
    upcoming: "https://api.jikan.moe/v4/seasons/upcoming?sfw",
    sfw: "https://api.jikan.moe/v4/anime?sfw",
  };


  const responses = await Promise.all(
    Object.values(urls).map((url) => fetch(url).then((r) => r.json()))
  );

  return {
    spring: responses[0].data,
    airing: responses[1].data,
    trending: responses[2].data,
    upcoming: responses[3].data,
    sfw: responses[4].data,
  };
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
      <Slider anime={spring} />
    </div>
  );
}
