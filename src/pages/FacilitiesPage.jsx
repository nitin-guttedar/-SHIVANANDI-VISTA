import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Wifi,
  Wind,
  Tv,
  Coffee,
  Car,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Phone,
  MessageSquare,
  ArrowRight,
  Sun,
  Zap,
  Luggage,
  Sparkle
} from 'lucide-react';
import SEO from '../components/common/SEO';
import { useHotel } from '../context/HotelContext';

export default function FacilitiesPage() {
  const { property, amenities, openWhatsApp } = useHotel();

  return (
    <>
      <SEO
        title="Hotel Facilities & Amenities | SHIVANANDI VISTA Bengaluru"
        description="Discover the facilities and amenities available at SHIVANANDI VISTA hotel and resort in Bengaluru. Contact us for details about guest services."
        keywords="Hotel Amenities Yelahanka, Bangalore Airport Hotel Facilities, 24/7 Check-in Hotel Bangalore, Free Wi-Fi Hotel North Bangalore, Hotel with Parking Yelahanka"
        canonicalUrl="/facilities-and-amenities"
      />

      {/* Header Banner */}
      <section className="bg-[#1C1917] text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80"
            alt="Facilities at SHIVANANDI VISTA"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917] via-[#1C1917]/80 to-black/60"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold-cream/10 border border-gold/30 text-gold-bright text-xs uppercase font-bold tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Comfort & Convenience</span>
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
            Facilities & Amenities
          </h1>
          <p className="text-charcoal-300 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Thoughtful Comfort for Every Guest at SHIVANANDI VISTA.
          </p>
        </div>
      </section>

      {/* Intro Narrative */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center space-y-4">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
          Designed for Rest, Productivity & Peace of Mind
        </h2>
        <p className="text-charcoal-600 text-sm sm:text-base leading-relaxed">
          At <strong>SHIVANANDI VISTA</strong>, our hospitality experience is designed around the comfort and convenience of our guests. Whether you are staying for a quick overnight airport stopover or an extended vacation in Yelahanka, explore the facilities and services available at our property that support your stay.
        </p>
      </section>

      {/* Amenities Categories Grid */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        {amenities.map((categoryGroup, index) => (
          <div key={index} className="skeuo-plate p-6 sm:p-10 border border-surface-border">
            <div className="flex items-center gap-3 border-b border-surface-border pb-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gold-cream text-gold-dark border border-gold/30 flex items-center justify-center font-bold">
                {index + 1}
              </div>
              <h3 className="font-serif text-2xl font-bold text-charcoal">
                {categoryGroup.category}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryGroup.items.map((item, itemIdx) => (
                <div key={itemIdx} className="p-5 rounded-xl skeuo-inset bg-surface-muted/50 border border-surface-border space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <h4 className="font-bold text-charcoal text-sm">{item.name}</h4>
                  </div>
                  <p className="text-xs text-charcoal-600 leading-relaxed pl-6">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Property Highlights Feature Row */}
      <section className="py-16 bg-alabaster-200 border-y border-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 rounded-2xl skeuo-plate space-y-3">
              <Zap className="w-8 h-8 text-gold mx-auto" />
              <h4 className="font-serif text-lg font-bold text-charcoal">100% Power Backup</h4>
              <p className="text-xs text-charcoal-500">Uninterrupted generator support so your air conditioning and lights never turn off.</p>
            </div>

            <div className="p-6 rounded-2xl skeuo-plate space-y-3">
              <Luggage className="w-8 h-8 text-gold mx-auto" />
              <h4 className="font-serif text-lg font-bold text-charcoal">Luggage Cloakroom</h4>
              <p className="text-xs text-charcoal-500">Secure storage for your bags while you visit local sights or await flights.</p>
            </div>

            <div className="p-6 rounded-2xl skeuo-plate space-y-3">
              <Sun className="w-8 h-8 text-gold mx-auto" />
              <h4 className="font-serif text-lg font-bold text-charcoal">Tranquil Courtyard</h4>
              <p className="text-xs text-charcoal-500">Lush green garden surroundings with fresh air and peaceful sit-out areas.</p>
            </div>

            <div className="p-6 rounded-2xl skeuo-plate space-y-3">
              <Car className="w-8 h-8 text-gold mx-auto" />
              <h4 className="font-serif text-lg font-bold text-charcoal">Dedicated Parking</h4>
              <p className="text-xs text-charcoal-500">Safe and covered vehicle parking space within the property perimeters.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Enquiry CTA */}
      <section className="py-20 px-4 max-w-4xl mx-auto text-center space-y-6">
        <h3 className="font-serif text-3xl font-bold text-charcoal">
          Have Questions About Specific Facilities?
        </h3>
        <p className="text-charcoal-600 text-sm max-w-xl mx-auto leading-relaxed">
          Contact our hospitality team for any custom arrangements, accessible room requests, or airport pickup schedules.
        </p>

        <div className="pt-2 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => openWhatsApp("Hello SHIVANANDI VISTA, I have an enquiry regarding specific amenities & room facilities.")}
            className="skeuo-btn-gold px-8 py-3.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-charcoal-900" />
            <span>Enquire on WhatsApp</span>
          </button>

          <Link
            to="/booking"
            className="skeuo-btn-dark px-8 py-3.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2"
          >
            <span>Book Your Stay</span>
            <ArrowRight className="w-4 h-4 text-gold-bright" />
          </Link>
        </div>
      </section>
    </>
  );
}

