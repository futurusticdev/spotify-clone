"use client";

import { useState, useCallback, memo, useMemo } from "react";
import { Play, Pause } from "lucide-react";
import { PlayAuthDialog } from "@/components/auth/PlayAuthDialog";
import { usePlayer } from "@/context/PlayerContext";
import { isAuthenticated } from "@/lib/auth";

interface Track {
  id: string;
  title: string;
  artist: string;
  imageUrl: string;
  audioSrc: string;
  albumId?: string;
  context?: {
    type: "album" | "playlist" | "artist" | "single";
    id: string;
    name: string;
  };
}

interface AlbumCardProps {
  title: string;
  artist: string;
  image: string;
  isLoggedIn: boolean;
  tracks: Track[];
}

const AlbumCard = memo(function AlbumCard({
  title,
  artist,
  image,
  isLoggedIn,
  tracks,
}: AlbumCardProps) {
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const { currentTrack, currentContext, isPlaying, playTrack, togglePlayback } =
    usePlayer();
  const [isHovered, setIsHovered] = useState(false);

  // Create album context
  const albumContext = useMemo(
    () => ({
      type: "album" as const,
      id: `album-${title}-${artist}`,
      name: title,
    }),
    [title, artist]
  );

  // Add context to tracks
  const tracksWithContext = useMemo(
    () =>
      tracks.map((track) => ({
        ...track,
        context: albumContext,
      })),
    [tracks, albumContext]
  );

  const isCurrentAlbum = useMemo(
    () => currentTrack && currentContext?.id === albumContext.id,
    [currentTrack, currentContext, albumContext]
  );

  const handlePlay = useCallback(() => {
    if (!isLoggedIn) {
      setShowAuthDialog(true);
      return;
    }

    if (isCurrentAlbum && isPlaying) {
      togglePlayback();
    } else if (tracksWithContext.length > 0) {
      playTrack(tracksWithContext[0], tracksWithContext, albumContext);
    }
  }, [
    isLoggedIn,
    isCurrentAlbum,
    isPlaying,
    tracksWithContext,
    albumContext,
    playTrack,
    togglePlayback,
  ]);

  return (
    <>
      <div
        className="p-4 rounded-md bg-[#181818] hover:bg-[#282828] transition-colors group relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        data-testid="album-card"
      >
        <div className="relative">
          <img
            src={image}
            alt={title}
            className="w-full aspect-square object-cover rounded-md mb-4 shadow-lg"
          />
          <button
            onClick={handlePlay}
            className={`absolute bottom-2 right-2 w-12 h-12 bg-[#1ed760] rounded-full flex items-center justify-center shadow-xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 hover:scale-105 hover:bg-[#1fdf64] ${
              isCurrentAlbum && isPlaying ? "opacity-100 translate-y-0" : ""
            }`}
            aria-label={isCurrentAlbum && isPlaying ? "Pause" : "Play"}
          >
            {isCurrentAlbum && isPlaying ? (
              <Pause className="w-5 h-5 text-black" />
            ) : (
              <Play className="w-5 h-5 text-black ml-1" />
            )}
          </button>
        </div>
        <h3 className="font-bold text-base mb-1 truncate">{title}</h3>
        <p className="text-[#B3B3B3] text-sm truncate">{artist}</p>
      </div>

      <PlayAuthDialog
        isOpen={showAuthDialog}
        onClose={() => setShowAuthDialog(false)}
        songImage={image}
      />
    </>
  );
});

export default AlbumCard;
