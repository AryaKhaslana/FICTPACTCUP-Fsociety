export const dynamic = 'force-dynamic';

import React from 'react';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose'; 
import { redirect } from 'next/navigation';
import prisma from '../../lib/prisma'; 
import AuthNav from '../components/Navbar/AuthNav'; 
import QuestListClient from './QuestListClient'; 

export default async function QuestBoardPage() {
  
  // 🔥 1. KITA SEDOT ID USER DARI TOKEN JWT (BIAR GAK HARDCODE ID 2 LAGI) 🔥
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
    console.log("Token error nih kapten:", error.message);
    redirect('/login');
  }

  // 🔥 2. KITA JALANIN 2 QUERY BARENGAN BIAR NGEBUT! 🚀
  const [userData, allQuests] = await Promise.all([
    
    // Tarik data user PAKE ID ASLI DARI TOKEN
    prisma.user.findUnique({
      where: { id: currentUserId }, 
    }),

    // Tarik semua data misi
    prisma.quest.findMany({
      orderBy: { id: 'desc' } 
    })
    
  ]);

  // 🔥 3. TARIK NAMA SAMA AVATAR DARI DATABASE 🔥
  const namaSiswa = userData?.username || "Pahlawan Tanpa Nama";
  const avatarSiswa = userData?.avatarUrl || null; // 👈 INI YANG TADI LUPUT BROSKIE!

  return (
    // Tambahin pt-20 biar kontennya gak nyundul navbar yang fixed
    <div className="min-h-screen bg-[#000010] text-white font-poppins pb-24">
      
      {/* 🔥 4. OPER NAMA SAMA AVATAR KE DALAM NAVBAR! 🔥 */}
      <AuthNav userName={namaSiswa} userAvatar={avatarSiswa} />

      <main className="max-w-6xl mx-auto px-4 md:px-6 pt-8 md:pt-16">
        
        {/* HEADER: Judul & Subjudul */}
        <div className="text-center mb-12 px-2">
          <h1 className="text-3xl md:text-5xl font-pixel text-white mb-4 md:mb-6 tracking-widest drop-shadow-md uppercase">
            Papan misi
          </h1>
          <p className="text-gray-300 text-sm md:text-base font-medium max-w-lg mx-auto">
            Pilih misimu, bantu mereka, dan kumpulkan XP!
          </p>
        </div>

        {/* LEMPAR DATA KE KOMPONEN ANAK BIAR BISA DIFILTER */}
        <QuestListClient initialQuests={allQuests} />
        
      </main>
    </div>
  );
}