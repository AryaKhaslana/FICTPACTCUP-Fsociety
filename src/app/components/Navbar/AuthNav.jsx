"use client"; // Wajib ditambahin karena kita mau pake state & interaksi klik

import React, { useState } from "react";
import Link from "next/link";
import { Search, Bell, LogOut, User, Settings } from "lucide-react"; 
import { useRouter } from 'next/navigation';

export default function AuthNav() {
  const router = useRouter();
  
  // State buat buka-tutup dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Fungsi buat Ngebakar KTP (Logout)
  const handleLogout = async () => {
    try {
      const res = await fetch('../../api/auth/logout', { method: 'POST' });
      const data = await res.json();
      
      if (data.success) {
        alert("Berhasil Log Out! Sampai jumpa Pahlawan! 🚀");
        router.push('/login'); // Lempar balik ke halaman login
        router.refresh(); 
      }
    } catch (error) {
      console.error("Waduh, gagal logout broskie:", error);
    }
  };

  return (
    <nav className="w-full bg-[#0F172A] px-6 md:px-12 py-4 flex items-center justify-between border-b border-gray-800 sticky top-0 z-50">
      
      {/* 1. BAGIAN KIRI: Logo & Brand */}
      <Link href="/dashboard-siswa">
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="w-8 h-8 group-hover:scale-110 transition-transform">
            <img src="/dragon.png" alt="XPact Logo" className="w-full h-full object-contain" />
          </div>
          <span className="font-pixel text-xl text-white mt-1 group-hover:text-[#FFB800] transition-colors">XPACT</span>
        </div>
      </Link>

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
          <Link href="/achievement" className="text-sm font-semibold text-gray-400 hover:text-[#FFB800] transition-colors">
            Achievement
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
        <button className="hover:text-white transition-colors relative">
          <Bell size={20} />
          {/* Titik notif merah biar estetik */}
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        {/* Avatar Profil + Dropdown (Wadah Relative) */}
        <div className="relative">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-9 h-9 rounded-full overflow-hidden border-2 border-gray-600 cursor-pointer hover:border-[#FFB800] hover:scale-105 transition-all focus:outline-none"
          >
            <img 
              src="https://api.dicebear.com/7.x/pixel-art/svg?seed=Booyah&backgroundColor=transparent" 
              alt="Profile" 
              className="w-full h-full object-cover bg-gray-800"
            />
          </button>

          {/* Kotak Dropdown (Muncul kalau Avatar diklik) */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-[#11131A] border border-gray-700 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
              
              {/* Header Info User */}
              <div className="px-4 py-3 border-b border-gray-800 bg-[#0F172A]">
                <p className="text-xs text-gray-400">Welcome back,</p>
                <p className="text-sm font-bold text-white truncate">@Kim Booyah</p>
              </div>

              {/* List Menu */}
              <div className="py-2">
                <Link href="/profile" onClick={() => setIsDropdownOpen(false)}>
                  <div className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors cursor-pointer font-medium">
                    <User size={16} /> Profile
                  </div>
                </Link>
                
                <div className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors cursor-pointer font-medium">
                  <Settings size={16} /> Account
                </div>
              </div>

              <div className="h-px bg-gray-800 my-1"></div>

              {/* Tombol Logout */}
              <div className="py-1">
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500 hover:text-white transition-colors font-bold text-left"
                >
                  <LogOut size={16} /> Sign Out
                </button>
              </div>

            </div>
          )}
        </div>
      </div>
    </nav>
  );
}