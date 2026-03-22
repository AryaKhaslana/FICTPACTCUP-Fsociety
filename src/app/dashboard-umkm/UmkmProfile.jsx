"use client";

import Image from "next/image";

// 👇 Tambahin props `misiAktifCount` dan `misiSelesaiCount` buat nangkep angka dari DB
export default function UmkmProfile({ user, misiAktifCount, misiSelesaiCount }) {
  
  const namaUmkm = user?.username || "Guest UMKM";
  const kategori = user?.kategoriBisnis || "F&B";
  
  // 👇 2. Bio udah di-set default-nya ke "Tidak ada bio" kalau kosong
  const bio = user?.bio || "Tidak ada bio";
  
  const avatarSrc = user?.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${namaUmkm}&backgroundColor=f79e00`;

  // 👇 3. Fallback angka. Kalau datanya undefined/null, dia bakal nge-print "-"
  const displayMisiAktif = misiAktifCount ?? "-";
  const displayMisiSelesai = misiSelesaiCount ?? "-";

  return (
    <section className="bg-[#060916] border-1 border-gray-400 rounded-2xl p-6 shadow-[0_0_40px_rgba(0,0,0,0.7)] flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-[#f79e00] to-[#ff4d00] border border-white/20">
          <img
            src={avatarSrc}
            alt={`Foto ${namaUmkm}`}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-1">
          <h2 className="text-lg md:text-xl font-semibold truncate w-40">{namaUmkm}</h2>
          <span className=" items-center font-medium py-1 text-[12px] uppercase tracking-wide text-[#f79e00]">
            {kategori}
          </span>
        </div>
      </div>

      <div className="space-y-3 text-xs md:text-sm text-white/80">
        
        <p className="line-clamp-3 leading-relaxed">
          {bio}
        </p>
      </div>

      <div className="flex items-center justify-between text-[11px] md:text-xs text-white/70 border-y border-white/10 py-4">
        <div className="flex flex-col pl-5 text-[16px]">
          {/* 👇 3. Variabel angka dinamis dipasang di sini */}
          <span className="text-white font-semibold text-center">{displayMisiAktif}</span>
          <span>Misi aktif</span>
        </div>
        <div className="h-8 w-px bg-white/50" />
        <div className="flex flex-col text-center pr-5 text-[16px]">
          {/* 👇 3. Variabel angka dinamis dipasang di sini */}
          <span className="text-white font-semibold">{displayMisiSelesai}</span>
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