
export default function BannerLoading() {
  return (
    <div className="w-full max-w-[860px] mx-auto animate-pulse">
      <div className="relative rounded-3xl h-[470px] md:h-[400px] w-full bg-zinc-900 overflow-hidden flex gap-8 justify-between p-7">
        
        {/* Left Side: Text Placeholders */}
        <div className="md:w-[60%] absolute bottom-8 w-full pr-14">
          {/* Title placeholder */}
          <div className="h-10 bg-zinc-800 rounded-md w-3/4 mb-4"></div>
          
          {/* Badges/Score placeholder */}
          <div className="flex gap-2 mb-4">
            <div className="h-6 bg-zinc-800 rounded-full w-16"></div>
            <div className="h-6 bg-zinc-800 rounded-full w-20"></div>
          </div>
          
          {/* Synopsis placeholder */}
          <div className="space-y-2">
            <div className="h-3 bg-zinc-800 rounded w-full"></div>
            <div className="h-3 bg-zinc-800 rounded w-5/6"></div>
          </div>
          
          {/* Buttons placeholder */}
          <div className="flex gap-3 mt-6">
            <div className="h-10 bg-zinc-800 rounded-full w-32"></div>
            <div className="h-10 bg-zinc-800 rounded-xl w-12"></div>
          </div>
        </div>

        {/* Right Side: Poster Placeholder (Desktop only) */}
        <div className="hidden md:block absolute right-10 top-1/2 -translate-y-1/2 w-[260px] h-[360px] bg-zinc-800 rounded-3xl"></div>
      </div>
    </div>
  );
}