export const dynamic = 'force-dynamic';

import React from 'react';
import prisma from '../../lib/prisma'; 
import AuthNav from '../components/Navbar/AuthNav';
import ProfileCard from '../dashboard-siswa/ProfileCard';
import FeedbackCard from './FeedbackCard';
import ActiveQuest from './ActiveQuest';
import RecommendedQuests from './ReccomendedQuests';

// 👇 1. Import cookies & jwt buat bongkar brankas rahasia
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export default async function DashboardSiswaPage() {
  
  // 👇 2. Ambil token JWT dari Cookie
  const cookieStore = await cookies();
  const token = cookieStore.get('fictpact_token')?.value; // (Ganti 'token' sesuai nama cookie lu pas login)

  let currentUserId = null;

  // 👇 3. Ekstrak ID User dari dalem Token
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      currentUserId = decoded.id; // Pastiin pas login lu masukin 'id' ke dalem JWT
    } catch (error) {
      console.error("Token bodong atau expired nih broskie!");
    }
  }

  // 👇 4. Panggil Prisma pakai ID ASLI (Bukan 3 lagi!)
  const userData = await prisma.user.findUnique({
    where: { 
      id: currentUserId || 0, // Kalau ga ada token, kasih 0 biar ga error nge-crash
    },
    include: {
      studentProgress: true
    }
  });

  // Data dinamis siap disajikan!
  const namaSiswa = userData?.username || "Guest (Belum Login)";
  const xpSiswa = userData?.studentProgress?.[0]?.currentXp || 0;
  const levelSiswa = userData?.studentProgress?.[0]?.level || 1;

  const allQuests = await prisma.quest.findMany({
    take: 6,
  });

  const activeSubmission = await prisma.submission.findFirst({
    where: { 
      studentId: 3, 
      status: 'PENDING' 
    },
    include: {
      quest: true 
    },
    orderBy: { id: 'desc' } 
  });

  return (
    <div className="min-h-screen bg-[#000010] text-white font-poppins">
      
      {/* 👇 2. INI DIA SAKLAR AJAIBNYA! Kita oper namaSiswa ke AuthNav 👇 */}
      <AuthNav userName={namaSiswa} />

      <main className="max-w-7xl mx-auto p-6 md:p-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* KOLOM KIRI */}
          <div className="lg:col-span-1 flex flex-col gap-8">
            <ProfileCard nama={namaSiswa} xp={xpSiswa} level={levelSiswa} />

            <div className="bg-[#060916] rounded-2xl p-6 min-h-[300px] border border-gray-800 flex items-center justify-center text-gray-500">
              <FeedbackCard isEmpty={false} />
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