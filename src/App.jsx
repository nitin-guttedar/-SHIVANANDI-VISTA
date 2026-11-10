import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HotelProvider, useHotel } from './context/HotelContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import StickyContactBar from './components/layout/StickyContactBar';
import Toast from './components/common/Toast';
import UserAuthModal from './components/auth/UserAuthModal';
import MyBookingsModal from './components/booking/MyBookingsModal';

// Global Modals component
function GlobalModals() {
  const { isAuthModalOpen, setIsAuthModalOpen, isMyBookingsOpen, setIsMyBookingsOpen } = useHotel();
  return (
    <>
      <UserAuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <MyBookingsModal isOpen={isMyBookingsOpen} onClose={() => setIsMyBookingsOpen(false)} />
    </>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

// 9 Core Website Pages + Blog Post + Admin CMS
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import RoomsPage from './pages/RoomsPage';
import FacilitiesPage from './pages/FacilitiesPage';
import ExperiencesPage from './pages/ExperiencesPage';
import LocationPage from './pages/LocationPage';
import BookingPage from './pages/BookingPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';

export default function App() {
  return (
    <HotelProvider>
      <HashRouter>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-cream-100 text-obsidian font-sans antialiased selection:bg-gold/20 selection:text-gold-dark">
          <Navbar />
          <Toast />
          <GlobalModals />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/rooms-and-accommodation" element={<RoomsPage />} />
              <Route path="/facilities-and-amenities" element={<FacilitiesPage />} />
              <Route path="/experiences-and-occasions" element={<ExperiencesPage />} />
              <Route path="/location-and-nearby-attractions" element={<LocationPage />} />
              <Route path="/booking" element={<BookingPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/contact-us" element={<ContactPage />} />
              <Route path="/admin" element={<AdminPage />} />
              {/* Fallback redirect to Home */}
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
          <StickyContactBar />
        </div>
      </HashRouter>
    </HotelProvider>
  );
}
