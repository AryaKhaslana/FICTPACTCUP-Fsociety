import React from 'react';
import Link from 'next/link';
import { Github, Instagram } from 'lucide-react';

export const metadata = {
  title: 'About Us | XPact',
};

export default function AboutUsPage() {
  const teamMembers = [
    {
      id: 1,
      name: 'Arya chaka b.w',
      title: 'The Leader',
      roles: 'Project manager, Backend, & cybersec',
      quote: '"Banyak siswa SMK punya skill mumpuni tapi bingung cari wadah portofolio nyata, XPact hadir sebagai arena mereka untuk unjuk gigi sekaligus membantu UMKM naik kelas secara digital."',
      skills: { coding: 95, uiux: 60, bisnis: 85 },
      avatar: '/arya.png', 
    },
    {
      id: 2,
      name: 'Fatih abrisam U.',
      title: 'The Alchemist',
      roles: 'Lead UI/UX & Frontend',
      quote: '"Melihat UMKM kesulitan beradaptasi dengan era digital itu sayang banget. Lewat desain dan interface yang fun ala RPG, saya ingin teknologi terasa lebih mudah dan menyenangkan bagi mereka."',
      skills: { coding: 70, uiux: 95, bisnis: 50 },
      avatar: '/fatih.png', 
    },
    {
      id: 3,
      name: 'Narayana m.a.',
      title: 'The Strategist',
      roles: 'Frontend & backend',
      quote: '"Belajar akan jauh lebih seru jika ada misinya. Melalui sistem gamifikasi XPact, kami mengubah tugas sekolah yang membosankan menjadi petualangan epik yang punya impact di dunia nyata."',
      skills: { coding: 85, uiux: 50, bisnis: 60 },
      avatar: '/narayana.png', 
    },
    {
      id: 4,
      name: 'M. Nawfal R.',
      title: 'The Guardian',
      roles: 'Frontend, Support UI/UX, & editing',
      quote: '"Ide yang hebat butuh sistem yang kuat. Fokus saya adalah memastikan XPact menjadi jembatan yang stabil dan minim bug, sehingga kolaborasi antara siswa dan UMKM berjalan mulus tanpa hambatan."',
      skills: { coding: 80, uiux: 75, bisnis: 40 },
      avatar: '/nawfal.png', 
    }
  ];

  return (
    <div className="min-h-screen bg-[#000010] text-white font-poppins py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* JUDUL HALAMAN */}
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-16 drop-shadow-md">
          About us
        </h1>

        {/* GRID KARTU TIM */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {teamMembers.map((member) => (
            <div 
              key={member.id} 
              className="bg-[#0B0E14] border border-gray-800 rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row gap-6 hover:border-gray-600 transition-colors shadow-lg"
            >
              
              {/* BAGIAN KIRI: FOTO & GRAFIK SKILL */}
              <div className="flex flex-col items-center sm:w-1/3 shrink-0">
                {/* Foto Profil Circle */}
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border-2 border-dashed border-[#F59E0B] p-1 mb-6 relative">
                  <div className="w-full h-full rounded-full overflow-hidden bg-gray-800">
                    {/* 👇 KITA LANGSUNG PANGGIL FOTO ASLINYA DI SINI 👇 */}
                    <img 
                      src={member.avatar} 
                      alt={member.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                </div>

                {/* Grafik Skill (Custom Tailwind, Enteng parah!) */}
                <div className="w-full">
                  <p className="text-[10px] text-center text-gray-500 mb-2">Skill</p>
                  <div className="flex items-end justify-center gap-2 h-24 md:h-28 border-l border-b border-gray-700 pb-1 pl-1 relative">
                    
                    <div className="absolute -left-5 top-0 bottom-0 flex flex-col justify-between text-[8px] text-gray-600 py-1">
                      <span>100</span><span>80</span><span>60</span><span>40</span><span>20</span><span>0</span>
                    </div>

                    <div className="flex flex-col items-center justify-end h-full w-4 md:w-5 group">
                      <div className="w-full bg-[#EF4444] rounded-t-sm transition-all duration-700" style={{ height: `${member.skills.coding}%` }}></div>
                      <span className="text-[8px] text-gray-400 mt-1 rotate-[-45deg] origin-top-left -ml-2">Coding</span>
                    </div>

                    <div className="flex flex-col items-center justify-end h-full w-4 md:w-5 group">
                      <div className="w-full bg-[#3B82F6] rounded-t-sm transition-all duration-700" style={{ height: `${member.skills.uiux}%` }}></div>
                      <span className="text-[8px] text-gray-400 mt-1 rotate-[-45deg] origin-top-left -ml-2">UI/UX</span>
                    </div>

                    <div className="flex flex-col items-center justify-end h-full w-4 md:w-5 group">
                      <div className="w-full bg-[#22C55E] rounded-t-sm transition-all duration-700" style={{ height: `${member.skills.bisnis}%` }}></div>
                      <span className="text-[8px] text-gray-400 mt-1 rotate-[-45deg] origin-top-left -ml-2">Bisnis</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* BAGIAN KANAN: INFO & QUOTE */}
              <div className="flex-1 flex flex-col">
                <h2 className="text-2xl font-bold text-white mb-1">{member.name}</h2>
                
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="text-sm font-bold text-white">{member.title}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]"></span>
                  <span className="text-xs text-gray-400 font-medium">{member.roles}</span>
                </div>

                <p className="text-sm text-gray-300 italic mb-6 leading-relaxed flex-1">
                  {member.quote}
                </p>

                <div className="flex items-center gap-3 mt-auto">
                  <a href="#" className="flex items-center gap-2 bg-white text-black px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-gray-200 transition-colors">
                    <Github size={14} /> GitHub
                  </a>
                  <a href="#" className="flex items-center gap-2 bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:opacity-90 transition-opacity">
                    <Instagram size={14} /> Instagram
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* TOMBOL KELUAR */}
        <div className="mt-16 flex justify-center">
          <Link href="/">
            <button className="bg-[#F59E0B] hover:bg-[#D97706] text-[#000010] font-bold text-lg px-12 py-3 rounded-full transition-transform hover:scale-105 shadow-[0_0_20px_rgba(245,158,11,0.4)]">
              Keluar
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}