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
  // 1. Ganti Teks Judul di Tab
  title: 'XPACT - Petualangan UMKM Dimulai!', 
  description: 'Platform Gamifikasi UMKM untuk Siswa Hebat',
  
  // 2. Ganti Ikon di Tab (Favicon)
  icons: {
    // Pastiin file 'dragon.png' beneran ada di folder public/ ya!
    icon: '/dragon.png', 
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${poppins.variable} ${pixelFont.variable}`}>
      {/* Tambahin {children} di dalam body biar halaman lu muncul! */}
      <body className="font-poppins bg-[#1E1E1E] text-white antialiased">
        {children}
      </body>
    </html>
  );
}