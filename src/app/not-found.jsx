'use client';


import React from 'react';
import Link from 'next/link';

// Komponen Navbar biasa (kalau mau ditampilin, kalau ga mau hapus aja line ini)
// import Navbar from './components/Navbar'; 

export default function NotFound() {
  return (
    // Wrapper Full Screen Dark
    <div className="min-h-screen bg-[#000010] text-white font-poppins flex flex-col items-center justify-center p-6 text-center">
      
      {/* Kalau mau pake Navbar di 404, uncomment di bawah */}
      {/* <div className="absolute top-0 left-0 w-full"><Navbar isAuthenticated={false} /></div> */}

      {/* KONTEN UTAMA ALA MODAL BOX FIGMA */}
      <div className="bg-[#1A233A] border-4 border-[#F59E0B] rounded-3xl p-10 md:p-12 max-w-2xl relative shadow-[0_0_50px_rgba(245,158,11,0.2)] flex flex-col items-center animate-in fade-in zoom-in duration-300">
        
        {/* Row Gambar (Karakter & Naga Pixel) */}
        <div className="flex items-center gap-10 md:gap-16 mb-10">
          {/* Karakter Bingung (Pastiin aset gambarnya ada di public/ ya broskie!) */}
          <div className="w-28 h-28 md:w-36 md:h-36 drop-shadow-lg">
            <img 
              src="/pixel-char-lost.png" // Ganti ama nama file karakter bingung lu
              alt="Petualang Bingung" 
              className="w-full h-full object-contain"
            />
          </div>
          {/* Naga XPact */}
          <div className="w-28 h-28 md:w-36 md:h-36 drop-shadow-lg">
            <img 
              src="/dragon.png" // Pake logo naga yang udah ada
              alt="Naga XPact" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Teks "WADUH!" Font Pixel */}
        <h1 className="font-pixel text-6xl md:text-8xl text-white tracking-widest mb-5 drop-shadow-lg animate-pulse">
          WADUH!
        </h1>
        
        {/* Deskripsi Teks Pixel */}
        <p className="font-pixel text-lg md:text-xl text-gray-300 leading-relaxed max-w-md drop-shadow-md">
          Sepertinya area ini belum terjamah oleh pahlawan mana pun...
        </p>

        {/* TOMBOL-TOMBOL RPG STYLE */}
        <div className="flex flex-col sm:flex-row gap-6 mt-14 w-full justify-center">
          
          {/* Tombol Kembali (Biru ala Figma) */}
          <Link href="/dashboard-siswa" className="w-full sm:w-auto">
            <button className="w-full bg-[#3B82F6] hover:bg-blue-600 text-white font-pixel text-xs md:text-sm py-4 px-8 rounded-xl transition-all border-b-4 border-r-4 border-black active:translate-y-1 active:translate-x-1 active:border-0 text-center tracking-wider">
              KEMBALI KE DASHBOARD
            </button>
          </Link>
          
          {/* Tombol Lapor Bug (Merah ala Figma) */}
          <button 
            onClick={() => alert('Siuuu! Terima kasih laporannya pahlawan! Bug bakal segera dibasmi! ⚔️')}
            className="w-full sm:w-auto bg-[#E11D48] hover:bg-[#BE123C] text-white font-pixel text-xs md:text-sm py-4 px-8 rounded-xl transition-all border-b-4 border-r-4 border-black active:translate-y-1 active:translate-x-1 active:border-0 tracking-wider"
          >
            LAPORKAN BUG
          </button>
        </div>

      </div>
    </div>
  );
}