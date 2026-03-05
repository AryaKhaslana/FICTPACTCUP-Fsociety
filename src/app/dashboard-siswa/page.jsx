"use client";

import React from 'react';
import Navbar from '../components/Navbar'; 
import ProfileCard from '../dashboard-siswa/ProfileCard';
import FeedbackCard from './FeedbackCard';
import ActiveQuest from './ActiveQuest';
import RecommendedQuests from './ReccomendedQuests';

export default function DashboardSiswaPage() {
  return (
    <div className="min-h-screen bg-[#000010] text-white font-poppins">
      
      {/* 3. Panggil Navbar di sini, kasih status true biar yang muncul otomatis AuthNav */}
      <Navbar isAuthenticated={true} />

      <main className="max-w-7xl mx-auto p-6 md:p-8">
        
        {/* CSS Grid: 1 Kolom di HP, 3 Kolom di Laptop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* KOLOM KIRI (Makan 1 porsi grid) */}
          <div className="lg:col-span-1 flex flex-col gap-8">
            
            {/* Profile Card yang udah beres */}
            <ProfileCard />

            {/* Tempat tim lu ngerjain Feedback Card */}
            <div className="bg-[#060916] rounded-2xl p-6 min-h-[300px] border border-gray-800 flex items-center justify-center text-gray-500">
              <FeedbackCard isEmpty={true} />
            </div>
          </div>

          {/* KOLOM KANAN (Makan 2 porsi grid, lebih lebar) */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* Tempat tim lu ngerjain Active Quest */}
            <div className="bg-transparent min-h-[250px] flex items-center justify-center text-gray-500  rounded-2xl">
              <ActiveQuest isEmpty={true} />
            </div>

            {/* Tempat tim lu ngerjain Recommended Quests */}
            <div className="bg-transparent min-h-[400px] flex items-center justify-center text-gray-500 rounded-2xl">
              <RecommendedQuests />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}