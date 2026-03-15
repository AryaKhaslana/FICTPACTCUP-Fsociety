"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// 🔥 1. IMPORT SAKLAR SAKTI
import ThemeToggle from '../components/ThemeToggle'; 

export default function RegisterPage() {
  // State Role
  const [role, setRole] = useState('STUDENT'); // Default: SISWA
  
  // State untuk Form SISWA
  const [nama, setNama] = useState('');
  
  // State untuk Form UMKM
  const [namaBisnis, setNamaBisnis] = useState('');
  const [kategoriBisnis, setKategoriBisnis] = useState('');
  const [lokasi, setLokasi] = useState('');
  
  // State Umum (Dipakai dua-duanya)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      const payload = role === 'STUDENT' 
        ? { nama, email, password, role } 
        : { namaBisnis, kategoriBisnis, lokasi, email, password, role };

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        router.push('/login');
      } else {
        setErrorMsg(data.message || 'Gagal mendaftar bro!');
      }
    } catch (error) {
      console.error('Error register:', error);
      setErrorMsg('Server meledak, coba lagi nanti!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden">
      
      {/* 🔥 2. BACKGROUND 2 ALAM (SIANG & MALAM) 🔥 */}
      <div className="absolute inset-0 z-0 bg-blue-200 dark:bg-[#0B1026] transition-colors duration-500">
        <Image
          src="/login-light.png" 
          alt="Register Background Day"
          fill
          className="object-cover object-center block dark:hidden"
          priority
        />
        <Image
          src="/login-bg.png" 
          alt="Register Background Night"
          fill
          className="object-cover object-center hidden dark:block"
          priority
        />
        <div className="absolute inset-0 bg-white/10 dark:bg-black/20 transition-colors duration-500"></div>
      </div>

      {/* 🔥 3. TOMBOL SAKLAR DEWA 🔥 */}
      <div className="absolute bottom-8 right-8 z-20 bg-white/50 dark:bg-black/60 backdrop-blur-md hover:scale-110 p-1.5 rounded-full transition-all shadow-lg border border-white/20 dark:border-gray-700">
        <ThemeToggle />
      </div>

      {/* KONTEN UTAMA */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-md mt-4">
        
        {/* HEADER */}
        <div className="text-center mb-6 flex flex-col items-center">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10">
              <img src="/dragon.png" alt="Logo" />
            </div>
            {/* Teks XPACT bisa ganti warna Hitam/Putih */}
            <h1 className="font-pixel text-4xl text-gray-900 dark:text-white tracking-widest mt-2 drop-shadow-md transition-colors">XPACT</h1>
          </div>
        </div>

        {/* CARD FORM PUTIH (GAK DISENTUH SAMA SEKALI) */}
        <div className="bg-white w-full rounded-2xl p-8 shadow-2xl">
          
          {/* TOGGLE ROLE (SISWA / UMKM) */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-5 mx-auto max-w-50">
            <button
              type="button"
              onClick={() => setRole('STUDENT')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${
                role === 'STUDENT' ? 'bg-white text-[#3B82F6] shadow-sm' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              SISWA
            </button>
            <button
              type="button"
              onClick={() => setRole('UMKM')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${
                role === 'UMKM' ? 'bg-white text-[#3B82F6] shadow-sm' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              UMKM
            </button>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 bg-red-100 text-red-600 border border-red-300 rounded-md text-sm font-semibold text-center">
              {errorMsg}
            </div>
          )}

          {/* FORM INPUT DINAMIS */}
          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            
            {role === 'STUDENT' ? (
              <>
                <input
                  type="text"
                  placeholder="Nama Lengkap"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-black placeholder-gray-400 font-medium text-sm"
                  required
                />
              </>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Nama Bisnis"
                  value={namaBisnis}
                  onChange={(e) => setNamaBisnis(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-black placeholder-gray-400 font-medium text-sm"
                  required
                />
                
                <select
                  value={kategoriBisnis}
                  onChange={(e) => setKategoriBisnis(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-black placeholder-gray-400 font-medium text-sm appearance-none bg-white"
                  required
                >
                  <option value="" disabled>Kategori bisnis</option>
                  <option value="F&B">Food & Beverage (F&B)</option>
                  <option value="Jasa">Jasa / Layanan</option>
                  <option value="Retail">Retail / Toko</option>
                  <option value="Kreatif">Industri Kreatif</option>
                </select>

                <input
                  type="text"
                  placeholder="Lokasi (Kota/Alamat)"
                  value={lokasi}
                  onChange={(e) => setLokasi(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-black placeholder-gray-400 font-medium text-sm"
                  required
                />
              </>
            )}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-black placeholder-gray-400 font-medium text-sm"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-black placeholder-gray-400 font-medium text-sm"
              required
            />
            
            <button 
              type="submit"
              disabled={isLoading}
              className={`text-white text-sm font-bold py-3 px-6 rounded-lg transition-all shadow-[0_4px_0_0_#2563EB] hover:shadow-[0_2px_0_0_#2563EB] hover:translate-y-1 active:translate-y-2 active:shadow-none mt-2 ${
                isLoading ? 'bg-gray-400 cursor-not-allowed shadow-none' : 'bg-[#3B82F6] hover:bg-blue-600'
              }`}
            >
              {isLoading ? 'Memproses...' : 'Daftar'}
            </button>
          </form>

          {/* FOOTER LINK */}
          <p className="text-center text-xs text-gray-500 mt-6 font-medium">
            Sudah punya Akun? <Link href="/login" className="text-[#3B82F6] hover:underline font-bold">Login</Link>
          </p>

        </div>
      </div>
    </main>
  );
}