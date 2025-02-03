import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, MoreVertical } from "lucide-react";

interface PlaylistCardProps {
  id: string;
  name: string;
  description?: string;
  trackCount: number;
  isPublic: boolean;
  onPlay?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({
  id,
  name,
  description,
  trackCount,
  isPublic,
  onPlay,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="group relative bg-neutral-400/5 rounded-xl p-4 hover:bg-neutral-400/10 transition">
      <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
        {/* Default playlist image - you might want to create a proper placeholder */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-400/50 to-neutral-900/50" />
        <Image
          className="object-cover"
          src="/playlist-placeholder.png"
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div
          className="absolute bottom-2 right-2 flex items-center justify-center
            opacity-0 group-hover:opacity-100 hover:scale-110 transition"
        >
          <button
            onClick={onPlay}
            className="flex items-center justify-center h-10 w-10 rounded-full 
              bg-green-500 hover:bg-green-400 transition"
          >
            <Play className="h-5 w-5 text-black" />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-y-1 pt-4">
        <Link href={`/playlist/${id}`}>
          <p className="font-semibold truncate">{name}</p>
        </Link>
        {description && (
          <p className="text-neutral-400 text-sm truncate">{description}</p>
        )}
        <div className="flex items-center justify-between">
          <p className="text-neutral-400 text-xs">
            {trackCount} {trackCount === 1 ? "track" : "tracks"} •{" "}
            {isPublic ? "Public" : "Private"}
          </p>
          <div className="relative group">
            <button
              onClick={(e) => {
                e.stopPropagation();
                // Toggle dropdown menu
              }}
              className="p-2 hover:bg-neutral-800 rounded-full transition"
            >
              <MoreVertical className="h-5 w-5" />
            </button>
            {/* Dropdown menu for edit/delete */}
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-neutral-900 ring-1 ring-black ring-opacity-5 hidden group-focus-within:block">
              <div className="py-1" role="menu">
                <button
                  onClick={onEdit}
                  className="block w-full px-4 py-2 text-sm text-left text-white hover:bg-neutral-800"
                  role="menuitem"
                >
                  Edit Playlist
                </button>
                <button
                  onClick={onDelete}
                  className="block w-full px-4 py-2 text-sm text-left text-red-500 hover:bg-neutral-800"
                  role="menuitem"
                >
                  Delete Playlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistCard;
