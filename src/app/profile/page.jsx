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

    // 1. TARIK DATA PLUS STUDENT PROGRESS-NYA (Sama kayak di Dashboard lu!)
    currentUser = await prisma.user.findUnique({
      where: { id: payload.id }, 
      include: {
        studentProgress: true // 👈 INI YANG BIKIN XP SAMA LEVEL BISA MUNCUL
      }
    });

    if (!currentUser) {
      redirect('/login');
    }

  } catch (error) {
    console.log("Token error:", error.message);
    redirect('/login');
  }

  // 2. KITA SETING DATANYA PERSIS KAYAK DI DASHBOARD
  const namaSiswa = currentUser.username || "Pahlawan Tanpa Nama";
  const xpSiswa = currentUser.studentProgress?.[0]?.currentXp || 0;
  const levelSiswa = currentUser.studentProgress?.[0]?.level || 1;

  return (
    <div className="min-h-screen bg-[#000010] text-white font-poppins pb-24">
      <AuthNav />
      <main className="max-w-5xl mx-auto px-4 md:px-6 pt-8 relative z-10">
        
        {/* 3. OPER VARIABEL YANG UDAH BENER KE ANAKNYA */}
        <ProfileHeader 
          nama={namaSiswa} 
          xp={xpSiswa} 
          level={levelSiswa}
          rank="Bronze" 
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