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
        studentProgress: true 
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
  const avatarSiswa = currentUser.avatarUrl || null; // 👈 INI KUNCINYA BROSKIE!
  const xpSiswa = currentUser.studentProgress?.[0]?.currentXp || 0;
  const levelSiswa = currentUser.studentProgress?.[0]?.level || 1;

  // Logika sederhana buat nentuin Rank (Bisa lu ubah sesuka hati)
  let rankSiswa = "Bronze";
  if (xpSiswa > 5000) rankSiswa = "Silver";
  if (xpSiswa > 10000) rankSiswa = "Gold";

  return (
    // Kasih pt-24 biar gak nyundul Navbar yang fixed!
    <div className="min-h-screen bg-[#000010] text-white font-poppins pb-24">
      
      {/* 3. OPER NAMA & AVATAR KE NAVBAR BIAR MUKA SEYRAA MUNCUL DI POJOK */}
      <AuthNav userName={namaSiswa} userAvatar={avatarSiswa} />
      
      <main className="max-w-5xl mx-auto px-4 md:px-6 relative z-10 mt-20">
        
        {/* 4. OPER SEMUA DATA TERMASUK AVATAR KE HEADER PROFIL */}
        <ProfileHeader 
          nama={namaSiswa} 
          avatarUrl={avatarSiswa} // 👈 OPER KE SINI
          xp={xpSiswa} 
          level={levelSiswa}
          rank={rankSiswa} 
          badge={3} 
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <AchievementBox />
          <PortfolioGallery />
        </div>

      </main>
    </div>
  );
}