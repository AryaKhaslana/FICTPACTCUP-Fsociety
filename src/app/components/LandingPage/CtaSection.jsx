import React from 'react';

/**
 * Komponen HeroSection
 */
const HeroSection = () => {
  return (
    // 🔥 Ubah h-[65vh] jadi min-h-[70vh] md:min-h-[65vh] biar di HP gak sempit/ketabrak
    <section className="relative w-full min-h-[70vh] md:min-h-[65vh] flex flex-col justify-center px-6 md:px-10 overflow-hidden bg-black py-12 md:py-0">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-100"
        style={{
          backgroundImage: `url('/flower.png')`, 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {/* Gradient untuk memastikan teks terbaca jelas */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#020617] via-[#020617]/40 md:via-[#020617]/20 to-transparent" />

      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Plus+Jakarta+Sans:wght@400;600;800&display=swap');`}
      </style>
      
      <div className="relative z-10 max-w-4xl mt-12 md:mt-0">
        <h1 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight uppercase shadow-black" 
            style={{ fontFamily: "'Press Start 2P', cursive", lineHeight: '1.4', textShadow: '4px 4px 0px rgba(0,0,0,0.5)' }}>
          Posting Misi.<br className="hidden md:block"/>
          <span className="text-[#f59e0b] block md:inline md:mt-0 mt-2">Dapat Hasil Nyata.</span>
        </h1>
        <p className="text-sm md:text-base text-gray-200 mb-8 max-w-2xl font-medium drop-shadow-md leading-relaxed"
           style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Punya masalah desain logo, bikin web, atau urus sosmed? Serahkan pada talenta muda terbaik kami. Gratis dan ber-impact!
        </p>
        
        <a 
          href="/register"
          // 🔥 text-1xl itu ga ada di Tailwind mpruy, ganti jadi text-lg aja!
          className="inline-block bg-[#f59e0b] text-base md:text-lg font-pixellari hover:bg-[#d97706] text-black font-bold py-3 md:py-4 px-8 md:px-10 rounded-xl transition-all shadow-[0_4px_0_rgb(180,83,9)] hover:translate-y-[2px] hover:shadow-[0_2px_0_rgb(180,83,9)] active:translate-y-[4px] active:shadow-none cursor-pointer uppercase tracking-wider"
          >
          Daftar UMKM
        </a>
      </div>
    </section>
  );
};


const SuccessStory = () => {
  // 🔥 DUMMY DATA UDAH BANG SEPUH UPDATE BIAR GAK KEMBAR TIGA! 🔥
  const stories = [
    { 
      id: 1, 
      title: 'Nasgor Mas Ambas', 
      quest: '12 Quest selesai', 
      img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=600',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=NA&backgroundColor=f97316'
    },
    { 
      id: 2, 
      title: 'Kedai Kopi Galagher', 
      quest: '8 Quest selesai', 
      img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=600',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=KN&backgroundColor=f97316'
    },
    { 
      id: 3, 
      title: 'Ayam geprek by Noelle', 
      quest: '5 Quest selesai', 
      img: '/ayam-geprek.jpg',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=HN&backgroundColor=f97316'
    },
  ];

  return (
    // 🔥 Kasih padding Y (py-12) biar di HP gak sempit
    <section className="bg-[#020617] min-h-[35vh] flex items-center px-6 md:px-10 py-12 md:py-0">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {stories.map((story) => (
          <div 
            key={story.id} 
            className="group relative flex w-full h-56 md:h-44 rounded-[2rem] overflow-hidden bg-[#0f172a] border border-white/10 shadow-xl cursor-pointer"
          >
            
            <div className="absolute left-0 top-0 bottom-0 w-full md:w-0 md:group-hover:w-[65%] h-full transition-all duration-500 ease-in-out z-0 overflow-hidden">
              <img 
                src={story.img} 
                alt={story.title} 
                // Di HP dibikin lebih gelap dikit (0.4) biar teksnya kebaca
                className="w-full h-full object-cover brightness-[0.4] md:brightness-[0.6] origin-left" 
              />
            </div>

            <div className="absolute right-0 top-0 bottom-0 w-full md:group-hover:w-[50%] bg-transparent md:bg-[#0f172a] flex flex-col items-center justify-center p-4 z-10 transition-all duration-500 ease-in-out md:group-hover:rounded-l-[100px] md:group-hover:shadow-[-30px_0_50px_rgba(0,0,0,0.9)]">
              
              <div className="mb-3 transition-transform md:group-hover:scale-90">
                 <div className="w-12 h-12 rounded-full bg-[#f97316] overflow-hidden border-2 border-orange-400 shadow-lg">
                    <img src={story.avatar} alt="Logo" className="w-full h-full object-cover" />
                 </div>
              </div>

              <h3 className="text-white text-base md:text-sm font-bold text-center tracking-tight mb-1">
                {story.title}
              </h3>
              
              <div className="flex items-center gap-2">
                {/* Di HP titik ijonya selalu nyala, di laptop nyala pas dihover */}
                <span className="w-2 h-2 bg-green-500 rounded-full inline-block md:hidden md:group-hover:inline-block animate-pulse" />
                <p className="text-gray-300 md:text-gray-400 text-[10px] md:text-xs uppercase font-bold tracking-widest">
                  {story.quest}
                </p>
              </div>

              <div className="mt-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
                 <span className="text-[10px] font-black text-[#f59e0b] md:text-white border-b border-[#f59e0b] md:border-white/20 pb-0.5">
                   LIHAT DETAIL
                 </span>
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
    <main className="min-h-screen w-full bg-[#020617] text-white flex flex-col pb-20">
      <HeroSection />
      <SuccessStory />
    </main>
  );
}