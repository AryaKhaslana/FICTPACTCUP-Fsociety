"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Moon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // State tambahan buat UI
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter(); 

  const handleLogin = async (e) => {
    e.preventDefault(); 
    setIsLoading(true);
    setErrorMsg(''); 

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        console.log(data.message); 
        
        const userRole = data.user.role;

        if (userRole === 'UMKM') {
          router.push('/dashboard-umkm'); 
        } else if (userRole === 'STUDENT') {
          router.push('/dashboard-siswa'); 
        } else {
          router.push('/'); 
        }
        
      } else {
        setErrorMsg(data.message); 
      }
    } catch (error) {
      console.error('Error nembak API:', error);
      setErrorMsg('Gagal konek ke server bro!');
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden">
      
      {/* 1. BACKGROUND GAMBAR */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/login-bg.png" 
          alt="Login Background"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Tombol Dark Mode */}
      <button className="absolute bottom-8 right-8 z-20 bg-black/60 hover:bg-black/80 p-3 rounded-full text-white transition-colors">
        <Moon size={24} />
      </button>

      {/* 2. KONTEN UTAMA */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-md">
        
        {/* TEKS TENGAH DAN LOGO */}
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10">
              <img src="/dragon.png" alt="Logo" />
            </div>
            <h1 className="font-pixel text-4xl text-white tracking-widest mt-2 drop-shadow-md">XPACT</h1>
          </div>
          <p className="text-white text-sm drop-shadow-md">Selamat datang Kembali!</p>
          <p className="text-white text-sm drop-shadow-md">Login untuk melanjutkan perjalananmu</p>
        </div>

        {/* 3. CARD FORM PUTIH (🔥 BANG SEPUH TAMBAHIN 'relative' DI SINI 🔥) */}
        <div className="bg-white w-full rounded-2xl p-8 shadow-2xl relative">
          
          {/* 🔥 TOMBOL X DEWA BANG SEPUH 🔥 */}
          <Link 
            href="/" 
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-[#E11D48] hover:text-white transition-all transform active:scale-95 z-20"
            title="Kembali ke Beranda"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </Link>

          {/* KOTAK GOOGLE & LINKEDIN */}
          <div className="flex gap-4 mb-6 mt-2">
            <button className="flex-1 flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 transition-all shadow-[0_4px_0_0_#9C9C9C] hover:shadow-[0_2px_0_0_#9C9C9C] hover:translate-y-1 active:translate-y-2 active:shadow-none">
              <Image src="/google.png" alt="Google" width={20} height={20} />
              <span className="text-sm font-bold text-gray-700">Google</span>
            </button>
            <button className="flex-1 flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 transition-all shadow-[0_4px_0_0_#9C9C9C] hover:shadow-[0_2px_0_0_#9C9C9C] hover:translate-y-1 active:translate-y-2 active:shadow-none">
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

          {/* Menampilkan pesan error */}
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
              className={`bg-[#3B82F6]] hover:bg-[#3B82F6] text-white text-sm font-bold py-2 px-6 rounded-md transition-all shadow-[0_4px_0_0_#346CC7] hover:shadow-[0_2px_0_0_#346CC7] hover:translate-y-1 active:translate-y-2 active:shadow-none ${
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