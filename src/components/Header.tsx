"use client";

import { Search, Home, Download, User } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { removeToken } from "@/lib/auth";

interface HeaderProps {
  onSearch: (query: string) => void;
  isLoggedIn: boolean;
}

const QueueIcon = () => (
  <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
    <path d="M15 15H1v-1.5h14V15zm0-4.5H1V9h14v1.5zm-14-7A2.5 2.5 0 0 1 3.5 1h9a2.5 2.5 0 0 1 0 5h-9A2.5 2.5 0 0 1 1 3.5zm2.5-1a1 1 0 0 0 0 2h9a1 1 0 1 0 0-2h-9z" />
  </svg>
);

const Header = ({ onSearch, isLoggedIn }: HeaderProps) => {
  const router = useRouter();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  const handleLogout = () => {
    removeToken();
    router.push("/login");
  };

  return (
    <header className="sticky top-0 bg-black/75 backdrop-blur-md z-10">
      <div className="flex items-center h-[72px] px-8">
        {/* Left side - empty div for spacing */}
        <div className="w-[280px]" />

        {/* Center Search and Home */}
        <div className="flex flex-1 justify-center gap-3">
          <Link
            href="/"
            className="flex items-center justify-center bg-[#121212] hover:bg-[#1A1A1A] transition-colors rounded-full p-3"
            aria-label="Home"
          >
            <Home className="h-6 w-6" />
          </Link>
          <div className="relative flex items-center">
            <Search className="absolute left-4 h-6 w-6 text-[#7F7F7F]" />
            <input
              type="search"
              placeholder="What do you want to play?"
              className="w-[420px] bg-[#121212] rounded-full py-3 pl-14 pr-6 text-base text-white placeholder-[#7F7F7F] focus:outline-none focus:ring-2 focus:ring-white hover:bg-[#1A1A1A] transition-colors"
              onChange={handleSearchChange}
            />
          </div>
        </div>

        {/* User Controls */}
        <div className="flex items-center gap-3">
          <button className="text-base font-semibold hover:scale-105 hover:text-white text-[#A7A7A7] transition px-5 py-3">
            Premium
          </button>
          <button className="text-base font-semibold hover:scale-105 hover:text-white text-[#A7A7A7] transition px-5 py-3">
            Support
          </button>
          <button className="text-base font-semibold hover:scale-105 hover:text-white text-[#A7A7A7] transition px-5 py-3">
            Download
          </button>
          <div className="h-8 w-px bg-[#2A2A2A]" />
          {isLoggedIn ? (
            <>
              <button
                className="flex items-center gap-2 text-base font-semibold hover:scale-105 hover:text-white text-[#A7A7A7] transition px-5 py-3"
                onClick={handleLogout}
              >
                Log out
              </button>
              <button
                className="bg-[#282828] text-white p-2 rounded-full hover:bg-[#3E3E3E] transition-colors"
                aria-label="User Profile"
              >
                <User className="h-6 w-6" />
              </button>
            </>
          ) : (
            <>
              <Link
                href="/signup"
                className="text-base font-semibold hover:scale-105 hover:text-white text-[#A7A7A7] transition px-5 py-3"
              >
                Sign up
              </Link>
              <Link
                href="/login"
                className="bg-white text-black px-9 py-3 rounded-full font-bold hover:scale-105 transition-transform text-base"
              >
                Log in
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
