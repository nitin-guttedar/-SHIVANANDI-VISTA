import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, MessageSquare, Menu, X, Calendar, MapPin, Clock, Sparkles } from 'lucide-react';
import { useHotel } from '../../context/HotelContext';

export default function Navbar() {
  const { property, openWhatsApp } = useHotel();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about-us' },
    { name: 'Rooms & Suites', path: '/rooms-and-accommodation' },
    { name: 'Facilities', path: '/facilities-and-amenities' },
    { name: 'Experiences', path: '/experiences-and-occasions' },
    { name: 'Location', path: '/location-and-nearby-attractions' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact-us' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 transition-all duration-300">
      {/* Top Minimal Announcement Bar */}
      <div className="bg-[#141210] text-[#E4DDD6] text-xs py-2 px-4 border-b border-[#2A2623] hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-gold-light font-medium">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>Direct Booking Advantage: Best Rates & 24/7 Airport Support</span>
            </span>
            <span className="flex items-center gap-1.5 text-obsidian-400">
              <MapPin className="w-3.5 h-3.5 text-gold" />
              <span>Near Bengaluru International Airport (BLR)</span>
            </span>
          </div>

          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5 text-obsidian-400">
              <Clock className="w-3.5 h-3.5 text-gold" />
              <span>Open 24/7</span>
            </span>
            <a
              href={`tel:${property.phoneRaw}`}
              className="flex items-center gap-1.5 font-medium text-white hover:text-gold transition"
            >
              <Phone className="w-3.5 h-3.5 text-gold" />
              <span>{property.phone}</span>
            </a>
            <button
              onClick={() => openWhatsApp()}
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-medium transition"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Minimalist Header */}
      <div
        className={`transition-all duration-300 ${isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-stone-200'
          : 'bg-white border-b border-stone-200/80'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Minimal Logo with the Real Business Logo Image */}
            <Link to="/" className="flex items-center gap-3.5 group">
              <img
                src="/logo.jpg"
                alt="SHIVANANDI VISTA Logo"
                className="h-12 w-12 sm:h-14 sm:w-14 object-contain rounded-lg border border-stone-200/60 p-0.5 bg-[#FAF7F2] transition-transform duration-300 group-hover:scale-105"
              />
              <div className="flex flex-col">
                <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-obsidian group-hover:text-gold transition-colors leading-none">
                  SHIVANANDI VISTA
                </span>
                <span className="text-[10px] tracking-[0.25em] uppercase font-semibold text-obsidian-500 mt-1">
                  HOTEL &bull; BENGALURU
                </span>
              </div>
            </Link>

            {/* Clean Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${isActive(link.path)
                    ? 'text-gold-dark font-semibold bg-gold-pale'
                    : 'text-obsidian-700 hover:text-obsidian hover:bg-stone-warm'
                    }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Action Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={() => openWhatsApp()}
                className="p-2.5 rounded-xl text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition"
                title="Chat on WhatsApp"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
              </button>

              <Link
                to="/booking"
                className="minimal-btn-gold px-5 py-2.5 text-xs sm:text-sm font-semibold flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Stay</span>
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <div className="flex items-center gap-2 lg:hidden">
              <Link
                to="/booking"
                className="minimal-btn-gold px-3 py-1.5 text-xs font-bold sm:hidden"
              >
                Book
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-obsidian-700 hover:bg-stone-warm border border-stone-200 transition"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-stone-200 px-4 pt-3 pb-6 shadow-md animate-fadeIn">
            <div className="space-y-1 mb-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition ${isActive(link.path)
                    ? 'bg-gold-pale text-gold-dark font-semibold'
                    : 'text-obsidian-700 hover:bg-stone-warm'
                    }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/booking"
                className="block px-4 py-2.5 rounded-xl text-sm font-bold bg-gold text-white mt-2 text-center"
              >
                Booking & Reservations
              </Link>
            </div>

            <div className="pt-3 border-t border-stone-200 flex flex-col gap-2">
              <a
                href={`tel:${property.phoneRaw}`}
                className="minimal-btn-dark py-2.5 px-4 text-xs flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-gold-light" />
                <span>Call {property.phone}</span>
              </a>

              <button
                onClick={() => openWhatsApp()}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-center gap-2 transition"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Enquire via WhatsApp</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
