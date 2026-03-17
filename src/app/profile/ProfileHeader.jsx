"use client";

import React from 'react';
import { Star, Download } from 'lucide-react';

export default function ProfileHeader({ nama, xp, level, rank = "Bronze", badge = 0, avatarUrl }) {
  
  const finalAvatar = avatarUrl || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${nama}&backgroundColor=transparent`;

  return (
    <div className="w-full bg-[#0A0D1A] rounded-3xl border border-gray-800 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.5)] mb-8 relative">
      
      {/* 1. BANNER PIXEL ART */}
      <div className="w-full h-48 md:h-56 relative bg-[#11131A] overflow-hidden">
        {/* Opsional: Ganti banner.png sesuai nama file lu di public */}
        <img 
          src="/banner.png" 
          alt="Banner Profile" 
          className="w-full h-full object-cover opacity-80"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        {/* Gradient shadow biar transisi ke bawah mulus */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#0A0D1A] to-transparent"></div>
      </div>

      {/* 2. AREA KONTEN BAWAH BANNER */}
      <div className="px-6 md:px-10 pb-8 relative">
        
        {/* WADAH AVATAR & INFO (JURUS NUMPUK BANNER) */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end -mt-16 lg:-mt-20 relative z-10 gap-6 lg:gap-0">
            
            {/* BAGIAN KIRI: FOTO SAMA NAMA */}
            <div className="flex flex-col md:flex-row items-center md:items-end gap-5 w-full lg:w-auto">
                {/* Lingkaran Avatar */}
                <div className="w-32 h-32 md:w-40 md:h-40 shrink-0 rounded-full overflow-hidden border-[6px] border-[#0A0D1A] bg-gray-900 shadow-xl relative">
                  <img src={finalAvatar} alt={nama} className="w-full h-full object-cover" />
                </div>
                
                {/* Teks Nama & Rating (Digeser dikit ke atas biar sejajar) */}
                <div className="text-center md:text-left mb-2">
                    <div className="flex items-center justify-center md:justify-start gap-3 mb-1">
                        <h2 className="text-3xl font-bold text-white tracking-wide">{nama}</h2>
                        <div className="bg-[#1A1F36] border border-[#2A314D] px-3 py-1 rounded-full">
                            <p className="text-xs text-blue-400 font-bold tracking-widest uppercase">Level {level}</p>
                        </div>
                    </div>
                    
                    {/* Bintang Rating Pahlawan */}
                    <div className="flex items-center justify-center md:justify-start gap-1.5 mt-2">
                        <span className="text-xs text-gray-400 font-medium mr-1">Rating:</span>
                        <div className="flex gap-0.5 drop-shadow-[0_0_5px_rgba(245,158,11,0.5)]">
                            <Star size={14} fill="#F59E0B" className="text-yellow-500" strokeWidth={0} />
                            <Star size={14} fill="#F59E0B" className="text-yellow-500" strokeWidth={0} />
                            <Star size={14} fill="#F59E0B" className="text-yellow-500" strokeWidth={0} />
                            <Star size={14} fill="#F59E0B" className="text-yellow-500" strokeWidth={0} />
                            <Star size={14} fill="#F59E0B" className="text-yellow-500" strokeWidth={0} />
                        </div>
                        <span className="text-xs font-bold text-white ml-1">(5.0)</span>
                    </div>
                </div>
            </div>

            {/* BAGIAN KANAN: STATISTIK & TOMBOL CETAK CV */}
            <div className="flex items-center gap-6 md:gap-8 bg-[#111526] border border-gray-800 p-4 rounded-2xl w-full lg:w-auto justify-center md:justify-end">
                
                {/* Stat 1: Total XP */}
                <div className="flex items-center gap-3 pr-4 border-r border-gray-700">
                    <div className="w-10 h-10 flex items-center justify-center">
                        <img src="/xp-icon.png" alt="XP" className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-white font-bold text-xl leading-none">{ xp }</span>
                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">Total XP</span>
                    </div>
                </div>

                {/* Stat 2: Rank */}
                <div className="flex items-center gap-3 pr-4 border-r border-gray-700 hidden md:flex">
                    <div className="w-10 h-10 flex items-center justify-center">
                        <img src="/rank-icon.png" alt="Rank" className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(205,127,50,0.6)]" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-white font-bold text-xl leading-none">{ rank }</span>
                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">Rank</span>
                    </div>
                </div>

                {/* Stat 3: Badge */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center">
                        <img src="/badge-icon.png" alt="Badge" className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(234,179,8,0.6)]" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-white font-bold text-xl leading-none">{ badge }</span>
                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">Badge</span>
                    </div>
                </div>

            </div>
            
            {/* Tombol Cetak CV (Posisi mutlak di kanan atas stats buat Desktop) */}
            <button className="hidden lg:flex absolute top-4 right-10 items-center justify-center gap-2 border border-gray-600 hover:border-blue-500 text-gray-300 hover:text-white font-bold text-xs uppercase tracking-widest py-2.5 px-6 rounded-xl transition-all hover:bg-[#1A2038] active:scale-95 shadow-lg">
                <Download size={14} strokeWidth={2.5} /> Cetak CV
            </button>

        </div>
        
        {/* Tombol Cetak CV (Buat Mobile/Tablet biar rapi) */}
        <button className="flex lg:hidden w-full mt-6 items-center justify-center gap-2 border border-gray-600 hover:border-blue-500 text-gray-300 hover:text-white font-bold text-xs uppercase tracking-widest py-3 px-6 rounded-xl transition-all hover:bg-[#1A2038] active:scale-95 shadow-lg">
            <Download size={14} strokeWidth={2.5} /> Cetak CV
        </button>

      </div>
    </div>
  );
}