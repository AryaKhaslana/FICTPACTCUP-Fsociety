import EksplorSiswaPage from "./EksplorSiswa";
import NavbarUMKM from "../../components/NavbarUMKM/NavbarUMKM";
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import prisma from '../../../lib/prisma'; // 👈 Sesuaikan path Prisma lu!

export default async function EksplorPage() {
  
  // 🔥 1. TARIK DATA KLIEN UMKM YANG LAGI LOGIN BUAT NAVBAR 🔥
  const cookieStore = await cookies();
  const token = cookieStore.get('fictpact_token')?.value; 
  let loggedInUser = null;

  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);
      
      loggedInUser = await prisma.user.findUnique({
        where: { id: Number(payload.id) },
        select: { username: true, avatarUrl: true }
      });
    } catch (error) {
      console.error("Token error di Eksplor Page!");
    }
  }

  return (
    // Background itemnya hapus aja, soalnya di dalem EksplorSiswaPage udah ada bg-gradient yang lebih keren!
    <div className="min-h-screen bg-[#05050A]">
      
      {/* 🔥 2. OPER DATA KE NAVBAR BIAR FOTO & NAMANYA MUNCUL 🔥 */}
      <NavbarUMKM 
        userName={loggedInUser?.username || "Klien UMKM"} 
        userAvatar={loggedInUser?.avatarUrl} 
      />

      {/* 3. BUNGKUS KONTEN PAKE PADDING TOP (pt-24) BIAR GAK KETUTUPAN NAVBAR */}
      <div className="pt-24">
        <EksplorSiswaPage />
      </div>

    </div>
  );
}