import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#1E1E1E]">
      <Navbar />
      <LandingPage />
    </main>
  );
}