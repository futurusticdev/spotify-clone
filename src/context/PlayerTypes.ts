export interface Track {
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

export type RepeatMode = "off" | "all" | "one";

export interface PlayerContextType {
  currentTrack: Track | null;
  currentContext: {
    type: "album" | "playlist" | "artist" | "single";
    id: string;
    name: string;
  } | null;
  isPlaying: boolean;
  progress: number;
  volume: number;
  isShuffled: boolean;
  repeatMode: RepeatMode;
  queue: Track[];
  currentAlbumTracks: Track[];
  playTrack: (
    track: Track,
    albumTracks?: Track[],
    context?: Track["context"]
  ) => void;
  togglePlayback: () => void;
  setVolume: (volume: number) => void;
  seekTo: (percentage: number) => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  playNextTrack: () => void;
  playPreviousTrack: () => void;
  addToQueue: (track: Track) => void;
  clearQueue: () => void;
  playRandomSongNext: () => void;
}
