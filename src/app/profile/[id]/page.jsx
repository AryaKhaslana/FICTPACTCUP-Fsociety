export const dynamic = 'force-dynamic';

import React from 'react';
import { notFound } from 'next/navigation';
import prisma from '../../../lib/prisma'; // 👈 Cek path prisma lu (bisa jadi ../../../lib/prisma)
import ProfileHeader from '../ProfileHeader'; // 👈 Cek path (mundur 1 folder ke /profile)
import AchievementBox from '../AchievementBox'; // 👈 Cek path
import PortfolioGallery from '../PortfolioGallery'; // 👈 Cek path
import BackButton from './BackButton';
import Link from 'next/link';

// 👇 Perhatiin tulisan { params } ini. Ini buat nangkep ID dari URL!
export default async function PublicProfilePage({ params }) {
  
  // 🔥 INI KUNCINYA BROS! Kita harus "await" params-nya dulu karena aturan baru Next.js!
  const resolvedParams = await params; 
  const id = resolvedParams.id; 

  // Jaga-jaga kalau ID-nya bukan angka (misal user iseng ngetik /profile/abc)
  if (!id || isNaN(Number(id))) {
    return notFound();
  }

  // 1. CARI DATA "MUSUH" BERDASARKAN ID DARI URL
  const targetUser = await prisma.user.findUnique({
    where: { id: Number(id) }, 
    include: {
      studentProgress: true 
    }
  });

  // Kalo ada yg iseng masukin ID ngasal (misal: /profile/999) dan user gak ada, langsung lempar error 404
  if (!targetUser) {
    return notFound();
  }

  // 2. SETTING DATA MUSUH (Sama persis kayak kodingan lu)
  const namaSiswa = targetUser.username || "Pahlawan Tanpa Nama";
  const avatarSiswa = targetUser.avatarUrl || null; 
  
  // 3. JURUS SAKTI: HITUNG TOTAL XP & GLOBAL LEVEL
  let xpSiswa = 0;
  let levelSiswa = 1;

  if (targetUser?.studentProgress && targetUser.studentProgress.length > 0) {
    xpSiswa = targetUser.studentProgress.reduce((total, progress) => total + progress.currentXp, 0);
    levelSiswa = Math.floor(xpSiswa / 1000) + 1;
  }

  let rankSiswa = "Bronze";
  if (xpSiswa >= 5000) rankSiswa = "Silver";
  if (xpSiswa >= 10000) rankSiswa = "Gold";
  if (xpSiswa >= 50000) rankSiswa = "Mythic";

  return (
    <div className="min-h-screen bg-[#000010] text-white font-poppins ">
      
      {/* (Opsional) Navbar sengaja diilangin biar juri fokus ke profilnya,
          atau lu bisa import NavbarUMKM di sini kalo mau */}
      
      <main className="max-w-6xl mx-auto px-4 md:px-6 relative z-10 pt-8">
        
        {/* Tombol Back biar UMKM gampang balik ke halaman Eksplor */}
       <BackButton />

        {/* TINGGAL PANGGIL ULANG KOMPONEN LU! */}
        <ProfileHeader 
          nama={namaSiswa} 
          avatarUrl={avatarSiswa} 
          xp={xpSiswa} 
          level={levelSiswa}
          rank={rankSiswa} 
          badge={1} 
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <AchievementBox />
          <PortfolioGallery />
        </div>

      </main>
    </div>
  );
}