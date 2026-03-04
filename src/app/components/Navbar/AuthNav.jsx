import GuestNav from './GuestNav';
import AuthNav from './AuthNav';

export default function Navbar({ isAuthenticated }) {
  return (
    <nav className="w-full bg-[#1E1E1E] px-6 py-4 flex justify-between items-center">
      <div className="font-bold text-white text-xl">XPact</div>

      <div>
        {isAuthenticated ? <AuthNav /> : <GuestNav />}
      </div>
    </nav>
  );
}