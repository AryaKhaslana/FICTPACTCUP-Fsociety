"use client";

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react'; 
import Link from 'next/link';
// 🔥 Pastiin path import ThemeToggle ini udah bener ya!
import ThemeToggle from '../ThemeToggle'; 

const GuestNav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/#home' },
    { name: 'Quest', href: '/#quest' },
    { name: 'UMKM', href: '/#umkm' },
    { name: 'Cara Kerja', href: '/#cara-kerja' }, 
  ];

  return (
    // 🔥 NAVBAR SOLID: bg-white (siang), dark:bg-[#0F172A] (malam) 🔥
    <nav className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-[#0F172A] border-b border-gray-200 dark:border-gray-800 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 py-4">
        
        {/* BLOK 1 KIRI: Logo XPact */}
        <Link href="/#home" className="flex items-center gap-3 cursor-pointer group">
          <div className="w-8 h-8 group-hover:scale-110 transition-transform">
            <img 
              src="/dragon.png" 
              alt="XPact Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          {/* Teks Logo: Hitam pekat (siang), Putih (malam) */}
          <span className="font-pixel text-xl tracking-wider text-black dark:text-white mt-1 group-hover:text-[#FFB800] transition-colors">
            XPACT
          </span>
        </Link>

        {/* BLOK 2 TENGAH: Navigasi Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              // Teks Link: Hitam pekat (siang), Abu terang (malam)
              className="relative group text-sm font-poppins font-semibold text-gray-900 dark:text-gray-300 hover:text-[#FFB800] dark:hover:text-[#FFB800] transition-colors duration-200 py-1"
            >
              {link.name}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#FFB800] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* BLOK 3 KANAN: Tombol Aksi */}
        <div className="hidden md:flex items-center gap-6">
          
          {/* TOMBOL SAKLAR */}
          <ThemeToggle />
          
          <Link href="/register" className="bg-[#FFB800] hover:bg-[#E6A600] text-black text-sm font-bold py-2.5 px-6 rounded-md transition-all shadow-[0_4px_0_0_#996E00] hover:shadow-[0_2px_0_0_#996E00] hover:translate-y-1 active:translate-y-2 active:shadow-none">
            Sign Up
          </Link>
        </div>

        {/* Hamburger Menu Mobile */}
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-900 dark:text-gray-300"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Menu Mobile Terbuka */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-[#0F172A] border-b border-gray-200 dark:border-gray-800 py-4 px-6 flex flex-col gap-4 shadow-xl transition-colors duration-300">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="text-sm font-semibold text-gray-900 dark:text-gray-300 hover:text-[#FFB800] dark:hover:text-[#FFB800] py-2 border-b border-gray-100 dark:border-gray-800"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2 flex flex-col gap-4">
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