import React from 'react';
import { X, Settings } from 'lucide-react'; 

export default function AchievementModal({ isOpen, onClose, skillName }) {
  if (!isOpen) return null;

  return (
    // 👇 1. KITA KASIH ONCLICK DI BACKGROUND GELAP + Z-INDEX DEWA [100] BIAR NUTUPIN SEMUANYA
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      
      {/* 👇 2. KITA KASIH stopPropagation BIAR PAS KLIK DALEM KOTAK MODAL GA IKUT KETUTUP */}
      <div 
        className="relative w-full max-w-2xl bg-[#111522] mt-20 border-2 border-gray-700 rounded-3xl p-6 md:p-8 shadow-[0_0_50px_rgba(0,0,0,0.8)] animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* 👇 3. TOMBOL X KITA KASIH Z-50 DAN AREA KLIK YANG LEBIH GEDE (p-2) */}
        <button 
          onClick={onClose}
          className="absolute top-4 left-4 md:top-6 md:left-6 z-50 p-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          <X size={28} />
        </button>

        {/* JUDUL SKILL (Gue tambahin mt-2 biar agak turun ngejauh dari tombol X) */}
        <h2 className="text-2xl md:text-3xl font-black text-center text-[#22D3EE] drop-shadow-[0_0_10px_rgba(34,211,238,0.4)] mb-8 mt-2">
          Web Developer
        </h2>

        {/* KOTAK BADGE (3 Kolom) */}
        <div className="bg-[#181C2A] border border-gray-700 rounded-2xl p-6 mb-6">
          <h3 className="text-center text-white font-bold text-sm md:text-base mb-6">
            Achievements Badge
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* BADGE 1: BRONZE */}
            <div className="flex flex-col items-center text-center">
              <p className="text-xs text-gray-300 font-semibold mb-3">Pembangun Kode</p>
              <div className="w-14 h-14 rounded-full bg-[#111522] border-2 border-[#92400E] flex items-center justify-center shadow-[0_0_15px_rgba(146,64,14,0.5)] mb-3">
                <Settings className="text-[#92400E]" size={28} />
              </div>
              <p className="text-[10px] text-gray-400 leading-relaxed px-2">
                Langkah pertama telah diambil. Kamu mulai memahami mantra dasar dunia web!
              </p>
            </div>

            {/* BADGE 2: SILVER */}
            <div className="flex flex-col items-center text-center">
              <p className="text-xs text-gray-300 font-semibold mb-3">Front-end knight</p>
              <div className="w-14 h-14 rounded-full bg-[#111522] border-2 border-gray-400 flex items-center justify-center shadow-[0_0_15px_rgba(156,163,175,0.5)] mb-3">
                <Settings className="text-gray-400" size={28} />
              </div>
              <p className="text-[10px] text-gray-400 leading-relaxed px-2">
                Mata yang tajam dan kode yang rapi. UMKM mulai mengandalkan sihir visualmu.
              </p>
            </div>

            {/* BADGE 3: ELITE (GLOWING BLUE) */}
            <div className="flex flex-col items-center text-center">
              <p className="text-xs text-white font-bold mb-3 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]">Elite Web Architect</p>
              <div className="w-14 h-14 rounded-full bg-[#111522] border-2 border-[#22D3EE] flex items-center justify-center shadow-[0_0_25px_rgba(34,211,238,0.6)] mb-3 relative overflow-hidden">
                <Settings className="text-[#22D3EE]" size={28} />
                <div className="absolute inset-0 bg-[#22D3EE]/20 animate-pulse"></div>
              </div>
              <p className="text-[10px] text-gray-300 font-medium leading-relaxed px-2">
                Arsitek mahakarya digital. Tidak ada bug tampilan yang tidak bisa kamu basmi!
              </p>
            </div>

          </div>
        </div>

        {/* TEKS REQUIREMENTS */}
        <p className="text-xs text-gray-400 mb-2 pl-2">All Requirements Completed</p>

        {/* KOTAK HISTORY */}
        <div className="bg-[#0D111A] border border-gray-700 rounded-xl p-4 md:p-5 mb-8">
          <h4 className="text-white font-bold text-sm mb-3">History</h4>
          <ul className="space-y-2 text-[10px] md:text-xs text-gray-300">
            <li className="flex items-start gap-2">
              <span>🏆</span>
              <p><strong className="text-yellow-600">Bronze unlocked</strong> • Menyelesaikan 1 misi HTML/CSS <span className="text-gray-500 ml-1">• Unlocked on Feb 27, 2026</span></p>
            </li>
            <li className="flex items-start gap-2">
              <span>🥈</span>
              <p><strong className="text-gray-300">Silver unlocked</strong> • Menyelesaikan 19 misi HTML/CSS <span className="text-gray-500 ml-1">• Unlocked on Feb 27, 2027</span></p>
            </li>
            <li className="flex items-start gap-2">
              <span>🥇</span>
              <p><strong className="text-yellow-400">Gold unlocked</strong> • Menyelesaikan 32 misi HTML/CSS <span className="text-gray-500 ml-1">• Unlocked on Feb 27, 2030</span></p>
            </li>
          </ul>
        </div>

        {/* TOMBOL CARI MISI */}
        <div className="flex justify-center">
          <button className="bg-[#F59E0B] hover:bg-[#D97706] text-[#000010] font-black text-sm md:text-base px-8 py-3 rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-transform hover:scale-105">
            CARI MISI HTML/CSS
          </button>
        </div>

      </div>
    </div>
  );
}