import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    // 🔥 1. BACKGROUND FOOTER: Putih (Siang), Gelap (Malam)
    <footer className="w-full bg-white dark:bg-[#0F172A] pt-16 pb-8 px-6 md:px-12 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* GRID UTAMA */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 font-poppins">
          
          {/* KOLOM 1: BRAND & EMAIL */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <img src="/dragon.png" alt="XPact Logo" className="w-10 h-10 object-contain" />
              {/* Teks Logo: Hitam (Siang), Putih (Malam) */}
              <span className="font-pixel text-2xl text-gray-900 dark:text-white tracking-widest mt-1 transition-colors">XPACT</span>
            </div>
            <div className="flex flex-col gap-4">
              {/* Garis Pembatas Kecil */}
              <div className="h-[1px] w-full bg-gray-300 dark:bg-white/20 transition-colors"></div>
              {/* Teks Email */}
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium transition-colors">xpactsociety@gmail.com</p>
              <div className="flex items-center gap-2">
                 <img src="/portal.png" alt="Skomda" className="h-6 opacity-60 grayscale hover:grayscale-0 transition-all" />
                 <Link 
                  href="/about" 
                  className="text-[10px] text-gray-700 dark:text-gray-500 font-bold uppercase tracking-tighter hover:text-[#F59E0B] dark:hover:text-[#F59E0B] transition-colors cursor-pointer"
                >
                  Tentang Kami
                </Link>
              </div>
            </div>
          </div>

          {/* KOLOM 2: SOCIAL MEDIA */}
          <div className="flex flex-col gap-4">
            {/* Judul Kolom: Hitam (Siang), Putih (Malam) */}
            <h4 className="text-gray-900 dark:text-white font-bold text-sm mb-2 transition-colors">Social media</h4>
            <ul className="flex flex-col gap-3">
              {['Instagram', 'Facebook', 'Linkedin', 'Github'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-[#FFB800] dark:hover:text-[#FFB800] text-sm transition-colors font-medium">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* KOLOM 3: SUPPORT */}
          <div className="flex flex-col gap-4">
            <h4 className="text-gray-900 dark:text-white font-bold text-sm mb-2 transition-colors">Support</h4>
            <ul className="flex flex-col gap-3">
              {['Saweria', 'Paypal'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-[#FFB800] dark:hover:text-[#FFB800] text-sm transition-colors font-medium">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* KOLOM 4: CS CENTER */}
          <div className="flex flex-col gap-4">
            <h4 className="text-gray-900 dark:text-white font-bold text-sm mb-2 transition-colors">CS center</h4>
            <ul className="flex flex-col gap-3">
              {['Contact me', 'Privacy', 'FAQ'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-[#FFB800] dark:hover:text-[#FFB800] text-sm transition-colors font-medium">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* COPYRIGHT */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800/50 transition-colors">
          <p className="text-xs text-gray-500 dark:text-gray-600 font-medium transition-colors">
            © 2026 Fsociety, skomda
          </p>
        </div>

      </div>
    </footer>
  );
}