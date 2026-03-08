import React, { useState, useRef, useEffect } from 'react';
import { X, Paperclip, Send } from 'lucide-react';
// 1. IMPORT PUSHER-JS BUAT FRONTEND
import Pusher from 'pusher-js';

export default function ChatModal({ isOpen, onClose }) {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'umkm', text: 'Halo Pahlawan! Ini ruang chat Real-Time kita. Coba ketik sesuatu!', time: '10:42' },
  ]);

  const messagesEndRef = useRef(null);
  
  // Efek Auto-Scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]); 

  // 2. KITA PASANG TELINGA PUSHER DI SINI 👇
  useEffect(() => {
    if (!isOpen) return; // Kalau modal nutup, gausah dengerin Pusher biar hemat RAM

    // Nyalain mesin Pusher pake kunci public dari .env
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    });

    // Masuk ke ruangan "chat-room"
    const channel = pusher.subscribe('chat-room');

    // Kalau ada teriakan "new-message", tangkep datanya dan masukin ke layar!
    channel.bind('new-message', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    // Bersihin telinga kalau modalnya ditutup (Biar laptop lu ga lemot)
    return () => {
      pusher.unsubscribe('chat-room');
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Data Dummy Kontak
  const contacts = [
    { id: 1, name: 'UMKM Nasgor', message: 'Baik kak, revisi logonya...', time: '10:42', unread: false, active: true },
    { id: 2, name: 'UMKM Seblak', message: 'Baik kak, revisi logonya...', time: '10:42', unread: false },
    { id: 3, name: 'Bakso mas roy', message: 'Baik kak, revisi logonya...', time: '10:42', unread: true },
  ];

  // 3. FUNGSI KIRIM KE API (TUKANG POS) 👇
  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    // Simpen dulu teksnya, terus kosongin kolom inputnya biar cepet
    const textToSend = inputText;
    setInputText(''); 

    try {
      // Lempar ke API Tukang Pos yang lu bikin tadi
      await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: textToSend,
          sender: 'me' // Karena ini Dashboard Siswa, sender-nya "me"
        })
      });
      // Ga perlu setMessages manual di sini, karena nanti Pusher yang bakal mantulin pesannya ke layar lu!
    } catch (error) {
      console.error("Waduh, gagal ngirim broskie:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4 md:px-10"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-5xl h-[80vh] bg-[#000010] border border-gray-700 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col md:flex-row animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* KOLOM KIRI */}
        <div className="w-full md:w-1/3 lg:w-[30%] bg-[#0B0E14] border-r border-gray-800 flex flex-col h-1/2 md:h-full">
          <div className="p-5 md:p-6 flex items-center gap-4 border-b border-gray-800">
            <button onClick={onClose} className="text-[#F59E0B] hover:text-white transition-colors">
              <X size={28} strokeWidth={3} />
            </button>
            <h2 className="text-xl font-pixel text-white tracking-widest mt-1">Kontak</h2>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#F59E0B] scrollbar-track-transparent">
            {contacts.map((contact) => (
              <div 
                key={contact.id} 
                className={`flex items-center gap-3 p-4 cursor-pointer transition-colors border-b border-gray-800/50
                  ${contact.active ? 'bg-[#1A1F30] border-l-4 border-l-[#F59E0B]' : 'hover:bg-[#111522] border-l-4 border-l-transparent'}
                `}
              >
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-700 shrink-0">
                  <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${contact.name}&backgroundColor=d97706`} alt={contact.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-white truncate">{contact.name}</h4>
                  <p className="text-xs text-gray-400 truncate mt-0.5">{contact.message}</p>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className="text-[10px] text-gray-500">{contact.time}</span>
                  {contact.unread && <div className="w-2 h-2 rounded-full bg-red-600 shadow-[0_0_5px_rgba(220,38,38,0.8)]"></div>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* KOLOM KANAN */}
        <div className="w-full md:w-2/3 lg:w-[70%] flex flex-col h-1/2 md:h-full bg-[#0F1423]">
          
          <div className="px-6 py-4 border-b border-gray-800 flex items-center gap-4 bg-[#0B0E14]/50">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-700">
              <img src="https://api.dicebear.com/7.x/initials/svg?seed=UMKM Nasgor&backgroundColor=d97706" alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">UMKM Nasgor</h3>
              <p className="text-xs text-[#22D3EE] font-medium flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] animate-pulse"></span> Online
              </p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
            {messages.map((chat) => (
              <div key={chat.id} className={`flex ${chat.sender === 'me' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 fade-in duration-300`}>
                <div className={`max-w-[80%] md:max-w-[70%] rounded-2xl p-4 relative shadow-lg
                  ${chat.sender === 'me' 
                    ? 'bg-[#1E3A8A] text-white rounded-tr-none border border-blue-800' 
                    : 'bg-[#D97706] text-[#000010] rounded-tl-none font-medium' 
                  }`}
                >
                  <p className="text-sm md:text-base leading-relaxed">{chat.text}</p>
                  <span className={`block text-[10px] mt-2 text-right ${chat.sender === 'me' ? 'text-blue-300' : 'text-[#000010]/70'}`}>
                    {chat.time}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 md:p-6 bg-[#0B0E14] border-t border-gray-800">
            <div className="flex items-center gap-3 bg-[#1A1F30] rounded-xl p-2 border border-gray-700 focus-within:border-[#F59E0B] transition-colors">
              <button className="p-2 text-gray-400 hover:text-[#F59E0B] transition-colors">
                <Paperclip size={20} />
              </button>
              <input 
                type="text" 
                placeholder="Ketik pesan..." 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-1 bg-transparent border-none focus:outline-none text-white text-sm px-2"
              />
              <button 
                onClick={handleSendMessage}
                className="bg-[#1E3A8A] hover:bg-blue-600 text-white p-2 md:px-4 md:py-2 rounded-lg flex items-center justify-center transition-colors active:scale-95"
              >
                <Send size={18} className="md:mr-2" />
                <span className="hidden md:block text-sm font-bold">Kirim</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}