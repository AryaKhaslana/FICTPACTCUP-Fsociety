"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LogOut, User, Settings } from "lucide-react"; 
import { useRouter } from 'next/navigation';
import NotificationModal from '../../dashboard-siswa/NotificationModal'; 
import ChatModalUMKM from '../NavbarUMKM/ChatModalUMKM'; // 👈 Panggil komponen chat dari folder sebelah!

export default function NavbarUMKM({ userName = "Bos UMKM", userAvatar }) {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' }); 
      const data = await res.json();
      
      if (data.success) {
        alert("Berhasil Log Out! Sampai jumpa Bos UMKM! 🚀");
        router.push('/login'); 
        router.refresh(); 
      }
    } catch (error) {
      console.error("Waduh, gagal logout broskie:", error);
    }
  };

  const finalAvatar = userAvatar || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${userName}&backgroundColor=transparent`;

  return (
    <nav className="w-full bg-[#0F172A] px-6 md:px-12 py-4 flex items-center justify-between border-b border-gray-800 sticky top-0 z-50">
      
      {/* 1. BAGIAN KIRI: Logo & Brand (Sesuai Figma) */}
      <Link href="/dashboard-umkm" prefetch={false}>
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="w-8 h-8 group-hover:scale-110 transition-transform">
            <img src="/dragon.png" alt="XPact Logo" className="w-full h-full object-contain" />
          </div>
          {/* Teks diubah jadi Dashboard sesuai desain lu */}
          <span className="font-pixel text-xl text-white mt-1 group-hover:text-[#FFB800] transition-colors">Dashboard</span>
        </div>
      </Link>

      {/* 2. BAGIAN TENGAH: Menu Navigasi UMKM */}
      <ul className="hidden md:flex items-center gap-8">
        <li>
          <Link href="/dashboard-umkm" prefetch={false} className="text-sm font-semibold text-white hover:text-[#FFB800] transition-colors">
            Home
          </Link>
        </li>
        <li>
          {/* href-nya disesuaiin sama folder Next.js lu ya */}
          <Link href="/dashboard-umkm/quest" prefetch={false} className="text-sm font-semibold text-gray-400 hover:text-[#FFB800] transition-colors">
            Quest
          </Link>
        </li>
        <li>
          <Link href="/dashboard-umkm/eksplor-siswa" prefetch={false} className="text-sm font-semibold text-gray-400 hover:text-[#FFB800] transition-colors">
            Eksplor Siswa
          </Link>
        </li>
      </ul>

      {/* 3. BAGIAN KANAN: Ikon & Profil */}
      <div className="flex items-center gap-5 text-gray-400">
        
        <button className="hover:scale-110 transition-transform">
          <img src="/search-pixel.png" alt="Search" className="w-6 h-6 object-contain" />
        </button>

        {/* Fitur Chat tetep ada dan jalan! */}
        <button 
          onClick={() => setIsChatOpen(true)} 
          className="hover:scale-110 transition-transform relative"
        >
          <img src="/chat-pixel.png" alt="Chat" className="w-6 h-6 object-contain" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#0F172A]"></span>
        </button>
        
        {/* Fitur Notif */}
        <button 
          onClick={() => setIsNotifOpen(true)}
          className="hover:scale-110 transition-transform relative"
        >
          <img src="/bell-pixel.png" alt="Notifikasi" className="w-6 h-6 object-contain" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#0F172A]"></span>
        </button>
        
        {/* Avatar Profil + Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-600 cursor-pointer hover:border-[#FFB800] hover:scale-105 transition-all focus:outline-none bg-[#11131A]"
          >
            <img src={finalAvatar} alt="Profile" className="w-full h-full object-cover" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-[#11131A] border border-gray-700 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
              
              <div className="px-4 py-3 border-b border-gray-800 bg-[#0F172A]">
                <p className="text-xs text-gray-400">Welcome back,</p>
                <p className="text-sm font-bold text-white truncate">@{userName}</p>
              </div>

              <div className="py-2">                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
                <Link href="/dashboard-umkm/profile-umkm" prefetch={false} onClick={() => setIsDropdownOpen(false)}>
                  <div className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors cursor-pointer font-medium">
                    <User size={16} /> Profile
                  </div>
                </Link>
                <div className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors cursor-pointer font-medium">
                  <Settings size={16} /> Account
                </div>
              </div>

              <div className="h-px bg-gray-800 my-1"></div>

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
      
      {/* Modals */}
      <NotificationModal 
        isOpen={isNotifOpen} 
        onClose={() => setIsNotifOpen(false)} 
      />

      <ChatModalUMKM isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </nav>
  );
}