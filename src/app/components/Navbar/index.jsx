import GuestNav from './GuestNav';
import AuthNav from './AuthNav';

export default function Navbar({ isAuthenticated }) {
  return (
    <nav className="w-full bg-[#1E1E1E] flex justify-center items-center">
      <div>
        {isAuthenticated ? <AuthNav /> : <GuestNav />}
      </div>
    </nav>
  );
}