import React from 'react';

/**
 * Komponen HeroSection
 * Menggunakan tag <a> untuk navigasi kerana 'next/link' tidak dapat dikesan dalam persekitaran preview ini.
 * Kod ini akan tetap berfungsi secara automatik dengan sistem routing folder /register anda di Next.js.
 */
const HeroSection = () => {
  return (
    <section className="relative w-full h-[65vh] flex flex-col justify-center px-10 overflow-hidden bg-cover bg-center" 
      style={{ 
        backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2000")' 
      }}>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');`}
      </style>
      
      <div className="relative z-10 max-w-4xl">
        <h1 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight uppercase" 
            style={{ fontFamily: "'Press Start 2P', cursive", lineHeight: '1.4' }}>
          Posting Misi.<br />
          Dapat Hasil Nyata.
        </h1>
        <p className="text-sm md:text-base text-gray-200 mb-8 max-w-2xl font-medium leading-relaxed"
           style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Punya masalah desain logo, bikin web, atau urus sosmed? Serahkan pada talenta muda terbaik kami. Gratis dan ber-impact!
        </p>
        
        {/* Menggunakan tag <a> untuk mengelakkan ralat kompilasi pada preview */}
        {/* Apabila anda menyalin kod ini ke VS Code Next.js, anda boleh menukarnya kembali kepada <Link href="/register"> */}
        <a href="/register">
          <button 
            className="bg-[#f59e0b] hover:bg-[#d97706] text-black font-bold py-3.5 px-10 rounded-xl transition-all transform hover:scale-105 shadow-lg cursor-pointer"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Daftar UMKM
          </button>
        </a>
      </div>
    </section>
  );
};

/**
 * Komponen SuccessStory
 * Reka bentuk kad dengan panel biru melengkung (pill-shape) yang memotong imej piring.
 * Gambar digeser lebih ke kanan (object-[85%]) untuk menghilangkan celah.
 */
const SuccessStory = () => {
  const stories = [
    { id: 1, title: 'Nasgor Mas Ambas', quest: '3 Quest selesai', img: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&q=80&w=600' },
    { id: 2, title: 'Nasgor Mas Ambas', quest: '3 Quest selesai', img: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&q=80&w=600' },
    { id: 3, title: 'Nasgor Mas Ambas', quest: '3 Quest selesai', img: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&q=80&w=600' },
  ];

  return (
    <section className="bg-[#020617] h-[35vh] flex items-center px-10">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        {stories.map((story) => (
          <div key={story.id} className="relative flex w-full h-44 rounded-[2.5rem] overflow-hidden bg-[#0a1224] border border-white/5 shadow-2xl transition-transform hover:scale-[1.02]">
            
            {/* Bahagian Imej Nasi Goreng - Digeser ke kanan agar piring rapat ke panel biru */}
            <div className="w-[55%] h-full overflow-hidden">
              <img 
                src={story.img} 
                alt={story.title} 
                className="w-full h-full object-cover object-[85%_50%] brightness-[0.5]" 
              />
            </div>

            {/* Panel Biru Informasi (Lengkungan Samping yang Menutup Imej) */}
            <div className="absolute right-0 top-0 bottom-0 w-[58%] bg-[#0f172a] flex flex-col items-center justify-center p-4 z-10"
                 style={{ 
                   borderRadius: '100px 0 0 100px',
                   boxShadow: '-20px 0 40px rgba(0,0,0,0.6)' 
                 }}>
              
              <div className="mb-2">
                 <svg width="80" height="65" viewBox="0 0 100 80" fill="none">
                    <circle cx="50" cy="40" r="30" fill="#f97316" />
                    <ellipse cx="50" cy="35" rx="20" ry="12" fill="#fbbf24" stroke="white" strokeWidth="2" />
                    <circle cx="42" cy="30" r="5" fill="white" />
                    <text x="50%" y="62%" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Nasgor</text>
                 </svg>
              </div>

              <h3 className="text-white text-sm font-bold text-center leading-tight mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {story.title}
              </h3>
              <p className="text-gray-400 text-[10px] font-medium" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {story.quest}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default function App() {
  return (
    <div className="h-screen w-full bg-[#020617] text-white flex flex-col overflow-hidden">
      <main className="flex-grow flex flex-col h-full relative">
        <HeroSection />
        <SuccessStory />
      </main>

      <footer className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
        <p className="text-gray-700 text-[10px] font-bold uppercase tracking-[0.25em]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          &copy; 2024 FICTPACT-F society
        </p>
      </footer>
    </div>
  );
}