import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import prisma from '../../lib/prisma'; // 👈 Sesuaikan path prisma lu!
import NavbarUMKM from '../components/NavbarUMKM/NavbarUMKM'; // 👈 Sesuaikan path Navbar UMKM!
import AuthNav from '../components/Navbar/AuthNav'; // 👈 Sesuaikan path Navbar Siswa!
import PublicProfileForm from './PublicProfileForm'; 
import SecurityForm from './SecurityForm';

export default async function SettingsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('fictpact_token')?.value;

  let user = null;

  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);
      // Cek ke DB siapa yang lagi login
      user = await prisma.user.findUnique({
        where: { id: Number(payload.id) },
        select: { username: true, role: true, avatarUrl: true }
      });
    } catch (err) {
      console.error("Token error broskie!");
    }
  }

  if (!user) {
    return <div className="p-10 text-white">Lu belum login broskie!</div>;
  }

  return (
    <main className="min-h-screen bg-[#040414] text-white pb-20">
      
      {/* 🔥 1. LOGIKA NAVBAR PINTER 🔥 */}
      {/* Kalo UMKM panggil NavbarUMKM, kalo bukan panggil AuthNav Siswa */}
      {user.role === 'UMKM' ? (
        <NavbarUMKM userName={user.username} userAvatar={user.avatarUrl} />
      ) : (
        <AuthNav userName={user.username} userAvatar={user.avatarUrl} />
      )}

      <div className="max-w-5xl mx-auto px-6 mt-8">
        
        {/* 🔥 2. HEADER DYNAMIC (Gak hardcode Nasgor lagi!) 🔥 */}
        <div className="flex items-center gap-6 mb-12 border-b border-[#1e293b] pb-8">
          <img
            src={user.avatarUrl || "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&q=80&w=300"}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-[#1e293b] shadow-xl"
          />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-wider">
              {user.username}
            </h1>
            <p className="text-gray-400 text-sm tracking-widest mt-2 uppercase">
              YOUR PERSONAL ACCOUNT • <span className="text-[#f59e0b] font-bold">{user.role}</span>
            </p>
          </div>
        </div>

        {/* 🔥 3. KIRIM ROLE KE FORM BIAR LABELNYA MENYESUAIKAN 🔥 */}
        <PublicProfileForm userRole={user.role} />

        <SecurityForm userRole={user.role} />
        
      </div>
    </main>
  );
}