import { Poppins, Press_Start_2P } from 'next/font/google';
import './globals.css';
// 🔥 1. IMPORT THEME PROVIDER (Pastiin path-nya bener ya, sesuain sama folder lu)
import { ThemeProvider } from './components/ThemeProvider'; 

// 1. Setup Font Utama (Bacaan)
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], 
  variable: '--font-poppins', 
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
    icon: '/dragon.png', 
  },
};

export default function RootLayout({ children }) {
  return (
    // 🔥 2. WAJIB TAMBAHIN suppressHydrationWarning DI SINI
    <html lang="id" className={`${poppins.variable} ${pixelFont.variable}`} suppressHydrationWarning>
      
      {/* 🔥 3. CLASS BODY-NYA DIUBAH BIAR BISA TERANG/GELAP! */}
      <body className="font-poppins bg-gray-50 text-gray-900 dark:bg-[#1E1E1E] dark:text-white antialiased transition-colors duration-300">
        
        {/* 🔥 4. BUNGKUS SEMUANYA PAKE THEME PROVIDER */}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
        >
          {children}
        </ThemeProvider>

      </body>
    </html>
  );
}