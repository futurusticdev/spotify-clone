"use client";

import { PlayerProvider } from "@/context/PlayerContext";
import MediaPlayer from "@/components/MediaPlayer";
import { isAuthenticated } from "@/lib/auth";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PlayerProvider>
      {children}
      <MediaPlayer variant="full" isLoggedIn={isAuthenticated()} />
    </PlayerProvider>
  );
}
