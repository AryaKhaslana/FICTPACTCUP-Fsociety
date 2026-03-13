"use client";

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react'; 
import Link from 'next/link';

const GuestNav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 🔥 1. GANTI href JADI NGARAH KE ID YANG ADA DI page.jsx 🔥
  const navLinks = [
    { name: 'Home', href: '/#home' },
    { name: 'Quest', href: '/#quest' },
    { name: 'UMKM', href: '/#umkm' },
    { name: 'Cara Kerja', href: '/#cara-kerja' }, // Ini gue ganti jadi Cara Kerja biar sinkron sama HowItWorks lu
  ];

  return (
    // 🔥 2. UBAH sticky JADI fixed BIAR NAVBARNYA BENER-BENER MELAYANG DI ATAS 🔥
    <nav className="fixed top-0 left-0 bg-[#0F172A]/90 backdrop-blur-md text-white px-6 md:px-12 py-4 z-50 w-full border-b border-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between w-full">
        
        {/* BLOK 1 KIRI: Logo XPact */}
        <Link href="/#home" className="flex items-center gap-3 cursor-pointer group">
          <div className="w-8 h-8 group-hover:scale-110 transition-transform">
            <img 
              src="/dragon.png" 
              alt="XPact Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <span className="font-pixel text-xl tracking-wider text-white mt-1 group-hover:text-[#FFB800] transition-colors">
            XPACT
          </span>
        </Link>

        {/* BLOK 2 TENGAH: Navigasi Desktop dengan Garis Animasi Hover */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative group text-sm font-poppins font-semibold text-gray-300 hover:text-white transition-colors duration-200 py-1"
            >
              {link.name}
              {/* Garis Bawah Meluncur ala Bang Sepuh */}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#FFB800] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* BLOK 3 KANAN: Tombol Aksi */}
        <div className="hidden md:flex items-center gap-6">
          <button className="hover:opacity-80 hover:scale-110 transition-all" aria-label="Toggle Dark Mode">
            <img src="/moon.png" alt="Dark Mode" className="w-6 h-6 object-contain" />
          </button>
          
          <Link href="/register" className="bg-[#FFB800] hover:bg-[#E6A600] text-black text-sm font-bold py-2.5 px-6 rounded-md transition-all shadow-[0_4px_0_0_#996E00] hover:shadow-[0_2px_0_0_#996E00] hover:translate-y-1 active:translate-y-2 active:shadow-none">
            Sign Up
          </Link>
        </div>

        {/* Hamburger Menu Mobile */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-300 hover:text-white"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Menu Mobile Terbuka */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#0F172A] border-b border-gray-800 py-4 px-6 flex flex-col gap-4 shadow-xl">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsMobileMenuOpen(false)} // Otomatis nutup menu kalo di-klik
              className="text-sm font-semibold text-gray-300 hover:text-[#FFB800] py-2 border-b border-gray-800"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2 flex flex-col gap-4">
            <button className="flex items-center gap-3 text-sm font-semibold text-gray-300 hover:text-white py-2">
              <img src="/moon.png" alt="Dark Mode" className="w-5 h-5 object-contain" />
              <span>Ganti Tema</span>
            </button>
            <Link href="/register" className="bg-[#FFB800] hover:bg-[#E6A600] text-black text-center font-bold py-3 rounded-md w-full transition-colors">
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default GuestNav;