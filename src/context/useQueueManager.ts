import { useState, useCallback } from "react";
import { Track, RepeatMode } from "./PlayerTypes";
import { shuffleArray } from "./PlayerUtils";

export const useQueueManager = () => {
  const [queue, setQueue] = useState<Track[]>([]);
  const [currentAlbumTracks, setCurrentAlbumTracks] = useState<Track[]>([]);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState<RepeatMode>("off");
  const [playHistory, setPlayHistory] = useState<Track[]>([]);
  const [shuffledTracks, setShuffledTracks] = useState<Track[]>([]);

  const addToQueue = useCallback((track: Track) => {
    setQueue((prev) => [...prev, track]);
  }, []);

  const removeFromQueue = useCallback((trackId: string) => {
    setQueue((prev) => prev.filter((track) => track.id !== trackId));
  }, []);

  const clearQueue = useCallback(() => {
    setQueue([]);
  }, []);

  const toggleShuffle = useCallback(() => {
    setIsShuffled((prevShuffled) => {
      const newShuffled = !prevShuffled;

      if (newShuffled && currentAlbumTracks.length > 0) {
        // Create a new shuffled array of the current album tracks
        const shuffled = shuffleArray([...currentAlbumTracks]);
        setShuffledTracks(shuffled);
      } else {
        // Clear shuffled tracks when turning shuffle off
        setShuffledTracks([]);
      }

      return newShuffled;
    });
  }, [currentAlbumTracks]);

  const toggleRepeat = useCallback(() => {
    setRepeatMode((prev) => {
      switch (prev) {
        case "off":
          return "all";
        case "all":
          return "one";
        case "one":
          return "off";
        default:
          return "off";
      }
    });
  }, []);

  const addToHistory = useCallback((track: Track) => {
    if (!track) return;
    setPlayHistory((prev) => {
      // Don't add duplicate entries consecutively
      if (prev.length > 0 && prev[0].id === track.id) {
        return prev;
      }
      // Keep only the last 50 tracks in history
      const newHistory = [track, ...prev];
      return newHistory.slice(0, 50);
    });
  }, []);

  const getNextTrack = useCallback(
    (currentTrack: Track | null) => {
      // Return current track if repeat one is enabled
      if (currentTrack && repeatMode === "one") {
        return currentTrack;
      }

      // Check queue first
      if (queue.length > 0) {
        const nextTrack = queue[0];
        setQueue((prev) => prev.slice(1));
        if (currentTrack) {
          addToHistory(currentTrack);
        }
        return nextTrack;
      }

      // If no current track or album tracks, return null
      if (!currentTrack || currentAlbumTracks.length === 0) {
        return null;
      }

      // Handle shuffled playback
      if (isShuffled) {
        // If we have no shuffled tracks left
        if (shuffledTracks.length === 0) {
          // If we've gone through all tracks once and repeat is off, return null
          if (
            repeatMode === "off" &&
            playHistory.length >= currentAlbumTracks.length - 1
          ) {
            return null;
          }

          // Otherwise, reshuffle all tracks except current
          const tracksToShuffle = currentAlbumTracks.filter(
            (track) => track.id !== currentTrack.id
          );
          const newShuffledTracks = shuffleArray([...tracksToShuffle]);
          setShuffledTracks(newShuffledTracks.slice(1));
          if (currentTrack) {
            addToHistory(currentTrack);
          }
          return newShuffledTracks[0];
        }

        // Take the next track from shuffled tracks
        const nextTrack = shuffledTracks[0];
        setShuffledTracks((prev) => prev.slice(1));
        if (currentTrack) {
          addToHistory(currentTrack);
        }
        return nextTrack;
      }

      // Handle sequential playback
      const currentIndex = currentAlbumTracks.findIndex(
        (track) => track.id === currentTrack.id
      );

      if (currentIndex === -1) return null;

      const nextIndex = (currentIndex + 1) % currentAlbumTracks.length;
      if (nextIndex === 0 && repeatMode !== "all") {
        return null;
      }

      if (currentTrack) {
        addToHistory(currentTrack);
      }
      return currentAlbumTracks[nextIndex];
    },
    [
      queue,
      currentAlbumTracks,
      isShuffled,
      repeatMode,
      addToHistory,
      shuffledTracks,
      playHistory,
    ]
  );

  const getPreviousTrack = useCallback(() => {
    if (playHistory.length === 0) return null;

    const [previousTrack, ...remainingHistory] = playHistory;
    if (!previousTrack) return null;

    setPlayHistory(remainingHistory);

    // If we're going back to a track from a different album,
    // update the currentAlbumTracks if it's in the history
    const historyTracksFromSameAlbum = remainingHistory.filter(
      (track) => track.albumId === previousTrack.albumId
    );

    if (historyTracksFromSameAlbum.length > 0) {
      setCurrentAlbumTracks([previousTrack, ...historyTracksFromSameAlbum]);

      // If shuffle is on, create a new shuffled array excluding the previous track
      if (isShuffled) {
        const tracksToShuffle = [...historyTracksFromSameAlbum];
        setShuffledTracks(shuffleArray(tracksToShuffle));
      }
    }

    return previousTrack;
  }, [playHistory, isShuffled]);

  return {
    queue,
    currentAlbumTracks,
    isShuffled,
    repeatMode,
    playHistory,
    setCurrentAlbumTracks,
    addToQueue,
    removeFromQueue,
    clearQueue,
    toggleShuffle,
    toggleRepeat,
    addToHistory,
    getNextTrack,
    getPreviousTrack,
  };
};
