import React from 'react';
import prisma from '../../lib/prisma'; 
import AuthNav from '../components/Navbar/AuthNav'; 
import QuestListClient from './QuestListClient'; 

export default async function QuestBoardPage() {
  
  // 1. KITA JALANIN 2 QUERY BARENGAN BIAR NGEBUT! 🚀
  const [userData, allQuests] = await Promise.all([
    
    // Tarik data user (sementara tembak ID 3 dulu kayak di dashboard)
    prisma.user.findUnique({
      where: { id: 2 }, 
    }),

    // Tarik semua data misi
    prisma.quest.findMany({
      orderBy: { id: 'desc' } 
    })
    
  ]);

  // 2. Bikin variabel namanya dari data user yang barusan ditarik
  const namaSiswa = userData?.username || "Kim Booyah";

  return (
    <div className="min-h-screen bg-[#000010] text-white font-poppins pb-24">
      
      {/* SEKARANG VARIABEL INI UDAH ADA ISINYA! */}
      <AuthNav userName={namaSiswa} />

      <main className="max-w-6xl mx-auto px-6 pt-16">
        
        {/* HEADER: Judul & Subjudul */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-pixel text-white mb-6 tracking-widest drop-shadow-md">
            Papan misi
          </h1>
          <p className="text-gray-300 text-sm md:text-base font-medium">
            Pilih misimu, bantu mereka, dan kumpulkan XP!
          </p>
        </div>

        {/* 2. LEMPAR DATA KE KOMPONEN ANAK BIAR BISA DIFILTER */}
        <QuestListClient initialQuests={allQuests} />
        
      </main>
    </div>
  );
}