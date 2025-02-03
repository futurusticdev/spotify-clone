import { useRef, useEffect, useState, useCallback } from "react";
import { Track } from "./PlayerTypes";
import { createAudioInstance, handleAudioError } from "./PlayerUtils";

interface UseAudioPlayerProps {
  onTimeUpdate: (time: number) => void;
  onEnded: () => void;
}

export const useAudioPlayer = ({
  onTimeUpdate,
  onEnded,
}: UseAudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrackRef = useRef<string | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);

  const cleanupAudio = useCallback(() => {
    try {
      // First remove event listeners if cleanup function exists
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }

      // Then cleanup the audio instance
      if (audioRef.current) {
        // First pause playback
        audioRef.current.pause();
        audioRef.current.currentTime = 0;

        // Clear the source and load to ensure proper cleanup
        audioRef.current.src = "";
        audioRef.current.load();

        // Clear references
        audioRef.current = null;
        currentTrackRef.current = null;
        setIsPlaying(false);
      }
    } catch (error) {
      console.warn("Error during audio cleanup:", error);
    }
  }, []);

  const initializeAudio = useCallback(
    (track: Track) => {
      // Validate track and audio source
      if (!track || !track.audioSrc) {
        console.error("Invalid track:", { track });
        handleAudioError(
          new Error(
            `Invalid track: ${
              !track ? "No track provided" : "Missing audio source"
            }`
          )
        );
        return;
      }

      try {
        // If the same track is already loaded and playing, just update volume
        if (currentTrackRef.current === track.audioSrc && audioRef.current) {
          audioRef.current.volume = volume;
          return;
        }

        // Clean up existing audio before creating a new instance
        cleanupAudio();

        // Create new audio instance with source already set
        const audio = new Audio();
        audio.preload = "metadata";
        audio.volume = volume;

        // Create event handlers
        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);
        const handleTimeUpdate = () => {
          if (audio.duration) {
            onTimeUpdate(audio.currentTime / audio.duration);
          }
        };
        const handleError = (e: Event) => {
          const target = e.target as HTMLAudioElement;
          if (!target.src) {
            // Ignore empty src errors during cleanup
            return;
          }
          const error = target.error;
          console.error("Audio error:", {
            error,
            track,
            currentSrc: target.src,
          });
          handleAudioError(
            new Error(
              `Audio playback error: ${error ? error.message : "Unknown error"}`
            )
          );
        };
        const handleLoadStart = () => {
          console.log("Audio loading started:", track.audioSrc);
        };
        const handleCanPlay = () => {
          console.log("Audio can play:", track.audioSrc);
        };

        // Add event listeners
        audio.addEventListener("play", handlePlay);
        audio.addEventListener("pause", handlePause);
        audio.addEventListener("timeupdate", handleTimeUpdate);
        audio.addEventListener("ended", onEnded);
        audio.addEventListener("error", handleError);
        audio.addEventListener("loadstart", handleLoadStart);
        audio.addEventListener("canplay", handleCanPlay);

        // Store cleanup function
        cleanupRef.current = () => {
          audio.removeEventListener("play", handlePlay);
          audio.removeEventListener("pause", handlePause);
          audio.removeEventListener("timeupdate", handleTimeUpdate);
          audio.removeEventListener("ended", onEnded);
          audio.removeEventListener("error", handleError);
          audio.removeEventListener("loadstart", handleLoadStart);
          audio.removeEventListener("canplay", handleCanPlay);
        };

        // Set the source and load after event listeners are attached
        audio.src = track.audioSrc;
        audio.load();

        // Store references
        audioRef.current = audio;
        currentTrackRef.current = track.audioSrc;
      } catch (error) {
        console.error("Audio initialization error:", error);
        handleAudioError(
          new Error("Failed to initialize audio: " + (error as Error).message)
        );
        cleanupAudio();
      }
    },
    [volume, onTimeUpdate, onEnded, cleanupAudio]
  );

  const play = useCallback(async () => {
    if (!audioRef.current) {
      handleAudioError(new Error("Cannot play: No audio instance created"));
      return;
    }

    if (!currentTrackRef.current) {
      handleAudioError(new Error("Cannot play: No audio source loaded"));
      return;
    }

    try {
      console.log("Attempting to play:", currentTrackRef.current);
      await audioRef.current.play();
    } catch (error) {
      const errorMsg = (error as Error).message;
      console.error("Play error:", {
        error,
        currentSrc: audioRef.current?.src,
        readyState: audioRef.current?.readyState,
      });

      if (errorMsg.includes("interrupted by a call to pause")) {
        console.warn(
          "Play was interrupted by a pause call. Ignoring this error."
        );
      } else {
        handleAudioError(new Error("Play failed: " + errorMsg));
        setIsPlaying(false);
      }
    }
  }, []);

  const pause = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
  }, []);

  const seekTo = useCallback((percentage: number) => {
    if (!audioRef.current || !currentTrackRef.current) return;
    audioRef.current.currentTime = percentage * audioRef.current.duration;
  }, []);

  const updateVolume = useCallback((newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return cleanupAudio;
  }, [cleanupAudio]);

  return {
    isPlaying,
    volume,
    initializeAudio,
    play,
    pause,
    seekTo,
    updateVolume,
  };
};
