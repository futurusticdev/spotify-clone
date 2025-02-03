import { render } from "@testing-library/react";
import { PlayerProvider } from "@/context/PlayerContext";
import { vi } from "vitest";

interface Track {
  id: string;
  title: string;
  artist: string;
  imageUrl: string;
  audioSrc: string;
  albumId?: string;
}

type RepeatMode = "off" | "all" | "one";

// Mock the PlayerContext module
const mockPlayerContext = {
  currentTrack: null as Track | null,
  isPlaying: false,
  progress: 0,
  volume: 1,
  isShuffled: false,
  repeatMode: "off" as RepeatMode,
  queue: [] as Track[],
  currentAlbumTracks: [] as Track[],
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

export type PlayerContextType = typeof mockPlayerContext;
export const usePlayerMock = vi.fn(() => mockPlayerContext);

vi.mock("@/context/PlayerContext", () => ({
  usePlayer: () => usePlayerMock(),
  PlayerProvider: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock useRouter
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
  }),
  usePathname: () => "",
  useSearchParams: () => new URLSearchParams(),
}));

// Custom render with providers
const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, {
    wrapper: ({ children }) => <PlayerProvider>{children}</PlayerProvider>,
    ...options,
  });

// Re-export everything
export * from "@testing-library/react";

// Override render method
export { customRender as render };
