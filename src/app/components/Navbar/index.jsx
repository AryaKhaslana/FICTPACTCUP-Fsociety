import GuestNav from './GuestNav';
import AuthNav from './AuthNav';

export default function Navbar({ isAuthenticated }) {
  // Langsung render aja komponennya sesuai status login
  return (
    <>
      {isAuthenticated ? <AuthNav /> : <GuestNav />}
    </>
  );
}