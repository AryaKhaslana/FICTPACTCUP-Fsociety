export const dynamic = 'force-dynamic';

import React from 'react';
import Link from 'next/link';
import prisma from '../../../lib/prisma'; 
import Navbar from '../../components/Navbar/AuthNav'; 
import QuestDetailClient from './QuestDetailClient'; 

// 🔥 1. IMPORT WAJIB BUAT BACA TOKEN LOGIN 🔥
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { redirect } from 'next/navigation';

export default async function QuestDetailPage({ params }) {
  const resolvedParams = await params;
  const questId = Number(resolvedParams.id);

  if (isNaN(questId)) {
    return <div className="text-white text-center mt-20 font-pixel uppercase">ID Quest Ngaco Brojak!</div>;
  }

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
    redirect('/login');
  }

  // 🚀 Tarik data Siswa dari DB buat suapin Navbar
  const userData = await prisma.user.findUnique({
    where: { id: currentUserId || 0 }
  });

  const namaSiswa = userData?.username || "Pahlawan Tanpa Nama";
  const avatarSiswa = userData?.avatarUrl || null;

  const quest = await prisma.quest.findUnique({
    where: { id: questId },
    include: {
      creator: {
        select: { username: true } // Biar dapet nama Tokonya
      }
    }
  });

  if (!quest) {
    return (
      <div className="min-h-screen bg-[#000010] text-white flex flex-col items-center justify-center font-poppins">
        <h1 className="text-4xl font-pixel text-[#F59E0B] mb-4">404</h1>
        <p className="text-gray-400 mb-8">Waduh broskie, misi ini nggak ketemu atau udah dihapus!</p>
        <Link href="/dashboard-siswa" className="bg-[#11131A] border border-gray-700 px-6 py-3 rounded-lg hover:border-[#F59E0B] transition-colors">
          Kembali ke Markas
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#000010] text-white font-poppins pb-24" 
         style={{ backgroundImage: 'radial-gradient(circle at center, #0F172A 0%, #000010 100%)' }}>
      
      {/* 🔥 4. OPER NAMA SAMA FOTO KE NAVBAR 🔥 */}
      <Navbar userName={namaSiswa} userAvatar={avatarSiswa} />

      <main className="max-w-6xl mx-auto px-4 md:px-6 pt-12 relative z-10">
        {/* 🚀 LEMPAR DATA QUEST KE ANAK 🚀 */}
        <QuestDetailClient quest={quest} />
      </main>
    </div>
  );
}