import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, MessageSquare, Calendar } from 'lucide-react';
import { useHotel } from '../../context/HotelContext';

export default function StickyContactBar() {
  const { property, openWhatsApp } = useHotel();
  const location = useLocation();

  // Hide on admin page to avoid interfering with management tools
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <aside aria-label="Quick contact and reservation bar">
      {/* Mobile Sticky Action Bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-alabaster/95 backdrop-blur-md border-t border-gold/30 shadow-skeuo-elevated px-3 py-2 flex items-center justify-between gap-2 md:hidden">
        <a
          href={`tel:${property.phoneRaw}`}
          className="flex-1 py-2 px-2 rounded-xl bg-surface-muted text-charcoal border border-surface-border text-xs font-bold flex items-center justify-center gap-1.5 shadow-skeuo-sm active:scale-95 transition"
        >
          <Phone className="w-3.5 h-3.5 text-gold-dark" />
          <span>Call Now</span>
        </a>

        <button
          onClick={() => openWhatsApp()}
          className="flex-1 py-2 px-2 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </button>

        <Link
          to="/booking"
          className="flex-1 py-2 px-2 rounded-xl skeuo-btn-gold text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 transition"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Book Stay</span>
        </Link>
      </div>

      {/* Desktop Floating WhatsApp Pill */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-3">
        <button
          onClick={() => openWhatsApp()}
          className="group flex items-center gap-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 text-white pl-4 pr-5 py-3 rounded-full shadow-lg hover:shadow-emerald-600/30 border border-emerald-400/40 hover:-translate-y-0.5 transition-all duration-300"
          title="Direct WhatsApp Reservation Enquiry"
        >
          <div className="w-3 h-3 rounded-full bg-emerald-300 animate-ping absolute -top-1 -right-1"></div>
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
            <MessageSquare className="w-3.5 h-3.5 text-white" />
          </div>
          <div className="text-left">
            <div className="text-[10px] uppercase font-bold tracking-widest text-emerald-200">24/7 Available</div>
            <div className="text-xs font-bold">Enquire on WhatsApp</div>
          </div>
        </button>
      </div>
    </aside>
  );
}

