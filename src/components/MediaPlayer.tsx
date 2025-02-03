import { useState, useCallback, useMemo } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Repeat1,
  ListPlus,
} from "lucide-react";
import { usePlayer } from "@/context/PlayerContext";
import { PlayAuthDialog } from "@/components/auth/PlayAuthDialog";
import { cn } from "@/lib/utils";
import Image from "next/image";
import AddToPlaylistCard from "./AddToPlaylistCard";

interface MediaPlayerProps {
  variant?: "full" | "card";
  name?: string;
  role?: string;
  image?: string;
  isLoggedIn: boolean;
  audioSrc?: string;
  className?: string;
  context?: {
    type: "album" | "playlist" | "artist" | "single";
    id: string;
    name: string;
  };
}

const MediaPlayer = ({
  variant = "full",
  name,
  role,
  image,
  isLoggedIn,
  audioSrc,
  className,
  context,
}: MediaPlayerProps) => {
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [showAddToPlaylist, setShowAddToPlaylist] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const {
    currentTrack,
    currentContext,
    isPlaying,
    progress,
    volume,
    togglePlayback,
    setVolume,
    seekTo,
    isShuffled,
    toggleShuffle,
    repeatMode,
    toggleRepeat,
    playNextTrack,
    playPreviousTrack,
    playTrack,
  } = usePlayer();

  // Create a stable track object for card variant
  const cardTrack = useMemo(
    () =>
      name && audioSrc
        ? {
            id: `media-${name}`,
            title: name,
            artist: name,
            imageUrl: image || "",
            audioSrc: audioSrc,
            albumId: `media-${name}`,
            context: context || {
              type: "single",
              id: `media-${name}`,
              name: name,
            },
          }
        : null,
    [name, image, audioSrc, context]
  );

  // Create a stable album tracks array for card variant
  const albumTracks = useMemo(
    () => (cardTrack ? [cardTrack] : []),
    [cardTrack]
  );

  // Check if this track is currently playing
  const isCurrentTrack = useMemo(() => {
    if (!currentTrack || !cardTrack) return false;

    // If we have context, check both track ID and context
    if (cardTrack.context && currentContext) {
      return (
        currentTrack.id === cardTrack.id &&
        currentContext.id === cardTrack.context.id
      );
    }

    // Fallback to just track ID comparison
    return currentTrack.id === cardTrack.id;
  }, [currentTrack, cardTrack, currentContext]);

  const handlePlayClick = useCallback(
    (e?: React.MouseEvent) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }

      if (!isLoggedIn) {
        setShowAuthDialog(true);
        return;
      }

      if (variant === "card" && cardTrack) {
        if (isCurrentTrack) {
          togglePlayback();
        } else if (audioSrc) {
          playTrack(cardTrack, albumTracks, cardTrack.context);
        }
      } else {
        togglePlayback();
      }
    },
    [
      isLoggedIn,
      variant,
      cardTrack,
      audioSrc,
      isCurrentTrack,
      albumTracks,
      playTrack,
      togglePlayback,
    ]
  );

  const handleProgressClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!currentTrack) return;
      const bounds = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - bounds.left;
      const percentage = x / bounds.width;
      seekTo(percentage);
    },
    [seekTo, currentTrack]
  );

  const handleVolumeClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const bounds = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - bounds.left;
      const newVolume = x / bounds.width;
      setVolume(newVolume);
    },
    [setVolume]
  );

  if (variant === "card") {
    return (
      <>
        <div
          className={cn(
            "group relative bg-neutral-800/40 rounded-lg p-4 hover:bg-neutral-800/80 transition-all duration-300 cursor-pointer",
            className
          )}
        >
          <div className="relative mb-4">
            <div className="aspect-square rounded-full overflow-hidden">
              <img
                src={image}
                alt={name}
                className="object-cover w-full h-full"
              />
            </div>
            <button
              onClick={handlePlayClick}
              className="absolute bottom-2 right-2 w-12 h-12 rounded-full bg-[#1ED760] flex items-center justify-center shadow-xl opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:scale-105 hover:bg-[#1fdf64]"
              aria-label={
                isCurrentTrack && isPlaying
                  ? `Pause ${name}'s music`
                  : `Play ${name}'s music`
              }
            >
              {isCurrentTrack && isPlaying ? (
                <Pause className="w-5 h-5 text-black" />
              ) : (
                <Play fill="black" className="text-black ml-1" />
              )}
            </button>
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-base text-white truncate hover:underline">
              {name}
            </h3>
            {role && <p className="text-sm text-[#A7A7A7] truncate">{role}</p>}
          </div>
        </div>

        <PlayAuthDialog
          isOpen={showAuthDialog}
          onClose={() => setShowAuthDialog(false)}
          songImage={image}
        />
      </>
    );
  }

  return (
    <>
      <div className="h-full flex flex-col">
        {/* Progress bar */}
        <div
          className="h-1 bg-[#4d4d4d] cursor-pointer group"
          onClick={handleProgressClick}
        >
          <div
            className="h-full bg-white group-hover:bg-[#1ed760] transition-colors"
            style={{ width: currentTrack ? `${progress * 100}%` : "0%" }}
          />
        </div>

        {/* Player content */}
        <div className="flex-1 px-4 flex items-center justify-between max-w-[1600px] mx-auto">
          {/* Left: Track Info */}
          <div className="flex items-center min-w-[180px] max-w-[30%]">
            {currentTrack ? (
              <>
                <div className="w-14 h-14 relative flex-shrink-0">
                  <Image
                    src={currentTrack.imageUrl}
                    alt={currentTrack.title}
                    width={56}
                    height={56}
                    className="object-cover rounded"
                  />
                </div>
                <div className="ml-3 truncate">
                  <div className="text-sm font-semibold text-white truncate hover:underline cursor-pointer">
                    {currentTrack.title}
                  </div>
                  <div className="text-xs text-[#B3B3B3] truncate hover:underline cursor-pointer">
                    {currentTrack.artist}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-sm text-[#B3B3B3]">
                Choose a track to play
              </div>
            )}
          </div>

          {/* Center: Play Controls */}
          <div className="flex items-center justify-center gap-4 flex-1">
            <div className="flex items-center gap-4">
              <button
                onClick={toggleShuffle}
                className={cn(
                  "transition-colors duration-200 hover:text-white",
                  isShuffled ? "text-[#1ed760]" : "text-[#B3B3B3]"
                )}
                aria-label={isShuffled ? "Disable shuffle" : "Enable shuffle"}
              >
                <Shuffle className="w-5 h-5" />
              </button>
              <button
                onClick={playPreviousTrack}
                className="text-[#B3B3B3] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous"
                disabled={!currentTrack}
              >
                <SkipBack className="w-5 h-5" />
              </button>
            </div>

            <button
              onClick={handlePlayClick}
              className={cn(
                "w-8 h-8 flex items-center justify-center rounded-full transition-all",
                currentTrack
                  ? "bg-white hover:scale-105"
                  : "bg-white/70 hover:bg-white hover:scale-105"
              )}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 text-black" />
              ) : (
                <Play className="w-4 h-4 text-black ml-0.5" />
              )}
            </button>

            <div className="flex items-center gap-4">
              <button
                onClick={playNextTrack}
                className="text-[#B3B3B3] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next"
                disabled={!currentTrack}
              >
                <SkipForward className="w-5 h-5" />
              </button>
              <button
                onClick={toggleRepeat}
                className={cn(
                  "text-[#B3B3B3] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
                  repeatMode !== "off" ? "text-[#1ed760]" : ""
                )}
                aria-label="Repeat"
                disabled={!currentTrack}
              >
                {repeatMode === "one" ? (
                  <Repeat1 className="w-4 h-4" />
                ) : (
                  <Repeat className="w-4 h-4" />
                )}
              </button>
            </div>

            {currentTrack && (
              <button
                onClick={() => setShowAddToPlaylist(true)}
                className="text-[#B3B3B3] hover:text-white transition-colors ml-4"
                aria-label="Add to playlist"
              >
                <ListPlus className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Right: Volume Control */}
          <div className="flex items-center min-w-[180px] justify-end">
            <button
              onClick={() => setVolume(volume === 0 ? 1 : 0)}
              className="text-[#B3B3B3] hover:text-white"
              aria-label={volume === 0 ? "Unmute" : "Mute"}
            >
              {volume === 0 ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>
            <div
              className="w-24 h-1 bg-[#4d4d4d] rounded-full ml-2 cursor-pointer"
              onClick={handleVolumeClick}
              role="slider"
              aria-label="Volume"
              aria-valuenow={volume * 100}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="h-full bg-white rounded-full hover:bg-[#1ed760]"
                style={{ width: `${volume * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {currentTrack && showAddToPlaylist && (
        <AddToPlaylistCard
          isOpen={showAddToPlaylist}
          onClose={() => setShowAddToPlaylist(false)}
          trackId={currentTrack.id}
          trackTitle={currentTrack.title}
          trackArtist={currentTrack.artist}
        />
      )}
    </>
  );
};

export default MediaPlayer;
