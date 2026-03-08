import React from 'react';
import prisma from '../../lib/prisma'; // 👈 1. WAJIB IMPORT PRISMA NYA BROSKIE!
import AuthNav from '../components/Navbar/AuthNav'; 
import SkillTree from './SkillTree';

export const metadata = {
  title: 'Achievements Siswa | XPact',
};

// 👇 2. TAMBAHIN 'async' DI SINI BIAR BISA NUNGGU DATA DATABASE
export default async function AchievementsPage() {
  
  // 👇 3. KITA TARIK DATA USER DARI DATABASE (Tembak ID 3 kayak kemaren)
  const userData = await prisma.user.findUnique({
    where: { id: 3 }, 
  });

  // Bikin variabel namanya dari data user yang barusan ditarik
  const namaSiswa = userData?.username || "Kim Booyah";

  return (
    <div className="min-h-screen bg-[#000010] text-white font-poppins pb-24">
      
      {/* 👇 4. SEKARANG VARIABEL INI UDAH ADA ISINYA DAN SIAP DILEMPAR! */}
      <AuthNav userName={namaSiswa} />

      <main className="max-w-6xl mx-auto px-4 md:px-6 pt-10">
        
        {/* Header Bagian Atas */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 relative z-10">
          
          {/* Box Kuning Info */}
          <div className="bg-[#D97706] text-[#000010] font-bold text-sm p-4 rounded-xl shadow-[4px_4px_0px_#F59E0B] w-full md:w-64 text-center md:text-left mb-6 md:mb-0">
            Klik ikon untuk melihat level Achievementsmu
          </div>

          {/* Judul Halaman */}
          <h1 className="text-4xl md:text-5xl font-bold flex-1 text-center md:text-left md:ml-20 font-poppins drop-shadow-md tracking-wider">
            <span className="text-[#F59E0B]">Achievements</span> siswa
          </h1>

        </div>

        {/* Panggil Anak (Skill Tree) */}
        <SkillTree />

      </main>
    </div>
  );
}