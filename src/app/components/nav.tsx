'use client'
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handlesearch = () => {
    router.push("/search");
  };

  return (
    <div className="sticky top-0 z-50 p-1 mx-2 md:mx-10 max-w-full ">
    <nav className="bg-[#8A0000]/80 backdrop-blur-3xl border-b border-red-200/10
 rounded-2xl drop-shadow-xl p-3 flex justify-between items-center shadow-md">
      <div className="text-white md:text-2xl text-xl font-pop">
        <Link href="/" className="md:text-xl text-xl"><span className="text-yellow-500 text-2xl">F</span>ical</Link>
      </div>
      <ul className="space-x-4 hidden md:flex font-pop">
        <li>
          <Link href="/Anime" className="text-white hover:text-gray-300">Anime</Link>
        </li>
        <li>
          <Link href="/Manga" className="text-white hover:text-gray-300">Manga</Link>
        </li>
      </ul>
      <div className="flex items-center space-x-4">
        <button className=" bg-slate-200 text-red-900 font-pop p-2 rounded-md text-sm hover:bg-gray-200 " onClick={() => {router.push("/Login")}}>Login</button>

        <button className=" text-white px-3 py-2 rounded-md h-8 md:h-10 " onClick={handlesearch}><Image alt="search" src="/search.png" width={200} height={200} className="w-full h-full"/></button>
        
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            ☰
          </button>
        </div>
        {isOpen && (
          <div className="absolute z-[9999] top-full right-0 mt-1 bg-[#8A0000] rounded-lg shadow-lg w-40 p-2 flex flex-col space-y-2 md:hidden">
            <Link href="/All" className="text-white hover:text-gray-300">All</Link>
            <Link href="/movies" className="text-white hover:text-gray-300">Movies</Link>
            <Link href="/Manga" className="text-white hover:text-gray-300">Manga</Link>
          </div>
        )}
    </nav>
    </div>
  );
}
