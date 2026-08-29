import { Outlet } from 'react-router-dom';
import Navbar from '../Component/Common/Navbar';
import Footer from '../Component/Common/Footer';

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-[#08090B] text-[#F5F5F5] flex flex-col carbon-pattern font-sans">
      <Navbar />
      <main className="flex-1 min-w-0">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
