import React, { useState } from 'react';
import { Moon, Menu, X } from 'lucide-react';

/**
 * Komponen GuestNav
 * Lokasi: src/app/components/Navbar/GuestNav.jsx
 * Menggunakan font 'Press Start 2P' untuk estetika Pixel Art.
 */

const GuestNav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Quest', href: '#' },
    { name: 'UMKM', href: '#' },
    { name: 'Leaderboard', href: '#' },
  ];

  return (
    <>
      {/* Import Google Fonts langsung untuk Press Start 2P */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
          .font-pixel {
            font-family: 'Press Start 2P', system-ui;
          }
        `}
      </style>

      <nav className="bg-[#OF172A] text-white px-6 py-4 sticky top-0 z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Sisi Kiri: Logo dan Nama Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 flex items-center justify-center">
              {/* Logo naga pixel art sesuai unggahan */}
              <img 
                src="https://api.dicebear.com/7.x/pixel-art/svg?seed=dragon&backgroundColor=transparent" 
                alt="XPact Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-pixel text-lg tracking-wider text-white">
              XPact
            </span>
          </div>

          {/* Tengah: Navigasi Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-medium hover:text-[#f5a623] transition-colors duration-200 uppercase tracking-tighter"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Sisi Kanan: Theme Toggle & Sign Up */}
          <div className="hidden md:flex items-center space-x-6">
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <Moon size={18} className="text-gray-300" />
            </button>
            
            <button className="font-pixel bg-[#f5a623] hover:bg-[#e09612] text-black text-[10px] py-3 px-6 rounded-md transition-all transform active:scale-95 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]">
              Sign Up
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-300"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-[#0b0e14] border-b border-gray-800 py-6 px-6 space-y-6 animate-in fade-in zoom-in duration-200">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block text-sm font-pixel text-gray-300 hover:text-[#f5a623]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 flex flex-col space-y-4 border-t border-gray-800">
              <button className="flex items-center space-x-2 text-gray-300 text-xs font-pixel">
                <Moon size={16} />
                <span>Dark Mode</span>
              </button>
              <button className="font-pixel bg-[#f5a623] text-black text-[10px] py-4 px-6 rounded-md w-full">
                Sign Up
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default GuestNav;