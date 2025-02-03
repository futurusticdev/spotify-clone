import { Track } from "./PlayerTypes";

export const getRandomIndex = (max: number): number => {
  return Math.floor(Math.random() * max);
};

export const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = getRandomIndex(i + 1);
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const createAudioInstance = (src: string): HTMLAudioElement => {
  const audio = new Audio(src);
  audio.preload = "metadata";
  return audio;
};

export const handleAudioError = (error: Error): void => {
  console.error("Audio playback error:", {
    name: error.name,
    message: error.message,
    stack: error.stack,
  });
};

export const calculateNextTrack = (
  currentTrack: Track | null,
  queue: Track[],
  currentAlbumTracks: Track[],
  isShuffled: boolean,
  repeatMode: "off" | "all" | "one"
): Track | null => {
  if (repeatMode === "one" && currentTrack) {
    return currentTrack;
  }

  if (queue.length > 0) {
    return queue[0];
  }

  if (currentAlbumTracks.length === 0 || !currentTrack) {
    return null;
  }

  const currentIndex = currentAlbumTracks.findIndex(
    (track) => track.id === currentTrack.id
  );

  if (currentIndex === -1) {
    return null;
  }

  if (isShuffled) {
    const remainingTracks = currentAlbumTracks.filter(
      (track) => track.id !== currentTrack.id
    );
    return remainingTracks[getRandomIndex(remainingTracks.length)] || null;
  }

  const nextIndex = (currentIndex + 1) % currentAlbumTracks.length;
  return repeatMode === "all" || nextIndex > currentIndex
    ? currentAlbumTracks[nextIndex]
    : null;
};
