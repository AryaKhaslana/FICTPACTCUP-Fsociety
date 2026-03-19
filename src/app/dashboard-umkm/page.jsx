export const dynamic = 'force-dynamic';

import React from 'react';
// 👇 1. Import Prisma & Alat Bongkar Brankas JWT 👇
import prisma from '../../lib/prisma';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { redirect } from 'next/navigation'; // 🔥 WAJIB IMPORT INI BUAT NENDANG USER!

// Import komponen-komponen UMKM lu
import UmkmProfile from "./UmkmProfile";
import UmkmMenu from "./UmkmMenu";
import PantauQuestList from "./PantauQuestList";
import NavbarUMKM from "../components/NavbarUMKM/NavbarUMKM"; 
import TopKontributorDashboard from './TopKontributorDashboard.jsx';

export default async function UmkmDashboardPage() {
  
  // 👇 2. Ambil token JWT dari Cookie
  const cookieStore = await cookies();
  const token = cookieStore.get('fictpact_token')?.value; 

  // 🔥 3. SATPAM LAPIS 1: GAK PUNYA TOKEN = TENDANG KE LOGIN!
  if (!token) {
    redirect('/login');
  }

  let currentUserId = null;

  // 👇 4. Ekstrak ID User dari dalem Token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    currentUserId = decoded.id; 
  } catch (error) {
    // 🔥 SATPAM LAPIS 2: TOKEN EXPIRED / PALSU = TENDANG KE LOGIN!
    console.error("Token bodong atau expired nih broskie!", error);
    redirect('/login');
  }

  // 👇 5. Panggil Prisma pakai ID ASLI
  const userData = await prisma.user.findUnique({
    where: { 
      id: currentUserId,
    }
  });

  // 🔥 6. SATPAM LAPIS 3 (PALING KRITIS): CEK ROLE-NYA! 🔥
  // Kalau usernya gak ada ATAU rolenya STUDENT, tendang ke Dashboard Siswa!
  if (!userData || userData.role === 'STUDENT' || userData.role === 'SISWA') {
    console.log("Wah ada siswa nyasar nih bos!");
    redirect('/dashboard-siswa'); // Sesuaikan sama path dashboard siswa lu ya!
  }

  // =========================================================================
  // KALAU DIA LOLOS SAMPAI SINI, BERARTI DIA BENERAN UMKM! AMAN BROS! 🛡️
  // =========================================================================

  const pantauSubmissions = await prisma.submission.findMany({
    where: {
      quest: {
        creatorId: currentUserId
      }
    },
    include: {
      quest: true,     
      student: true    
    },
    orderBy: { id: 'desc' }
  });

  // 👇 Minor Fix dari Bang Sepuh: Query ini tadinya nyari id quest = id user, salah kaprah!
  // Harusnya nyari quest yang dibikin sama user ini (sesuaikan creatorId/authorId lu)
  const umkmQuests = await prisma.quest.findMany({
    where: {
      creatorId: currentUserId // 🔥 Ganti ke creatorId atau umkmId sesuai schema.prisma lu!
    },
    orderBy: { id: 'desc' }
  });

  const namaUmkm = userData.username || "Bos UMKM";
  const avatarUmkm = userData.avatarUrl || null;

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