import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, MessageSquare, Menu, X, Calendar, MapPin, Clock, Sparkles, ShieldCheck } from 'lucide-react';
import { useHotel } from '../../context/HotelContext';

export default function Navbar() {
  const { property, openWhatsApp } = useHotel();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page change
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
      {/* Top Luxury Announcement Bar */}
      <div className="bg-[#1C1917] text-[#FAF8F5] text-xs py-2 px-4 border-b border-[#38332E] hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-gold-bright font-medium">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>Direct Booking Advantage: Best Tariff & 24/7 Airport Support</span>
            </span>
            <span className="flex items-center gap-1.5 text-charcoal-400">
              <MapPin className="w-3.5 h-3.5 text-gold" />
              <span>Yelahanka Taluk, Bengaluru – 562149</span>
            </span>
          </div>

          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1 text-charcoal-400">
              <Clock className="w-3.5 h-3.5 text-gold" />
              <span>Open 24 Hours / 7 Days</span>
            </span>
            <a
              href={`tel:${property.phoneRaw}`}
              className="flex items-center gap-1.5 font-semibold text-white hover:text-gold transition"
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

      {/* Main Navplate with Skeuomorphic Glass & Bevel */}
      <div
        className={`transition-all duration-300 ${
          isScrolled
            ? 'bg-alabaster/95 backdrop-blur-md shadow-skeuo-card border-b border-surface-border'
            : 'bg-alabaster border-b border-surface-border'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo Brand Plate */}
            <Link to="/" className="flex items-center gap-3 group">
              {/* Tactile Skeuomorphic Medallion */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2D2723] via-[#1C1917] to-[#12100E] border border-gold/50 shadow-gold-btn flex flex-col items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-gold-light to-transparent"></div>
                <span className="font-serif text-lg font-black text-transparent bg-clip-text bg-gradient-to-br from-gold-bright via-gold-light to-gold-dark tracking-tighter">
                  SV
                </span>
                <span className="text-[7px] tracking-widest uppercase text-gold/80 font-bold -mt-0.5">
                  EST. 2026
                </span>
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-charcoal group-hover:text-gold-dark transition-colors">
                    SHIVANANDI VISTA
                  </span>
                </div>
                <p className="text-[10px] tracking-[0.2em] uppercase font-bold text-charcoal-500 flex items-center gap-1">
                  <span>Hotel & Resort</span>
                  <span className="text-gold">•</span>
                  <span>Yelahanka, Bengaluru</span>
                </p>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    isActive(link.path)
                      ? 'text-gold-dark font-semibold bg-gold-cream border border-gold/30 shadow-skeuo-sm'
                      : 'text-charcoal-700 hover:text-charcoal hover:bg-surface-muted'
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
                className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200/80 hover:bg-emerald-100 hover:border-emerald-300 shadow-skeuo-sm transition flex items-center justify-center group"
                title="Chat on WhatsApp"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
              </button>

              <Link
                to="/booking"
                className="skeuo-btn-gold px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-charcoal-900" />
                <span>Book Your Stay</span>
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <Link
                to="/booking"
                className="skeuo-btn-gold px-3 py-1.5 rounded-lg text-xs font-bold sm:hidden"
              >
                Book
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-surface-muted text-charcoal-700 border border-surface-border hover:bg-surface-hover transition"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-alabaster border-b border-surface-border shadow-skeuo-card px-4 pt-3 pb-6 animate-fadeIn">
            <div className="space-y-1 mb-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition ${
                    isActive(link.path)
                      ? 'bg-gold-cream text-gold-dark font-bold border border-gold/30'
                      : 'text-charcoal-700 hover:bg-surface-muted'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/booking"
                className="block px-4 py-2.5 rounded-xl text-sm font-bold bg-gold text-charcoal-900 mt-2"
              >
                Booking & Reservations
              </Link>
            </div>

            <div className="pt-3 border-t border-surface-border flex flex-col gap-2.5">
              <a
                href={`tel:${property.phoneRaw}`}
                className="skeuo-btn-dark py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 font-semibold"
              >
                <Phone className="w-4 h-4 text-gold-bright" />
                <span>Call {property.phone}</span>
              </a>

              <button
                onClick={() => openWhatsApp()}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition"
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
