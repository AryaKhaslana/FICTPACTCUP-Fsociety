import React from 'react';
import ProfileClient from './ProfileClient';
import TentangKedai from './TentangKedai';
import MisiOpenList from './MisiOpenList';
import NavbarUMKM from '../../components/NavbarUMKM/NavbarUMKM'; // 👈 Navbar jagoan kita!

export default function Page() {
  return (
    // 1. WRAPPER UTAMA: Padding (p-4) DIHAPUS dari sini biar Navbar bisa mentok ujung layar!
    <div className="min-h-screen bg-[#0A0D1A] font-sans pb-16">
      
      {/* 2. NAVBAR: Taruh paling atas, di luar container biar dia melar full-width */}
      <NavbarUMKM />
      
      {/* 3. CONTAINER KONTEN: Nah, padding Kiri-Kanan (px-4) dipindah ke sini. 
             Ditambah mt-8 (margin-top) biar kontennya gak nabrak jidat navbar! */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 mt-8 space-y-6">
        
        {/* Bagian Atas */}
        <ProfileClient />
        
        {/* Bagian Bawah (Grid 2 Kolom) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TentangKedai />
          <MisiOpenList />
        </div>
        
      </div>
    </div>
  );
}