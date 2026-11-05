import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, MessageSquare, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { useHotel } from '../../context/HotelContext';

export default function Footer() {
  const { property, openWhatsApp } = useHotel();

  return (
    <footer className="bg-[#141210] text-[#DED6CB] border-t border-[#26221E] pt-16 pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#26221E]">
          
          {/* Brand & Address */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3.5">
              <img
                src="/logo.jpg"
                alt="SHIVANANDI VISTA Logo"
                className="h-14 w-14 object-contain rounded-xl bg-white p-1 border border-stone-200/20"
              />
              <div>
                <h3 className="font-serif text-xl font-bold text-white tracking-tight">
                  SHIVANANDI VISTA
                </h3>
                <p className="text-xs uppercase tracking-widest text-gold-light font-semibold">
                  Hotel &bull; Yelahanka, Bengaluru
                </p>
              </div>
            </div>

            <p className="text-obsidian-400 text-sm leading-relaxed max-w-md">
              A premier hospitality destination in Yelahanka Taluk, Bengaluru. Offering comfortable suites, warm personalized service, 24/7 guest assistance, and seamless airport connectivity.
            </p>

            <div className="pt-2 space-y-2 text-xs text-obsidian-300">
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

          {/* Quick Navigation */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-[#26221E] pb-2">
              Explore
            </h4>
            <ul className="space-y-2 text-sm text-obsidian-400">
              <li>
                <Link to="/" className="hover:text-gold transition">Home Overview</Link>
              </li>
              <li>
                <Link to="/about-us" className="hover:text-gold transition">About Our Story</Link>
              </li>
              <li>
                <Link to="/rooms-and-accommodation" className="hover:text-gold transition">Rooms & Suites</Link>
              </li>
              <li>
                <Link to="/facilities-and-amenities" className="hover:text-gold transition">Facilities & Amenities</Link>
              </li>
              <li>
                <Link to="/experiences-and-occasions" className="hover:text-gold transition">Experiences & Stays</Link>
              </li>
              <li>
                <Link to="/location-and-nearby-attractions" className="hover:text-gold transition">Location & Directions</Link>
              </li>
              <li>
                <Link to="/booking" className="hover:text-gold transition text-gold font-medium">Book Your Stay</Link>
              </li>
            </ul>
          </div>

          {/* Travel Guides */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-[#26221E] pb-2">
              Travel Guides
            </h4>
            <ul className="space-y-2 text-xs text-obsidian-400">
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

          {/* Direct Connect */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-[#26221E] pb-2">
              Direct Connect
            </h4>
            <p className="text-xs text-obsidian-400 mb-3">
              Need immediate assistance or last-minute airport room availability?
            </p>

            <button
              onClick={() => openWhatsApp()}
              className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-2 transition mb-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Us Now</span>
            </button>

            <a
              href={`tel:${property.phoneRaw}`}
              className="w-full py-2.5 px-3 rounded-xl bg-[#201D19] hover:bg-[#2A2623] text-white border border-[#3A342E] text-xs font-semibold flex items-center justify-center gap-2 transition"
            >
              <Phone className="w-3.5 h-3.5 text-gold-light" />
              <span>Call +91 99003 14686</span>
            </a>

            {/* Keyword tags */}
            <div className="mt-4 pt-3 border-t border-[#26221E]">
              <p className="text-[10px] text-obsidian-500 uppercase font-bold tracking-wider mb-1.5">
                Popular Search Areas:
              </p>
              <div className="flex flex-wrap gap-1 text-[10px] text-obsidian-400">
                <span className="bg-[#1A1714] px-1.5 py-0.5 rounded border border-[#2E2822]">Yelahanka</span>
                <span className="bg-[#1A1714] px-1.5 py-0.5 rounded border border-[#2E2822]">Bangalore Airport</span>
                <span className="bg-[#1A1714] px-1.5 py-0.5 rounded border border-[#2E2822]">Devanahalli</span>
                <span className="bg-[#1A1714] px-1.5 py-0.5 rounded border border-[#2E2822]">BK Halli</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-obsidian-500 gap-4">
          <p>
            &copy; {new Date().getFullYear()} SHIVANANDI VISTA. All Rights Reserved. Crafted with warm hospitality and clean minimalism.
          </p>

          <div className="flex items-center gap-4">
            <Link to="/contact-us" className="hover:text-gold transition">Contact Support</Link>
            <span>&bull;</span>
            <Link to="/admin" className="text-obsidian-400 hover:text-gold transition flex items-center gap-1 font-mono text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-gold" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
