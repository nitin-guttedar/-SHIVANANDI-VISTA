import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Bed, Maximize2, Check, MessageSquare, ArrowRight, Sparkles } from 'lucide-react';
import { useHotel } from '../../context/HotelContext';

export default function RoomCard({ room, featured = false }) {
  const { openWhatsApp } = useHotel();

  const handleWhatsAppEnquiry = () => {
    const text = `Hello SHIVANANDI VISTA, I am interested in reserving the "${room.title}" (₹${room.pricePerNight?.toLocaleString('en-IN')}/night). Could you please share availability and booking details?`;
    openWhatsApp(text);
  };

  return (
    <div className="skeuo-plate overflow-hidden flex flex-col group hover:shadow-skeuo-elevated transition-all duration-300 border border-surface-border hover:border-gold/50">
      {/* Image with tactile bevel & Badge */}
      <div className="relative h-64 overflow-hidden bg-charcoal-800">
        <img
          src={room.image}
          alt={`${room.title} at SHIVANANDI VISTA Yelahanka Bengaluru`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-transparent to-black/20"></div>

        {/* Badge */}
        {room.badge && (
          <div className="absolute top-3 left-3 bg-[#1C1917]/90 text-gold-bright border border-gold/40 text-[11px] font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1 backdrop-blur-sm">
            <Sparkles className="w-3 h-3 text-gold" />
            <span>{room.badge}</span>
          </div>
        )}

        {/* Price tag with gold medallion styling */}
        <div className="absolute bottom-3 right-3 skeuo-badge px-3 py-1.5 rounded-xl text-right backdrop-blur-md">
          <div className="text-[10px] uppercase font-bold text-charcoal-500">Starting From</div>
          <div className="text-base font-extrabold text-charcoal flex items-center gap-0.5">
            <span className="text-xs text-gold-dark font-bold">₹</span>
            <span>{room.pricePerNight?.toLocaleString('en-IN')}</span>
            <span className="text-[11px] font-normal text-charcoal-500">/ night</span>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <h3 className="font-serif text-xl font-bold text-charcoal group-hover:text-gold-dark transition-colors">
              {room.title}
            </h3>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-gold-cream text-gold-dark border border-gold/20">
              {room.category}
            </span>
          </div>

          <p className="text-charcoal-600 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4">
            {room.shortDesc}
          </p>

          {/* Quick Specifications */}
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-surface-border text-xs text-charcoal-700 bg-surface-muted/40 rounded-lg px-3">
            <div className="flex flex-col items-center text-center">
              <Users className="w-4 h-4 text-gold mb-1" />
              <span className="text-[11px] font-medium text-charcoal-600">{room.capacity.split('(')[0]}</span>
            </div>
            <div className="flex flex-col items-center text-center border-x border-surface-border">
              <Bed className="w-4 h-4 text-gold mb-1" />
              <span className="text-[11px] font-medium text-charcoal-600">{room.bed}</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Maximize2 className="w-4 h-4 text-gold mb-1" />
              <span className="text-[11px] font-medium text-charcoal-600">{room.size}</span>
            </div>
          </div>

          {/* Highlight Amenities */}
          <div className="mt-3 space-y-1.5">
            {room.amenities.slice(0, 3).map((amenity, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-charcoal-600">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="line-clamp-1">{amenity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex items-center gap-2">
          <Link
            to={`/booking?room=${encodeURIComponent(room.title)}`}
            className="flex-1 py-2.5 px-3 rounded-xl skeuo-btn-gold text-xs font-bold flex items-center justify-center gap-1.5"
          >
            <span>Book Room</span>
            <ArrowRight className="w-3.5 h-3.5 text-charcoal-900" />
          </Link>

          <button
            onClick={handleWhatsAppEnquiry}
            className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300 transition shadow-skeuo-sm"
            title="Enquire on WhatsApp"
          >
            <MessageSquare className="w-4 h-4 text-emerald-600" />
          </button>
        </div>
      </div>
    </div>
  );
}

