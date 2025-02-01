"use client"

import Image from "next/image"
import { Search, Library, Home, Plus } from "lucide-react"
import Header from "@/components/Header"
import ArtistCard from "@/components/ArtistCard"
import AlbumCard from "@/components/AlbumCard"
import SignupBanner from "@/components/SignupBanner"
import Footer from "@/components/Footer"

const HomePage = () => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
  }

  const popularArtists = [
    { name: "The Weeknd", role: "Artist", image: "https://picsum.photos/400/400?random=1" },
    { name: "Medi", role: "Artist", image: "https://picsum.photos/400/400?random=2" },
    { name: "Galena", role: "Artist", image: "https://picsum.photos/400/400?random=3" },
    { name: "Emanuela", role: "Artist", image: "https://picsum.photos/400/400?random=4" },
    { name: "Krisko", role: "Artist", image: "https://picsum.photos/400/400?random=5" },
    { name: "Djordan", role: "Artist", image: "https://picsum.photos/400/400?random=6" },
  ]

  const popularAlbums = [
    { title: "GALENAXX", artist: "Galena", image: "https://picsum.photos/400/400?random=7" },
    { title: "Notarialno zaveren", artist: "Emanuela", image: "https://picsum.photos/400/400?random=8" },
    { title: "DeBi TiRAR MáS FoToS", artist: "Bad Bunny", image: "https://picsum.photos/400/400?random=9" },
    { title: "HIT ME HARD AND SOFT", artist: "Billie Eilish", image: "https://picsum.photos/400/400?random=10" },
    { title: "GNX", artist: "Kendrick Lamar", image: "https://picsum.photos/400/400?random=11" },
    { title: "Arcane League of Legends", artist: "League of Legends", image: "https://picsum.photos/400/400?random=12" },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0 p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <svg viewBox="0 0 16 16" className="h-8 w-8 text-white" fill="currentColor">
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.669 11.538a.498.498 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686zm.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858zm.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288z"/>
              </svg>
              Spotify
            </h1>
          </div>
          
          <nav className="space-y-6">
            <div className="space-y-2">
              <a href="#" className="flex items-center space-x-3 text-white hover:text-white/80">
                <Home className="w-6 h-6" />
                <span>Home</span>
              </a>
              <a href="#" className="flex items-center space-x-3 text-gray-400 hover:text-white">
                <Search className="w-6 h-6" />
                <span>Search</span>
              </a>
            </div>

            <div className="pt-6 border-t border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3 text-gray-400">
                  <Library className="w-6 h-6" />
                  <span>Your Library</span>
                </div>
                <button className="p-2 hover:bg-gray-800 rounded-full">
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-4">
                <h3 className="font-bold mb-2">Create your first playlist</h3>
                <p className="text-sm text-gray-400 mb-4">It's easy, we'll help you</p>
                <button className="bg-white text-black px-4 py-2 rounded-full text-sm font-bold hover:scale-105 transition-transform">
                  Create playlist
                </button>
              </div>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-gradient-to-b from-[#1F1F1F] to-[#121212]">
          <Header />
          
          <div className="px-8 py-6">
            {/* Popular Artists */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Popular artists</h2>
                <button className="text-sm font-semibold text-[#B3B3B3] hover:underline">
                  Show all
                </button>
              </div>
              <div className="grid grid-cols-6 gap-6">
                {popularArtists.map((artist) => (
                  <ArtistCard key={artist.name} {...artist} />
                ))}
              </div>
            </div>

            {/* Popular Albums */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Popular albums and singles</h2>
                <button className="text-sm font-semibold text-[#B3B3B3] hover:underline">
                  Show all
                </button>
              </div>
              <div className="grid grid-cols-6 gap-6">
                {popularAlbums.map((album) => (
                  <AlbumCard key={album.title} {...album} />
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

      {/* Banner overlays at the bottom */}
      <SignupBanner />
    </div>
  )
}

export default HomePage 