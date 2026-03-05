"use client";

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react'; // Moon dihapus dari import ini karena kita pakai gambar lu
import Link from 'next/link';

const GuestNav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Quest', href: '#' },
    { name: 'UMKM', href: '#' },
    { name: 'Leaderboard', href: '#' },
  ];

  return (
    <nav className="bg-[#0F172A] text-white px-6 md:px-12 py-4 sticky top-0 z-50 w-full">
      {/* gap-80 gue hapus karena justify-between udah cukup buat ngedorong ke ujung */}
      <div className="max-w-7xl mx-auto flex items-center justify-between w-full">
        
        {/* BLOK 1 KIRI: Logo XPact */}
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="w-8 h-8">
            <img 
              src="/dragon.png" 
              alt="XPact Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <span className="font-pixel text-xl tracking-wider text-white mt-1">
            XPACT
          </span>
        </div>

        {/* BLOK 2 TENGAH: Navigasi Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-poppins font-semibold hover:text-[#FFB800] transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* BLOK 3 KANAN: Tombol Aksi */}
        <div className="hidden md:flex items-center gap-6">
          <button className="hover:opacity-80 transition-opacity" aria-label="Toggle Dark Mode">
            {/* GANTI NAMA FILE INI SESUAI YANG LU EXPORT KE FOLDER PUBLIC */}
            <img src="/moon.png" alt="Dark Mode" className="w-7 h-7 object-contain" />
          </button>
          
          <Link href="/register" className="bg-[#FFB800] hover:bg-[#E6A600] text-black text-sm font-bold py-2 px-6 rounded-md transition-all shadow-[0_4px_0_0_#996E00] hover:shadow-[0_2px_0_0_#996E00] hover:translate-y-1 active:translate-y-2 active:shadow-none">
            Sign Up
          </Link>
        </div>

        {/* Hamburger Menu Mobile */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-300"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Menu Mobile Terbuka */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#1E1E1E] border-t border-gray-800 py-4 px-6 flex flex-col gap-4 shadow-lg">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-sm font-semibold text-gray-300 hover:text-[#FFB800]">
              {link.name}
            </a>
          ))}
          <div className="border-t border-gray-700 pt-4 flex flex-col gap-4">
            <button className="flex items-center gap-2 text-sm text-gray-300">
              {/* Ini juga diganti buat versi HP-nya */}
              <img src="/moon.png" alt="Dark Mode" className="w-5 h-5 object-contain" />
              <span>Dark Mode</span>
            </button>
            {/* GANTI INI JUGA (Gue tambahin text-center block biar tetep full lebar) */}
            <Link href="/register" className="bg-[#FFB800] text-black text-center block font-bold py-2 rounded-md w-full">
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default GuestNav;