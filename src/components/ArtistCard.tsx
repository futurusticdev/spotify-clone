"use client";

import { useState, useCallback, memo, useMemo } from "react";
import { Play, Pause } from "lucide-react";
import { PlayAuthDialog } from "@/components/auth/PlayAuthDialog";
import { usePlayer } from "@/context/PlayerContext";

interface ArtistCardProps {
  name: string;
  role: string;
  image: string;
  isLoggedIn: boolean;
  tracks?: {
    id: string;
    title: string;
    artist: string;
    imageUrl: string;
    audioSrc: string;
  }[];
}

const ArtistCard = memo(function ArtistCard({
  name,
  role,
  image,
  isLoggedIn,
  tracks = [],
}: ArtistCardProps) {
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const { currentTrack, currentContext, isPlaying, playTrack, togglePlayback } =
    usePlayer();
  const [isHovered, setIsHovered] = useState(false);

  // Create artist context
  const artistContext = useMemo(
    () => ({
      type: "artist" as const,
      id: `artist-${name}`,
      name: name,
    }),
    [name]
  );

  // Add context to tracks
  const tracksWithContext = useMemo(
    () =>
      tracks.map((track) => ({
        ...track,
        context: artistContext,
      })),
    [tracks, artistContext]
  );

  const isCurrentArtist = useMemo(
    () => currentTrack && currentContext?.id === artistContext.id,
    [currentTrack, currentContext, artistContext]
  );

  const handlePlay = useCallback(() => {
    if (!isLoggedIn) {
      setShowAuthDialog(true);
      return;
    }

    if (isCurrentArtist && isPlaying) {
      togglePlayback();
    } else if (tracksWithContext.length > 0) {
      // Play the first track with the artist context
      playTrack(tracksWithContext[0], tracksWithContext, artistContext);
    }
  }, [
    isLoggedIn,
    isCurrentArtist,
    isPlaying,
    tracksWithContext,
    artistContext,
    playTrack,
    togglePlayback,
  ]);

  return (
    <>
      <div
        className="p-4 rounded-md bg-[#181818] hover:bg-[#282828] transition-colors group relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        data-testid="artist-card"
      >
        <div className="relative">
          <img
            src={image}
            alt={name}
            className="w-full aspect-square object-cover rounded-full mb-4 shadow-lg"
          />
          <button
            onClick={handlePlay}
            className={`absolute bottom-2 right-2 w-12 h-12 bg-[#1ed760] rounded-full flex items-center justify-center shadow-xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 hover:scale-105 hover:bg-[#1fdf64] ${
              isCurrentArtist && isPlaying ? "opacity-100 translate-y-0" : ""
            }`}
            aria-label={isCurrentArtist && isPlaying ? "Pause" : "Play"}
          >
            {isCurrentArtist && isPlaying ? (
              <Pause className="w-5 h-5 text-black" />
            ) : (
              <Play className="w-5 h-5 text-black ml-1" />
            )}
          </button>
        </div>
        <h3 className="font-bold text-base mb-1 truncate">{name}</h3>
        <p className="text-[#B3B3B3] text-sm truncate">{role}</p>
      </div>

      <PlayAuthDialog
        isOpen={showAuthDialog}
        onClose={() => setShowAuthDialog(false)}
        songImage={image}
      />
    </>
  );
});

export default ArtistCard;
