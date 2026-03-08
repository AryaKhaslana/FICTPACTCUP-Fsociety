export const dynamic = 'force-dynamic';

import React from 'react';
import prisma from '../../lib/prisma'; 

// 👇 1. INI YANG DIGANTI! Gusur Navbar lama, Panggil AuthNav Sakti kita!
import AuthNav from '../components/Navbar/AuthNav'; // (Sesuaikan path-nya kalau beda folder ya)

import ProfileCard from '../dashboard-siswa/ProfileCard';
import FeedbackCard from './FeedbackCard';
import ActiveQuest from './ActiveQuest';
import RecommendedQuests from './ReccomendedQuests';

export default async function DashboardSiswaPage() {
  
  const userData = await prisma.user.findUnique({
    where: { 
      id: 3,
    },
    include: {
      studentProgress: true
    }
  });

  const namaSiswa = userData?.username || "Kim Booyah";
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