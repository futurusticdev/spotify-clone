import { renderHook, act } from "@testing-library/react";
import { vi, beforeEach, describe, it, expect } from "vitest";
import { PlayerProvider, usePlayer } from "../PlayerContext";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <PlayerProvider>{children}</PlayerProvider>
);

// Mock sample tracks
const mockTracks = [
  {
    id: "1",
    title: "Track 1",
    artist: "Artist 1",
    url: "track1.mp3",
    imageUrl: "/images/track1.jpg",
    audioSrc: "track1.mp3",
  },
  {
    id: "2",
    title: "Track 2",
    artist: "Artist 2",
    url: "track2.mp3",
    imageUrl: "/images/track2.jpg",
    audioSrc: "track2.mp3",
  },
  {
    id: "3",
    title: "Track 3",
    artist: "Artist 3",
    url: "track3.mp3",
    imageUrl: "/images/track3.jpg",
    audioSrc: "track3.mp3",
  },
];

describe("PlayerContext", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("provides initial state", () => {
    const { result } = renderHook(() => usePlayer(), { wrapper });

    expect(result.current.currentTrack).toBeNull();
    expect(result.current.isPlaying).toBe(false);
    expect(result.current.progress).toBe(0);
    expect(result.current.volume).toBe(1);
    expect(result.current.isShuffled).toBe(false);
    expect(result.current.repeatMode).toBe("off");
    expect(result.current.queue).toEqual([]);
    expect(result.current.currentAlbumTracks).toEqual([]);
  });

  it("plays a track", async () => {
    const { result } = renderHook(() => usePlayer(), { wrapper });

    await act(async () => {
      result.current.playTrack(mockTracks[0]);
    });

    expect(result.current.currentTrack).toEqual(mockTracks[0]);
    expect(result.current.isPlaying).toBe(true);
  });

  it("toggles playback", async () => {
    const { result } = renderHook(() => usePlayer(), { wrapper });

    await act(async () => {
      result.current.playTrack(mockTracks[0]);
    });

    await act(async () => {
      result.current.togglePlayback();
    });

    expect(result.current.isPlaying).toBe(false);

    await act(async () => {
      result.current.togglePlayback();
    });

    expect(result.current.isPlaying).toBe(true);
  });

  it("handles shuffle mode", async () => {
    const { result } = renderHook(() => usePlayer(), { wrapper });

    await act(async () => {
      result.current.playTrack(mockTracks[0]);
      result.current.addToQueue(mockTracks[1]);
      result.current.addToQueue(mockTracks[2]);
      result.current.toggleShuffle();
    });

    expect(result.current.isShuffled).toBe(true);
    expect(result.current.queue.length).toBe(2);
    expect(result.current.queue).not.toContain(mockTracks[0]);
  });

  it("cycles through repeat modes", () => {
    const { result } = renderHook(() => usePlayer(), { wrapper });

    act(() => {
      result.current.toggleRepeat();
    });
    expect(result.current.repeatMode).toBe("all");

    act(() => {
      result.current.toggleRepeat();
    });
    expect(result.current.repeatMode).toBe("one");

    act(() => {
      result.current.toggleRepeat();
    });
    expect(result.current.repeatMode).toBe("off");
  });

  it("manages queue correctly", () => {
    const { result } = renderHook(() => usePlayer(), { wrapper });

    act(() => {
      result.current.addToQueue(mockTracks[0]);
    });

    expect(result.current.queue).toContain(mockTracks[0]);

    act(() => {
      result.current.clearQueue();
    });

    expect(result.current.queue).toEqual([]);
  });

  it("handles volume changes", () => {
    const { result } = renderHook(() => usePlayer(), { wrapper });

    act(() => {
      result.current.setVolume(0.5);
    });

    expect(result.current.volume).toBe(0.5);
  });

  it("plays next track from queue", async () => {
    const { result } = renderHook(() => usePlayer(), { wrapper });

    await act(async () => {
      result.current.playTrack(mockTracks[0]);
      result.current.addToQueue(mockTracks[1]);
      result.current.playNextTrack();
    });

    expect(result.current.currentTrack).toEqual(mockTracks[1]);
  });

  it("maintains play history for previous track", async () => {
    const { result } = renderHook(() => usePlayer(), { wrapper });

    await act(async () => {
      result.current.playTrack(mockTracks[0]);
      result.current.playTrack(mockTracks[1]);
      result.current.playPreviousTrack();
    });

    expect(result.current.currentTrack).toEqual(mockTracks[0]);
  });
});
