"use client";

import { Instagram, Twitter, Facebook } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-black text-white px-8 py-16">
      <div className="flex justify-between">
        {/* Left section - Company, Communities, etc */}
        <div className="flex gap-24">
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-3">
              <li><Link href="#" className="text-[#A7A7A7] hover:text-white text-sm">About</Link></li>
              <li><Link href="#" className="text-[#A7A7A7] hover:text-white text-sm">Jobs</Link></li>
              <li><Link href="#" className="text-[#A7A7A7] hover:text-white text-sm">For the Record</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Communities</h4>
            <ul className="space-y-3">
              <li><Link href="#" className="text-[#A7A7A7] hover:text-white text-sm">For Artists</Link></li>
              <li><Link href="#" className="text-[#A7A7A7] hover:text-white text-sm">Developers</Link></li>
              <li><Link href="#" className="text-[#A7A7A7] hover:text-white text-sm">Advertising</Link></li>
              <li><Link href="#" className="text-[#A7A7A7] hover:text-white text-sm">Investors</Link></li>
              <li><Link href="#" className="text-[#A7A7A7] hover:text-white text-sm">Vendors</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Useful links</h4>
            <ul className="space-y-3">
              <li><Link href="#" className="text-[#A7A7A7] hover:text-white text-sm">Support</Link></li>
              <li><Link href="#" className="text-[#A7A7A7] hover:text-white text-sm">Free Mobile App</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Spotify Plans</h4>
            <ul className="space-y-3">
              <li><Link href="#" className="text-[#A7A7A7] hover:text-white text-sm">Premium Individual</Link></li>
              <li><Link href="#" className="text-[#A7A7A7] hover:text-white text-sm">Premium Duo</Link></li>
              <li><Link href="#" className="text-[#A7A7A7] hover:text-white text-sm">Premium Family</Link></li>
              <li><Link href="#" className="text-[#A7A7A7] hover:text-white text-sm">Spotify Free</Link></li>
            </ul>
          </div>
        </div>

        {/* Right section - Social links */}
        <div className="flex flex-col items-end gap-16">
          <div className="flex gap-4">
            <Link 
              href="#"
              className="bg-[#292929] p-3 rounded-full hover:bg-[#727272] transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-6 h-6" />
            </Link>
            <Link 
              href="#"
              className="bg-[#292929] p-3 rounded-full hover:bg-[#727272] transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-6 h-6" />
            </Link>
            <Link 
              href="#"
              className="bg-[#292929] p-3 rounded-full hover:bg-[#727272] transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom section with links and copyright */}
      <div className="mt-16 pt-8 border-t border-[#292929]">
        <div className="flex gap-6 mb-8">
          <Link href="#" className="text-[#A7A7A7] hover:text-white text-sm">Legal</Link>
          <Link href="#" className="text-[#A7A7A7] hover:text-white text-sm">Safety & Privacy Center</Link>
          <Link href="#" className="text-[#A7A7A7] hover:text-white text-sm">Privacy Policy</Link>
          <Link href="#" className="text-[#A7A7A7] hover:text-white text-sm">Cookie Settings</Link>
          <Link href="#" className="text-[#A7A7A7] hover:text-white text-sm">About Ads</Link>
          <Link href="#" className="text-[#A7A7A7] hover:text-white text-sm">Accessibility</Link>
          <Link href="#" className="text-[#A7A7A7] hover:text-white text-sm">Cookies</Link>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 text-[#A7A7A7] hover:text-white text-sm border border-[#727272] rounded-full px-3 py-1">
            <span className="i-carbon-earth-americas w-4 h-4"></span>
            English
          </button>
          <p className="text-[#A7A7A7] text-sm">© 2024 Spotify AB</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 