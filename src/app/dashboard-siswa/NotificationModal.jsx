import React from 'react';
import { X } from 'lucide-react';

export default function NotificationModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  // Data palsu (dummy) buat ngetes UI sesuai desain lu
  const notifications = [
    { 
      id: 1, 
      type: 'success', 
      text: 'Nasgor Mas Ambas menyetujui hasil desainmu!', 
      highlight: '+500 XP', 
      time: '2 jam yang lalu', 
      unread: true 
    },
    { 
      id: 2, 
      type: 'warning', 
      text: 'Desain UMKM Kopium butuh sedikit revisi.', 
      highlight: '', 
      time: '4 jam yang lalu', 
      unread: true, 
      isRedText: true // Bikin teksnya jadi merah
    },
    { 
      id: 3, 
      type: 'quest', 
      text: 'Misi Baru: Buatin website UMKM mie ayam solo pak sukir, Reward', 
      highlight: '+2000 XP', 
      time: '1 hari yang lalu', 
      unread: true 
    },
    { 
      id: 4, 
      type: 'quest', 
      text: 'Misi Baru: Buatin website UMKM batagor solo pak sukma, Reward', 
      highlight: '+2000 XP', 
      time: '1 hari yang lalu', 
      unread: false 
    },
    { 
      id: 5, 
      type: 'warning', 
      text: 'Desain UMKM nasgor mas ambas butuh sedikit revisi.', 
      highlight: '', 
      time: '4 jam yang lalu', 
      unread: false, 
      isDimmed: true // Bikin teksnya jadi redup (abu-abu) karena udah dibaca
    },
  ];

  return (
    // LAYER BACKGROUND GELAP
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      {/* KOTAK MODAL UTAMA */}
      <div 
        className="relative w-full max-w-2xl bg-[#0F1423] border border-gray-700 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* HEADER MODAL */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800 relative">
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={28} />
          </button>
          
          <h2 className="text-xl md:text-2xl font-pixel text-white tracking-wider absolute left-1/2 -translate-x-1/2 mt-2">
            Kotak masuk
          </h2>
          
          <button className="text-[10px] md:text-xs font-bold text-[#000010] bg-[#F59E0B] hover:bg-[#D97706] px-3 md:px-4 py-2 rounded-lg transition-transform hover:scale-105 shadow-md">
            Tandai telah dibaca
          </button>
        </div>

        {/* DAFTAR NOTIFIKASI (Bisa di-scroll) */}
        <div className="flex flex-col max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-[#F59E0B] scrollbar-track-transparent">
          
          {notifications.map((notif) => (
            <div 
              key={notif.id} 
              className={`flex items-start gap-4 p-5 md:px-8 border-b border-gray-800/50 hover:bg-[#1A1F30] transition-colors cursor-pointer ${notif.unread ? 'bg-[#141A29]' : ''}`}
            >
              
              {/* ICON (Pakai Emoji biar gampang, lu bisa ganti pake <img> kalau mau) */}
              <div className="text-2xl drop-shadow-md shrink-0 mt-0.5">
                {notif.type === 'success' && '⭐'}
                {notif.type === 'warning' && '⚠️'}
                {notif.type === 'quest' && '⚔️'}
              </div>

              {/* TEKS KONTEN */}
              <div className="flex-1 flex flex-col justify-center">
                <p className={`text-sm md:text-base font-medium leading-relaxed
                  ${notif.isRedText ? 'text-red-400' : ''}
                  ${notif.isDimmed ? 'text-gray-500' : 'text-gray-200'}
                `}>
                  {notif.text} {notif.highlight && <span className="text-[#F59E0B] font-bold">{notif.highlight}</span>}
                </p>
              </div>

              {/* WAKTU & TITIK MERAH (UNREAD) */}
              <div className="flex items-center gap-3 shrink-0 ml-2 md:ml-4 mt-1">
                <span className="text-[10px] md:text-xs text-gray-500 font-medium whitespace-nowrap">
                  {notif.time}
                </span>
                
                {notif.unread ? (
                  <div className="w-2.5 h-2.5 bg-red-600 rounded-full shadow-[0_0_8px_rgba(220,38,38,0.8)]"></div>
                ) : (
                  <div className="w-2.5 h-2.5 bg-transparent"></div> /* Spasi kosong biar rata kalau udah dibaca */
                )}
              </div>

            </div>
          ))}

        </div>
      </div>
    </div>
  );
}