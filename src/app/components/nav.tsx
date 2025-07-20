'use client'
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Nav() {
  const router = useRouter();

  const handlesearch = () => {
    router.push("/search");
  };

  return (
    <div className="p-4 px-10">
    <nav className="bg-[#8A0000] rounded-2xl drop-shadow-xl p-3 flex justify-between items-center shadow-md">
      <div className="text-white md:text-2xl text-xl font-pop">
        <Link href="/" className="md:text-3xl text-xl">F</Link>
      </div>
      <ul className="space-x-4 hidden md:flex font-pop">
        <li>
          <Link href="/movies" className="text-white hover:text-gray-300">Movies</Link>
        </li>
        <li>
          <Link href="/about" className="text-white hover:text-gray-300">About</Link>
        </li>
        <li>
          <Link href="/contact" className="text-white hover:text-gray-300">Contact</Link>
        </li>
      </ul>
      <div className="flex items-center space-x-4">
        <button className="hidden md:bg-white text-red-900 px-4 py-2 rounded-md text-sm hover:bg-gray-200 ">Login</button>

        <button className=" text-white px-3 py-2 rounded-md h-8 md:h-10 " onClick={handlesearch}><img src="/search.png" className="w-full h-full"/></button>
        
        
        </div>
    </nav>
    </div>
  );
}
