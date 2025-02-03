import { render, screen, fireEvent } from "@/test/test-utils";
import { vi, describe, it, expect } from "vitest";
import MusicPlayer from "../MusicPlayer";
import { usePlayerMock, PlayerContextType } from "@/test/test-utils";

interface Track {
  id: string;
  title: string;
  artist: string;
  imageUrl: string;
  audioSrc: string;
  albumId?: string;
}

const mockTrack: Track = {
  id: "1",
  title: "Test Track",
  artist: "Test Artist",
  imageUrl: "/images/test-image.jpg",
  audioSrc: "/audio/test-audio.mp3",
};

const defaultPlayerState: PlayerContextType = {
  currentTrack: null,
  isPlaying: false,
  progress: 0,
  volume: 1,
  isShuffled: false,
  repeatMode: "off",
  queue: [],
  currentAlbumTracks: [],
  playTrack: vi.fn(),
  togglePlayback: vi.fn(),
  setVolume: vi.fn(),
  seekTo: vi.fn(),
  toggleShuffle: vi.fn(),
  toggleRepeat: vi.fn(),
  playNextTrack: vi.fn(),
  playPreviousTrack: vi.fn(),
  addToQueue: vi.fn(),
  clearQueue: vi.fn(),
  playRandomSongNext: vi.fn(),
};

describe("MusicPlayer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    usePlayerMock.mockReturnValue(defaultPlayerState);
  });

  it("renders empty state correctly", () => {
    render(<MusicPlayer />);

    expect(screen.getByText("Choose a track to play")).toBeInTheDocument();
    const playButton = screen.getByRole("button", { name: "Play" });
    expect(playButton).toHaveClass("bg-white/70");
  });

  it("renders track information when track is loaded", () => {
    usePlayerMock.mockReturnValue({
      ...defaultPlayerState,
      currentTrack: mockTrack,
    });

    render(<MusicPlayer />);

    expect(screen.getByText("Test Track")).toBeInTheDocument();
    expect(screen.getByText("Test Artist")).toBeInTheDocument();
    const img = screen.getByRole("img");
    expect(img.getAttribute("src")).toMatch(/test-image\.jpg/);
  });

  it("toggles playback when play/pause button is clicked", () => {
    const togglePlayback = vi.fn();
    usePlayerMock.mockReturnValue({
      ...defaultPlayerState,
      currentTrack: mockTrack,
      togglePlayback,
    });

    render(<MusicPlayer />);

    const playButton = screen.getByRole("button", { name: "Play" });
    fireEvent.click(playButton);

    expect(togglePlayback).toHaveBeenCalled();
  });

  it("updates volume when volume slider is clicked", () => {
    const setVolume = vi.fn();
    usePlayerMock.mockReturnValue({
      ...defaultPlayerState,
      currentTrack: mockTrack,
      setVolume,
    });

    render(<MusicPlayer />);

    const volumeSlider = screen.getByRole("slider", { name: /volume/i });
    fireEvent.click(volumeSlider);

    expect(setVolume).toHaveBeenCalled();
  });

  it("shows shuffle state correctly", () => {
    usePlayerMock.mockReturnValue({
      ...defaultPlayerState,
      currentTrack: mockTrack,
      isShuffled: true,
    });

    render(<MusicPlayer />);

    const shuffleButton = screen.getByRole("button", { name: /shuffle/i });
    expect(shuffleButton).toHaveClass("text-[#1ed760]");
  });

  it("shows repeat state correctly", () => {
    usePlayerMock.mockReturnValue({
      ...defaultPlayerState,
      currentTrack: mockTrack,
      repeatMode: "one",
    });

    render(<MusicPlayer />);

    const repeatButton = screen.getByRole("button", { name: /repeat/i });
    expect(repeatButton).toHaveClass("text-[#1ed760]");
  });
});
