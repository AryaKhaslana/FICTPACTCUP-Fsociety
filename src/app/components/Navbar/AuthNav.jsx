import React from "react";
import Link from "next/link";
import { Search, Bell } from "lucide-react"; // Panggil ikon langsung dari lucide

export default function AuthNav() {
  return (
    // Pake justify-between biar otomatis misah ke kiri, tengah, dan kanan
    <nav className="w-full bg-[#0F172A] px-6 md:px-12 py-4 flex items-center justify-between border-b border-gray-800 sticky top-0 z-50">
      
      {/* 1. BAGIAN KIRI: Logo & Brand */}
      <div className="flex items-center gap-3 cursor-pointer">
        <div className="w-8 h-8">
          {/* Pastikan file dragon.png ada di folder public */}
          <img src="/dragon.png" alt="XPact Logo" className="w-full h-full object-contain" />
        </div>
        <span className="font-pixel text-xl text-white mt-1">XPACT</span>
      </div>

      {/* 2. BAGIAN TENGAH: Menu Navigasi */}
      <ul className="hidden md:flex items-center gap-8">
        <li>
          <Link href="/dashboard-siswa" className="text-sm font-semibold text-white hover:text-[#FFB800] transition-colors">
            Home
          </Link>
        </li>
        <li>
          <Link href="/quest" className="text-sm font-semibold text-gray-400 hover:text-[#FFB800] transition-colors">
            Quest
          </Link>
        </li>
        <li>
          <Link href="/umkm" className="text-sm font-semibold text-gray-400 hover:text-[#FFB800] transition-colors">
            UMKM
          </Link>
        </li>
        <li>
          <Link href="/leaderboard" className="text-sm font-semibold text-gray-400 hover:text-[#FFB800] transition-colors">
            Leaderboard
          </Link>
        </li>
      </ul>

      {/* 3. BAGIAN KANAN: Ikon & Profil */}
      <div className="flex items-center gap-5 text-gray-400">
        <button className="hover:text-white transition-colors">
          <Search size={20} />
        </button>
        <button className="hover:text-white transition-colors">
          <Bell size={20} />
        </button>
        
        {/* Avatar Profil */}
        <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-600 cursor-pointer hover:border-[#FFB800] transition-all">
          <img 
            src="https://api.dicebear.com/7.x/pixel-art/svg?seed=Booyah&backgroundColor=transparent" 
            alt="Profile" 
            className="w-full h-full object-cover bg-gray-800"
          />
        </div>
      </div>

    </nav>
  );
}