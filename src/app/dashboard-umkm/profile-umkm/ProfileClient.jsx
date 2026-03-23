"use client";

import React from 'react';
import Link from 'next/link'; // 👈 Tambahin ini buat pindah halaman

// 🔥 KITA TERIMA SUAPAN DATA DARI page.jsx LEWAT PROPS userData 🔥
export default function ProfileClient({ userData }) {
  
  // 1. TARIK DATA DARI DATABASE
  const namaKlien = userData?.username || "UMKM Indonesia Nusantara";
  const avatarKlien = userData?.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${namaKlien}&backgroundColor=1A1F32`;
  
  // 🔥 2. TARIK KATEGORI BISNIS (Pastikan select 'kategoriBisnis' di page.jsx Prisma lu) 🔥
  const kategoriKlien = userData?.kategoriBisnis || "Kategori Belum Diatur";
  
  // 3. Tarik Cover URL (kalo lu udah nambahin di DB nanti, sementari pakai placeholder)
  const coverUrl = userData?.coverUrl || "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1000";

  return (
    <div className="bg-[#1A1F32] rounded-2xl overflow-hidden border border-gray-700/50 shadow-2xl">
      
      {/* 🔥 1. COVER IMAGE 🔥 */}
      <div className="h-32 md:h-48 w-full relative">
        <img 
          src={coverUrl} 
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

          {/* INFO TEXT (NAMA & KATEGORI) */}
          <div className="flex-1 text-center md:text-left mb-4 pt-2 md:pt-0 pb-2 md:pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white drop-shadow-md">{namaKlien}</h2>
              
              {/* KATEGORI UMKM */}
              <div className="inline-flex flex-wrap items-center justify-center md:justify-start mt-2">
                <span className="bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-[#F59E0B] px-3 py-1 rounded-full text-xs md:text-sm font-semibold tracking-wide shadow-sm">
                  {kategoriKlien}
                </span>
              </div>
            </div>

            {/* 🔥 TOMBOL EDIT PROFILE DI KANAN 🔥 */}
            <Link 
              href="/settings" // 👈 Sesuaikan URL halaman setting lu
              className="md:ml-auto bg-[#F59E0B] hover:bg-[#D97706] text-black font-bold py-2 px-6 rounded-xl transition-all shadow-[0_4px_0_rgb(180,83,9)] hover:shadow-[0_2px_0_rgb(180,83,9)] hover:translate-y-[2px] active:translate-y-[4px] active:shadow-none flex items-center justify-center gap-2"
            >
             Edit Profile
            </Link>

          </div>

        </div>
      </div>
    </div>
  );
}