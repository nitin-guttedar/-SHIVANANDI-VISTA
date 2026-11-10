import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  CheckCircle2,
  MessageSquare,
  ArrowRight,
  Sun,
  Zap,
  Luggage,
  Car
} from 'lucide-react';
import SEO from '../components/common/SEO';
import { useHotel } from '../context/HotelContext';

export default function FacilitiesPage() {
  const { amenities, openWhatsApp } = useHotel();

  return (
    <>
      <SEO
        title="Hotel Facilities & Amenities | SHIVANANDI VISTA Bengaluru"
        description="Discover the facilities and amenities available at SHIVANANDI VISTA hotel and resort in Bengaluru. Contact us for details about guest services."
        keywords="Hotel Amenities Yelahanka, Bangalore Airport Hotel Facilities, 24/7 Check-in Hotel Bangalore, Free Wi-Fi Hotel North Bangalore, Hotel with Parking Yelahanka"
        canonicalUrl="/facilities-and-amenities"
      />

      {/* Header Banner */}
      <section className="bg-[#141210] text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hotel-room-collage.jpg"
            alt="Facilities at SHIVANANDI VISTA"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141210] via-[#141210]/80 to-black/60"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-gold-light text-xs uppercase font-semibold tracking-widest mb-3 border border-white/10">
            Comfort & Convenience
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight mb-3">
            Facilities & Amenities
          </h1>
          <p className="text-obsidian-300 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
            Thoughtful Comfort for Every Guest at SHIVANANDI VISTA.
          </p>
        </div>
      </section>

      {/* Intro Narrative */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto text-center space-y-3">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-obsidian">
          Designed for Rest, Productivity & Peace of Mind
        </h2>
        <p className="text-obsidian-600 text-sm sm:text-base leading-relaxed">
          At <strong>SHIVANANDI VISTA</strong>, our hospitality experience is designed around the comfort and convenience of our guests. Explore the facilities and services available at our property that support your stay.
        </p>
      </section>

      {/* Amenities Categories Grid */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        {amenities.map((categoryGroup, index) => (
          <div key={index} className="minimal-card p-6 sm:p-8">
            <div className="flex items-center gap-3 border-b border-stone-200 pb-3 mb-6">
              <span className="w-8 h-8 rounded-lg bg-gold-pale text-gold-dark font-bold text-sm flex items-center justify-center">
                0{index + 1}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-obsidian">
                {categoryGroup.category}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {categoryGroup.items.map((item, itemIdx) => (
                <div key={itemIdx} className="p-4 rounded-xl bg-stone-warm/50 border border-stone-200/70 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <h4 className="font-bold text-obsidian text-sm">{item.name}</h4>
                  </div>
                  <p className="text-xs text-obsidian-600 leading-relaxed pl-6">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Property Highlights Feature Row */}
      <section className="py-16 bg-cream-100 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-2">
              <Zap className="w-6 h-6 text-gold mx-auto" />
              <h4 className="font-serif text-base font-bold text-obsidian">100% Power Backup</h4>
              <p className="text-xs text-obsidian-500">Uninterrupted generator support so your air conditioning and lights never turn off.</p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-2">
              <Luggage className="w-6 h-6 text-gold mx-auto" />
              <h4 className="font-serif text-base font-bold text-obsidian">Luggage Cloakroom</h4>
              <p className="text-xs text-obsidian-500">Secure storage for your bags while you visit local sights or await flights.</p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-2">
              <Sun className="w-6 h-6 text-gold mx-auto" />
              <h4 className="font-serif text-base font-bold text-obsidian">Tranquil Courtyard</h4>
              <p className="text-xs text-obsidian-500">Lush green garden surroundings with fresh air and peaceful sit-out areas.</p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-2">
              <Car className="w-6 h-6 text-gold mx-auto" />
              <h4 className="font-serif text-base font-bold text-obsidian">Dedicated Parking</h4>
              <p className="text-xs text-obsidian-500">Safe vehicle parking space within the property perimeters.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Enquiry CTA */}
      <section className="py-16 px-4 max-w-3xl mx-auto text-center space-y-5">
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-obsidian">
          Have Questions About Specific Facilities?
        </h3>
        <p className="text-obsidian-600 text-sm max-w-lg mx-auto leading-relaxed">
          Contact our hospitality team for any custom arrangements, accessible room requests, or airport pickup schedules.
        </p>

        <div className="pt-2 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => openWhatsApp("Hello SHIVANANDI VISTA, I have an enquiry regarding specific amenities & room facilities.")}
            className="minimal-btn-gold px-6 py-2.5 text-xs sm:text-sm font-semibold flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Enquire on WhatsApp</span>
          </button>

          <Link
            to="/booking"
            className="minimal-btn-outline px-6 py-2.5 text-xs sm:text-sm font-semibold flex items-center gap-2"
          >
            <span>Book Your Stay</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
