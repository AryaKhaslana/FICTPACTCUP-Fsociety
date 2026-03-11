export const dynamic = 'force-dynamic';

import React from 'react';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

// Pastiin path import ini bener ya kapten (mundur 3 folder)
import prisma from '../../../lib/prisma'; 
import NavbarUMKM from '../../components/NavbarUMKM/NavbarUMKM'; 
import KanbanBoard from './KanbanBoard';

export default async function QuestPage() {
  
  // 1. BONGKAR BRANKAS JWT
  const cookieStore = await cookies();
  const token = cookieStore.get('fictpact_token')?.value; 

  let currentUserId = null;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      currentUserId = decoded.id; 
    } catch (error) {
      console.error("Token error broskie!");
    }
  }

  // 2. AMBIL DATA USER BUAT NAVBAR
  const userData = await prisma.user.findUnique({
    where: { id: currentUserId || 0 }
  });

  const namaUmkm = userData?.username || "Guest UMKM";
  const avatarUmkm = userData?.avatarUrl || null;

  // 🔥 3. INI YANG BIKIN MUNCUL! AMBIL SEMUA QUEST MILIK UMKM INI 🔥
  const umkmQuests = await prisma.quest.findMany({
    where: { 
      creatorId: currentUserId || 0 // Pake creatorId sesuai Schema DB lu
    },
    orderBy: { id: 'desc' } // Urutin dari yang paling baru
  });

  return (
    <main className="min-h-screen bg-[#040414] text-white">
      
      {/* Navbar di atas */}
      <NavbarUMKM userName={namaUmkm} userAvatar={avatarUmkm} />

      {/* Konten Utama */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        
        {/* 🔥 4. SUAPIN DATA QUEST-NYA KE KANBAN BOARD 👇 */}
        <KanbanBoard quests={umkmQuests} />
        
      </div>
    </main>
  );
}