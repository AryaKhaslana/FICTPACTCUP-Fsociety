import React from 'react';
import Link from 'next/link';

export default function ProfileCard({ nama, xp, level, avatarUrl }) {

  const finalAvatar = avatarUrl || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${nama}&backgroundColor=transparent`;

  // 🔥 LOGIKA DEWA: RANKING DINAMIS BERDASARKAN XP 🔥
  let rankName = "Bronze";
  let rankIcon = "/rank-icon.png";
  let rankGlow = "drop-shadow-[0_0_10px_rgba(205,127,50,0.8)]"; // Efek cahaya perunggu

  if (xp >= 6000) {
    rankName = "Gold";
    rankIcon = "/gold-badge.png";
    rankGlow = "drop-shadow-[0_0_10px_rgba(255,215,0,0.8)]"; // Efek cahaya emas menyala
  } else if (xp >= 4000) {
    rankName = "Silver";
    rankIcon = "/silver-badge.png";
    rankGlow = "drop-shadow-[0_0_10px_rgba(192,192,192,0.8)]"; // Efek cahaya perak elegan
  }

  return (
    // Wrapper Utama Kartu (GAK DIUBAH)
    <div className="bg-[#060916] rounded-3xl p-6 border-1 border-gray-400 w-full flex flex-col gap-6 shadow-lg">
      
      {/* BAGIAN ATAS: Foto & Info User (GAK DIUBAH) */}
      <div className="flex items-center gap-4">
        {/* Border gradient tipis ala gaming buat avatar */}
        <div className="w-16 h-16 rounded-xl overflow-hidden border border-gray-700 bg-gray-800 shrink-0">
         <img src={finalAvatar} alt={nama} className="w-full h-full object-cover" />
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
          <div className="drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]">
            <img src="/xp-icon.png" alt="XP" className="w-7 h-7 object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold text-sm">{ xp }</span>
            <span className="text-[11px] text-gray-500 font-medium">Total XP</span>
          </div>
        </div>

        {/* 🔥 Stat 2: Rank (UDAH DINAMIS BROSKIE!) 🔥 */}
        <div className="flex items-center gap-3">
          <div className={rankGlow}>
            <img src={rankIcon} alt="Rank" className="w-7 h-7 object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold text-sm">{rankName}</span>
            <span className="text-[11px] text-gray-500 font-medium">Rank</span>
          </div>
        </div>

        {/* Stat 3: Badge */}
        <div className="flex items-center gap-3">
          <div className="drop-shadow-[0_0_10px_rgba(234,179,8,0.8)]">
            <img src="/badge-icon.png" alt="Badge" className="w-7 h-7 object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold text-sm">1</span>
            <span className="text-[11px] text-gray-500 font-medium">Badge</span>
          </div>
        </div>

        {/* Stat 4: Day Streak */}
        <div className="flex items-center gap-3">
          <div className="drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]">
            <img src="/streak-icon.png" alt="Streak" className="w-7 h-7 object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold text-sm">?</span>
            <span className="text-[11px] text-gray-500 font-medium">Day Streak</span>
          </div>
        </div>

      </div>

      {/* BAGIAN BAWAH: Tombol (GAK DIUBAH) */}
      <Link href="/profile" className="w-full mt-2">
        <button className="w-full py-3 rounded-xl border-1 border-gray-400 text-sm font-bold text-gray-300 transition-all shadow-[0_4px_0_0_#A8A8A8] hover:shadow-[0_2px_0_0_#A8A8A8] hover:translate-y-1 active:translate-y-2 active:shadow-none">
          Lihat Profil
        </button>
      </Link>

    </div>
  );
}