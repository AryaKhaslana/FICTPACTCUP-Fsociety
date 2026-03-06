import React from 'react';
import Link from 'next/link';
import prisma from '../../../lib/prisma'; 
import Navbar from '../../components/Navbar'; 

// Panggil komponen Anak yang baru dibikin!
import QuestDetailClient from './QuestDetailClient'; 

export default async function QuestDetailPage({ params }) {
  const resolvedParams = await params;
  const questId = Number(resolvedParams.id);

  if (isNaN(questId)) {
    return <div className="text-white text-center mt-20 font-pixel">ID Quest Ngaco Brojak!</div>;
  }

  const quest = await prisma.quest.findUnique({
    where: { id: questId },
  });

  if (!quest) {
    return (
      <div className="min-h-screen bg-[#000010] text-white flex flex-col items-center justify-center font-poppins">
        <h1 className="text-4xl font-pixel text-[#F59E0B] mb-4">404</h1>
        <p className="text-gray-400 mb-8">Waduh broskie, misi ini nggak ketemu atau udah dihapus!</p>
        <Link href="/quest" className="bg-[#11131A] border border-gray-700 px-6 py-3 rounded-lg hover:border-[#F59E0B] transition-colors">
          Kembali ke Papan Misi
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#000010] text-white font-poppins pb-24" 
         style={{ backgroundImage: 'radial-gradient(circle at center, #0F172A 0%, #000010 100%)' }}>
      
      <Navbar isAuthenticated={true} />

      <main className="max-w-6xl mx-auto px-4 md:px-6 pt-12 relative z-10">
        
        {/* 🚀 LEMPAR DATA QUEST KE KOMPONEN ANAK BIAR DITAMPILIN UI-NYA 🚀 */}
        <QuestDetailClient quest={quest} />
        
      </main>
    </div>
  );
}