import React from 'react';
import prisma from '../../lib/prisma'; 
import Navbar from '../components/Navbar'; 
// Panggil komponen Anak yang baru aja lu bikin!
import QuestListClient from './QuestListClient'; 

export default async function QuestBoardPage() {
  
  // 1. TARIK SEMUA DATA MISI DARI DATABASE 🚀
  const allQuests = await prisma.quest.findMany({
    orderBy: { id: 'desc' } 
  });

  return (
    <div className="min-h-screen bg-[#000010] text-white font-poppins pb-24">
      <Navbar isAuthenticated={true} />

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