import React from 'react';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import prisma from '../../../lib/prisma'; // 👈 Pastiin path prisma lu bener ya broskie!

import ProfileClient from './ProfileClient';
import TentangKedai from './TentangKedai';
import MisiOpenList from './MisiOpenList';
import NavbarUMKM from '../../components/NavbarUMKM/NavbarUMKM'; 

export default async function Page() {
  
  // 🔥 1. BONGKAR BRANKAS JWT & TARIK DATA DARI DATABASE 🔥
  const cookieStore = await cookies();
  const token = cookieStore.get('fictpact_token')?.value;
  let currentUser = null;

  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);
      
      currentUser = await prisma.user.findUnique({
        where: { id: Number(payload.id) },
        select: { 
          username: true, 
          avatarUrl: true,
          bio: true,
          kategoriBisnis: true
        }
      });
    } catch (error) {
      console.error("Waduh, token bermasalah kapten!", error);
    }
  }

  return (
    // 1. WRAPPER UTAMA
    // Bang Sepuh tambahin pt-24 biar kalo Navbar lu itu tipe "fixed", kontennya gak nabrak!
    <div className="min-h-screen bg-[#0A0D1A] font-sans pb-16">
      
      {/* 2. NAVBAR: Disuapin data nama dan foto */}
      <NavbarUMKM 
        userName={currentUser?.username || "Klien UMKM"} 
        userAvatar={currentUser?.avatarUrl} 
      />
      
      {/* 3. CONTAINER KONTEN */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 mt-8 space-y-6 relative z-10">
        
        {/* 🔥 Bagian Atas: Disuapin data userData penuh 🔥 */}
        <ProfileClient userData={currentUser} />
        
        {/* Bagian Bawah (Grid 2 Kolom) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* 🔥 Disuapin data juga biar Bio-nya beneran narik dari DB 🔥 */}
          <TentangKedai userData={currentUser} />
          
          <MisiOpenList />
        </div>
        
      </div>
    </div>
  );
}