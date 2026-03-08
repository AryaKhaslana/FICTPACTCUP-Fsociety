import UmkmProfile from "./UmkmProfile";
import UmkmMenu from "./UmkmMenu";
import PantauQuestList from "./PantauQuestList";
import Navbar from "../components/Navbar";

export default function UmkmDashboardPage() {
  return (
    <main className="min-h-screen bg-[#040414] text-white">
      <Navbar isAuthenticated={true} />

      <div className="max-w-6xl mx-auto px-4 md:px-0 mt-10">
        {/* Rectangle besar di belakang konten dashboard */}
        
          <div className="grid gap-6 md:grid-cols-[320px_minmax(0,1fr)]">
            <div className="flex flex-col gap-6">
              <UmkmProfile />
              <UmkmMenu />
            </div>

            <PantauQuestList />
          </div>
      </div>
    </main>
  );
}