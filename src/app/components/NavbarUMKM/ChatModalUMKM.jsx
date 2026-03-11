"use client";
import React, { useState, useEffect, useRef } from 'react';
import Pusher from 'pusher-js'; 

export default function ChatModalUMKM({ isOpen, onClose }) {
  // Isi pesan awalnya dibikin nyambung sama POV Siswa
  const [messages, setMessages] = useState([
     { id: 1, sender: 'UMKM', text: 'Halo Pahlawan! Ini ruang chat Real-Time kita. Coba ketik sesuatu!', time: '10:42' }
  ]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null); 

  const [contacts] = useState([
    { id: 1, name: "Adrian (Pahlawan)", isOnline: true, initial: "AD" },
    { id: 2, name: "Fatih (Fullstack)", isOnline: false, initial: "FA" },
    { id: 3, name: "Nawfal (UI/UX)", isOnline: false, initial: "NW" },
  ]);
  const [activeChat, setActiveChat] = useState(contacts[0]);

  // 🔥================ PUSHER UDAH SINKRON SAMA POV SISWA! ================🔥
  useEffect(() => {
    if (!isOpen) return;

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    });

    // 1. Nama channel disamain: 'chat-room'
    const channel = pusher.subscribe('chat-room'); 

    // 2. Nama event disamain: 'new-message'
    channel.bind('new-message', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      pusher.unsubscribe('chat-room');
    };
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  // 🔥================ FUNGSI KIRIM SINKRON SAMA POV SISWA ================🔥
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const textToSend = inputText;
    setInputText("");

    try {
      // 3. Endpoint API disamain: '/api/chat'
      await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: textToSend,
          sender: 'UMKM', // Biar tahu ini dari bos UMKM
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }),
      });
    } catch (error) {
      console.error("Waduh, gagal ngirim broskie:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-4xl h-[600px] bg-[#0F172A] border border-gray-800 rounded-xl shadow-2xl flex overflow-hidden relative">

        <button onClick={onClose} className="absolute top-6 left-6 text-[#FFB800] hover:text-red-500 z-10 flex items-center gap-2">
          <span className="font-bold text-xl">X</span> 
          <span className="font-pixel text-xl text-white">Kontak</span>
        </button>

        {/* --- KIRI: DAFTAR KONTAK SISWA --- */}
        <div className="w-1/3 border-r border-gray-800 bg-[#11131A] flex flex-col pt-16">
          <div className="flex-1 overflow-y-auto">
            {contacts.map((c) => (
              <div 
                key={c.id} 
                onClick={() => setActiveChat(c)} 
                className={`p-4 flex gap-4 cursor-pointer hover:bg-gray-800 transition-colors ${activeChat.id === c.id ? 'border-l-2 border-[#FFB800] bg-[#1A2235]' : 'border-l-2 border-transparent'}`}
              >
                <div className="w-10 h-10 rounded-full bg-[#E88B00] flex items-center justify-center font-bold text-white shrink-0">
                  {c.initial}
                </div>
                <div className="flex-1 overflow-hidden flex flex-col justify-center">
                  <h4 className="text-white text-sm font-bold truncate">{c.name}</h4>
                  <p className="text-[10px] text-[#00A3FF]">
                    {c.isOnline ? '🟢 Online' : '⚪ Offline'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- KANAN: RUANG CHAT PUSHER --- */}
        <div className="flex-1 flex flex-col bg-[#0F172A]">
          <div className="p-4 border-b border-gray-800 flex items-center gap-3 bg-[#11131A]">
             <div className="w-10 h-10 rounded-full bg-[#E88B00] flex items-center justify-center font-bold text-white">
                {activeChat.initial}
             </div>
             <div>
               <h3 className="text-white font-bold text-sm">{activeChat.name}</h3>
               <p className="text-xs text-[#00A3FF]">Project: Bikin Logo Bakwan Mas Rusdi</p>
             </div>
          </div>

          <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4">
            
            {/* Bubble chat logic berdasarkan sender */}
            {messages.map((chat, index) => (
              <div 
                key={index} 
                className={`p-3 rounded-xl max-w-[80%] 
                  ${chat.sender === 'UMKM' 
                    ? 'self-end bg-[#E88B00] text-black rounded-tr-none' // Kalo UMKM yg ngetik (Kanan, Oren)
                    : 'self-start bg-[#1E293B] text-white rounded-tl-none' // Kalo Siswa ('me') yg ngetik (Kiri, Abu)
                  }`}
              >
                <p className="text-sm font-medium">{chat.text}</p>
                <span className={`text-[10px] mt-1 block 
                  ${chat.sender === 'UMKM' ? 'text-black opacity-70 text-right' : 'text-gray-400 text-left'}`}
                >
                  {chat.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-800 bg-[#0F172A]">
            <div className="flex items-center bg-[#1E293B] border border-gray-700 rounded-lg p-2 gap-3">
              <input 
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ketik balasan buat pahlawan..." 
                className="flex-1 bg-transparent text-white outline-none text-sm placeholder-gray-500 px-2" 
              />
              <button 
                type="submit"
                className="bg-[#2563EB] hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-bold flex items-center transition-colors"
              >
                Kirim
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}