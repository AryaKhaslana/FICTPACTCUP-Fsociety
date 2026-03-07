import React from 'react';
import { Hexagon, Shield, Trophy, Flame } from 'lucide-react';
import Link from 'next/link';

export default function ProfileCard({ nama, xp, level }) {
  return (
    // Wrapper Utama Kartu
    <div className="bg-[#0C1021] rounded-3xl p-6 border border-gray-800 w-full flex flex-col gap-6 shadow-lg">
      
      {/* BAGIAN ATAS: Foto & Info User */}
      <div className="flex items-center gap-4">
        {/* Border gradient tipis ala gaming buat avatar */}
        <div className="w-16 h-16 rounded-xl overflow-hidden border border-gray-700 bg-gray-800 shrink-0">
          <img 
            src="https://api.dicebear.com/7.x/pixel-art/svg?seed=Booyah&backgroundColor=transparent" 
            alt="User Avatar" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <h2 className="text-xl font-bold text-white tracking-wide">{nama}</h2>
          <p className="text-sm text-gray-400 font-medium">Level {level}</p>
        </div>
      </div>

      {/* BAGIAN TENGAH: Grid Statistik (2 Kolom) */}
      <div className="grid grid-cols-2 gap-4">
        
        {/* Stat 1: Total XP */}
        <div className="flex items-center gap-3">
          <div className="text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">
            <Hexagon size={28} fill="currentColor" className="text-blue-900" />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold text-sm">{ xp }</span>
            <span className="text-[11px] text-gray-500 font-medium">Total XP</span>
          </div>
        </div>

        {/* Stat 2: Rank */}
        <div className="flex items-center gap-3">
          <div className="text-[#CD7F32] drop-shadow-[0_0_8px_rgba(205,127,50,0.5)]">
            <Shield size={28} fill="currentColor" className="text-orange-900" />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold text-sm">Bronze</span>
            <span className="text-[11px] text-gray-500 font-medium">Rank</span>
          </div>
        </div>

        {/* Stat 3: Badge */}
        <div className="flex items-center gap-3">
          <div className="text-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]">
            <Trophy size={28} fill="currentColor" className="text-yellow-900" />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold text-sm">1</span>
            <span className="text-[11px] text-gray-500 font-medium">Badge</span>
          </div>
        </div>

        {/* Stat 4: Day Streak */}
        <div className="flex items-center gap-3">
          <div className="text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]">
            <Flame size={28} fill="currentColor" className="text-red-900" />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold text-sm">?</span>
            <span className="text-[11px] text-gray-500 font-medium">Day Streak</span>
          </div>
        </div>

      </div>

      {/* BAGIAN BAWAH: Tombol */}
      <Link href="/profile" className="w-full mt-2">
        <button className="w-full py-3 rounded-xl border border-gray-700 text-sm font-bold text-gray-300 hover:bg-white hover:text-black transition-all duration-300 active:scale-95">
          Lihat Profil
        </button>
      </Link>

    </div>
  );
}