import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Bed, Maximize2, Check, MessageSquare, ArrowRight, Sparkles } from 'lucide-react';
import { useHotel } from '../../context/HotelContext';

export default function RoomCard({ room }) {
  const { openWhatsApp } = useHotel();

  const handleWhatsAppEnquiry = () => {
    const text = `Hello SHIVANANDI VISTA, I am interested in reserving the "${room.title}" (₹${room.pricePerNight?.toLocaleString('en-IN')}/night). Could you please share availability and booking details?`;
    openWhatsApp(text);
  };

  return (
    <div className="minimal-card overflow-hidden flex flex-col group">
      {/* Image with subtle badge */}
      <div className="relative h-64 overflow-hidden bg-stone-100">
        <img
          src={room.image}
          alt={`${room.title} at SHIVANANDI VISTA Yelahanka Bengaluru`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

        {/* Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          {room.badge && (
            <div className={`text-[11px] font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1 ${
              room.status === 'OCCUPIED'
                ? 'bg-rose-100 text-rose-800 border border-rose-300'
                : 'bg-white/95 text-obsidian'
            }`}>
              <Sparkles className={`w-3 h-3 ${room.status === 'OCCUPIED' ? 'text-rose-600' : 'text-gold'}`} />
              <span>{room.status === 'OCCUPIED' ? 'Reserved' : room.badge}</span>
            </div>
          )}
          {room.floor && (
            <span className="bg-black/60 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
              {room.floor}
            </span>
          )}
        </div>

        {/* Minimal Price tag */}
        <div className="absolute bottom-3 right-3 bg-white/95 text-obsidian px-3 py-1.5 rounded-xl shadow-sm text-right">
          <div className="text-[10px] uppercase font-bold text-obsidian-500">From</div>
          <div className="text-base font-bold text-obsidian flex items-center gap-0.5">
            <span className="text-xs text-gold-dark font-semibold">₹</span>
            <span>{room.pricePerNight?.toLocaleString('en-IN')}</span>
            <span className="text-[11px] font-normal text-obsidian-500">/ night</span>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <h3 className="font-serif text-xl font-bold text-obsidian group-hover:text-gold transition-colors">
              {room.title}
            </h3>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-stone-warm text-obsidian-700 border border-stone-200">
              {room.category}
            </span>
          </div>

          <p className="text-obsidian-600 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4">
            {room.shortDesc}
          </p>

          {/* Quick Specifications */}
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-stone-100 text-xs text-obsidian-700 bg-stone-warm/50 rounded-lg px-3">
            <div className="flex flex-col items-center text-center">
              <Users className="w-4 h-4 text-gold mb-1" />
              <span className="text-[11px] font-medium text-obsidian-700">{room.capacity.split('(')[0]}</span>
            </div>
            <div className="flex flex-col items-center text-center border-x border-stone-200/60">
              <Bed className="w-4 h-4 text-gold mb-1" />
              <span className="text-[11px] font-medium text-obsidian-700">{room.bed}</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Maximize2 className="w-4 h-4 text-gold mb-1" />
              <span className="text-[11px] font-medium text-obsidian-700">{room.size}</span>
            </div>
          </div>

          {/* Highlight Amenities */}
          <div className="mt-3 space-y-1.5">
            {room.amenities.slice(0, 3).map((amenity, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-obsidian-600">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="line-clamp-1">{amenity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex items-center gap-2">
          {room.status === 'OCCUPIED' ? (
            <button
              disabled
              className="flex-1 py-2.5 px-3 rounded-xl bg-stone-100 text-stone-500 border border-stone-200 text-xs font-bold flex items-center justify-center gap-1.5 cursor-not-allowed"
            >
              <span>Currently Reserved</span>
            </button>
          ) : (
            <Link
              to={`/booking?room=${encodeURIComponent(room.title)}`}
              className="flex-1 py-2.5 px-3 rounded-xl minimal-btn-gold text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <span>Book Room</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}

          <button
            onClick={handleWhatsAppEnquiry}
            className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition shadow-sm"
            title="Enquire on WhatsApp"
          >
            <MessageSquare className="w-4 h-4 text-emerald-600" />
          </button>
        </div>
      </div>
    </div>
  );
}
