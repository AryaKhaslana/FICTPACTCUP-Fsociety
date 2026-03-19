export const dynamic = 'force-dynamic';

import React from 'react';
import prisma from '../../lib/prisma'; 
import AuthNav from '../components/Navbar/AuthNav';
import ProfileCard from '../dashboard-siswa/ProfileCard';
import FeedbackCard from './FeedbackCard';
import ActiveQuest from './ActiveQuest';
import RecommendedQuests from './ReccomendedQuests';

// 👇 1. Import cookies & jose
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

export default async function DashboardSiswaPage() {
  
  // 👇 2. Ambil token JWT dari Cookie
  const cookieStore = await cookies();
  const token = cookieStore.get('fictpact_token')?.value; 

  let currentUserId = null;

  // 👇 3. Ekstrak ID User dari dalem Token pake JOSE
  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);
      currentUserId = Number(payload.id); // Pastiin jadi angka!
    } catch (error) {
      console.error("Token bodong atau expired nih broskie!");
    }
  }

  // 👇 4. Panggil Prisma pakai ID ASLI
  const userData = await prisma.user.findUnique({
    where: { 
      id: currentUserId || 0, 
    },
    include: {
      studentProgress: true // Narik SEMUA riwayat XP dari berbagai kategori/skill
    }
  });

  // 🔥 5. TARIK DATA USER 🔥
  const namaSiswa = userData?.username || "Pahlawan Tanpa Nama";
  const avatarSiswa = userData?.avatarUrl || null; 

  // 👑 JURUS SAKTI: HITUNG TOTAL XP & GLOBAL LEVEL 👑
  let xpSiswa = 0;
  let levelSiswa = 1;

  if (userData?.studentProgress && userData.studentProgress.length > 0) {
    // 1. Jumlahin semua currentXp dari array pake .reduce()
    xpSiswa = userData.studentProgress.reduce((total, progress) => total + progress.currentXp, 0);
    
    // 2. Hitung level globalnya pake rumus: (TotalXP / 1000) + 1
    levelSiswa = Math.floor(xpSiswa / 1000) + 1;
  }

  const allQuests = await prisma.quest.findMany({
    take: 6,
  });

  const activeSubmission = await prisma.submission.findFirst({
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
      rating: { not: null } // Tarik yang udah dapet bintang dari UMKM
    },
    include: { 
      quest: true // Biar dapet nama quest-nya
    },
    orderBy: { submittedAt: 'desc' },
    take: 2 // Tampil 2 biji aja biar rapi
  });

  return (
    <div className="min-h-screen bg-[#000010] text-white font-poppins pb-20">
      
      {/* 🔥 6. OPER AVATAR KE NAVBAR 🔥 */}
      <AuthNav userName={namaSiswa} userAvatar={avatarSiswa} />

      <main className="max-w-7xl mx-auto p-6 md:p-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* KOLOM KIRI */}
          <div className="lg:col-span-1 flex flex-col gap-8">
            
            {/* 🔥 7. OPER DATA KE PROFILE CARD 🔥 */}
            <ProfileCard 
              nama={namaSiswa} 
              xp={xpSiswa} 
              level={levelSiswa} 
              avatarUrl={avatarSiswa} 
            />

            <div className="bg-[#060916] rounded-2xl p-6 min-h-[300px] border-2 border-gray-400 flex items-center justify-center text-gray-500">
              {/* 🔥 OPER DATANYA KE KOMPONEN FEEDBACK CARD 🔥 */}
              <FeedbackCard feedbackData={recentFeedback} />
            </div>
          </div>

          {/* KOLOM KANAN */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div className="bg-transparent min-h-[250px] flex items-center justify-center text-gray-500 rounded-2xl">
              <ActiveQuest activeData={activeSubmission} />
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