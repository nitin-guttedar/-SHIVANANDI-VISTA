import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Phone, 
  MessageSquare, 
  Menu, 
  X, 
  Calendar, 
  MapPin, 
  Clock, 
  Sparkles, 
  User, 
  LogOut, 
  Ticket, 
  ChevronDown,
  ShieldCheck
} from 'lucide-react';
import { useHotel } from '../../context/HotelContext';

export default function Navbar() {
  const { 
    property, 
    openWhatsApp, 
    user, 
    logoutUser, 
    setIsAuthModalOpen, 
    setIsMyBookingsOpen 
  } = useHotel();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
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
            <div className="hidden sm:flex items-center gap-2.5">
              {/* My Bookings Button */}
              <button
                onClick={() => setIsMyBookingsOpen(true)}
                className="px-3 py-2 rounded-xl text-xs font-semibold text-stone-700 hover:text-obsidian hover:bg-stone-100 border border-stone-200 transition flex items-center gap-1.5"
                title="View my reservations"
              >
                <Ticket className="w-3.5 h-3.5 text-gold" />
                <span>My Bookings</span>
              </button>

              {/* User Authentication Pill / Dropdown */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 text-xs font-bold text-obsidian transition"
                  >
                    <div className="w-6 h-6 rounded-full bg-gold/20 text-gold-dark flex items-center justify-center font-bold text-[11px]">
                      {user.isGuest ? 'G' : (user.name?.[0] || 'U')}
                    </div>
                    <span className="max-w-[100px] truncate">
                      {user.isGuest ? user.guestId : user.name}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
                  </button>

                  {userDropdownOpen && (
                    <div 
                      className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-stone-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      <div className="px-4 py-2 border-b border-stone-100">
                        <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                          Signed in as
                        </div>
                        <div className="font-bold text-obsidian text-xs mt-0.5 truncate">
                          {user.name}
                        </div>
                        {user.phone && (
                          <div className="text-[11px] text-stone-500 font-mono">
                            +91 {user.phone}
                          </div>
                        )}
                        {user.isGuest && (
                          <div className="text-[10.5px] text-emerald-600 font-bold mt-0.5">
                            Guest Checkout Account
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => setIsMyBookingsOpen(true)}
                        className="w-full px-4 py-2 text-left text-xs text-stone-700 hover:bg-stone-50 flex items-center gap-2 font-medium"
                      >
                        <Ticket className="w-3.5 h-3.5 text-gold" />
                        <span>My Bookings & History</span>
                      </button>

                      <button
                        onClick={logoutUser}
                        className="w-full px-4 py-2 text-left text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-medium border-t border-stone-100 mt-1"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold text-stone-700 hover:text-obsidian hover:bg-stone-100 border border-stone-300 transition flex items-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5 text-stone-500" />
                  <span>Sign In / OTP</span>
                </button>
              )}

              <button
                onClick={() => openWhatsApp()}
                className="p-2.5 rounded-xl text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition"
                title="Chat on WhatsApp"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
              </button>

              <Link
                to="/booking"
                className="minimal-btn-gold px-4 py-2 text-xs sm:text-sm font-semibold flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Stay</span>
              </Link>
            </div>

            {/* Mobile Actions & Hamburger */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setIsMyBookingsOpen(true)}
                className="p-2 rounded-xl border border-stone-200 text-stone-700"
                title="My Bookings"
              >
                <Ticket className="w-4 h-4 text-gold" />
              </button>

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
            {/* User status in mobile drawer */}
            <div className="p-3 mb-3 bg-stone-50 rounded-2xl border border-stone-200 flex items-center justify-between">
              {user ? (
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gold/20 text-gold-dark flex items-center justify-center font-bold text-xs">
                    {user.isGuest ? 'G' : (user.name?.[0] || 'U')}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-obsidian">
                      {user.name}
                    </div>
                    <div className="text-[10px] text-stone-500 font-mono">
                      {user.phone ? `+91 ${user.phone}` : (user.isGuest ? user.guestId : '')}
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsAuthModalOpen(true);
                  }}
                  className="w-full py-2 px-3 rounded-xl bg-white border border-stone-300 text-xs font-bold text-obsidian flex items-center justify-center gap-2"
                >
                  <User className="w-4 h-4 text-gold" />
                  <span>Sign In with Phone OTP / Guest</span>
                </button>
              )}

              {user && (
                <button
                  onClick={logoutUser}
                  className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg text-xs font-bold"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              )}
            </div>

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

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsMyBookingsOpen(true);
                }}
                className="w-full text-left block px-4 py-2.5 rounded-xl text-sm font-medium text-stone-700 hover:bg-stone-warm"
              >
                🎫 My Bookings & Enquiries
              </button>

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
