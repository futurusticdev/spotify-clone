"use client";

import Link from "next/link";

const SignupBanner = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-[72px] bg-gradient-to-r from-[#AE2996] to-[#509BF5] py-3 px-8 flex justify-between items-center z-50">
      <div>
        <h2 className="text-white font-bold">Preview of Spotify</h2>
        <p className="text-white text-sm">
          Sign up to get unlimited songs and podcasts with occasional ads. No credit card needed.
        </p>
      </div>
      <Link
        href="/signup"
        className="bg-white text-black px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform"
      >
        Sign up free
      </Link>
    </div>
  );
};

export default SignupBanner; 