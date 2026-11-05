import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Users,
  Bed,
  Maximize2,
  CheckCircle2,
  MessageSquare,
  ArrowRight,
  Phone,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import SEO from '../components/common/SEO';
import { useHotel } from '../context/HotelContext';

export default function RoomsPage() {
  const { rooms, property, openWhatsApp } = useHotel();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Suites', 'Executive', 'Family', 'Transit'];
  const filteredRooms = selectedCategory === 'All'
    ? rooms
    : rooms.filter(r => r.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  const handleWhatsAppEnquiry = (room) => {
    const text = `Hello SHIVANANDI VISTA, I would like to enquire about room availability and tariffs for "${room.title}". Please share details.`;
    openWhatsApp(text);
  };

  return (
    <>
      <SEO
        title="Rooms & Accommodation | SHIVANANDI VISTA Bengaluru"
        description="Explore room options and accommodation at SHIVANANDI VISTA in Yelahanka Taluk, Bengaluru. Contact us for room details and booking availability."
        keywords="Rooms in Yelahanka, Accommodation Near Bangalore Airport, Suites in North Bangalore, Family Rooms in Yelahanka, Transit Stay Devanahalli"
        canonicalUrl="/rooms-and-accommodation"
      />

      {/* Header Banner */}
      <section className="bg-[#1C1917] text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=80"
            alt="Rooms at SHIVANANDI VISTA"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917] via-[#1C1917]/80 to-black/60"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold-cream/10 border border-gold/30 text-gold-bright text-xs uppercase font-bold tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Comfortable Accommodations</span>
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
            Rooms & Accommodation
          </h1>
          <p className="text-charcoal-300 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Discover Your Ideal Stay at SHIVANANDI VISTA, Yelahanka Taluk, Bengaluru.
          </p>
        </div>
      </section>

      {/* Filter and Overview */}
      <section className="py-12 bg-alabaster-200 border-b border-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-serif text-2xl font-bold text-charcoal">
              Available Room Categories
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
              Select a category to view specifications, tariffs, and in-room amenities.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'skeuo-btn-gold'
                    : 'bg-surface-muted text-charcoal-700 border border-surface-border hover:bg-surface-hover'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Rooms List */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
        {filteredRooms.map((room, index) => {
          const isReversed = index % 2 !== 0;
          return (
            <div
              key={room.id}
              id={room.id}
              className="skeuo-plate overflow-hidden border border-surface-border shadow-skeuo-card hover:shadow-skeuo-elevated transition-all duration-300"
            >
              <div className={`grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
                
                {/* Images Column */}
                <div className={`lg:col-span-5 relative bg-charcoal-900 ${isReversed ? 'lg:order-2' : ''}`}>
                  <img
                    src={room.image}
                    alt={`${room.title} - SHIVANANDI VISTA`}
                    className="w-full h-72 lg:h-full object-cover min-h-[320px]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20"></div>

                  {room.badge && (
                    <div className="absolute top-4 left-4 bg-[#1C1917]/90 text-gold-bright border border-gold/40 text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1.5 backdrop-blur-sm">
                      <Sparkles className="w-3.5 h-3.5 text-gold" />
                      <span>{room.badge}</span>
                    </div>
                  )}

                  {/* Thumbnail strip if gallery available */}
                  {room.gallery && room.gallery.length > 1 && (
                    <div className="absolute bottom-4 left-4 right-4 flex gap-2 overflow-x-auto pb-1">
                      {room.gallery.map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          alt="Room preview thumbnail"
                          className="w-14 h-10 object-cover rounded-md border border-white/40 opacity-80 hover:opacity-100 transition cursor-pointer"
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Content Column */}
                <div className={`lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6 ${isReversed ? 'lg:order-1' : ''}`}>
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
                        {room.title}
                      </h3>
                      <div className="skeuo-badge px-3.5 py-1.5 rounded-xl text-right">
                        <span className="text-[10px] uppercase font-bold text-charcoal-500 block">Tariff</span>
                        <div className="text-xl font-extrabold text-charcoal">
                          <span className="text-sm text-gold-dark font-bold">₹</span>
                          <span>{room.pricePerNight?.toLocaleString('en-IN')}</span>
                          <span className="text-xs font-normal text-charcoal-500"> / night</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-charcoal-700 text-sm sm:text-base leading-relaxed mb-6">
                      {room.fullDesc || room.shortDesc}
                    </p>

                    {/* Room Specs Grid */}
                    <div className="grid grid-cols-3 gap-3 p-4 rounded-xl skeuo-inset text-xs text-charcoal mb-6">
                      <div className="flex flex-col items-center text-center">
                        <Users className="w-4 h-4 text-gold mb-1" />
                        <span className="font-bold">{room.capacity.split('(')[0]}</span>
                        <span className="text-[10px] text-charcoal-500">Max Capacity</span>
                      </div>
                      <div className="flex flex-col items-center text-center border-x border-surface-border">
                        <Bed className="w-4 h-4 text-gold mb-1" />
                        <span className="font-bold">{room.bed}</span>
                        <span className="text-[10px] text-charcoal-500">Bedding</span>
                      </div>
                      <div className="flex flex-col items-center text-center">
                        <Maximize2 className="w-4 h-4 text-gold mb-1" />
                        <span className="font-bold">{room.size}</span>
                        <span className="text-[10px] text-charcoal-500">Room Area</span>
                      </div>
                    </div>

                    {/* Amenities Checklist */}
                    <div>
                      <h4 className="text-xs uppercase font-bold tracking-wider text-charcoal-500 mb-3">
                        Included Room Amenities & Features:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-charcoal-700">
                        {room.amenities.map((amenity, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-surface-border flex flex-wrap items-center gap-3">
                    <Link
                      to={`/booking?room=${encodeURIComponent(room.title)}`}
                      className="skeuo-btn-gold px-6 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-gold-btn"
                    >
                      <Calendar className="w-4 h-4 text-charcoal-900" />
                      <span>Book This Room</span>
                    </Link>

                    <button
                      onClick={() => handleWhatsAppEnquiry(room)}
                      className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Enquire on WhatsApp</span>
                    </button>

                    <a
                      href={`tel:${property.phoneRaw}`}
                      className="skeuo-btn-dark px-4 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5"
                    >
                      <Phone className="w-4 h-4 text-gold" />
                      <span>Call for Tariff</span>
                    </a>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </section>

      {/* Custom Group Enquiry Box */}
      <section className="py-16 bg-alabaster-200 border-t border-surface-border">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
            Planning a Group Stay or Special Celebration?
          </h3>
          <p className="text-charcoal-600 text-sm max-w-xl mx-auto leading-relaxed">
            For group reservations, corporate bookings, wedding guests, or extended transit stays in Yelahanka, reach out directly to our reservations desk for customized packages.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <button
              onClick={() => openWhatsApp("Hello SHIVANANDI VISTA, I want to enquire about a group booking and multi-room rates.")}
              className="skeuo-btn-gold px-6 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-charcoal-900" />
              <span>Discuss Group Requirements</span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

