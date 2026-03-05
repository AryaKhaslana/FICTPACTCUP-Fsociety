import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-[#0F172A] pt-16 pb-8 px-6 md:px-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        
        {/* GRID UTAMA */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 font-poppins">
          
          {/* KOLOM 1: BRAND & EMAIL */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <img src="/dragon.png" alt="XPact Logo" className="w-10 h-10 object-contain" />
              <span className="font-pixel text-2xl text-white tracking-widest mt-1">XPACT</span>
            </div>
            <div className="flex flex-col gap-4">
              <div className="h-[1px] w-full bg-white/20"></div>
              <p className="text-gray-400 text-sm font-medium">xpactsociety@gmail.com</p>
              <div className="flex items-center gap-2">
                 <img src="/portal.png" alt="Skomda" className="h-6 opacity-60 grayscale hover:grayscale-0 transition-all" />
                 <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">Tentang Kami</span>
              </div>
            </div>
          </div>

          {/* KOLOM 2: SOCIAL MEDIA */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold text-sm mb-2">Social media</h4>
            <ul className="flex flex-col gap-3">
              {['Instagram', 'Facebook', 'Linkedin', 'Github'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-400 hover:text-[#FFB800] text-sm transition-colors font-medium">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* KOLOM 3: SUPPORT */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold text-sm mb-2">Support</h4>
            <ul className="flex flex-col gap-3">
              {['Saweria', 'Paypal'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-400 hover:text-[#FFB800] text-sm transition-colors font-medium">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* KOLOM 4: CS CENTER */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold text-sm mb-2">CS center</h4>
            <ul className="flex flex-col gap-3">
              {['Contact me', 'Privacy', 'FAQ'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-400 hover:text-[#FFB800] text-sm transition-colors font-medium">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* COPYRIGHT */}
        <div className="pt-8 border-t border-gray-800/50">
          <p className="text-xs text-gray-600 font-medium">
            © 2026 Fsociety, skomda
          </p>
        </div>

      </div>
    </footer>
  );
}