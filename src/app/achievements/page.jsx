import React from 'react';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose'; 
import { redirect } from 'next/navigation';
import prisma from '../../lib/prisma'; 
import AuthNav from '../components/Navbar/AuthNav'; 
import SkillTree from './SkillTree';

export const metadata = {
  title: 'Achievements Siswa | XPact',
};

export default async function AchievementsPage() {
  
  // 🔥 1. KITA SEDOT ID USER DARI TOKEN JWT (BIAR GAK HARDCODE ID 3 LAGI) 🔥
  const cookieStore = await cookies();
  const token = cookieStore.get('fictpact_token')?.value; 

  if (!token) {
    redirect('/login');
  }

  let currentUserId = null;

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    currentUserId = Number(payload.id); // Dapet deh ID aslinya!
  } catch (error) {
    console.log("Token error nih kapten:", error.message);
    redirect('/login');
  }

  // 🔥 2. TARIK DATA USER PAKE ID ASLI DARI TOKEN 🔥
  const userData = await prisma.user.findUnique({
    where: { id: currentUserId }, 
  });

  // 🔥 3. SIAPIN NAMA SAMA AVATAR DARI DATABASE 🔥
  const namaSiswa = userData?.username || "Pahlawan Tanpa Nama";
  const avatarSiswa = userData?.avatarUrl || null; // 👈 INI KUNCI FOTO PROFILNYA!

  return (
    // 🔥 4. Tambahin pt-20 biar kontennya gak nabrak navbar di HP 🔥
    <div className="min-h-screen bg-[#000010] text-white font-poppins pb-24">
      
      {/* 🔥 5. OPER NAMA SAMA AVATAR KE DALAM NAVBAR! 🔥 */}
      <AuthNav userName={namaSiswa} userAvatar={avatarSiswa} />

      <main className="max-w-6xl mx-auto px-4 md:px-6 pt-6 md:pt-10">
        
        {/* Header Bagian Atas */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 relative z-10 gap-6 md:gap-0">
          
          {/* Box Kuning Info */}
          <div className="bg-[#D97706] text-[#000010] font-bold text-sm p-4 rounded-xl shadow-[4px_4px_0px_#F59E0B] w-full md:w-64 text-center md:text-left">
            Klik ikon untuk melihat level Achievementsmu
          </div>

          {/* Judul Halaman */}
          <h1 className="text-3xl md:text-5xl font-bold flex-1 text-center md:text-left md:ml-20 font-poppins drop-shadow-md tracking-wider">
            <span className="text-[#F59E0B]">Achievements</span> siswa
          </h1>

        </div>

        {/* Panggil Anak (Skill Tree) */}
        <SkillTree />

      </main>
    </div>
  );
}