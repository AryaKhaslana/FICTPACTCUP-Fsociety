export const dynamic = 'force-dynamic';

import React from 'react';
// 1. Panggil Prisma Client lu di sini (sesuaikan path-nya kalau file lu beda letaknya)
import prisma from '../../lib/prisma'; 

import Navbar from '../components/Navbar'; 
import ProfileCard from '../dashboard-siswa/ProfileCard';
import FeedbackCard from './FeedbackCard';
import ActiveQuest from './ActiveQuest';
import RecommendedQuests from './ReccomendedQuests';

// 2. Wajib kasih 'async' biar bisa nunggu data dari database
export default async function DashboardSiswaPage() {
  
  // 3. TARIK DATA DARI PRISMA
  // (Peringatan: Pastikan di database lu ada user dengan id 1. 
  // Nanti angka 1 ini kita ganti pakai session dari fitur Login)
  const userData = await prisma.user.findUnique({
    where: { 
      id: 3,
    },
    include: {
      studentProgress: true
    }
  });

  // 4. Bikin fallback (cadangan) kalau database lagi kosong/error
  const namaSiswa = userData?.username || "Kim Booyah";
  const xpSiswa = userData?.studentProgress?.[0]?.currentXp || 0;
  const levelSiswa = userData?.studentProgress?.[0]?.level || 1;

  const allQuests = await prisma.quest.findMany({
    take: 6,
    // orderBy: { id: 'desc' } // Opsional: Biar yang baru ditambahin muncul duluan
  });

  const activeSubmission = await prisma.submission.findFirst({
    where: { 
      // ⚠️ WAJIB PAKE studentId, KARENA DI TABEL LU NAMANYA ITU!
      studentId: 3, 
      status: 'PENDING' 
    },
    include: {
      quest: true 
    },
    // (Opsional) Biar misi terbaru yang muncul
    orderBy: { id: 'desc' } 
  });

  return (
    <div className="min-h-screen bg-[#000010] text-white font-poppins">
      
      <Navbar isAuthenticated={true} />

      <main className="max-w-7xl mx-auto p-6 md:p-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* KOLOM KIRI */}
          <div className="lg:col-span-1 flex flex-col gap-8">
            
            {/* 5. Lempar data dari database ke komponen lu */}
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