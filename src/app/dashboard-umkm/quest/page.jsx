export const dynamic = 'force-dynamic';

import React from 'react';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import prisma from '../../../lib/prisma'; 
import NavbarUMKM from '../../components/NavbarUMKM/NavbarUMKM'; 
import KanbanBoard from './KanbanBoard';

export default async function QuestPage() {
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

  const userData = await prisma.user.findUnique({
    where: { id: currentUserId || 0 }
  });

  // 🔥 INI YANG BANG SEPUH TAMBAHIN! BAWA DATA SISWA SEKALI BARENG SUBMISSION-NYA!
  const umkmQuests = await prisma.quest.findMany({
    where: { creatorId: currentUserId || 0 },
    include: {
      submissions: {
        orderBy: { id: 'desc' },
        include: {
          student: {
            select: { username: true } // Bawa nama siswanya sekalian!
          }
        }
      }
    },
    orderBy: { id: 'desc' }
  });

  return (
    <main className="min-h-screen bg-[#040414] text-white">
      <NavbarUMKM userName={userData?.username} userAvatar={userData?.avatarUrl} />
      <div className="max-w-7xl mx-auto px-4 mt-8">
        {/* SUAPIN KE KANBAN BOARD 👇 */}
        <KanbanBoard quests={umkmQuests} />
      </div>
    </main>
  );
}