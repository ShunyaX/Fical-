import Image from "next/image";
export default function NotFound() {
  return (
    
    <div className='flex flex-col items-center mt-24'>
      <Image width={200} height={200} alt="ninja" src="/ninja.png" className="md:w-44 md:h-44 animate-bounce"/>
      <h1 className='text-white md:text-2xl font-light font-pop object-contain'>404 Page Not Found</h1>
      
        
    </div>
    
  );
}