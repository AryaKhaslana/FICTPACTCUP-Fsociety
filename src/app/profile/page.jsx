export const dynamic = 'force-dynamic';

import React from 'react';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose'; 
import { redirect } from 'next/navigation';
import prisma from '../../lib/prisma';
import ProfileHeader from './ProfileHeader'; 
import AuthNav from '../components/Navbar/AuthNav'; 
import AchievementBox from './AchievementBox';
import PortfolioGallery from './PortfolioGallery';

export default async function ProfilePage() {
  
  const cookieStore = await cookies();
  const token = cookieStore.get('fictpact_token')?.value; 

  if (!token) {
    redirect('/login');
  }

  let currentUser = null;

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    // 1. TARIK DATA PLUS STUDENT PROGRESS-NYA
    currentUser = await prisma.user.findUnique({
      where: { id: Number(payload.id) }, 
      include: {
        studentProgress: true // 🔥 Tarik semua riwayat skill!
      }
    });

    if (!currentUser) {
      redirect('/login');
    }

  } catch (error) {
    console.log("Token error:", error.message);
    redirect('/login');
  }

  // 2. KITA SETING DATANYA (TERMASUK AVATAR URL!)
  const namaSiswa = currentUser.username || "Pahlawan Tanpa Nama";
  const avatarSiswa = currentUser.avatarUrl || null; 
  
  // 🔥 3. JURUS SAKTI: HITUNG TOTAL XP & GLOBAL LEVEL 🔥
  let xpSiswa = 0;
  let levelSiswa = 1;

  if (currentUser?.studentProgress && currentUser.studentProgress.length > 0) {
    // Jumlahin semua currentXp dari array pake .reduce()
    xpSiswa = currentUser.studentProgress.reduce((total, progress) => total + progress.currentXp, 0);
    // Hitung level globalnya pake rumus: (TotalXP / 1000) + 1
    levelSiswa = Math.floor(xpSiswa / 1000) + 1;
  }

  // Logika sederhana buat nentuin Rank
  let rankSiswa = "Bronze";
  if (xpSiswa >= 5000) rankSiswa = "Silver";
  if (xpSiswa >= 10000) rankSiswa = "Gold";
  if (xpSiswa >= 50000) rankSiswa = "Mythic";

  return (
    <div className="min-h-screen bg-[#000010] text-white font-poppins pb-24">
      
      {/* OPER NAMA & AVATAR KE NAVBAR */}
      <AuthNav userName={namaSiswa} userAvatar={avatarSiswa} />
      
      <main className="max-w-6xl mx-auto px-4 md:px-6 relative z-10 pt-8 mt-20">
        
        {/* OPER SEMUA DATA TERMASUK AVATAR KE HEADER PROFIL */}
        <ProfileHeader 
          nama={namaSiswa} 
          avatarUrl={avatarSiswa}
          coverUrl={currentUser.coverUrl} 
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