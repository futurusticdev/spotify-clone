"use client";

import Image from "next/image";
import { Play } from "lucide-react";

interface AlbumCardProps {
  title: string;
  artist: string;
  image: string;
}

const AlbumCard = ({ title, artist, image }: AlbumCardProps) => {
  return (
    <div className="group relative rounded-lg p-4 hover:bg-[#282828] transition-all duration-300 cursor-pointer">
      <div className="relative aspect-square mb-4">
        <Image
          src={image}
          alt={title}
          fill
          className="rounded-md object-cover"
        />
        <div className="absolute bottom-2 right-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button className="bg-[#1DB954] rounded-full p-3 hover:scale-105 transition-transform">
            <Play fill="black" className="h-6 w-6 text-black" />
          </button>
        </div>
      </div>
      <h3 className="font-bold text-base text-white mb-1 truncate">{title}</h3>
      <p className="text-sm text-[#A7A7A7] truncate">{artist}</p>
    </div>
  );
};

export default AlbumCard; 