import { render, screen, fireEvent } from "@/test/test-utils";
import { vi, describe, it, expect } from "vitest";
import AlbumCard from "../AlbumCard";
import { usePlayerMock, PlayerContextType } from "@/test/test-utils";

interface Track {
  id: string;
  title: string;
  artist: string;
  imageUrl: string;
  audioSrc: string;
  albumId?: string;
}

const mockAlbum = {
  title: "Test Album",
  artist: "Test Artist",
  image: "/images/test-album.jpg",
  isLoggedIn: true,
  tracks: [
    {
      id: "1",
      title: "Track 1",
      artist: "Test Artist",
      imageUrl: "/images/test-album.jpg",
      audioSrc: "/audio/test-track.mp3",
    },
  ] as Track[],
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

describe("AlbumCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    usePlayerMock.mockReturnValue(defaultPlayerState);
  });

  it("renders album information correctly", () => {
    render(<AlbumCard {...mockAlbum} />);

    expect(screen.getByText("Test Album")).toBeInTheDocument();
    expect(screen.getByText("Test Artist")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      expect.stringContaining("/images/test-album.jpg")
    );
  });

  it("shows play button on hover", async () => {
    render(<AlbumCard {...mockAlbum} />);

    const card = screen.getByTestId("album-card");
    fireEvent.mouseEnter(card);

    const playButton = screen.getByRole("button", { name: /play/i });
    expect(playButton).toHaveClass("group-hover:opacity-100");
  });

  it("shows auth dialog when not logged in", () => {
    render(<AlbumCard {...mockAlbum} isLoggedIn={false} />);

    const playButton = screen.getByRole("button", { name: /play/i });
    fireEvent.click(playButton);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("plays first track when clicked and logged in", () => {
    const playTrack = vi.fn();
    usePlayerMock.mockReturnValue({
      ...defaultPlayerState,
      playTrack,
    });

    render(<AlbumCard {...mockAlbum} />);

    const playButton = screen.getByRole("button", { name: /play/i });
    fireEvent.click(playButton);

    expect(playTrack).toHaveBeenCalledWith(
      mockAlbum.tracks[0],
      mockAlbum.tracks
    );
  });

  it("toggles playback when clicking currently playing album", () => {
    const togglePlayback = vi.fn();
    usePlayerMock.mockReturnValue({
      ...defaultPlayerState,
      currentTrack: mockAlbum.tracks[0],
      isPlaying: true,
      togglePlayback,
    });

    render(<AlbumCard {...mockAlbum} />);

    const pauseButton = screen.getByRole("button", { name: /pause/i });
    fireEvent.click(pauseButton);

    expect(togglePlayback).toHaveBeenCalled();
  });
});
