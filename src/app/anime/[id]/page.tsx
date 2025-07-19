interface Props {
  params: { id: string };
}









export default async function Anime({params: { id }}: Props) {

  const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
  const data = await res.json();
  const anime = data.data;
  return (
    <div className="p-4 px-6 flex flex-col items-center h-[600px]">
      <div  className="">
      <img src={anime.images.webp.large_image_url} alt={anime.name} className=" rounded-lg shadow-lg mb-4 object-contain" />
      </div>
      
      <div className="flex flex-col items-start font-pop">
        <h1 className="text-3xl font-bold text-white mb-4">{anime.title}</h1>
      
        <span className="text-white text-lg font-pop">{anime.type} - {anime.episodes} episodes</span>
        <span className="p-2 text-white bg-zinc-600 rounded-md">A</span>
        <span className="p-2 text-white  rounded-md">{}</span>
        <span className="p-2 text-white rounded-md">*comedy,drama, sci-fi</span>
        <p className="text-white mt-2">{anime.synopsis}</p>

      </div>
      <div className="flex gap-4 mt-2 md:flex items-start justify-start">
        <div>
          <button className="bg-red-600 text-white p-3 w-64 rounded-md mt-4 flex items-center justify-center font-pop gap-5"><img src="/play.png" className=" w-10 h-10"/>Start watching E1</button>
        </div>
        <button className="bg-transparent border-red-600 border-2 text-white p-3  rounded-md mt-4 flex items-center justify-center font-pop gap-5"><img src="/bookmark.png" className=" w-10 h-10"/></button>
      </div>
       
       <h1 className="text-2xl font-bold text-left text-white mt-6">Episodes:</h1>
       <div className="flex flex-col items-center mt-10">
        <div></div>
        
        
       </div>



      </div>
      


   
  );
}   