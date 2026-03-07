import React from 'react';
import Link from 'next/link';
import AuthNav from '../components/Navbar'; // Sesuaikan path-nya kalau beda
import { Star, Download, Award, Shield, Image as ImageIcon } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#000010] text-white font-poppins pb-24">
      {/* Panggil Navbar Auth Lu yang udah sakti */}
      <AuthNav />

      <main className="max-w-5xl mx-auto px-4 md:px-6 pt-8 relative z-10">
        
        {/* 1. HEADER / BANNER PIXEL ART */}
        <div className="w-full h-48 md:h-64 rounded-t-3xl overflow-hidden relative border-2 border-gray-800">
          <img 
            src="https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=1200&q=80" 
            alt="Banner Profile" 
            className="w-full h-full object-cover"
          />
          {/* Efek Gradasi Hitam di bawah banner biar nyatu */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] to-transparent opacity-90"></div>
          <h1 className="absolute top-6 left-8 font-pixel text-4xl text-white tracking-widest drop-shadow-lg">Profil</h1>
        </div>

        {/* 2. KARTU PROFIL UTAMA (Numpang di atas banner dikit) */}
        <div className="bg-[#11131A] rounded-b-3xl rounded-tr-none rounded-tl-none border-2 border-t-0 border-gray-800 p-8 shadow-2xl relative -mt-4 flex flex-col md:flex-row gap-8 items-center md:items-start justify-between">
          
          {/* Bagian Kiri: Avatar & Info */}
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-[#F59E0B] shadow-[0_0_20px_rgba(245,158,11,0.3)] bg-gray-800 shrink-0 relative -mt-16 md:-mt-20">
              <img 
                src="https://api.dicebear.com/7.x/pixel-art/svg?seed=Booyah" 
                alt="Kim Booyah" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="mt-2 md:mt-0">
              <h2 className="text-3xl font-bold text-white mb-1">Kim booyah</h2>
              <p className="text-[#F59E0B] font-semibold text-lg mb-3">Web <span className="font-pixel text-xl">Wizard</span></p>
              
              <div className="flex items-center justify-center md:justify-start gap-2 bg-[#1A233A] w-max px-4 py-2 rounded-full border border-gray-700">
                <span className="text-sm text-gray-400 font-bold">Rating:</span>
                <div className="flex text-[#F59E0B] text-sm">
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                </div>
                <span className="text-sm font-bold ml-1">(4.9)</span>
              </div>
            </div>
          </div>

          {/* Bagian Kanan: Stats & Tombol CV */}
          <div className="flex flex-col items-center md:items-end gap-6 w-full md:w-auto">
            {/* Stats Box */}
            <div className="flex gap-6 md:gap-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-900/50 rounded-xl flex items-center justify-center border border-blue-500/50">
                  <span className="font-pixel text-blue-400 text-xl">EXP</span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white leading-none">1990</p>
                  <p className="text-xs text-gray-400 font-bold">Total XP</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-900/50 rounded-xl flex items-center justify-center border border-orange-500/50">
                  <Shield className="text-orange-400" size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white leading-none">Bronze</p>
                  <p className="text-xs text-gray-400 font-bold">Rank</p>
                </div>
              </div>

              <div className="flex items-center gap-3 hidden sm:flex">
                <div className="w-12 h-12 bg-yellow-900/50 rounded-xl flex items-center justify-center border border-yellow-500/50">
                  <Award className="text-yellow-400" size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white leading-none">3</p>
                  <p className="text-xs text-gray-400 font-bold">Badge</p>
                </div>
              </div>
            </div>

            {/* Tombol Cetak CV */}
            <button className="flex items-center gap-2 bg-transparent border-2 border-gray-600 hover:border-[#F59E0B] hover:text-[#F59E0B] text-gray-300 font-bold py-2 px-6 rounded-lg transition-colors">
              <Download size={18} /> Cetak CV
            </button>
          </div>
        </div>

        {/* 3. GRID BAWAH (Achievement & Portofolio) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          
          {/* KOTAK ACHIEVEMENT */}
          <div className="bg-[#11131A] rounded-3xl border border-gray-800 p-8 shadow-lg">
            <h3 className="text-[#F59E0B] font-bold text-lg mb-6 flex items-center gap-2">
              <Award size={20} /> Achievement
            </h3>
            
            <div className="grid grid-cols-2 gap-6">
              {/* Badge 1 */}
              <div className="flex flex-col items-center text-center gap-3">
                <h4 className="font-bold text-white text-sm">Web Wizard</h4>
                <div className="w-20 h-20 rounded-full bg-[#0F172A] border-4 border-blue-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                  <img src="https://api.dicebear.com/7.x/shapes/svg?seed=wizard&backgroundColor=transparent" alt="badge" className="w-12 h-12" />
                </div>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                  Arsitek mahakarya digital. Tidak ada bug tampilan yang tidak bisa kamu basmi!
                </p>
              </div>

              {/* Badge 2 */}
              <div className="flex flex-col items-center text-center gap-3">
                <h4 className="font-bold text-white text-sm">Sepuh design</h4>
                <div className="w-20 h-20 rounded-full bg-[#0F172A] border-4 border-purple-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                  <img src="https://api.dicebear.com/7.x/shapes/svg?seed=design&backgroundColor=transparent" alt="badge" className="w-12 h-12" />
                </div>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                  Sudah sepuh, tidak ada design yang tidak bisa!
                </p>
              </div>
            </div>
          </div>

          {/* KOTAK GALERI PORTOFOLIO */}
          <div className="bg-[#11131A] rounded-3xl border border-gray-800 p-8 shadow-lg">
            <h3 className="text-[#F59E0B] font-bold text-lg mb-6 flex items-center gap-2">
              <ImageIcon size={20} /> Galeri Portofolio
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              {/* Dummy Image 1 */}
              <div className="rounded-xl overflow-hidden border border-gray-700 h-24 hover:border-[#F59E0B] transition-colors cursor-pointer relative group">
                <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&q=80" alt="Portofolio" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs font-bold text-white">Kopium UI</span>
                </div>
              </div>
              {/* Dummy Image 2 */}
              <div className="rounded-xl overflow-hidden border border-gray-700 h-24 hover:border-[#F59E0B] transition-colors cursor-pointer relative group">
                <img src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&q=80" alt="Portofolio" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs font-bold text-white">So Matcha</span>
                </div>
              </div>
              {/* Dummy Image 3 */}
              <div className="rounded-xl overflow-hidden border border-gray-700 h-24 hover:border-[#F59E0B] transition-colors cursor-pointer relative group">
                <img src="https://images.unsplash.com/photo-1626785774573-4b799315345d?w=500&q=80" alt="Portofolio" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs font-bold text-white">Midnight Raven</span>
                </div>
              </div>
              {/* Dummy Image 4 */}
              <div className="rounded-xl overflow-hidden border border-gray-700 h-24 hover:border-[#F59E0B] transition-colors cursor-pointer relative group">
                <img src="https://images.unsplash.com/photo-1618761714954-0b8cd0026356?w=500&q=80" alt="Portofolio" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs font-bold text-white">Kampus Konnect</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}