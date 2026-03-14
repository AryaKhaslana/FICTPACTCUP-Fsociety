export const dynamic = 'force-dynamic';

import React from 'react';
// 👇 1. Import Prisma & Alat Bongkar Brankas JWT 👇
import prisma from '../../lib/prisma'; // Pastiin path-nya bener ya mpruy
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

// Import komponen-komponen UMKM lu
import UmkmProfile from "./UmkmProfile";
import UmkmMenu from "./UmkmMenu";
import PantauQuestList from "./PantauQuestList";
import NavbarUMKM from "../components/NavbarUMKM/NavbarUMKM"; // Sesuaikan path-nya
import TopKontributorDashboard from './TopKontributorDashboard.jsx';

export default async function UmkmDashboardPage() {
  
  // 👇 2. Ambil token JWT dari Cookie
  const cookieStore = await cookies();
  const token = cookieStore.get('fictpact_token')?.value; 

  let currentUserId = null;

  // 👇 3. Ekstrak ID User dari dalem Token
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      currentUserId = decoded.id; 
    } catch (error) {
      console.error("Token bodong atau expired nih broskie!", error);
    }
  }

  // 👇 4. Panggil Prisma pakai ID ASLI (Si Bos UMKM yang lagi login)
  const userData = await prisma.user.findUnique({
    where: { 
      id: currentUserId || 0, // Kalau ga ada token, kasih 0 biar ga crash
    }
  });

  const pantauSubmissions = await prisma.submission.findMany({
    where: {
      // Cari submission yang misi-nya dibikin sama UMKM ini
      quest: {
        creatorId: currentUserId || 0
      }
    },
    include: {
      quest: true,     // Bawa data detail misinya
      student: true    // Bawa data nama siswanya
    },
    orderBy: { id: 'desc' }
  });

  const umkmQuests = await prisma.quest.findMany({
    where: {
      // Ganti 'authorId' sesuai nama relasi UMKM di tabel Quest lu ya!
      id: currentUserId || 0 
    },
    orderBy: { id: 'desc' }
  });

  // Data dinamis siap disajikan! (Kasih fallback kalau null)
  const namaUmkm = userData?.username || "Guest UMKM";
  const avatarUmkm = userData?.avatarUrl || null;

  return (
    <main className="min-h-screen bg-[#040414] text-white">
      
      {/* 👇 5. SAKLAR 1: Oper nama & avatar ke Navbar 👇 */}
      <NavbarUMKM userName={namaUmkm} userAvatar={avatarUmkm} />

      <div className="max-w-6xl mx-auto px-4 md:px-0 mt-10">
          <div className="grid gap-6 md:grid-cols-[320px_minmax(0,1fr)]">
            
            <div className="flex flex-col gap-6">
              {/* 👇 6. SAKLAR 2: Oper seluruh data userData ke Profil 👇 */}
              <UmkmProfile user={userData} />
              <UmkmMenu />
            </div>

            {/* Bagian Quest List (Nanti datanya bisa difetch nyusul) */}
           <div className="flex flex-col gap-6">
              
              {/* Atas: Pantau Quest */}
              <PantauQuestList submissions={pantauSubmissions}/>

              {/* Bawah: Pahlawan Berjasa */}
              <TopKontributorDashboard />

            </div>
            
          </div>
      </div>
    </main>
  );
}