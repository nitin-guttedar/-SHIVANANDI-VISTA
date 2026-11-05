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
      <section className="bg-[#141210] text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=80"
            alt="Rooms at SHIVANANDI VISTA"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141210] via-[#141210]/80 to-black/60"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-gold-light text-xs uppercase font-semibold tracking-widest mb-3 border border-white/10">
            Comfortable Accommodations
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight mb-3">
            Rooms & Accommodation
          </h1>
          <p className="text-obsidian-300 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
            Discover Your Ideal Stay at SHIVANANDI VISTA, Yelahanka Taluk, Bengaluru.
          </p>
        </div>
      </section>

      {/* Filter and Overview */}
      <section className="py-8 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-xl font-bold text-obsidian">
              Available Room Categories
            </h2>
            <p className="text-xs text-obsidian-500">
              Select a category to view specifications, tariffs, and in-room amenities.
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                  selectedCategory === cat
                    ? 'bg-obsidian text-white'
                    : 'bg-stone-warm text-obsidian-700 border border-stone-200 hover:bg-stone-200/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Rooms List */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        {filteredRooms.map((room, index) => {
          const isReversed = index % 2 !== 0;
          return (
            <div
              key={room.id}
              id={room.id}
              className="minimal-card overflow-hidden"
            >
              <div className={`grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
                
                {/* Images Column */}
                <div className={`lg:col-span-5 relative bg-stone-100 ${isReversed ? 'lg:order-2' : ''}`}>
                  <img
                    src={room.image}
                    alt={`${room.title} - SHIVANANDI VISTA`}
                    className="w-full h-72 lg:h-full object-cover min-h-[300px]"
                    loading="lazy"
                  />

                  {room.badge && (
                    <div className="absolute top-4 left-4 bg-white/95 text-obsidian text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-gold" />
                      <span>{room.badge}</span>
                    </div>
                  )}

                  {/* Thumbnail strip */}
                  {room.gallery && room.gallery.length > 1 && (
                    <div className="absolute bottom-4 left-4 right-4 flex gap-2 overflow-x-auto pb-1">
                      {room.gallery.map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          alt="Room preview thumbnail"
                          className="w-14 h-10 object-cover rounded-md border border-white/60 cursor-pointer"
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Content Column */}
                <div className={`lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6 ${isReversed ? 'lg:order-1' : ''}`}>
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                      <h3 className="font-serif text-2xl font-bold text-obsidian">
                        {room.title}
                      </h3>
                      <div className="text-right">
                        <span className="text-[10px] uppercase font-bold text-obsidian-500 block">Tariff</span>
                        <div className="text-xl font-bold text-obsidian">
                          <span className="text-sm text-gold-dark font-semibold">₹</span>
                          <span>{room.pricePerNight?.toLocaleString('en-IN')}</span>
                          <span className="text-xs font-normal text-obsidian-500"> / night</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-obsidian-600 text-sm leading-relaxed mb-6">
                      {room.fullDesc || room.shortDesc}
                    </p>

                    {/* Room Specs Grid */}
                    <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-stone-warm/70 border border-stone-200 text-xs text-obsidian mb-6">
                      <div className="flex flex-col items-center text-center">
                        <Users className="w-4 h-4 text-gold mb-1" />
                        <span className="font-bold">{room.capacity.split('(')[0]}</span>
                        <span className="text-[10px] text-obsidian-500">Max Capacity</span>
                      </div>
                      <div className="flex flex-col items-center text-center border-x border-stone-300">
                        <Bed className="w-4 h-4 text-gold mb-1" />
                        <span className="font-bold">{room.bed}</span>
                        <span className="text-[10px] text-obsidian-500">Bedding</span>
                      </div>
                      <div className="flex flex-col items-center text-center">
                        <Maximize2 className="w-4 h-4 text-gold mb-1" />
                        <span className="font-bold">{room.size}</span>
                        <span className="text-[10px] text-obsidian-500">Room Area</span>
                      </div>
                    </div>

                    {/* Amenities Checklist */}
                    <div>
                      <h4 className="text-xs uppercase font-bold tracking-wider text-obsidian-500 mb-3">
                        Included Room Amenities & Features:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-obsidian-700">
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
                  <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center gap-3">
                    <Link
                      to={`/booking?room=${encodeURIComponent(room.title)}`}
                      className="minimal-btn-gold px-6 py-2.5 text-xs sm:text-sm font-semibold flex items-center gap-2"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Book This Room</span>
                    </Link>

                    <button
                      onClick={() => handleWhatsAppEnquiry(room)}
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 transition"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Enquire on WhatsApp</span>
                    </button>

                    <a
                      href={`tel:${property.phoneRaw}`}
                      className="minimal-btn-outline px-4 py-2.5 text-xs sm:text-sm font-semibold flex items-center gap-1.5"
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
      <section className="py-16 bg-cream-100 border-t border-stone-200">
        <div className="max-w-3xl mx-auto px-4 text-center space-y-4">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-obsidian">
            Planning a Group Stay or Special Celebration?
          </h3>
          <p className="text-obsidian-600 text-sm max-w-xl mx-auto leading-relaxed">
            For group reservations, corporate bookings, wedding guests, or extended transit stays in Yelahanka, reach out directly to our reservations desk for customized packages.
          </p>
          <div className="pt-2 flex justify-center">
            <button
              onClick={() => openWhatsApp("Hello SHIVANANDI VISTA, I want to enquire about a group booking and multi-room rates.")}
              className="minimal-btn-gold px-6 py-2.5 text-xs sm:text-sm font-semibold flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Discuss Group Requirements</span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
