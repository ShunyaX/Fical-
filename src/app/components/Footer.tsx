import { FaFacebookF, FaInstagram } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image"; 

export default function Footer () {
  return (
    
    <footer className="bg-[#1a1a1a] text-gray-300 py-8 border-t mt-10 border-gray-800">
      
      
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="flex flex-col items-center md:items-start gap-2">
           
           <div className="flex gap-4 text-sm font-semibold">
              <Link href="/terms" className="hover:text-white">Terms of conditions</Link>
              <Link href="/dmca" className="hover:text-white">DMCA</Link>
              <Link href="/contact" className="hover:text-white">Contact Us</Link>
           </div>
           
           
           <p className="text-xs text-gray-500 text-center md:text-left">
              Fical does not index any files
           </p>
        </div>

        
        <div className="flex flex-col items-center md:items-end gap-3">
           
           
           <div className="flex gap-3">
              
              <div className="w-8 h-8 bg-[#1877F2] rounded-full flex justify-center items-center"><FaFacebookF size={18} className="m-auto" /></div> 
              <div className="w-8 h-8 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] rounded-full flex justify-center items-center"><FaInstagram size={20} className="m-auto" /></div> 
           </div>

           
           <Link href="/">
             <Image 
               src="/logo.png" 
               alt="Fical Footer Logo" 
               width={100} 
               height={35} 
               className="object-contain"
             />
           </Link>
        </div>

      </div>
    </footer>
  );
};
