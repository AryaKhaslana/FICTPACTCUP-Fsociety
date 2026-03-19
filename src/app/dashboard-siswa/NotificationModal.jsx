"use client";
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function NotificationModal({ isOpen, onClose }) {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // 🔥 TEMBAK API BACKEND PAS MODAL DIBUKA 🔥
  useEffect(() => {
    if (isOpen) {
      const fetchNotifData = async () => {
        setIsLoading(true); 
        try {
          const res = await fetch('/api/notifications');
          const response = await res.json();
          if (response.success) {
            setNotifications(response.data);
          }
        } catch (err) {
          console.error("Gagal narik notif:", err);
        } finally {
          setIsLoading(false);
        }
      };

      fetchNotifData();
    }
  }, [isOpen]);

  const handleMarkAllAsRead = () => {
    const updatedNotifs = notifications.map(notif => ({
      ...notif,
      unread: false,
      isDimmed: true,
      isRedText: false
    }));
    setNotifications(updatedNotifs);
  };

  if (!isOpen) return null;

  return (
    // LAYER BACKGROUND GELAP
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      {/* KOTAK MODAL UTAMA */}
      <div 
        className="relative w-full max-w-2xl bg-[#0F1423] border border-gray-700 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-in fade-in zoom-in duration-200 flex flex-col min-h-[400px]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* HEADER MODAL */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800 relative shrink-0">
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={28} />
          </button>
          
          <h2 className="text-xl md:text-2xl font-pixel text-white tracking-wider absolute left-1/2 -translate-x-1/2 mt-2">
            Kotak masuk
          </h2>
          
          <button 
            onClick={handleMarkAllAsRead}
            disabled={notifications.length === 0 || isLoading}
            className="text-[10px] md:text-xs font-bold text-[#000010] bg-[#F59E0B] hover:bg-[#D97706] px-3 md:px-4 py-2 rounded-lg transition-transform hover:scale-105 shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Tandai telah dibaca
          </button>
        </div>

        {/* DAFTAR NOTIFIKASI / LOADING / EMPTY STATE */}
        <div className="flex flex-col flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#F59E0B] scrollbar-track-transparent">
          
          {/* 1. STATE LOADING (PAS LAGI NARIK DATA) */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full py-20">
              <div className="w-12 h-12 border-4 border-[#F59E0B] border-t-transparent rounded-full animate-spin mb-4 shadow-[0_0_15px_rgba(245,158,11,0.5)]"></div>
              <p className="text-[#F59E0B] font-pixel text-sm animate-pulse tracking-widest">Menyadap data...</p>
            </div>
          ) : 
          
          /* 2. EMPTY STATE (PAS DATANYA KOSONG) */
          notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-16 px-6 text-center animate-in fade-in duration-500">
              <div className="w-24 h-24 bg-[#11131A] rounded-full flex items-center justify-center mb-6 border-2 border-dashed border-gray-700 shadow-inner">
                <span className="text-5xl grayscale opacity-40 drop-shadow-md">📭</span>
              </div>
              <h3 className="text-white font-bold text-xl mb-3 tracking-wide">Kotak Masuk Sepi!</h3>
              <p className="text-gray-500 text-sm max-w-sm leading-relaxed">
                Belum ada kabar dari para Bos UMKM nih. Sambil nunggu, mending lu ambil misi baru atau lanjut tidur Kapten!
              </p>
            </div>
          ) : 
          
          /* 3. STATE ADA ISINYA (MAPPING DATA SEPERTI BIASA) */
          (
            <div className="pb-4">
              {notifications.map((notif) => (
                <div 
                  key={notif.id} 
                  className={`flex items-start gap-4 p-5 md:px-8 border-b border-gray-800/50 hover:bg-[#1A1F30] transition-colors cursor-pointer ${notif.unread ? 'bg-[#141A29]' : ''}`}
                >
                  
                  {/* ICON */}
                  <div className="text-2xl drop-shadow-md shrink-0 mt-0.5">
                    {notif.type === 'success' && '⭐'}
                    {notif.type === 'warning' && '⚠️'}
                    {notif.type === 'quest' && '⚔️'}
                  </div>

                  {/* TEKS KONTEN */}
                  <div className="flex-1 flex flex-col justify-center">
                    <p className={`text-sm md:text-base font-medium leading-relaxed transition-colors duration-300
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
                    
                    <div className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${notif.unread ? 'bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.8)] opacity-100' : 'bg-transparent opacity-0'}`}></div>
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}