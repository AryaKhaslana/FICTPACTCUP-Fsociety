import React from 'react';
import AuthNav from '../components/Navbar/AuthNav'; // Sesuaikan path Navbar lu!
import SkillTree from './SkillTree';

export const metadata = {
  title: 'Achievements Siswa | XPact',
};

export default function AchievementsPage() {
  return (
    <div className="min-h-screen bg-[#000010] text-white font-poppins pb-24">
      <AuthNav />

      <main className="max-w-6xl mx-auto px-4 md:px-6 pt-10">
        
        {/* Header Bagian Atas */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 relative z-10">
          
          {/* Box Kuning Info */}
          <div className="bg-[#D97706] text-[#000010] font-bold text-sm p-4 rounded-xl shadow-[4px_4px_0px_#F59E0B] w-full md:w-64 text-center md:text-left mb-6 md:mb-0">
            Klik ikon untuk melihat level Achievementsmu
          </div>

          {/* Judul Halaman */}
          <h1 className="text-4xl md:text-5xl font-bold flex-1 text-center md:text-left md:ml-20">
            <span className="text-[#F59E0B]">Achievements</span> siswa
          </h1>

        </div>

        {/* Panggil Anak (Skill Tree) */}
        <SkillTree />

      </main>
    </div>
  );
}