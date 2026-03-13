"use client";

import Image from "next/image";

// 👇 1. Tambahin { user } di sini buat nangkep lemparan data dari page.jsx
export default function UmkmProfile({ user }) {
  
  // 👇 2. Kita ekstrak datanya. Kasih nilai default kalau di DB masih kosong (null)
  const namaUmkm = user?.username || "Nasgor mas ambas";
  const kategori = user?.kategoriBisnis || "F&B";
  const bio = user?.bio || "Menyediakan racikan nasi goreng penambah HP terbaik se-Sidoarjo. Sedang mencari pahlawan visual!";
  
  // 👇 3. Bikin Avatar Dinamis (Kalau di DB ga ada foto, pake inisial keren)
  const avatarSrc = user?.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${namaUmkm}&backgroundColor=f79e00`;

  // Data statis buat pemanis UI (karena blm ada di table DB lu)
  const rating = "4.8";
  const misiAktif = 5;
  const misiSelesai = 1;

  return (
    <section className="bg-[#060916] border-1 border-gray-400 rounded-2xl p-6 shadow-[0_0_40px_rgba(0,0,0,0.7)] flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-[#f79e00] to-[#ff4d00] border border-white/20">
          
          {/* Pake tag img biasa biar aman narik gambar dari link luar (Dicebear) tanpa pusing config Next.js */}
          <img
            src={avatarSrc}
            alt={`Foto ${namaUmkm}`}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-1">
          {/* Variabel namaUmkm dipanggil di sini */}
          <h2 className="text-lg md:text-xl font-semibold truncate w-40">{namaUmkm}</h2>
          
          {/* Variabel kategori dipanggil di sini */}
          <span className=" items-center font-medium py-1 text-[15px] uppercase tracking-wide text-[#f79e00]">
            {kategori}
          </span>
        </div>
      </div>

      <div className="space-y-3 text-xs md:text-sm text-white/80">
        <div className="flex items-center gap-1 text-[#f79e00] text-[20px]">
          <span>★★★★★</span>
          <span className="ml-1 text-[11px] text-white/60">({rating}/5.0)</span>
        </div>
        
        {/* Variabel bio dipanggil di sini */}
        <p className="line-clamp-3 leading-relaxed">
          {bio}
        </p>
      </div>

      <div className="flex items-center justify-between text-[11px] md:text-xs text-white/70 border-y border-white/10 py-4">
        <div className="flex flex-col pl-5 text-[16px]">
          <span className="text-white font-semibold text-center">{misiAktif}</span>
          <span>Misi aktif</span>
        </div>
        <div className="h-8 w-px bg-white/50" />
        <div className="flex flex-col text-center pr-5 text-[16px]">
          <span className="text-white font-semibold">{misiSelesai}</span>
          <span>Misi selesai</span>
        </div>
      </div>

      <button
        type="button"
        className="w-full py-2 rounded-[7px] border-1 border-gray-400 text-base font-pixellari text-gray-300 transition-all shadow-[0_4px_0_0_#A8A8A8] hover:shadow-[0_2px_0_0_#A8A8A8] hover:translate-y-1 active:translate-y-2 active:shadow-none"
      >
        Lihat Profil
      </button>
    </section>
  );
}