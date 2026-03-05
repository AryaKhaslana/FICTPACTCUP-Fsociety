"use client";

import React, { useState } from 'react';
import { Moon, Menu, X } from 'lucide-react';

const GuestNav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Quest', href: '#' },
    { name: 'UMKM', href: '#' },
    { name: 'Leaderboard', href: '#' },
  ];

  return (
    // Hapus px-120 siluman, ganti dengan px-6 atau px-12
    <nav className="bg-[#1E1E1E] text-white px-6 md:px-12 py-4 sticky top-0 z-50 w-full">
      {/* justify-between akan membagi 3 blok (Kiri, Tengah, Kanan) rata mentok ujung */}
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-80">
        
        {/* BLOK 1 KIRI: Logo XPact */}
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="w-8 h-8">
            <img 
              src="https://api.dicebear.com/7.x/pixel-art/svg?seed=dragon&backgroundColor=transparent" 
              alt="XPact Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          {/* Tinggal panggil class font-pixel yang udah di-setup di globals.css */}
          <span className="font-pixel text-xl tracking-wider text-white mt-1">
            XPact
          </span>
        </div>

        {/* BLOK 2 TENGAH: Navigasi Desktop (Otomatis pakai font Poppins) */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-semibold hover:text-[#FFB800] transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* BLOK 3 KANAN: Tombol Aksi */}
        <div className="hidden md:flex items-center gap-6">
          <button className="text-gray-300 hover:text-white transition-colors" aria-label="Toggle Dark Mode">
            <Moon size={20} />
          </button>
          
          <button className="bg-[#FFB800] hover:bg-[#E6A600] text-black text-sm font-bold py-2 px-6 rounded-md transition-all shadow-[0_4px_0_0_#996E00] hover:shadow-[0_2px_0_0_#996E00] hover:translate-y-1 active:translate-y-2 active:shadow-none">
            Sign Up
          </button>
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
              <Moon size={18} />
              <span>Dark Mode</span>
            </button>
            <button className="bg-[#FFB800] text-black font-bold py-2 rounded-md w-full">
              Sign Up
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default GuestNav;