import React from 'react';

/**
 * Komponen HeroSection
 * Menambahkan latar belakang gambar retro sesuai referensi image_85577e.jpg.
 */
const HeroSection = () => {
  return (
    <section className="relative w-full h-[65vh] flex flex-col justify-center px-10 overflow-hidden bg-black">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-60"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1600')`, // Menggunakan aset retro teknologi serupa image_85577e.jpg
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {/* Gradient untuk memastikan teks terbaca jelas */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#020617] via-[#020617]/40 to-transparent" />

      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Plus+Jakarta+Sans:wght@400;600;800&display=swap');`}
      </style>
      
      <div className="relative z-10 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight uppercase shadow-black" 
            style={{ fontFamily: "'Press Start 2P', cursive", lineHeight: '1.2', textShadow: '4px 4px 0px rgba(0,0,0,0.5)' }}>
          Posting Misi.<br />
          <span className="text-[#f59e0b]">Dapat Hasil.</span>
        </h1>
        <p className="text-base text-gray-200 mb-8 max-w-2xl font-medium drop-shadow-md"
           style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Punya masalah desain logo, bikin web, atau urus sosmed? Serahkan pada talenta muda terbaik kami. Gratis dan ber-impact!
        </p>
        
        <a 
          href="/register"
          className="inline-block bg-[#f59e0b] hover:bg-[#d97706] text-black font-bold py-4 px-10 rounded-xl transition-all shadow-lg cursor-pointer uppercase tracking-wider text-sm active:scale-95"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Daftar UMKM
        </a>
      </div>
    </section>
  );
};

/**
 * Komponen SuccessStory
 * Sesuai dengan referensi gambar image_85bc1f.png dan image_85bd17.png
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
          <div 
            key={story.id} 
            className="group relative flex w-full h-44 rounded-[2rem] overflow-hidden bg-[#0f172a] border border-white/10 shadow-xl cursor-pointer"
          >
            
            <div className="absolute left-0 top-0 bottom-0 w-0 group-hover:w-[65%] h-full transition-all duration-500 ease-in-out z-0 overflow-hidden">
              <img 
                src={story.img} 
                alt={story.title} 
                className="w-full h-full object-cover brightness-[0.6] origin-left" 
              />
            </div>

            <div className="absolute right-0 top-0 bottom-0 w-full group-hover:w-[50%] bg-[#0f172a] flex flex-col items-center justify-center p-4 z-10 transition-all duration-500 ease-in-out"
                 style={{ 
                   borderTopLeftRadius: 'var(--br, 0px)',
                   borderBottomLeftRadius: 'var(--br, 0px)',
                   boxShadow: 'var(--sh, none)'
                 }}>
              
              <style>{`
                .group:hover div { 
                  --br: 120px; 
                  --sh: -30px 0 50px rgba(0,0,0,0.9);
                }
              `}</style>
              
              <div className="mb-3 transition-transform group-hover:scale-90">
                 <div className="w-12 h-12 rounded-full bg-[#f97316] flex items-center justify-center border-2 border-orange-400 shadow-lg">
                    <svg width="24" height="24" viewBox="0 0 100 80" fill="white">
                       <ellipse cx="50" cy="40" rx="30" ry="18" />
                       <circle cx="45" cy="35" r="5" fill="#f97316" />
                    </svg>
                 </div>
              </div>

              <h3 className="text-white text-sm font-bold text-center tracking-tight mb-1">
                {story.title}
              </h3>
              
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full group-hover:inline-block hidden animate-pulse" />
                <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">
                  {story.quest}
                </p>
              </div>

              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                 <span className="text-[9px] font-black text-white border-b border-white/20 pb-0.5">LIHAT DETAIL</span>
              </div>
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
        <p className="text-gray-800 text-[9px] font-bold uppercase tracking-[0.4em]">
          &copy; 2024 FICTPACT-F society
        </p>
      </footer>
    </div>
  );
}