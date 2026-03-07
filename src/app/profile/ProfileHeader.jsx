import React from 'react';
import { Star, Shield, Award, Hexagon, Download } from 'lucide-react';

// 👇 Props-nya gue lengkapin biar dapet Rank sama Badge juga!
export default function ProfileHeader({ nama, xp, level, rank = "Bronze", badge = 0 }) {
  return (
    <div className="w-full bg-[#11131A] rounded-2xl border border-gray-800 overflow-hidden shadow-xl mb-8">
      
      {/* 1. BANNER PIXEL ART */}
      <div className="w-full h-48 md:h-56 relative">
        <img 
          src="/banner.png" 
          alt="Banner Profile" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* 2. KARTU PROFIL UTAMA (Bawah Banner) */}
      <div className="px-6 md:px-10 pb-8 pt-4 md:pt-6 flex flex-col lg:flex-row justify-between items-start">
        
        {/* BAGIAN KIRI: Avatar & Identitas */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 relative z-10 w-full lg:w-auto">
          
          <div className="w-32 h-16 shrink-0 relative mx-auto md:mx-0">
            <div className="w-32 h-32 rounded-full overflow-hidden border-[6px] border-[#11131A] bg-gray-800 absolute bottom-0 left-0 shadow-lg">
              {/* 👇 FOTO RANDOM SESUAI NAMA LU */}
              <img 
                src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${nama || 'Pahlawan'}`} 
                alt="Avatar" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="text-center md:text-left pt-2 md:pt-0">
            {/* 👇 NAMA BERUBAH JADI DATA DARI DATABASE */}
            <h2 className="text-3xl font-bold text-white mb-0.5 tracking-wide">
              {nama || "Pahlawan Tanpa Nama"}
            </h2>
            <p className="text-white font-semibold text-lg mb-3 flex items-center justify-center md:justify-start gap-1.5">
              Level <span className="font-pixel text-[#A855F7] tracking-wider ml-2 text-xl mt-1">{level || 1}</span>
            </p>
            
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="text-sm text-gray-400 font-semibold">Rating:</span>
              <div className="flex text-[#F59E0B]">
                <Star size={16} fill="currentColor" strokeWidth={0} />
                <Star size={16} fill="currentColor" strokeWidth={0} />
                <Star size={16} fill="currentColor" strokeWidth={0} />
                <Star size={16} fill="currentColor" strokeWidth={0} />
                <Star size={16} fill="currentColor" strokeWidth={0} />
              </div>
              <span className="text-sm font-bold text-white ml-1">(4.9)</span>
            </div>
          </div>
        </div>

        {/* BAGIAN KANAN: Stats & Tombol (Grid 2x2 ala Figma) */}
        <div className="mt-8 lg:mt-0 flex w-full lg:w-auto justify-center lg:justify-end">
          <div className="grid grid-cols-2 gap-x-8 md:gap-x-12 gap-y-6">
            
            {/* Stat: EXP */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center relative">
                <Hexagon size={48} fill="#1E3A8A" className="text-blue-500 absolute" strokeWidth={1} />
                <span className="font-pixel text-sm relative z-10 text-white drop-shadow-md">EXP</span>
              </div>
              <div>
                {/* 👇 XP JUGA JADI DATA ASLI DARI DATABASE */}
                <p className="text-2xl font-bold text-white leading-none">{xp || 0}</p>
                <p className="text-xs text-gray-400 font-semibold mt-1">Total XP</p>
              </div>
            </div>

            {/* Stat: Rank */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center text-[#D97706]">
                <Shield size={42} fill="#78350F" strokeWidth={1.5} />
              </div>
              <div>
                {/* 👇 RANK DINAMIS */}
                <p className="text-2xl font-bold text-white leading-none">{rank}</p>
                <p className="text-xs text-gray-400 font-semibold mt-1">Rank</p>
              </div>
            </div>

            {/* Stat: Badge */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center text-[#F59E0B]">
                <Award size={40} fill="#B45309" strokeWidth={1.5} />
              </div>
              <div>
                {/* 👇 JUMLAH BADGE DINAMIS */}
                <p className="text-2xl font-bold text-white leading-none">{badge}</p>
                <p className="text-xs text-gray-400 font-semibold mt-1">Badge</p>
              </div>
            </div>

            {/* Tombol Cetak CV */}
            <div className="flex items-center justify-start mt-2 md:mt-0">
               <button className="flex items-center justify-center gap-2 border border-gray-600 hover:border-[#F59E0B] text-gray-300 hover:text-[#F59E0B] font-semibold text-sm py-2 px-5 rounded-lg transition-colors bg-transparent w-full md:w-auto h-max">
                  <Download size={16} /> Cetak CV
                </button>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}