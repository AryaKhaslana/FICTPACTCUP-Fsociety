import React from 'react';

// 🔥 KITA KASIH PROPS userData BIAR BISA NERIMA DATA DARI BAPAKNYA 🔥
export default function ProfilClient({ userData }) {
  
  // 1. SIAPIN VARIABEL DINAMISNYA
  const namaKlien = userData?.username || "Klien UMKM";
  const avatarKlien = userData?.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${namaKlien}&backgroundColor=1A1F32`;
  
  // (Opsional) Kalo lu mau tambahin total XP yang udah dikasih UMKM ini ke depannya
  const totalXpDiberikan = 1990; // Sementara biarin gini dulu

  return (
    <div className="bg-[#1A1F32] rounded-2xl overflow-hidden border border-gray-700 text-white shadow-xl">
      
      {/* Cover Image (Biarin pake Unsplash biar estetik) */}
      <div className="relative h-40 md:h-48 w-full bg-gray-800">
        <img 
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1000" 
          alt="Cover UMKM" 
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute top-4 left-6">
          <h1 className="text-3xl font-bold text-white drop-shadow-md">Profil</h1>
        </div>
        {/* Gradient tipis di bawah cover biar nyatu */}
        <div className="absolute bottom-0 w-full h-12 bg-gradient-to-t from-[#1A1F32] to-transparent"></div>
      </div>

      {/* Profil Info */}
      <div className="px-6 pb-6 pt-0 flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 relative">
        
        {/* 🔥 Avatar (Udah disetting ulang biar posisinya presisi numpuk cover!) 🔥 */}
        <div className="w-28 h-28 rounded-full border-4 border-[#1A1F32] bg-[#0A0D1A] -mt-14 z-20 overflow-hidden flex-shrink-0 shadow-lg relative">
          <img 
            src={avatarKlien} 
            alt={namaKlien} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info Text */}
        <div className="flex-1 text-center md:text-left mt-2 md:mt-3">
          {/* 🔥 NAMA DARI DATABASE 🔥 */}
          <h2 className="text-2xl font-bold text-white">{namaKlien}</h2>
          
          <div className="flex items-center justify-center md:justify-start gap-2 mt-1">
            <span>👑</span>
            <span className="text-yellow-400 font-semibold text-sm">Klien Elite</span>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-1 mt-3">
            <span className="text-sm text-gray-400">Rating:</span>
            <span className="text-yellow-400 text-sm tracking-widest">⭐⭐⭐⭐⭐</span>
            <span className="text-gray-300 text-sm ml-1 font-bold">(5.0)</span>
          </div>
        </div>

        {/* Badges/Stats */}
        <div className="flex gap-6 md:gap-8 md:mt-4 bg-[#111424]/50 md:bg-transparent p-4 md:p-0 rounded-xl border border-gray-700/50 md:border-0 w-full md:w-auto justify-center mt-4">
          
          {/* EXP Badge */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 relative flex items-center justify-center transform transition-transform hover:scale-110">
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full drop-shadow-md">
                <polygon points="50 5, 95 25, 95 75, 50 95, 5 75, 5 25" fill="#1D4ED8" stroke="#EAB308" strokeWidth="6" />
              </svg>
              <span className="relative z-10 text-white font-bold text-[10px] tracking-wider">EXP</span>
            </div>
            <div className="flex flex-col items-start">
              <div className="font-bold text-sm text-white">{totalXpDiberikan}</div>
              <div className="text-[10px] text-gray-400 font-medium">XP Diberikan</div>
            </div>
          </div>

          {/* Bronze Badge */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 relative flex items-center justify-center transform transition-transform hover:scale-110">
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full drop-shadow-md">
                <path d="M10,10 L90,10 L90,40 C90,80 50,95 50,95 C50,95 10,80 10,40 Z" fill="#92400E" stroke="#78350F" strokeWidth="6" />
              </svg>
              <span className="relative z-10 text-white font-black text-lg drop-shadow-sm">+</span>
            </div>
            <div className="flex flex-col items-start">
              <div className="font-bold text-sm text-orange-400 drop-shadow-sm">Bronze</div>
              <div className="text-[10px] text-gray-400 font-medium">Total Quest</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}