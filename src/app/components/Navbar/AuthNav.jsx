"use client";

import React, { useState } from "react";
import Link from "next/link";
// 🔥 1. IMPORT MENU & X DARI LUCIDE BUAT IKON BURGERNYA 🔥
import { LogOut, User, Settings, Menu, X } from "lucide-react"; 
import { useRouter } from 'next/navigation';
import NotificationModal from '../../dashboard-siswa/NotificationModal'; 
import ChatModal from './ChatModal';

export default function AuthNav({ userName = "Pahlawan Tanpa Nama", userAvatar }) {
  const router = useRouter();
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  // 🔥 2. STATE BUAT BUKA TUTUP MENU BURGER DI HP 🔥
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 🔥 3. STATE BUAT FITUR SEARCH EXPANDING 🔥
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' }); 
      const data = await res.json();
      
      if (data.success) {
        alert("Berhasil Log Out! Sampai jumpa Pahlawan! 🚀");
        router.push('/login'); 
        router.refresh(); 
      }
    } catch (error) {
      console.error("Waduh, gagal logout broskie:", error);
    }
  };

  // 🔥 4. FUNGSI BUAT JALANIN PENCARIAN PAS DI-ENTER 🔥
  const handleSearch = (e) => {
    e.preventDefault(); 
    if (searchQuery.trim() !== "") {
      router.push(`/quest?search=${searchQuery}`);
      setIsSearchOpen(false); 
      setSearchQuery(""); 
    }
  };

  const finalAvatar = userAvatar || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${userName}&backgroundColor=transparent`;

  return (
    // Tambahin relative biar dropdown HP nge-pas di bawahnya
    <nav className="w-full bg-[#0F172A] px-4 md:px-12 py-4 border-b border-gray-800 sticky top-0 z-50 relative">
      
      <div className="flex items-center justify-between w-full">
        {/* 1. BAGIAN KIRI: Logo & Brand */}
        <Link href="/dashboard-siswa" prefetch={false}>
          <div className="flex items-center gap-2 md:gap-3 cursor-pointer group">
            <div className="w-8 h-8 group-hover:scale-110 transition-transform">
              <img src="/dragon.png" alt="XPact Logo" className="w-full h-full object-contain" />
            </div>
            {/* Teks XPact disembunyiin dikit di HP kalo kepanjangan */}
            <span className="font-pixel text-lg md:text-xl text-white mt-1 group-hover:text-[#FFB800] transition-colors">XPACT</span>
          </div>
        </Link>

        {/* 2. BAGIAN TENGAH: Menu Navigasi (HANYA MUNCUL DI LAPTOP/PC) */}
        <ul className="hidden md:flex items-center gap-8">
          <li className="relative group">
            <Link href="/dashboard-siswa" prefetch={false} className="text-sm font-semibold text-white hover:text-[#FFB800] transition-colors py-1">
              Home
            </Link>
            {/* Garis Bawah Kuning (Muncul pas hover & aktif) */}
            <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#FFB800] scale-x-0 group-hover:scale-x-100  transition-transform duration-300 origin-left"></span>
          </li>
          <li className="relative group">
            <Link href="/quest" prefetch={false} className="text-sm font-semibold text-white hover:text-[#FFB800] transition-colors py-1">
              Quest
            </Link>
            {/* Garis Bawah Kuning (Muncul pas hover doang) */}
            <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#FFB800] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </li>
          <li className="relative group">
            <Link href="/achievements" prefetch={false} className="text-sm font-semibold text-white hover:text-[#FFB800] transition-colors py-1">
              Achievement
            </Link>
            <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#FFB800] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </li>
          <li className="relative group">
            <Link href="/leaderboard" prefetch={false} className="text-sm font-semibold text-white hover:text-[#FFB800] transition-colors py-1">
              Leaderboard
            </Link>
            <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#FFB800] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </li>
        </ul>

        {/* 3. BAGIAN KANAN: Ikon & Profil */}
        {/* Gap-nya dikecilin jadi gap-3 di HP biar gak sempit */}
        <div className="flex items-center gap-3 md:gap-5 text-gray-400">
          
          {/* 🔥 5. FITUR EXPANDING SEARCH BAR DI SINI 🔥 */}
          <form onSubmit={handleSearch} className="relative flex items-center">
            <input
              type="text"
              placeholder="Cari Quest..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              // Delay dikit pas nutup biar fungsi Enter/Submit sempet jalan
              onBlur={() => setTimeout(() => setIsSearchOpen(false), 200)} 
              className={`absolute right-8 bg-[#11131A] border border-gray-700 text-white text-sm rounded-full py-1.5 focus:outline-none focus:border-[#FFB800] transition-all duration-300 origin-right ${
                isSearchOpen ? "w-40 md:w-56 opacity-100 px-4" : "w-0 opacity-0 px-0 border-transparent"
              }`}
            />
            <button
              type="button"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`hover:scale-110 transition-transform relative z-10 p-1 rounded-full ${isSearchOpen ? 'bg-gray-800' : ''}`}
            >
              <img src="/search-pixel.png" alt="Search" className="w-5 h-5 md:w-6 md:h-6 object-contain" />
            </button>
          </form>

          <button onClick={() => setIsChatOpen(true)} className="hover:scale-110 transition-transform relative">
            <img src="/chat-pixel.png" alt="Chat" className="w-5 h-5 md:w-6 md:h-6 object-contain" />
            <span className="absolute -top-1 -right-1 w-2 h-2 md:w-2.5 md:h-2.5 bg-red-500 rounded-full border-2 border-[#0F172A]"></span>
          </button>
          
          <button onClick={() => setIsNotifOpen(true)} className="hover:scale-110 transition-transform relative">
            <img src="/bell-pixel.png" alt="Notifikasi" className="w-5 h-5 md:w-6 md:h-6 object-contain" />
            <span className="absolute -top-1 -right-1 w-2 h-2 md:w-2.5 md:h-2.5 bg-red-500 rounded-full border-2 border-[#0F172A]"></span>
          </button>
          
          {/* Avatar Profil + Dropdown Desktop */}
          <div className="relative">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-gray-600 cursor-pointer hover:border-[#FFB800] hover:scale-105 transition-all focus:outline-none bg-[#11131A]"
            >
              <img src={finalAvatar} alt="Profile" className="w-full h-full object-cover" />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-[#11131A] border border-gray-700 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 hidden md:block">
                <div className="px-4 py-3 border-b border-gray-800 bg-[#0F172A]">
                  <p className="text-xs text-gray-400">Welcome back,</p>
                  <p className="text-sm font-bold text-white truncate">@{userName}</p>
                </div>
                <div className="py-2">
                  <Link href="/profile" prefetch={false} onClick={() => setIsDropdownOpen(false)}>
                    <div className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors cursor-pointer font-medium">
                      <User size={16} /> Profile
                    </div>
                  </Link>
                   <Link href="/settings" prefetch={false} onClick={() => setIsDropdownOpen(false)}>                 
                  <div className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors cursor-pointer font-medium">
                    <Settings size={16} /> Account
                  </div>
                   </Link>
                </div>
                <div className="h-px bg-gray-800 my-1"></div>
                <div className="py-1">
                  <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500 hover:text-white transition-colors font-bold text-left">
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 🔥 4. TOMBOL BURGER MENU (HANYA DI HP) 🔥 */}
          <button 
            className="md:hidden text-white ml-1 p-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>

        </div>
      </div>

      {/* 🔥 5. DROPDOWN MENU MOBILE (HANYA MUNCUL PAS BURGER DIKLIK) 🔥 */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#0F172A] border-b border-gray-800 flex flex-col md:hidden z-40 shadow-2xl animate-in slide-in-from-top-2">
          
          <div className="px-6 py-4 border-b border-gray-800 bg-[#11131A]">
            <p className="text-xs text-gray-400">Welcome back,</p>
            <p className="text-sm font-bold text-white truncate">@{userName}</p>
          </div>

          <ul className="flex flex-col py-2 px-4">
            <li>
              <Link href="/dashboard-siswa" onClick={() => setIsMobileMenuOpen(false)} className="block py-3 px-4 text-sm font-semibold text-white hover:bg-gray-800 rounded-lg transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/quest" onClick={() => setIsMobileMenuOpen(false)} className="block py-3 px-4 text-sm font-semibold text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
                Quest
              </Link>
            </li>
            <li>
              <Link href="/achievements" onClick={() => setIsMobileMenuOpen(false)} className="block py-3 px-4 text-sm font-semibold text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
                Achievement
              </Link>
            </li>
            <li>
              <Link href="/leaderboard" onClick={() => setIsMobileMenuOpen(false)} className="block py-3 px-4 text-sm font-semibold text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
                Leaderboard
              </Link>
            </li>
            
            <li className="my-2 border-t border-gray-800"></li>
            
            <li>
              <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 py-3 px-4 text-sm font-semibold text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
                <User size={18} /> Profile
              </Link>
            </li>
            <li>
              <Link href="/settings" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 py-3 px-4 text-sm font-semibold text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
                <Settings size={18} /> Account Setting
              </Link>
            </li>
            <li>
              <button onClick={() => { setIsMobileMenuOpen(false); handleLogout(); }} className="w-full flex items-center gap-3 py-3 px-4 text-sm font-bold text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-lg transition-colors text-left">
                <LogOut size={18} /> Sign Out
              </button>
            </li>
          </ul>
        </div>
      )}

      <NotificationModal isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
      <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </nav>
  );
}