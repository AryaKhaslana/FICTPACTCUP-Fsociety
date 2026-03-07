import React from 'react';
import { Crown } from 'lucide-react'; // Kita pake icon mahkota bawaan dulu!
import AuthNav from '../components/Navbar/AuthNav'; // Pastiin path Navbar lu bener ya

export const metadata = {
  title: 'Leaderboard | XPact',
};

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-[#000010] text-white font-poppins pb-24">
      <AuthNav />

      <main className="max-w-5xl mx-auto px-4 md:px-6 pt-12 flex flex-col items-center">
        
        {/* 1. JUDUL HALL OF FAME */}
        {/* Kalau lu punya font pixel, ganti font-black jadi font-pixel ya */}
        <h1 className="text-4xl md:text-5xl font-black text-white mb-10 tracking-widest uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
          Hall of fame
        </h1>

        {/* 2. TOMBOL FILTER (Minggu ini, Bulan ini, Sepanjang masa) */}
        <div className="flex flex-wrap justify-center gap-4 mb-20 md:mb-28">
          <button className="border-2 border-[#F59E0B] text-[#F59E0B] px-6 py-2 rounded-xl font-bold hover:bg-[#F59E0B]/10 transition-colors">
            Minggu ini
          </button>
          <button className="border-2 border-[#F59E0B] text-[#F59E0B] px-6 py-2 rounded-xl font-bold hover:bg-[#F59E0B]/10 transition-colors">
            Bulan ini
          </button>
          <button className="bg-[#F59E0B] text-[#000010] px-6 py-2 rounded-xl font-black hover:bg-[#D97706] shadow-[0_0_20px_rgba(245,158,11,0.5)] transition-transform hover:scale-105">
            Sepanjang masa
          </button>
        </div>

        {/* 3. PODIUM JUARA (Pake items-end biar rata bawah) */}
        <div className="flex justify-center items-end gap-2 md:gap-6 w-full max-w-3xl px-2">
          
          {/* ================= JUARA 2 (KIRI) ================= */}
          <div className="flex flex-col items-center w-1/3">
            {/* Foto Avatar (Ditarik ke bawah pake -mb) */}
            <div className="relative z-10 -mb-10 md:-mb-14 transition-transform hover:-translate-y-2">
              <div className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-[#B45309] bg-gray-800 shadow-[0_0_20px_rgba(217,119,6,0.4)]">
                {/* Ganti pake foto beneran nanti */}
                <img src="https://api.dicebear.com/7.x/adventurer/svg?seed=Andre" alt="Juara 2" className="w-full h-full object-cover" />
              </div>
            </div>
            {/* Kotak Podium */}
            <div className="w-full bg-gradient-to-t from-[#B45309] to-[#D97706] h-48 md:h-60 rounded-t-2xl pt-12 md:pt-16 pb-4 px-1 flex flex-col items-center justify-start text-center shadow-2xl relative overflow-hidden border-t-2 border-[#F59E0B]">
              <h2 className="text-2xl md:text-3xl font-black text-[#000010] drop-shadow-sm mb-1">#2</h2>
              <p className="font-bold text-xs md:text-sm text-white line-clamp-1">Andre ryu</p>
              <p className="text-[10px] md:text-xs text-orange-200 font-semibold mb-3">Web Developer</p>
              <p className="font-bold text-xs md:text-sm text-white drop-shadow-md">+ 9000 XP</p>
            </div>
          </div>

          {/* ================= JUARA 1 (TENGAH) ================= */}
          <div className="flex flex-col items-center w-1/3 z-20">
            {/* Foto Avatar & Mahkota */}
            <div className="relative z-10 -mb-12 md:-mb-16 flex flex-col items-center transition-transform hover:-translate-y-2">
              {/* MAHKOTA: Lu bisa ganti pake tag <img src="/mahkota-pixel.png" /> kalau lu export mahkotanya dari figma */}
              <Crown size={48} className="text-yellow-400 absolute -top-10 md:-top-14 drop-shadow-[0_0_15px_rgba(250,204,21,0.8)]" fill="currentColor" strokeWidth={1} />
              
              <div className="w-24 h-24 md:w-36 md:h-36 rounded-full overflow-hidden border-[6px] border-yellow-400 bg-gray-800 shadow-[0_0_30px_rgba(250,204,21,0.6)]">
                {/* Foto Sang Raja */}
                <img src="https://api.dicebear.com/7.x/adventurer/svg?seed=Fatih" alt="Juara 1" className="w-full h-full object-cover" />
              </div>
            </div>
            {/* Kotak Podium */}
            <div className="w-full bg-gradient-to-t from-[#D97706] to-[#F59E0B] h-64 md:h-80 rounded-t-2xl pt-16 md:pt-20 pb-4 px-1 flex flex-col items-center justify-start text-center shadow-[0_0_40px_rgba(245,158,11,0.3)] relative overflow-hidden border-t-4 border-yellow-400">
              <h2 className="text-3xl md:text-4xl font-black text-[#000010] drop-shadow-sm mb-1">#1</h2>
              <p className="font-black text-sm md:text-base text-[#000010] line-clamp-1">Fatih Harbinger</p>
              <p className="text-[10px] md:text-xs text-[#000010]/80 font-bold mb-3">Hacking</p>
              <p className="font-black text-sm md:text-base text-white drop-shadow-md">+ 12000 XP</p>
            </div>
          </div>

          {/* ================= JUARA 3 (KANAN) ================= */}
          <div className="flex flex-col items-center w-1/3">
            {/* Foto Avatar */}
            <div className="relative z-10 -mb-10 md:-mb-14 transition-transform hover:-translate-y-2">
              <div className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-[#92400E] bg-gray-800 shadow-[0_0_20px_rgba(146,64,14,0.5)]">
                <img src="https://api.dicebear.com/7.x/adventurer/svg?seed=Ryu" alt="Juara 3" className="w-full h-full object-cover" />
              </div>
            </div>
            {/* Kotak Podium */}
            <div className="w-full bg-gradient-to-t from-[#78350F] to-[#92400E] h-40 md:h-52 rounded-t-2xl pt-12 md:pt-16 pb-4 px-1 flex flex-col items-center justify-start text-center shadow-xl relative overflow-hidden border-t-2 border-[#D97706]">
              <h2 className="text-2xl md:text-3xl font-black text-white drop-shadow-md mb-1">#3</h2>
              <p className="font-bold text-xs md:text-sm text-white line-clamp-1">Andre ryu</p>
              <p className="text-[10px] md:text-xs text-orange-200 font-semibold mb-3">Logo Designer</p>
              <p className="font-bold text-xs md:text-sm text-yellow-500 drop-shadow-md">+ 7000 XP</p>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}