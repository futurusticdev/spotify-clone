"use client";

import Image from "next/image";
import { Search, Library, Home, Plus, ListMusic } from "lucide-react";
import Header from "@/components/Header";
import ArtistCard from "@/components/ArtistCard";
import AlbumCard from "@/components/AlbumCard";
import SignupBanner from "@/components/SignupBanner";
import Footer from "@/components/Footer";
import PlayerLayout from "@/components/PlayerLayout";
import LoadingScreen from "@/components/LoadingScreen";
import { useState, useEffect } from "react";
import { isAuthenticated } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import MediaPlayer from "@/components/MediaPlayer";

interface Track {
  id: string;
  title: string;
  artist: string;
  imageUrl: string;
  audioSrc: string;
  albumId?: string;
}

interface Album {
  title: string;
  artist: string;
  image: string;
  tracks: Track[];
}

interface Playlist {
  id: string;
  name: string;
  imageUrl?: string;
  owner?: string;
}

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const router = useRouter();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check if token exists but is invalid
        const hasToken = localStorage.getItem("token") !== null;
        const isAuthed = isAuthenticated();

        if (hasToken && !isAuthed) {
          // Token exists but is invalid - clear it
          localStorage.removeItem("token");
          console.warn("🛡️ Invalid token detected and removed");
        }

        setIsLoggedIn(isAuthed);

        // Fetch playlists if user is authenticated
        if (isAuthed) {
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
          }
        }
      } catch (error) {
        console.error("🛡️ Auth initialization error:", error);
        setIsLoggedIn(false);
        localStorage.removeItem("token");
      } finally {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCreatePlaylist = async () => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

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
        setPlaylists((prev) => [...prev, newPlaylist]);
        router.push(`/playlists/${newPlaylist.id}`);
      }
    } catch (error) {
      console.error("Failed to create playlist:", error);
    }
  };

  const popularArtists = [
    {
      name: "The Weeknd",
      role: "Artist",
      image: "https://i.scdn.co/image/ab67616d00001e02a048415db06a5b6fa7ec4e1a",
      tracks: [
        {
          id: "weeknd-1",
          title: "Starboy",
          artist: "The Weeknd",
          imageUrl:
            "https://i.scdn.co/image/ab67616d00001e02a048415db06a5b6fa7ec4e1a",
          audioSrc:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        },
        {
          id: "weeknd-2",
          title: "Die For You",
          artist: "The Weeknd",
          imageUrl:
            "https://i.scdn.co/image/ab67616d00001e02a048415db06a5b6fa7ec4e1a",
          audioSrc:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        },
      ],
    },
    {
      name: "Drake",
      role: "Artist",
      image: "/drake-certified-pdf-file-v0-mo29faepvo4d1.png",
      tracks: [
        {
          id: "drake-1",
          title: "Virginia Beach",
          artist: "Drake",
          imageUrl: "/drake-certified-pdf-file-v0-mo29faepvo4d1.png",
          audioSrc:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        },
        {
          id: "drake-2",
          title: "First Person Shooter",
          artist: "Drake",
          imageUrl: "/drake-certified-pdf-file-v0-mo29faepvo4d1.png",
          audioSrc:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        },
      ],
    },
    {
      name: "Taylor Swift",
      role: "Artist",
      image: "https://i.scdn.co/image/ab67616d00001e02bb54dde68cd23e2a268ae0f5",
      tracks: [
        {
          id: "taylor-1",
          title: "Shake It Off (Taylor's Version)",
          artist: "Taylor Swift",
          imageUrl:
            "https://i.scdn.co/image/ab67616d00001e02bb54dde68cd23e2a268ae0f5",
          audioSrc:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
        },
        {
          id: "taylor-2",
          title: "Blank Space (Taylor's Version)",
          artist: "Taylor Swift",
          imageUrl:
            "https://i.scdn.co/image/ab67616d00001e02bb54dde68cd23e2a268ae0f5",
          audioSrc:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
        },
      ],
    },
    {
      name: "Bad Bunny",
      role: "Artist",
      image: "https://i.scdn.co/image/ab67616d00001e0249d694203245f241a1bcaa72",
      tracks: [
        {
          id: "badbunny-1",
          title: "Moscow Mule",
          artist: "Bad Bunny",
          imageUrl:
            "https://i.scdn.co/image/ab67616d00001e0249d694203245f241a1bcaa72",
          audioSrc:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
        },
        {
          id: "badbunny-2",
          title: "Tití Me Preguntó",
          artist: "Bad Bunny",
          imageUrl:
            "https://i.scdn.co/image/ab67616d00001e0249d694203245f241a1bcaa72",
          audioSrc:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
        },
      ],
    },
    {
      name: "Ed Sheeran",
      role: "Artist",
      image: "https://i.scdn.co/image/ab67616d00001e02ba5db46f4b838ef6027e6f96",
      tracks: [
        {
          id: "ed-1",
          title: "Shape of You",
          artist: "Ed Sheeran",
          imageUrl:
            "https://i.scdn.co/image/ab67616d00001e02ba5db46f4b838ef6027e6f96",
          audioSrc:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
        },
        {
          id: "ed-2",
          title: "Perfect",
          artist: "Ed Sheeran",
          imageUrl:
            "https://i.scdn.co/image/ab67616d00001e02ba5db46f4b838ef6027e6f96",
          audioSrc:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
        },
      ],
    },
    {
      name: "Billie Eilish",
      role: "Artist",
      image: "https://i.scdn.co/image/ab67616d00001e02deae7d931928fc1543e70203",
      tracks: [
        {
          id: "billie-1",
          title: "bad guy",
          artist: "Billie Eilish",
          imageUrl:
            "https://i.scdn.co/image/ab67616d00001e02deae7d931928fc1543e70203",
          audioSrc:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
        },
        {
          id: "billie-2",
          title: "everything i wanted",
          artist: "Billie Eilish",
          imageUrl:
            "https://i.scdn.co/image/ab67616d00001e02deae7d931928fc1543e70203",
          audioSrc:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
        },
      ],
    },
  ];

  const popularAlbums = [
    {
      title: "For All The Dogs",
      artist: "Drake",
      image: "/drake-certified-pdf-file-v0-mo29faepvo4d1.png",
      tracks: [
        {
          id: "drake-1",
          title: "Virginia Beach",
          artist: "Drake",
          imageUrl: "/drake-certified-pdf-file-v0-mo29faepvo4d1.png",
          audioSrc:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
          albumId: "drake-1",
        },
        {
          id: "drake-2",
          title: "First Person Shooter",
          artist: "Drake",
          imageUrl: "/drake-certified-pdf-file-v0-mo29faepvo4d1.png",
          audioSrc:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
          albumId: "drake-1",
        },
      ],
    },
    {
      title: "Starboy",
      artist: "The Weeknd",
      image: "https://i.scdn.co/image/ab67616d00001e02a048415db06a5b6fa7ec4e1a",
      tracks: [
        {
          id: "weeknd-1",
          title: "Starboy",
          artist: "The Weeknd",
          imageUrl:
            "https://i.scdn.co/image/ab67616d00001e02a048415db06a5b6fa7ec4e1a",
          audioSrc:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
          albumId: "weeknd-1",
        },
        {
          id: "weeknd-2",
          title: "Die For You",
          artist: "The Weeknd",
          imageUrl:
            "https://i.scdn.co/image/ab67616d00001e02a048415db06a5b6fa7ec4e1a",
          audioSrc:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
          albumId: "weeknd-1",
        },
      ],
    },
    {
      title: "Un Verano Sin Ti",
      artist: "Bad Bunny",
      image: "https://i.scdn.co/image/ab67616d00001e0249d694203245f241a1bcaa72",
      tracks: [
        {
          id: "badbunny-1",
          title: "Moscow Mule",
          artist: "Bad Bunny",
          imageUrl:
            "https://i.scdn.co/image/ab67616d00001e0249d694203245f241a1bcaa72",
          audioSrc:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
          albumId: "badbunny-1",
        },
        {
          id: "badbunny-2",
          title: "Tití Me Preguntó",
          artist: "Bad Bunny",
          imageUrl:
            "https://i.scdn.co/image/ab67616d00001e0249d694203245f241a1bcaa72",
          audioSrc:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
          albumId: "badbunny-1",
        },
      ],
    },
    {
      title: "WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?",
      artist: "Billie Eilish",
      image: "https://i.scdn.co/image/ab67616d00001e02deae7d931928fc1543e70203",
      tracks: [
        {
          id: "billie-1",
          title: "bad guy",
          artist: "Billie Eilish",
          imageUrl:
            "https://i.scdn.co/image/ab67616d00001e02deae7d931928fc1543e70203",
          audioSrc:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
          albumId: "billie-1",
        },
        {
          id: "billie-2",
          title: "everything i wanted",
          artist: "Billie Eilish",
          imageUrl:
            "https://i.scdn.co/image/ab67616d00001e02deae7d931928fc1543e70203",
          audioSrc:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
          albumId: "billie-1",
        },
      ],
    },
    {
      title: "1989 (Taylor's Version)",
      artist: "Taylor Swift",
      image: "https://i.scdn.co/image/ab67616d00001e02bb54dde68cd23e2a268ae0f5",
      tracks: [
        {
          id: "taylor-1",
          title: "Shake It Off (Taylor's Version)",
          artist: "Taylor Swift",
          imageUrl:
            "https://i.scdn.co/image/ab67616d00001e02bb54dde68cd23e2a268ae0f5",
          audioSrc:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
          albumId: "taylor-1",
        },
        {
          id: "taylor-2",
          title: "Blank Space (Taylor's Version)",
          artist: "Taylor Swift",
          imageUrl:
            "https://i.scdn.co/image/ab67616d00001e02bb54dde68cd23e2a268ae0f5",
          audioSrc:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
          albumId: "taylor-1",
        },
      ],
    },
    {
      title: "÷ (Divide)",
      artist: "Ed Sheeran",
      image: "https://i.scdn.co/image/ab67616d00001e02ba5db46f4b838ef6027e6f96",
      tracks: [
        {
          id: "ed-1",
          title: "Shape of You",
          artist: "Ed Sheeran",
          imageUrl:
            "https://i.scdn.co/image/ab67616d00001e02ba5db46f4b838ef6027e6f96",
          audioSrc:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
          albumId: "ed-1",
        },
        {
          id: "ed-2",
          title: "Perfect",
          artist: "Ed Sheeran",
          imageUrl:
            "https://i.scdn.co/image/ab67616d00001e02ba5db46f4b838ef6027e6f96",
          audioSrc:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
          albumId: "ed-1",
        },
      ],
    },
  ];

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <PlayerLayout isLoggedIn={isLoggedIn}>
      <div className="min-h-screen flex flex-col bg-[#121212] text-white">
        <div className="flex flex-1">
          {/* Sidebar */}
          <div className="w-[420px] bg-black flex-shrink-0 overflow-hidden flex flex-col">
            <nav className="p-2">
              {/* Navigation Links */}
              <div className="space-y-2">
                <Link
                  href="/"
                  className="flex items-center space-x-4 text-white p-3 rounded-md hover:bg-[#282828] transition-colors"
                >
                  <Home className="w-6 h-6" />
                  <span className="font-bold">Home</span>
                </Link>
                <Link
                  href="/search"
                  className="flex items-center space-x-4 text-[#B3B3B3] p-3 rounded-md hover:bg-[#282828] hover:text-white transition-colors"
                >
                  <Search className="w-6 h-6" />
                  <span className="font-bold">Search</span>
                </Link>
              </div>

              {/* Library Section */}
              <div className="mt-2 bg-[#121212] rounded-lg flex-1">
                <div className="p-2 pt-4">
                  <div className="flex items-center justify-between px-2">
                    <button className="flex items-center space-x-2 text-[#B3B3B3] hover:text-white transition-colors">
                      <Library className="w-6 h-6" />
                      <span className="font-bold">Your Library</span>
                    </button>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={handleCreatePlaylist}
                        className="p-2 text-[#B3B3B3] hover:text-white hover:bg-[#282828] rounded-full transition-colors"
                        aria-label="Create playlist or folder"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => router.push("/playlists")}
                        className="p-2 text-[#B3B3B3] hover:text-white hover:bg-[#282828] rounded-full transition-colors"
                        aria-label="Show more"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                        >
                          <path
                            d="M3 8h10M8 3v10"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 px-2 flex gap-2">
                    <button className="px-3 py-1 text-sm font-bold bg-[#282828] text-white rounded-full hover:bg-[#3E3E3E] transition-colors">
                      Playlists
                    </button>
                    <button className="px-3 py-1 text-sm font-bold bg-[#282828] text-white rounded-full hover:bg-[#3E3E3E] transition-colors">
                      Artists
                    </button>
                  </div>

                  <div className="mt-4 space-y-2">
                    {/* Liked Songs - Always visible */}
                    <Link
                      href="/collection/tracks"
                      className="flex items-center p-2 rounded-md hover:bg-[#282828] group transition-colors"
                    >
                      <div className="w-12 h-12 rounded bg-gradient-to-br from-[#450af5] to-[#c4efd9] flex items-center justify-center flex-shrink-0">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="white"
                        >
                          <path d="M8.667 1.912a6.257 6.257 0 0 0-7.462 7.677c.24.906.683 1.747 1.295 2.457l7.955 9.482a2.015 2.015 0 0 0 3.09 0l7.956-9.482a6.188 6.188 0 0 0 1.382-5.234l-.49.097.49-.097a6.303 6.303 0 0 0-5.162-4.98h-.002a6.24 6.24 0 0 0-5.295 1.65.623.623 0 0 1-.848 0 6.257 6.257 0 0 0-2.91-1.57z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <div className="font-bold text-white group-hover:text-white">
                          Liked Songs
                        </div>
                        <div className="text-sm text-[#B3B3B3] flex items-center">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="mr-1"
                          >
                            <path d="M8.822.797a2.72 2.72 0 0 1 3.847 0l2.534 2.533a2.72 2.72 0 0 1 0 3.848l-8.178 8.178a2.667 2.667 0 0 1-1.514.707l-3.276.364a.75.75 0 0 1-.83-.83l.364-3.276a2.667 2.667 0 0 1 .707-1.514L8.822.797z" />
                          </svg>
                          <span>9 songs</span>
                        </div>
                      </div>
                    </Link>

                    {/* User Playlists */}
                    {isLoggedIn &&
                    Array.isArray(playlists) &&
                    playlists.length > 0 ? (
                      playlists.map((playlist) => (
                        <Link
                          key={playlist.id}
                          href={`/playlists/${playlist.id}`}
                          className="flex items-center p-2 rounded-md hover:bg-[#282828] group transition-colors"
                        >
                          {playlist.imageUrl ? (
                            <img
                              src={playlist.imageUrl}
                              alt=""
                              className="w-12 h-12 rounded object-cover flex-shrink-0"
                            />
                          ) : (
                            <div className="w-12 h-12 bg-[#282828] rounded flex items-center justify-center flex-shrink-0">
                              <ListMusic className="w-6 h-6 text-[#B3B3B3]" />
                            </div>
                          )}
                          <div className="ml-3 overflow-hidden">
                            <div className="font-bold text-white truncate group-hover:text-white">
                              {playlist.name}
                            </div>
                            <div className="text-sm text-[#B3B3B3] truncate">
                              Playlist • {playlist.owner || "You"}
                            </div>
                          </div>
                        </Link>
                      ))
                    ) : isLoggedIn ? (
                      <div className="p-4 bg-[#242424] rounded-lg mx-2">
                        <h3 className="font-bold text-white mb-1">
                          Create your first playlist
                        </h3>
                        <p className="text-sm text-[#B3B3B3] mb-4">
                          It's easy, we'll help you
                        </p>
                        <button
                          onClick={handleCreatePlaylist}
                          className="bg-white text-black px-4 py-2 rounded-full text-sm font-bold hover:scale-105 transition-transform"
                        >
                          Create playlist
                        </button>
                      </div>
                    ) : null}

                    {/* Login Prompt - Show when not logged in */}
                    {!isLoggedIn && (
                      <div className="p-4 bg-[#242424] rounded-lg mx-2">
                        <h3 className="font-bold text-white mb-1">
                          Create your first playlist
                        </h3>
                        <p className="text-sm text-[#B3B3B3] mb-4">
                          Log in to create and share playlists
                        </p>
                        <Link
                          href="/login"
                          className="bg-white text-black px-4 py-2 rounded-full text-sm font-bold hover:scale-105 transition-transform inline-block"
                        >
                          Log in
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <main className="flex-1 overflow-auto bg-gradient-to-b from-[#121212] via-[#121212] to-[#121212]">
            <Header onSearch={handleSearch} isLoggedIn={isLoggedIn} />

            <div className="px-8 py-6">
              {/* Popular Artists */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Popular Artists</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                  {popularArtists.map((artist) => (
                    <ArtistCard
                      key={artist.name}
                      {...artist}
                      isLoggedIn={isLoggedIn}
                    />
                  ))}
                </div>
              </section>

              {/* Popular Albums */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">
                    Popular albums and singles
                  </h2>
                  <button className="text-sm font-semibold text-[#B3B3B3] hover:underline">
                    Show all
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                  {popularAlbums.map((album: Album) => (
                    <AlbumCard
                      key={album.title}
                      title={album.title}
                      artist={album.artist}
                      image={album.image}
                      tracks={album.tracks}
                      isLoggedIn={isLoggedIn}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="w-full max-w-[1600px] mx-auto">
              <Footer />
            </div>
          </main>
        </div>

        {/* Show SignupBanner only if not logged in */}
        {!isLoggedIn && <SignupBanner />}
      </div>
    </PlayerLayout>
  );
};

export default HomePage;
