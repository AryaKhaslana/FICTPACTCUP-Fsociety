import React from 'react';

// 🔥 KITA TERIMA SUAPAN DATA DARI page.jsx LEWAT PROPS userData 🔥
export default function ProfileClient({ userData }) {
  
  // 1. TARIK DATA DARI DATABASE
  const namaKlien = userData?.username || "UMKM Indonesia Nusantara";
  const avatarKlien = userData?.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${namaKlien}&backgroundColor=1A1F32`;
  
  // 🔥 2. LOGIKA LEVELING (Biar Gambar dan Teks Otomatis Ganti) 🔥
  const currentXp = userData?.xp || 8000; 

  const getRankInfo = (xp) => {
    // Kalo XP di bawah 3000 -> Bronze
    if (xp < 3000) return { name: 'Bronze', textColor: 'text-orange-400', imgSrc: '/rank-icon.png' };
    // Kalo XP 3000 sampe 5999 -> Silver
    if (xp < 6000) return { name: 'Silver', textColor: 'text-gray-300', imgSrc: '/silver-badge.png' };
    // Kalo XP 6000 sampe 9999 -> Gold
    if (xp < 10000) return { name: 'Gold', textColor: 'text-yellow-400', imgSrc: '/gold-badge.png' };
    // Kalo XP 10000+ -> Diamond/Platinum
    return { name: 'Diamond', textColor: 'text-cyan-400', imgSrc: 'https://cdn-icons-png.flaticon.com/512/1783/1783073.png' };
  };

  const rank = getRankInfo(currentXp);

  return (
    <div className="bg-[#1A1F32] rounded-2xl overflow-hidden border border-gray-700/50 shadow-2xl">
      
      {/* 🔥 1. COVER IMAGE 🔥 */}
      <div className="h-32 md:h-48 w-full relative">
        <img 
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1000" 
          alt="Cover UMKM" 
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F32] to-transparent"></div>
      </div>

      {/* 🔥 2. BAGIAN BAWAH (Avatar & Info) 🔥 */}
      <div className="px-6 pb-6 relative">
        
        <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-6 -mt-16 md:-mt-20">
          
          {/* AVATAR */}
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-[#1A1F32] bg-[#0A0D1A] z-10 overflow-hidden flex-shrink-0 shadow-lg relative mx-auto md:mx-0">
            <img 
              src={avatarKlien} 
              alt={namaKlien} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* INFO TEXT */}
          <div className="flex-1 text-center md:text-left mb-2 md:mb-4 pt-2 md:pt-0">
            <h2 className="text-2xl md:text-3xl font-bold text-white drop-shadow-md">{namaKlien}</h2>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-3">
              <div className="flex items-center gap-1 bg-yellow-500/10 px-3 py-1.5 rounded-full border border-yellow-500/20 shadow-inner">
                <span>👑</span>
                <span className="text-yellow-400 font-semibold text-xs md:text-sm">Klien Elite</span>
              </div>
              <div className="flex items-center gap-1 bg-gray-800/60 px-3 py-1.5 rounded-full border border-gray-700/50">
                <span className="text-yellow-400 text-xs md:text-sm tracking-widest">⭐⭐⭐⭐⭐</span>
                <span className="text-gray-300 text-xs md:text-sm font-bold ml-1">(5.0)</span>
              </div>
            </div>
          </div>

          {/* BADGES / STATS */}
          <div className="flex gap-3 md:gap-4 justify-center md:justify-end mb-2 md:mb-4 w-full md:w-auto">
            
            {/* EXP Badge (Tetep pake SVG bawaan lu) */}
            <div className="flex items-center gap-3 bg-[#111424]/80 p-3 rounded-xl border border-gray-700/50 hover:bg-[#111424] transition duration-300 shadow-md">
              <div className="w-10 h-10 relative flex items-center justify-center transform transition-transform hover:scale-110">
                <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full drop-shadow-md">
                  <polygon points="50 5, 95 25, 95 75, 50 95, 5 75, 5 25" fill="#1D4ED8" stroke="#EAB308" strokeWidth="6" />
                </svg>
                <span className="relative z-10 text-white font-bold text-[9px] tracking-wider">EXP</span>
              </div>
              <div className="flex flex-col items-start pr-2">
                <div className="font-bold text-sm text-white">{currentXp}</div>
                <div className="text-[10px] text-gray-400 font-medium whitespace-nowrap">XP Diberikan</div>
              </div>
            </div>

            {/* 🔥 RANK BADGE (UDAH DIGANTI JADI IMG!) 🔥 */}
            <div className="flex items-center gap-3 bg-[#111424]/80 p-3 rounded-xl border border-gray-700/50 hover:bg-[#111424] transition duration-300 shadow-md">
              <div className="w-10 h-10 relative flex items-center justify-center transform transition-transform hover:scale-110">
                {/* SVG dibuang, diganti IMG yang narik dari variabel rank.imgSrc */}
                <img 
                  src={rank.imgSrc} 
                  alt={rank.name} 
                  className="w-full h-full object-contain drop-shadow-md"
                />
              </div>
              <div className="flex flex-col items-start pr-2">
                <div className={`font-bold text-sm drop-shadow-sm ${rank.textColor}`}>{rank.name}</div>
                <div className="text-[10px] text-gray-400 font-medium whitespace-nowrap">Rank Umkm</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}