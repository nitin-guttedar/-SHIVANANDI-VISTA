import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, MessageSquare, ArrowUpRight, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { useHotel } from '../../context/HotelContext';

export default function Footer() {
  const { property, openWhatsApp } = useHotel();

  return (
    <footer className="bg-[#141210] text-[#E5DECf] border-t-2 border-[#2D2723] pt-16 pb-12 relative overflow-hidden">
      {/* Subtle Top Gold Highlight */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#2D2723]">
          
          {/* Col 1 & 2: Brand & Address */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2D2723] to-[#1C1917] border border-gold/40 shadow-gold-btn flex items-center justify-center">
                <span className="font-serif text-xl font-black text-transparent bg-clip-text bg-gradient-to-br from-gold-bright via-gold to-gold-dark">
                  SV
                </span>
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-white tracking-tight">
                  SHIVANANDI VISTA
                </h3>
                <p className="text-xs uppercase tracking-widest text-gold font-semibold">
                  Hotel & Resort • Yelahanka, Bengaluru
                </p>
              </div>
            </div>

            <p className="text-charcoal-400 text-sm leading-relaxed max-w-md">
              A premier hospitality destination in Yelahanka Taluk, Bengaluru. Providing comfortable suites, warm personalized service, 24/7 guest assistance, and seamless airport connectivity for business, family, and leisure travelers.
            </p>

            <div className="pt-2 space-y-2.5 text-xs text-charcoal-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span>{property.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <a href={`tel:${property.phoneRaw}`} className="hover:text-gold transition">
                  {property.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <a href={`mailto:${property.email}`} className="hover:text-gold transition">
                  {property.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-gold shrink-0" />
                <span>{property.hours}</span>
              </div>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h4 className="font-serif text-base font-bold text-white uppercase tracking-wider mb-4 border-b border-[#2D2723] pb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-charcoal-400">
              <li>
                <Link to="/" className="hover:text-gold transition flex items-center gap-1.5">
                  <span>Home Overview</span>
                </Link>
              </li>
              <li>
                <Link to="/about-us" className="hover:text-gold transition flex items-center gap-1.5">
                  <span>About Our Story</span>
                </Link>
              </li>
              <li>
                <Link to="/rooms-and-accommodation" className="hover:text-gold transition flex items-center gap-1.5">
                  <span>Rooms & Suites</span>
                </Link>
              </li>
              <li>
                <Link to="/facilities-and-amenities" className="hover:text-gold transition flex items-center gap-1.5">
                  <span>Facilities & Amenities</span>
                </Link>
              </li>
              <li>
                <Link to="/experiences-and-occasions" className="hover:text-gold transition flex items-center gap-1.5">
                  <span>Experiences & Stays</span>
                </Link>
              </li>
              <li>
                <Link to="/location-and-nearby-attractions" className="hover:text-gold transition flex items-center gap-1.5">
                  <span>Location & Map</span>
                </Link>
              </li>
              <li>
                <Link to="/booking" className="hover:text-gold transition flex items-center gap-1.5 text-gold font-semibold">
                  <span>Book Your Stay</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Local Travel & Blog Guides */}
          <div>
            <h4 className="font-serif text-base font-bold text-white uppercase tracking-wider mb-4 border-b border-[#2D2723] pb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
              Travel Guides
            </h4>
            <ul className="space-y-2.5 text-xs text-charcoal-400">
              <li>
                <Link to="/blog/guide-kempegowda-airport-bengaluru" className="hover:text-gold transition line-clamp-1">
                  Kempegowda Airport Guide
                </Link>
              </li>
              <li>
                <Link to="/blog/best-places-to-visit-yelahanka-bangalore" className="hover:text-gold transition line-clamp-1">
                  Places to Visit in Yelahanka
                </Link>
              </li>
              <li>
                <Link to="/blog/exploring-devanahalli-travel-guide" className="hover:text-gold transition line-clamp-1">
                  Devanahalli Fort & Heritage
                </Link>
              </li>
              <li>
                <Link to="/blog/where-to-stay-near-bengaluru-airport" className="hover:text-gold transition line-clamp-1">
                  Where to Stay Near BLR Airport
                </Link>
              </li>
              <li>
                <Link to="/blog/weekend-travel-guide-nandi-hills" className="hover:text-gold transition line-clamp-1">
                  Weekend Guide to Nandi Hills
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gold font-semibold hover:underline flex items-center gap-1 mt-3">
                  <span>View All 8 Travel Articles</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Local SEO Hub & Direct Connect */}
          <div>
            <h4 className="font-serif text-base font-bold text-white uppercase tracking-wider mb-4 border-b border-[#2D2723] pb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
              Direct Connect
            </h4>
            <p className="text-xs text-charcoal-400 mb-3">
              Need immediate assistance or last-minute airport room availability?
            </p>

            <button
              onClick={() => openWhatsApp()}
              className="w-full py-2.5 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition mb-2.5"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Us Now</span>
            </button>

            <a
              href={`tel:${property.phoneRaw}`}
              className="w-full py-2.5 px-3 rounded-xl bg-[#2D2723] hover:bg-[#38332E] text-white border border-[#443D37] text-xs font-semibold flex items-center justify-center gap-2 transition"
            >
              <Phone className="w-3.5 h-3.5 text-gold" />
              <span>Call +91 99003 14686</span>
            </a>

            {/* SEO Keyword Pills */}
            <div className="mt-5 pt-3 border-t border-[#2D2723]">
              <p className="text-[10px] text-charcoal-500 uppercase font-bold tracking-wider mb-2">
                Popular Search Areas:
              </p>
              <div className="flex flex-wrap gap-1 text-[10px] text-charcoal-400">
                <span className="bg-[#1C1917] px-1.5 py-0.5 rounded border border-[#2D2723]">Yelahanka Hotels</span>
                <span className="bg-[#1C1917] px-1.5 py-0.5 rounded border border-[#2D2723]">Bangalore Airport Stay</span>
                <span className="bg-[#1C1917] px-1.5 py-0.5 rounded border border-[#2D2723]">Devanahalli Accommodation</span>
                <span className="bg-[#1C1917] px-1.5 py-0.5 rounded border border-[#2D2723]">BK Halli Begur</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-charcoal-500 gap-4">
          <p>
            &copy; {new Date().getFullYear()} SHIVANANDI VISTA. All Rights Reserved. Designed with warm hospitality & luxury skeuomorphic craftsmanship.
          </p>

          <div className="flex items-center gap-4">
            <Link to="/contact-us" className="hover:text-gold transition">Contact Support</Link>
            <span>•</span>
            <Link to="/admin" className="text-charcoal-400 hover:text-gold transition flex items-center gap-1 font-mono text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-gold" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
