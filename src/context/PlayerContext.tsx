"use client";

import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { Track, PlayerContextType } from "./PlayerTypes";
import { useAudioPlayer } from "./useAudioPlayer";
import { useQueueManager } from "./useQueueManager";
import { handleAudioError } from "./PlayerUtils";

type RepeatMode = "off" | "all" | "one";

const PlayerContext = createContext<PlayerContextType | null>(null);

// Add utility functions at the top level
const getRandomIndex = (max: number): number => {
  if (window.crypto && window.crypto.getRandomValues) {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0] % max;
  }
  return Math.floor(Math.random() * max);
};

const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = getRandomIndex(i + 1);
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [currentContext, setCurrentContext] = useState<Track["context"] | null>(
    null
  );
  const [progress, setProgress] = useState(0);

  const {
    queue,
    currentAlbumTracks,
    isShuffled,
    repeatMode,
    setCurrentAlbumTracks,
    addToQueue,
    clearQueue,
    toggleShuffle,
    toggleRepeat,
    addToHistory,
    getNextTrack,
    getPreviousTrack,
  } = useQueueManager();

  const handleTrackEnd = useCallback(() => {
    const nextTrack = getNextTrack(currentTrack);
    if (nextTrack) {
      setCurrentTrack(nextTrack);
      initializeAudio(nextTrack);
      play();
    }
  }, [currentTrack, getNextTrack]);

  const {
    isPlaying,
    volume,
    initializeAudio,
    play,
    pause,
    seekTo,
    updateVolume,
  } = useAudioPlayer({
    onTimeUpdate: setProgress,
    onEnded: handleTrackEnd,
  });

  const playTrack = useCallback(
    async (
      track: Track,
      albumTracks: Track[] = [],
      context?: Track["context"]
    ) => {
      try {
        // Update context when provided
        if (context) {
          setCurrentContext(context);
          // Ensure all tracks in albumTracks have the same context
          albumTracks = albumTracks.map((t) => ({
            ...t,
            context: context,
          }));
        } else if (track.context) {
          setCurrentContext(track.context);
        }

        // Always update album tracks when explicitly provided
        if (albumTracks.length > 0) {
          setCurrentAlbumTracks(albumTracks);
        }
        // Otherwise, only update if we're playing from a different context
        else if (
          !currentTrack ||
          currentTrack.context?.id !== track.context?.id
        ) {
          setCurrentAlbumTracks([track]);
        }

        // Add current track to history before changing
        if (currentTrack && currentTrack.id !== track.id) {
          addToHistory(currentTrack);
        }

        setCurrentTrack(track);
        initializeAudio(track);
        await play();
      } catch (error) {
        handleAudioError(error as Error);
      }
    },
    [currentTrack, initializeAudio, play, setCurrentAlbumTracks, addToHistory]
  );

  const togglePlayback = useCallback(async () => {
    if (!currentTrack) return;

    if (isPlaying) {
      pause();
    } else {
      await play();
    }
  }, [isPlaying, currentTrack, play, pause]);

  const playNextTrack = useCallback(async () => {
    const nextTrack = getNextTrack(currentTrack);
    if (nextTrack) {
      setCurrentTrack(nextTrack);
      initializeAudio(nextTrack);
      try {
        await play();
      } catch (error) {
        handleAudioError(error as Error);
      }
    }
  }, [currentTrack, getNextTrack, initializeAudio, play]);

  const playPreviousTrack = useCallback(async () => {
    const previousTrack = getPreviousTrack();
    if (previousTrack) {
      setCurrentTrack(previousTrack);
      initializeAudio(previousTrack);
      try {
        await play();
      } catch (error) {
        handleAudioError(error as Error);
      }
    }
  }, [getPreviousTrack, initializeAudio, play]);

  const playRandomSongNext = useCallback(() => {
    if (currentAlbumTracks.length === 0 || !currentTrack) return;
    const availableTracks = currentAlbumTracks.filter(
      (track) => track.id !== currentTrack.id
    );
    if (availableTracks.length > 0) {
      const randomTrack =
        availableTracks[Math.floor(Math.random() * availableTracks.length)];
      addToQueue(randomTrack);
    }
  }, [currentTrack, currentAlbumTracks, addToQueue]);

  const handleToggleShuffle = useCallback(() => {
    toggleShuffle();
  }, [toggleShuffle]);

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        currentContext,
        isPlaying,
        progress,
        volume,
        isShuffled,
        repeatMode,
        queue,
        currentAlbumTracks,
        playTrack,
        togglePlayback,
        setVolume: updateVolume,
        seekTo,
        toggleShuffle: handleToggleShuffle,
        toggleRepeat,
        playNextTrack,
        playPreviousTrack,
        addToQueue,
        clearQueue,
        playRandomSongNext,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
}
