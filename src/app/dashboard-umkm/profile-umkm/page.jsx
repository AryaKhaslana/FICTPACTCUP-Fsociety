import React from 'react';
import ProfilClient from './ProfilClient';
import TentangKedai from './TentangKedai';
import MisiOpenList from './MisiOpenList';

export default function Page() {
  return (
    // Background utama yang sangat gelap
    <div className="min-h-screen bg-[#0A0D1A] p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Bagian Atas */}
        <ProfilClient />
        
        {/* Bagian Bawah (Grid 2 Kolom) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TentangKedai />
          <MisiOpenList />
        </div>
        
      </div>
    </div>
  );
}