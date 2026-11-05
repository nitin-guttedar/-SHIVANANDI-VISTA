import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, MessageSquare, Calendar } from 'lucide-react';
import { useHotel } from '../../context/HotelContext';

export default function StickyContactBar() {
  const { property, openWhatsApp } = useHotel();
  const location = useLocation();

  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <aside aria-label="Quick contact and reservation bar">
      {/* Mobile Minimalist Sticky Action Bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 px-3 py-2 flex items-center justify-between gap-2 md:hidden shadow-lg">
        <a
          href={`tel:${property.phoneRaw}`}
          className="flex-1 py-2 px-2 rounded-xl bg-stone-warm text-obsidian border border-stone-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
        >
          <Phone className="w-3.5 h-3.5 text-gold-dark" />
          <span>Call Now</span>
        </a>

        <button
          onClick={() => openWhatsApp()}
          className="flex-1 py-2 px-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </button>

        <Link
          to="/booking"
          className="flex-1 py-2 px-2 rounded-xl minimal-btn-gold text-xs font-semibold flex items-center justify-center gap-1.5 transition"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Book Stay</span>
        </Link>
      </div>

      {/* Desktop Floating WhatsApp Pill */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-3">
        <button
          onClick={() => openWhatsApp()}
          className="group flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white pl-4 pr-5 py-3 rounded-full shadow-lg transition-all duration-300"
          title="Direct WhatsApp Reservation Enquiry"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-300 animate-pulse"></div>
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
            <MessageSquare className="w-3.5 h-3.5 text-white" />
          </div>
          <div className="text-left">
            <div className="text-[10px] uppercase font-bold tracking-widest text-emerald-100">24/7 Available</div>
            <div className="text-xs font-semibold">Enquire on WhatsApp</div>
          </div>
        </button>
      </div>
    </aside>
  );
}
