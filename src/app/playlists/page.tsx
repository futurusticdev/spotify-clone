"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PlaylistCard from "@/components/PlaylistCard";
import { Plus } from "lucide-react";
import LoadingScreen from "@/components/LoadingScreen";
import { getToken, isAuthenticated } from "@/lib/auth";

interface Playlist {
  id: string;
  name: string;
  description?: string;
  tracks: any[];
  isPublic: boolean;
}

export default function PlaylistsPage() {
  const router = useRouter();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
      return;
    }
    fetchPlaylists();
  }, [router]);

  const fetchPlaylists = async () => {
    try {
      const token = getToken();
      if (!token) {
        router.push("/login");
        return;
      }

      const response = await fetch("/api/playlists", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        router.push("/login");
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch playlists");
      }

      const data = await response.json();
      setPlaylists(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePlaylist = async () => {
    try {
      const token = getToken();
      if (!token) {
        router.push("/login");
        return;
      }

      const response = await fetch("/api/playlists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: "New Playlist",
          isPublic: false,
        }),
      });

      if (response.status === 401) {
        router.push("/login");
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create playlist");
      }

      const data = await response.json();
      setPlaylists((prev) => [data.data, ...prev]);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create playlist"
      );
    }
  };

  const handleDeletePlaylist = async (playlistId: string) => {
    try {
      const token = getToken();
      if (!token) {
        router.push("/login");
        return;
      }

      const response = await fetch(`/api/playlists/${playlistId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        router.push("/login");
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete playlist");
      }

      setPlaylists((prev) => prev.filter((p) => p.id !== playlistId));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete playlist"
      );
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <div className="px-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-white text-2xl font-semibold">Your Playlists</h1>
          <button
            onClick={handleCreatePlaylist}
            className="flex items-center gap-x-2 bg-green-500 hover:bg-green-400 
              text-black font-semibold py-2 px-4 rounded-full transition"
          >
            <Plus className="h-5 w-5" />
            New Playlist
          </button>
        </div>

        {error && (
          <div className="text-red-500 bg-red-500/20 p-4 rounded-md mb-4">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4">
          {playlists.map((playlist) => (
            <PlaylistCard
              key={playlist.id}
              id={playlist.id}
              name={playlist.name}
              description={playlist.description}
              trackCount={playlist.tracks.length}
              isPublic={playlist.isPublic}
              onDelete={() => handleDeletePlaylist(playlist.id)}
            />
          ))}
        </div>

        {playlists.length === 0 && !error && (
          <div className="text-neutral-400 text-center py-10">
            No playlists yet. Create one to get started!
          </div>
        )}
      </div>
    </div>
  );
}
