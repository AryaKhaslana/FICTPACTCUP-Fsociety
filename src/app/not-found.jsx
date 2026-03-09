import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden">
      
      {/* 1. BACKGROUND LANGIT MALAM (Sama kayak halaman login) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/login-bg.png" // 👈 Pastiin nama file gambar awan malamnya sesuai di folder public lu!
          alt="Dimensi Lain"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Overlay gelap dikit biar teks putihnya makin pop-out! */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* 2. KONTEN UTAMA */}
      <div className="relative z-10 flex flex-col items-center text-center animate-in slide-in-from-bottom-5 fade-in duration-500">
        
        {/* Teks 404 Gede Banget */}
        <h1 className="text-[100px] md:text-[140px] font-black text-white leading-none drop-shadow-[0_0_30px_rgba(255,255,255,0.4)] mb-2">
          404
        </h1>

        {/* Gambar Koin XPact Jatuh + Efek Animasi Melayang */}
        <div className="w-24 h-24 md:w-45 md:h-45 mb-4 animate-bounce hover:scale-110 transition-transform">
          {/* 👇 Ganti "coin.png" sama nama file koin pixel kuning lu di folder public! 👇 */}
          <img 
            src="/coin.png" 
            alt="Koin Nyasar" 
            className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(245,158,11,0.8)]" 
          />
        </div>

        {/* Teks Nyasar (Pake font pixel kebanggaan lu) */}
        <h2 className="text-xl md:text-2xl lg:text-3xl font-pixel text-white tracking-widest drop-shadow-md mb-10">
          WADUH KAPTEN! NYASAR KE DIMENSI LAIN!
        </h2>

        {/* Tombol Kembali ke Markas */}
        <Link 
          href="/dashboard-siswa" 
          className="bg-[#F59E0B] hover:bg-[#D97706] text-[#000010] font-black text-base md:text-lg px-8 py-3.5 rounded-full transition-transform hover:scale-105 shadow-[0_0_30px_rgba(245,158,11,0.4)]"
        >
          Kembali ke Markas
        </Link>

      </div>
    </main>
  );
}