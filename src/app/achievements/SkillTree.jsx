import React from 'react';
import { Lock } from 'lucide-react';

// Komponen mini buat tiap kotak skill (Node)
const SkillNode = ({ title, isLocked, iconText, customIcon }) => {
  return (
    <div className="flex flex-col items-center gap-2 group cursor-pointer z-10">
      <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center transition-all duration-300
        ${isLocked 
          ? 'bg-[#1a1d24] border-2 border-gray-600/50 opacity-70' 
          : 'bg-[#11131A] border-2 border-[#F59E0B] shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:scale-110 hover:border-white'
        }`}
      >
        {isLocked ? (
          <Lock className="text-gray-500" size={24} />
        ) : customIcon ? (
            customIcon // Buat kalau lu mau masukin tag <img> logo beneran
        ) : (
          <span className="font-bold text-white text-xs md:text-sm text-center px-1">{iconText}</span>
        )}
      </div>
      
      {/* Label di bawah/atas ikon (Opsional kalau lu mau kasih teks) */}
      {title && (
        <span className="text-[10px] md:text-xs font-semibold text-gray-300 bg-[#000010]/90 px-2 py-1 rounded-md mt-1 border border-gray-800">
          {title}
        </span>
      )}
    </div>
  );
};

export default function SkillTree() {
  return (
    <div className="w-full relative min-h-[900px] flex flex-col items-center rounded-3xl overflow-hidden border border-gray-800 bg-[#060916]">
      
      {/* 🌳 BACKGROUND POHON + GARIS (Wajib di-export bareng dari Figma!) */}
      <img 
        src="/treebg.png" 
        alt="Skill Tree Background" 
        className="absolute inset-0 w-full h-full object-cover opacity-90"
      />

      {/* OVERLAY GELAP DI BAWAH BIAR TEXT KELIATAN */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#000010] via-[#000010]/30 to-transparent pointer-events-none"></div>

      {/* KONTEN UTAMA DITUMPUK DI ATAS POHON */}
      <div className="relative z-10 w-full h-full flex flex-col items-center pt-8 pb-12 px-4">
        
        {/* 1. DIAMOND ATAS (Titik Awal) */}
        <div className="mb-10 relative flex justify-center items-center">
          <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-[#F59E0B] to-[#B45309] border-4 border-[#11131A] shadow-[0_0_40px_rgba(245,158,11,0.6)] rotate-45 flex items-center justify-center overflow-hidden rounded-md">
             {/* Tekstur/Pattern di dalem diamond */}
             <div className="-rotate-45 w-full h-full opacity-40 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
          </div>
        </div>

        {/* 2. LABEL KATEGORI (Coding, Design, Editing) */}
        <div className="grid grid-cols-3 w-full max-w-3xl gap-4 md:gap-12 mb-10">
           <div className="flex justify-center">
              <span className="bg-[#D97706] text-[#000010] font-bold px-4 md:px-8 py-1.5 md:py-2 rounded-xl shadow-lg text-xs md:text-sm">Coding</span>
           </div>
           <div className="flex justify-center">
              <span className="bg-[#D97706] text-[#000010] font-bold px-4 md:px-8 py-1.5 md:py-2 rounded-xl shadow-lg text-xs md:text-sm">Design</span>
           </div>
           <div className="flex justify-center">
              <span className="bg-[#D97706] text-[#000010] font-bold px-4 md:px-8 py-1.5 md:py-2 rounded-xl shadow-lg text-xs md:text-sm">Editing</span>
           </div>
        </div>

        {/* 3. NODE CABANG (Berjejer 3 Kolom ke Bawah) */}
       {/* 3. NODE CABANG (Berjejer 3 Kolom ke Bawah) */}
        <div className="grid grid-cols-3 gap-4 md:gap-12 w-full max-w-3xl flex-1">
          
          {/* KOLOM KIRI: CODING */}
          <div className="flex flex-col items-center gap-10 md:gap-16">
            <SkillNode title="Dasar HTML/CSS" iconText="HTML5" />
            <SkillNode title="JavaScript" iconText="JS" />
            <SkillNode title="Next.js Mastery" iconText="Next.js" />
          </div>

          {/* KOLOM TENGAH: DESIGN */}
          <div className="flex flex-col items-center gap-10 md:gap-16">
            <SkillNode title="Dasar UI/UX" iconText="Dasar" />
            <SkillNode title="UI/UX Master" iconText="Figma" />
            <SkillNode title="3D Design" iconText="3D" />
          </div>

          {/* KOLOM KANAN: EDITING */}
          <div className="flex flex-col items-center gap-10 md:gap-16">
            <SkillNode title="Dasar edit" iconText="Dasar" />
            <SkillNode title="Video FX" iconText="CC/AM" />
            <SkillNode title="3D editing" isLocked={true} />
          </div>

        </div>

        {/* 4. GEMBOK DI AKAR POHON */}
        <div className="mt-12 mb-8 flex justify-center w-full">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-[#1a1d24]/90 rounded-2xl border-2 border-gray-600 flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.8)] backdrop-blur-sm">
            <Lock className="text-[#F59E0B]" size={32} />
          </div>
        </div>

        {/* 5. TOMBOL CARI MISI */}
        <button className="bg-[#F59E0B] hover:bg-[#D97706] text-[#000010] font-black text-lg md:text-xl px-12 py-3 md:py-4 rounded-2xl shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all hover:scale-105 active:scale-95 border border-[#F59E0B]">
          CARI MISI
        </button>

      </div>
    </div>
  );
}