"use client";

import React from "react";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    title: "KOPIUM",
    subtitle: "Braja Pratama",
    icon: "/accountant.png", 
    text: "Sebelumnya kami tidak punya identitas brand yang jelas. Setelah posting misi di XPact, kami mendapatkan logo dan feed Instagram yang lebih profesional.",
    mainImage: "/kopiumbg.png",
    avatar: "/kopium-profil1.png",
  },
  {
    id: 2,
    title: "Erlin tabina",
    subtitle: "Logo Designer",
    icon: "/koper.png", 
    text: "Sulit bangun portofolio karena belum pernah pegang klien nyata. Lewat XPact, saya punya proyek yang benar-benar dipakai bisnis.",
    mainImage: "/ditabg.png",
    avatar: "/dita-profil.png",
  },
  {
    id: 3,
    title: "NASGOR",
    subtitle: "Budi susanto",
    icon: "/accountant.png",
    text: "Sebelum saya mengenal XPact saya sangat kesulitan untuk membangun branding di kalangan anak muda, tetapi solusi yang ditawarkan oleh XPact sangat bermanfaat.",
    mainImage: "/nasgorbg.png",
    avatar: "/nasgor-profil.png",
  }
];

const SuccessStory = () => {
  return (
    <div className="min-h-screen bg-[#060813] py-16 px-0 md:px-4 font-pixellari overflow-hidden">
      
      {/* Judul Utama */}
      <h1 className="text-white text-3xl md:text-5xl text-center mb-16 md:mb-28 tracking-widest px-4" 
          style={{ fontFamily: "'Press Start 2P', cursive", lineHeight: "1.4" }}>
        Success Story UMKM
      </h1>

      {/* 🔥 CONTAINER KARTU DIPERBAIKI 🔥 */}
      {/* justify-start biar gak nyangkut di kiri, xl:justify-center biar di laptop gede tetep di tengah.
          Ditambahin px-4 biar ada jarak napas pas discroll di HP */}
      <div className="flex flex-row flex-nowrap justify-start xl:justify-center items-start gap-6 md:gap-8 max-w-[1300px] mx-auto overflow-x-auto pb-10 px-6 snap-x snap-mandatory">
        
        {/* Sembunyiin scrollbar jelek di bawah (opsional, tapi bikin estetik) */}
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
          div {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>

        {testimonials.map((item) => (
          <div
            key={item.id}
            // 🔥 shrink-0 ditambahin biar card-nya tetep 406px dan gak kegencet!
            // 🔥 snap-center biar pas discroll di HP dia otomatis nge-pas di tengah layar
            className="relative shrink-0 snap-center w-[406px] h-[541px] shadow-xl flex flex-col items-start pt-23 pb-1 pl-20 pr-24"
            style={{
              backgroundImage: "url('/scrolls.png')",
              backgroundSize: "100% 100%",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              fontFamily: "'VT323', monospace",
            }}
          >
            {/* Background (mainImage) */}
            <div className="relative w-[240px] h-[92px] mb-4">
              <Image
                src={item.mainImage}
                alt={item.title}
                width={240}
                height={92}
                className="w-[240px] h-[92px] object-cover rounded-sm border-2 border-[#b08050]"
              />
              {/* Avatar */}
              <Image
                src={item.avatar}
                alt={`${item.title} avatar`}
                width={56}
                height={56}
                className="absolute -bottom-4 left-2 w-[56px] h-[56px] rounded-full border-2 border-[#E6BA84] bg-white object-cover shadow-sm"
              />
            </div>

            {/* Title */}
            <h2
              className="text-[#3E2723] uppercase tracking-wide overflow-hidden text-ellipsis font-pixellari mt-2"
              style={{ maxWidth: 225, height: 37, fontSize: 29 }}
            >
              {item.title}
            </h2>

            {/* Subtitle & Icon */}
            <div
              className="flex items-center gap-2 font-pixellari text-left text-[#5a3e26] overflow-hidden mb-3"
              style={{ width: 150, height: 16, fontSize: 16 }}
            >
              <Image src={item.icon} alt="" width={13} height={13} className="w-[13px] h-[13px] shrink-0 object-contain" />
              <span className="truncate">{item.subtitle}</span>
            </div>

            {/* Text */}
            <p
              className="text-[#3E2723] leading-snug overflow-hidden text-left font-pixellari"
              style={{ maxWidth: 225, maxHeight: 134, fontSize: 17 }}
            >
              {item.text}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
};

export default SuccessStory;