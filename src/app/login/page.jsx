"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Moon } from 'lucide-react';
import { useRouter } from 'next/navigation'; // Wajib pakai ini buat pindah halaman

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // State tambahan buat UI
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter(); // Inisialisasi router

  const handleLogin = async (e) => {
    e.preventDefault(); // Mencegah browser refresh
    setIsLoading(true);
    setErrorMsg(''); // Reset error tiap kali mau nembak

    try {
      // Nembak API. Pastikan URL ini sesuai dengan folder API lu (misal: src/app/api/auth/login/route.ts)
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Data yang dikirim ke backend
        body: JSON.stringify({ email, password }),
      });

      // Tangkap surat balasan dari API lu
      const data = await response.json();

      if (response.ok && data.success) {
        console.log(data.message); 
        
        // 1. Ambil role dari data user yang dikirim backend
        const userRole = data.user.role;

        // 2. Bikin logika if/else untuk misahin rute
        if (userRole === 'UMKM') {
          router.push('/dashboard-umkm'); // Ganti dengan nama folder dashboard UMKM lu
        } else if (userRole === 'STUDENT') {
          router.push('/dashboard-siswa'); // Ganti dengan nama folder dashboard Siswa lu
        } else {
          router.push('/'); // Fallback aman kalau role tidak terbaca
        }
        
      } else {
        // Kalau gagal (Email ga kedaftar, password salah, dll)
        setErrorMsg(data.message); 
      }
    } catch (error) {
      console.error('Error nembak API:', error);
      setErrorMsg('Gagal konek ke server bro!');
    } finally {
      setIsLoading(false); // Matiin loading
    }
  };

  return (
    // Hilangkan bg-[#1E1E1E] agar background gambarnya terlihat
    <main className="relative min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden">
      
      {/* 1. BACKGROUND GAMBAR (Posisi paling belakang z-0) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/login-bg.png" // Ganti dengan nama file background malam lu di folder public
          alt="Login Background"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Overlay tipis agar teks putih lebih mudah dibaca */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Tombol Dark Mode (Pojok Kanan Bawah) */}
      <button className="absolute bottom-8 right-8 z-20 bg-black/60 hover:bg-black/80 p-3 rounded-full text-white transition-colors">
        <Moon size={24} />
      </button>

      {/* 2. KONTEN UTAMA (Posisi di depan z-10) */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-md">
        
        {/* TEKS TENGAH DAN LOGO */}
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10">
              {/* Logo Naga XPact */}
              <img src="/dragon.png" alt="Logo" />
            </div>
            {/* Teks XPact otomatis pakai font pixel lu */}
            <h1 className="font-pixel text-4xl text-white tracking-widest mt-2 drop-shadow-md">XPACT</h1>
          </div>
          <p className="text-white text-sm drop-shadow-md">Selamat datang Kembali!</p>
          <p className="text-white text-sm drop-shadow-md">Login untuk melanjutkan perjalananmu</p>
        </div>

        {/* 3. CARD FORM PUTIH */}
        <div className="bg-white w-full rounded-2xl p-8 shadow-2xl">
          
          {/* KOTAK GOOGLE & LINKEDIN */}
          <div className="flex gap-4 mb-6">
            <button className="flex-1 flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 hover:bg-gray-100 transition shadow-sm">
              <Image src="/google.png" alt="Google" width={20} height={20} />
              <span className="text-sm font-bold text-gray-700">Google</span>
            </button>
            <button className="flex-1 flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 hover:bg-gray-100 transition shadow-sm">
              <Image src="/linkedin.png" alt="LinkedIn" width={20} height={20} />
              <span className="text-sm font-bold text-gray-700">LinkedIn</span>
            </button>
          </div>

          {/* GARIS "OR" */}
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px bg-gray-300 flex-1"></div>
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">or</span>
            <div className="h-px bg-gray-300 flex-1"></div>
          </div>

          {/* Menampilkan pesan error warna merah kalau login gagal */}
          {errorMsg && (
            <div className="mb-4 p-3 bg-red-100 text-red-600 border border-red-300 rounded-md text-sm font-semibold text-center">
              {errorMsg}
            </div>
          )}

          {/* FORM LOGIN */}
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-black placeholder-gray-400 font-medium"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-black placeholder-gray-400 font-medium"
              required
            />
            
            <button 
              type="submit"
              disabled={isLoading}
              className={`w-full text-white font-bold py-3.5 rounded-lg mt-4 transition shadow-md ${
                isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#3B82F6] hover:bg-blue-600'
              }`}
            >
              {isLoading ? 'Loading...' : 'Log In'}
            </button>
          </form>

          {/* LINK DAFTAR */}
          <p className="text-center text-sm text-gray-600 mt-6 font-medium">
            Belum punya Akun? <Link href="/register" className="text-[#3B82F6] hover:underline font-bold">Daftar</Link>
          </p>

        </div>
      </div>
    </main>
  );
}