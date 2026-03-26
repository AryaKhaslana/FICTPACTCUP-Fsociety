export const dynamic = 'force-dynamic';

import React from 'react';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose'; 
import { redirect } from 'next/navigation';
import prisma from '../../lib/prisma'; 
import AuthNav from '../components/Navbar/AuthNav'; 
import QuestListClient from './QuestListClient'; 

export default async function QuestBoardPage() {
  
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

  const [userData, allQuests] = await Promise.all([
    
    prisma.user.findUnique({
      where: { id: currentUserId }, 
    }),

    // 🔥 INI DIA MAGIC-NYA BIAR MISI NGILANG! 🔥
   // Tarik data misi yang STATUSNYA MASIH OPEN
    prisma.quest.findMany({
      where: {
        status: 'OPEN', // <-- INI YANG BENER SESUAI SCHEMA LU!
      },
      orderBy: { id: 'desc' } 
    })
  ]);

  const namaSiswa = userData?.username || "Pahlawan Tanpa Nama";
  const avatarSiswa = userData?.avatarUrl || null; 

  return (
    <div className="min-h-screen bg-[#000010] text-white font-poppins pb-24">
      
      <AuthNav userName={namaSiswa} userAvatar={avatarSiswa} />

      <main className="max-w-6xl mx-auto px-4 md:px-6 pt-8 md:pt-16">
        
        <div className="text-center mb-12 px-2">
          <h1 className="text-3xl md:text-5xl font-pixel text-white mb-4 md:mb-6 tracking-widest drop-shadow-md uppercase">
            Papan misi
          </h1>
          <p className="text-gray-300 text-sm md:text-base font-medium max-w-lg mx-auto">
            Pilih misimu, bantu mereka, dan kumpulkan XP!
          </p>
        </div>

        <QuestListClient initialQuests={allQuests} />
        
      </main>
    </div>
  );
}