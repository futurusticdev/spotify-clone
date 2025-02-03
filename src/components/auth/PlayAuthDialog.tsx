"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useEffect, useState, memo } from "react";

interface PlayAuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
  songImage?: string;
}

const PlayAuthDialog = memo(function PlayAuthDialog({
  isOpen,
  onClose,
  songImage,
}: PlayAuthDialogProps) {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[800px] p-0 gap-0 bg-[#121212] border-none overflow-hidden rounded-[8px] shadow-2xl">
        <DialogTitle className="sr-only">
          Starxsadt listening with Spotify
        </DialogTitle>
        <div className="flex">
          {/* Left side - Song Image */}
          <div className="w-[400px] h-[400px] overflow-hidden">
            {songImage ? (
              <img
                src={songImage}
                alt="Song cover"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-neutral-800" />
            )}
          </div>

          {/* Right side - Auth Content */}
          <div className="flex-1 p-[48px] flex flex-col justify-center bg-[#121212]">
            <h2 className="text-[32px] font-bold text-white leading-[38px] tracking-[-0.04em] mb-[32px]">
              Start listening with a free Spotify account
            </h2>

            <button
              onClick={() => router.push("/signup")}
              className="w-full max-w-[324px] h-[48px] rounded-full bg-[#1ed760] text-black font-bold hover:scale-[1.04] hover:bg-[#1fdf64] transition-transform duration-200"
            >
              Sign up free
            </button>

            <button
              onClick={() => router.push("/download")}
              className="w-full max-w-[324px] h-[48px] mt-[12px] rounded-full bg-[rgba(0,0,0,0.1)] border border-[rgba(255,255,255,0.1)] text-white font-bold hover:border-white hover:scale-[1.04] transition-all duration-200"
            >
              Download app
            </button>

            <div className="mt-[32px] text-[rgba(255,255,255,0.6)] text-[16px]">
              Already have an account?{" "}
              <button
                onClick={() => router.push("/login")}
                className="text-white hover:underline font-medium"
              >
                Log in
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
});

export { PlayAuthDialog };
