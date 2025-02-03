"use client";

import { usePlayer } from "@/context/PlayerContext";
import MediaPlayer from "@/components/MediaPlayer";
import { ReactNode } from "react";

interface PlayerLayoutProps {
  children: ReactNode;
  isLoggedIn: boolean;
}

const PlayerLayout = ({ children, isLoggedIn }: PlayerLayoutProps) => {
  const { currentTrack } = usePlayer();

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Main content */}
      <div className={`flex-1 ${isLoggedIn ? "pb-24" : ""}`}>{children}</div>

      {/* Player section - always visible when logged in */}
      {isLoggedIn && (
        <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-black/95 border-t border-[#282828]">
          <MediaPlayer variant="full" isLoggedIn={isLoggedIn} />
        </div>
      )}
    </div>
  );
};

export default PlayerLayout;
