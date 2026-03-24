export const dynamic = 'force-dynamic';

import React from 'react';
import prisma from '../../lib/prisma'; 
import AuthNav from '../components/Navbar/AuthNav';
import ProfileCard from '../dashboard-siswa/ProfileCard';
import FeedbackCard from './FeedbackCard';
import ActiveQuest from './ActiveQuest';
import RecommendedQuests from './ReccomendedQuests';

// 👇 1. Import cookies, jose, & REDIRECT 
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { redirect } from 'next/navigation'; 

export default async function DashboardSiswaPage() {
  
  // 👇 2. Ambil token JWT dari Cookie
  const cookieStore = await cookies();
  const token = cookieStore.get('fictpact_token')?.value; 

  if (!token) {
    redirect('/login');
  }

  let currentUserId = null;

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    currentUserId = Number(payload.id); 
  } catch (error) {
    console.error("Token bodong atau expired nih broskie!", error);
    redirect('/login');
  }

  // 👇 4. Panggil Prisma pakai ID ASLI
  const userData = await prisma.user.findUnique({
    where: { 
      id: currentUserId || 0, 
    },
    include: {
      studentProgress: true 
    }
  });

  if (!userData || userData.role === 'UMKM') {
    console.log("Wah ada Bos UMKM nyasar ke tempat tongkrongan Siswa!");
    redirect('/dashboard-umkm');
  }

  // 🔥 5. TARIK DATA USER 🔥
  const namaSiswa = userData?.username || "Pahlawan Tanpa Nama";
  const avatarSiswa = userData?.avatarUrl || null; 

  // 👑 JURUS SAKTI: HITUNG TOTAL XP & GLOBAL LEVEL 👑
  let xpSiswa = 0;
  let levelSiswa = 1;

  if (userData?.studentProgress && userData.studentProgress.length > 0) {
    xpSiswa = userData.studentProgress.reduce((total, progress) => total + progress.currentXp, 0);
    levelSiswa = Math.floor(xpSiswa / 1000) + 1;
  }

  const allQuests = await prisma.quest.findMany({
    take: 6,
    orderBy: {
      createdAt: 'desc' 
    }
  });

  // 🔥 UPDATE DI SINI: UBAH findFirst JADI findMany BIAR SEMUA MISI KETARIK! 🔥
  const activeSubmissions = await prisma.submission.findMany({
    where: { 
      studentId: currentUserId || 0, 
      status: {
        in: ['PENDING', 'REJECTED'] 
      }
    },
    include: {
      quest: true 
    },
    orderBy: { id: 'desc' } 
  });

  const recentFeedback = await prisma.submission.findMany({
    where: { 
      studentId: currentUserId || 0, 
      status: 'APPROVED',
      rating: { not: null } 
    },
    include: { 
      quest: true 
    },
    orderBy: { submittedAt: 'desc' },
    take: 2 
  });

  return (
    <div className="min-h-screen bg-[#000010] text-white font-poppins pb-20">
      
      {/* 🔥 6. OPER AVATAR KE NAVBAR 🔥 */}
      <AuthNav userName={namaSiswa} userAvatar={avatarSiswa} />

      <main className="max-w-7xl mx-auto p-6 md:p-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* KOLOM KIRI */}
          <div className="lg:col-span-1 flex flex-col gap-8">
            <ProfileCard 
              nama={namaSiswa} 
              xp={xpSiswa} 
              level={levelSiswa} 
              avatarUrl={avatarSiswa} 
            />

            <div className="bg-[#060916] rounded-2xl p-6 min-h-[300px] border-2 border-gray-400 flex items-center justify-center text-gray-500">
              <FeedbackCard feedbackData={recentFeedback} />
            </div>
          </div>

          {/* KOLOM KANAN */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div className="bg-transparent min-h-[250px] flex items-center justify-center text-gray-500 rounded-2xl">
              {/* 🔥 LEMPAR ARRAY activeSubmissions KE KOMPONEN 🔥 */}
              <ActiveQuest activeData={activeSubmissions} />
            </div>

            <div className="bg-transparent min-h-[400px] flex items-center justify-center text-gray-500 rounded-2xl">
              <RecommendedQuests questsData={allQuests}/>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}