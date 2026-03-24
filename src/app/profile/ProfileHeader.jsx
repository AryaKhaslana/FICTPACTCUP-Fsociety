"use client";

import React from 'react';
import { Star } from 'lucide-react'; // 👈 Download udah dihapus
import Link from 'next/link'; // 👈 Tambahin ini buat fungsi pindah halaman

// 🔥 TANGKEP PROPS 'rank' dan 'coverUrl' DI SINI 🔥
export default function ProfileHeader({ nama, xp, level, rank, badge = 0, avatarUrl, coverUrl }) {
  
  const finalAvatar = avatarUrl || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${nama}&backgroundColor=transparent`;
  const finalCover = coverUrl || "/banner.png"; // 👈 Kalo gada cover, baru pake default

  // 🔥 LOGIKA RANKING NGILUTIN PAGE.JSX 🔥
  let rankIcon = "/rank-icon.png"; // Default Bronze
  let rankGlow = "drop-shadow-[0_0_8px_rgba(205,127,50,0.6)]"; // Cahaya Perunggu

  if (rank === "Mythic") {
    rankIcon = "/mythic-badge.png"; // Pastiin lu sedia gambarnya bro!
    rankGlow = "drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]"; // Cahaya Merah Dewa
  } else if (rank === "Gold") {
    rankIcon = "/gold-badge.png";
    rankGlow = "drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]"; // Cahaya Emas
  } else if (rank === "Silver") {
    rankIcon = "/silver-badge.png";
    rankGlow = "drop-shadow-[0_0_8px_rgba(192,192,192,0.6)]"; // Cahaya Perak
  }

  return (
    <div className="w-full bg-[#0A0D1A] rounded-3xl border border-gray-800 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.5)] mb-8 relative">
      
      {/* 1. BANNER PIXEL ART */}
      <div className="w-full h-48 md:h-56 relative bg-[#11131A] overflow-hidden border-b border-gray-800">
        <img 
          src={finalCover} 
          alt="Banner Profile" 
          className="w-full h-full object-cover opacity-80"
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1000'; }}
        />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0A0D1A] via-[#0A0D1A]/80 to-transparent"></div>
      </div>

      {/* 2. AREA KONTEN BAWAH BANNER */}
      <div className="px-6 md:px-10 pb-8 relative">
        
        {/* WADAH AVATAR & INFO */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end -mt-16 lg:-mt-20 relative z-10 gap-6 lg:gap-0">
            
            {/* BAGIAN KIRI: FOTO SAMA NAMA */}
            <div className="flex flex-col md:flex-row items-center md:items-end gap-5 w-full lg:w-auto">
                {/* Lingkaran Avatar */}
                <div className="w-32 h-32 md:w-40 md:h-40 shrink-0 rounded-full overflow-hidden border-[6px] border-[#0A0D1A] bg-gray-900 shadow-xl relative group">
                  <img src={finalAvatar} alt={nama} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                </div>
                
                {/* Teks Nama & Rating */}
                <div className="text-center md:text-left mb-2 mt-4 md:mt-0">
                    <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-3 mb-1">
                        <h2 className="text-3xl font-bold text-white tracking-wide">{nama}</h2>
                        <div className="bg-[#1A1F36] border border-[#2A314D] px-3 py-1 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.2)]">
                            <p className="text-xs text-blue-400 font-bold tracking-widest uppercase">Level {level}</p>
                        </div>
                    </div>
                    
                    {/* Bintang Rating Pahlawan */}
                    <div className="flex items-center justify-center md:justify-start gap-1.5 mt-2">
                        <span className="text-xs text-gray-400 font-medium mr-1">Rating:</span>
                        <div className="flex gap-0.5 drop-shadow-[0_0_5px_rgba(245,158,11,0.5)]">
                            {[1,2,3,4,5].map((star) => (
                              <Star key={star} size={14} fill="#F59E0B" className="text-yellow-500" strokeWidth={0} />
                            ))}
                        </div>
                        <span className="text-xs font-bold text-white ml-1">(5.0)</span>
                    </div>
                </div>
            </div>

            {/* BAGIAN KANAN: STATISTIK */}
            <div className="flex items-center gap-6 md:gap-8 bg-[#111526] border border-gray-800 p-4 rounded-2xl w-full lg:w-auto justify-center md:justify-end mt-4 lg:mt-0 shadow-inner">
                
                {/* Stat 1: Total XP */}
                <div className="flex items-center gap-3 pr-4 border-r border-gray-700">
                    <div className="w-10 h-10 flex items-center justify-center text-2xl drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]">
                        ⚔️ {/* Ganti pake icon img lu kalo ada */}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-white font-bold text-xl leading-none">{ xp }</span>
                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">Total XP</span>
                    </div>
                </div>

                {/* 🔥 Stat 2: Rank Dinamis 🔥 */}
                <div className="flex items-center gap-3 pr-4 border-r border-gray-700">
                    <div className="w-10 h-10 flex items-center justify-center">
                        <img src={rankIcon} alt="Rank" className={`w-full h-full object-contain ${rankGlow}`} onError={(e) => { e.target.style.display = 'none'; }} />
                    </div>
                    <div className="flex flex-col">
                        <span className={`font-bold text-xl leading-none ${rank === 'Mythic' ? 'text-red-500' : 'text-white'}`}>{ rank }</span>
                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">Rank</span>
                    </div>
                </div>

                {/* Stat 3: Badge */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center text-2xl drop-shadow-[0_0_8px_rgba(234,179,8,0.6)]">
                        🛡️ {/* Ganti pake icon img lu kalo ada */}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-white font-bold text-xl leading-none">{ badge }</span>
                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">Badge</span>
                    </div>
                </div>
            </div>
            
            {/* 🔥 Tombol Edit Profile (Desktop) 🔥 */}
            <Link 
              href="/settings" // 👈 Sesuaikan URL halaman setting lu
              className="hidden lg:flex absolute top-6 right-10 items-center justify-center gap-2 bg-[#F59E0B] hover:bg-[#D97706] text-black font-bold py-2 px-6 rounded-xl transition-all shadow-[0_4px_0_rgb(180,83,9)] hover:shadow-[0_2px_0_rgb(180,83,9)] hover:translate-y-[2px] active:translate-y-[4px] active:shadow-none"
            >
              <span>✏️</span> Edit Profile
            </Link>

        </div>
        
        {/* 🔥 Tombol Edit Profile (Mobile) 🔥 */}
        <Link 
          href="/settings" // 👈 Sesuaikan URL halaman setting lu
          className="flex lg:hidden w-full mt-6 items-center justify-center gap-2 bg-[#F59E0B] hover:bg-[#D97706] text-black font-bold py-3 px-6 rounded-xl transition-all shadow-[0_4px_0_rgb(180,83,9)] hover:shadow-[0_2px_0_rgb(180,83,9)] hover:translate-y-[2px] active:translate-y-[4px] active:shadow-none"
        >
          <span>✏️</span> Edit Profile
        </Link>

      </div>
    </div>
  );
}