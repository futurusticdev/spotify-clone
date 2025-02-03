"use client";

import { useState, useMemo, useCallback } from "react";
import { Play, Pause } from "lucide-react";
import { PlayAuthDialog } from "@/components/auth/PlayAuthDialog";
import { usePlayer } from "@/context/PlayerContext";

interface SongCardProps {
  title: string;
  artist: string;
  imageUrl: string;
  audioSrc: string;
  isAuthenticated?: boolean;
}

export function SongCard({
  title,
  artist,
  imageUrl,
  audioSrc,
  isAuthenticated = false,
}: SongCardProps) {
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const { currentTrack, currentContext, isPlaying, playTrack, togglePlayback } =
    usePlayer();

  // Create song context
  const songContext = useMemo(
    () => ({
      type: "single" as const,
      id: `single-${title}-${artist}`,
      name: title,
    }),
    [title, artist]
  );

  // Create track with context
  const track = useMemo(
    () => ({
      id: `song-${title}-${artist}`,
      title,
      artist,
      imageUrl,
      audioSrc,
      context: songContext,
    }),
    [title, artist, imageUrl, audioSrc, songContext]
  );

  const isCurrentSong = useMemo(
    () => currentTrack && currentContext?.id === songContext.id,
    [currentTrack, currentContext, songContext]
  );

  const handlePlayClick = useCallback(() => {
    if (!isAuthenticated) {
      setShowAuthDialog(true);
      return;
    }

    if (isCurrentSong) {
      togglePlayback();
    } else {
      playTrack(track, [track], songContext);
    }
  }, [
    isAuthenticated,
    isCurrentSong,
    track,
    songContext,
    playTrack,
    togglePlayback,
  ]);

  return (
    <>
      <div className="group relative bg-neutral-800/40 rounded-md p-4 hover:bg-neutral-800/80 transition-all duration-200">
        <div className="relative aspect-square w-full rounded-md overflow-hidden mb-4">
          <img
            src={imageUrl}
            alt={title}
            className="object-cover w-full h-full"
          />
          <button
            onClick={handlePlayClick}
            className="absolute bottom-2 right-2 w-12 h-12 rounded-full bg-[#1ED760] flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 hover:scale-105"
            aria-label={isCurrentSong && isPlaying ? "Pause" : "Play"}
          >
            {isCurrentSong && isPlaying ? (
              <Pause className="w-5 h-5 text-black" />
            ) : (
              <Play fill="black" className="text-black ml-1" />
            )}
          </button>
        </div>
        <div className="space-y-1">
          <h3 className="text-white font-semibold truncate">{title}</h3>
          <p className="text-neutral-400 text-sm truncate">{artist}</p>
        </div>
      </div>

      <PlayAuthDialog
        isOpen={showAuthDialog}
        onClose={() => setShowAuthDialog(false)}
        songImage={imageUrl}
      />
    </>
  );
}
