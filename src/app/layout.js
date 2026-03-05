import { Poppins, Press_Start_2P } from 'next/font/google';
import './globals.css';

// 1. Setup Font Utama (Bacaan)
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // Pilih ketebalan yang mau dipakai
  variable: '--font-poppins', // Ini variabel yang bakal dipanggil di Tailwind
});

// 2. Setup Font Tema Game (Heading/XP)
const pixelFont = Press_Start_2P({
  subsets: ['latin'],
  weight: ['400'], 
  variable: '--font-pixel',
});

export const metadata = {
  title: 'XPact - Mulai Petualangan Nyatamu',
  description: 'Platform penyedia quest untuk siswa SMK dan UMKM',
};

export default function RootLayout({ children }) {
  return (
    // 3. Masukkan variabel font ke dalam tag <html>
    <html lang="id" className={`${poppins.variable} ${pixelFont.variable}`}>
      {/* 4. Jadikan Poppins sebagai font bawaan (default) di seluruh body */}
      <body className="font-poppins bg-[#1E1E1E] text-white antialiased">
        {children}
      </body>
    </html>
  );
}