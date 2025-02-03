"use client";

import { useState, useEffect } from "react";
import { Plus, Check, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface AddToPlaylistCardProps {
  isOpen: boolean;
  onClose: () => void;
  trackId: string;
  trackTitle: string;
  trackArtist: string;
}

interface Playlist {
  id: string;
  name: string;
  imageUrl?: string;
}

export default function AddToPlaylistCard({
  isOpen,
  onClose,
  trackId,
  trackTitle,
  trackArtist,
}: AddToPlaylistCardProps) {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingTo, setAddingTo] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch("/api/playlists", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setPlaylists(data.playlists);
        }
      } catch (error) {
        console.error("Failed to fetch playlists:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchPlaylists();
    }
  }, [isOpen]);

  const handleAddToPlaylist = async (playlistId: string) => {
    setAddingTo(playlistId);
    try {
      const response = await fetch(`/api/playlists/${playlistId}/tracks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          trackId,
          title: trackTitle,
          artist: trackArtist,
        }),
      });

      if (response.ok) {
        // Show success state briefly before closing
        setTimeout(() => {
          onClose();
          setAddingTo(null);
        }, 1000);
      }
    } catch (error) {
      console.error("Failed to add track to playlist:", error);
      setAddingTo(null);
    }
  };

  const handleCreatePlaylist = async () => {
    try {
      const response = await fetch("/api/playlists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name: `My Playlist #${playlists.length + 1}`,
          description: "New playlist",
        }),
      });

      if (response.ok) {
        const newPlaylist = await response.json();
        router.push(`/playlists/${newPlaylist.id}`);
        onClose();
      }
    } catch (error) {
      console.error("Failed to create playlist:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#282828] rounded-xl w-[480px] max-h-[70vh] overflow-hidden shadow-xl">
        <div className="p-4 border-b border-[#3E3E3E] flex justify-between items-center">
          <h2 className="text-lg font-bold">Add to playlist</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#3E3E3E] rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          <button
            onClick={handleCreatePlaylist}
            className="w-full flex items-center gap-3 p-2 rounded-md hover:bg-[#3E3E3E] transition-colors group mb-4"
          >
            <div className="w-12 h-12 bg-[#3E3E3E] group-hover:bg-[#505050] rounded flex items-center justify-center flex-shrink-0">
              <Plus className="w-6 h-6" />
            </div>
            <span className="font-bold">Create playlist</span>
          </button>

          <div className="space-y-2 overflow-y-auto max-h-[400px]">
            {loading ? (
              <div className="text-center py-4 text-[#B3B3B3]">Loading...</div>
            ) : playlists.length === 0 ? (
              <div className="text-center py-4 text-[#B3B3B3]">
                No playlists found
              </div>
            ) : (
              playlists.map((playlist) => (
                <button
                  key={playlist.id}
                  onClick={() => handleAddToPlaylist(playlist.id)}
                  disabled={addingTo === playlist.id}
                  className="w-full flex items-center gap-3 p-2 rounded-md hover:bg-[#3E3E3E] transition-colors relative group"
                >
                  {playlist.imageUrl ? (
                    <img
                      src={playlist.imageUrl}
                      alt=""
                      className="w-12 h-12 rounded object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-[#3E3E3E] rounded flex items-center justify-center flex-shrink-0">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="text-[#B3B3B3]"
                      >
                        <path d="M15 37.5h30v-3.75H15v3.75Zm0-11.25h30V22.5H15v3.75Zm0-11.25h30V11.25H15V15ZM6 36.75l2.65-2.65L11.3 36.75l2.65-2.65-2.65-2.65L8.65 28.8 6 31.45l-2.65-2.65-2.65 2.65 2.65 2.65L6 36.75Zm0-11.25 2.65-2.65 2.65 2.65 2.65-2.65-2.65-2.65-2.65-2.65L6 20.2l-2.65-2.65-2.65 2.65 2.65 2.65L6 25.5Zm0-11.25 2.65-2.65 2.65 2.65 2.65-2.65-2.65-2.65L8.65 6.3 6 8.95 3.35 6.3.7 8.95l2.65 2.65L6 14.25Z" />
                      </svg>
                    </div>
                  )}
                  <span className="font-bold truncate">{playlist.name}</span>
                  {addingTo === playlist.id && (
                    <div className="absolute right-2 w-8 h-8 bg-[#1ED760] rounded-full flex items-center justify-center">
                      <Check className="w-5 h-5 text-black" />
                    </div>
                  )}
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
