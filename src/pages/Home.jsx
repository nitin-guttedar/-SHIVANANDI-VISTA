import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Phone,
  MessageSquare,
  ShieldCheck,
  MapPin,
  Clock,
  Wifi,
  Wind,
  Car,
  Coffee,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  Star,
  Compass,
  Building2,
  Hotel
} from 'lucide-react';
import SEO from '../components/common/SEO';
import BookingWidget from '../components/booking/BookingWidget';
import RoomCard from '../components/rooms/RoomCard';
import { useHotel } from '../context/HotelContext';

export default function Home() {
  const { property, rooms, faqs, gallery, testimonials, openWhatsApp } = useHotel();
  const [activeFaq, setActiveFaq] = useState(0);
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState('All');

  const galleryCategories = ['All', 'Rooms', 'Property', 'Amenities', 'Dining'];
  const filteredGallery = selectedGalleryCategory === 'All'
    ? gallery
    : gallery.filter(g => g.category === selectedGalleryCategory);

  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "name": property.name,
    "description": "Premium hotel and resort in Yelahanka Taluk, Bengaluru. Offering comfortable rooms, hospitality, and airport proximity.",
    "telephone": property.phone,
    "email": property.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "No.15, RD Greenwoods, I Phase, Begur, BK Halli Post",
      "addressLocality": "Yelahanka Taluk, Bengaluru",
      "addressRegion": "Karnataka",
      "postalCode": "562149",
      "addressCountry": "IN"
    }
  };

  return (
    <>
      <SEO
        title="SHIVANANDI VISTA | Hotel & Resort in Yelahanka, Bengaluru"
        description="Discover SHIVANANDI VISTA, a welcoming hotel and resort in Yelahanka Taluk, Bengaluru. Explore comfortable rooms, hospitality, airport connectivity, and direct booking enquiries."
        keywords="Hotel Near Bangalore Airport, Accommodation Near Bangalore Airport, Stay Near Kempegowda International Airport, Hotels in Yelahanka Bangalore, Accommodation in North Bangalore, Stay Near Devanahalli Bangalore, Hotels Near Yelahanka, Accommodation Near North Bengaluru"
        canonicalUrl="/"
        schema={homeSchema}
      />

      {/* HERO SECTION with Tactile Skeuomorphic Depth & Luxury Styling */}
      <section className="relative min-h-[90vh] flex flex-col justify-between pt-12 pb-16 bg-[#161311] text-white overflow-hidden">
        {/* Rich Background Layer with Parallax-feel Hospitality Photography */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=85"
            alt="SHIVANANDI VISTA Hotel and Resort in Yelahanka Bangalore"
            className="w-full h-full object-cover opacity-35 scale-105 animate-pulse duration-[10000ms]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#161311] via-[#161311]/70 to-black/60"></div>
          {/* Subtle gold radial glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gold/15 rounded-full blur-[140px] pointer-events-none"></div>
        </div>

        {/* Hero Top Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8 sm:pt-14 my-auto">
          {/* Emblem Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2A241F]/80 border border-gold/40 text-gold-bright text-xs uppercase tracking-widest font-semibold shadow-gold-btn backdrop-blur-md mb-6">
            <Sparkles className="w-3.5 h-3.5 text-gold animate-spin" />
            <span>Premium Hospitality in Yelahanka Taluk, Bengaluru</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.15]">
            Discover Comfort and Hospitality at{' '}
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-gold-bright via-gold-light to-gold">
              SHIVANANDI VISTA
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-charcoal-300 text-base sm:text-lg md:text-xl font-normal leading-relaxed mb-10">
            Welcome to a tranquil retreat located at RD Greenwoods, Begur, BK Halli Post, Yelahanka Taluk.
            Whether you are planning a family getaway, a leisure visit, an airport transit stay, or a corporate trip, discover a place where comfort, convenience, and warm hospitality come together.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <Link
              to="/rooms-and-accommodation"
              className="skeuo-btn-gold px-8 py-4 rounded-xl text-sm sm:text-base font-bold flex items-center gap-2.5 shadow-gold-btn"
            >
              <Hotel className="w-5 h-5 text-charcoal-900" />
              <span>Explore Our Rooms</span>
            </Link>

            <button
              onClick={() => openWhatsApp()}
              className="px-6 py-4 rounded-xl bg-emerald-600/95 hover:bg-emerald-500 text-white text-sm sm:text-base font-bold flex items-center gap-2.5 border border-emerald-400/40 shadow-lg shadow-emerald-950/40 transition active:scale-95"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Enquire on WhatsApp</span>
            </button>

            <Link
              to="/contact-us"
              className="skeuo-btn-dark px-6 py-4 rounded-xl text-sm sm:text-base font-bold flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-gold" />
              <span>Contact Us</span>
            </Link>
          </div>
        </div>

        {/* Hero Interactive Booking Widget */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 w-full">
          <BookingWidget variant="horizontal" />
        </div>
      </section>

      {/* QUICK STATS / TRUST BANNER with Inset Skeuomorphic Depth */}
      <section className="bg-alabaster-200 border-y border-surface-border py-8 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 rounded-xl skeuo-inset">
            <Clock className="w-6 h-6 text-gold mx-auto mb-2" />
            <div className="font-serif text-2xl font-bold text-charcoal">24/7</div>
            <div className="text-xs text-charcoal-500 font-medium">Front Desk & Check-In</div>
          </div>

          <div className="p-4 rounded-xl skeuo-inset">
            <PlaneIcon className="w-6 h-6 text-gold mx-auto mb-2" />
            <div className="font-serif text-2xl font-bold text-charcoal">Airport</div>
            <div className="text-xs text-charcoal-500 font-medium">Proximity & Cab Support</div>
          </div>

          <div className="p-4 rounded-xl skeuo-inset">
            <Wifi className="w-6 h-6 text-gold mx-auto mb-2" />
            <div className="font-serif text-2xl font-bold text-charcoal">Optic Wi-Fi</div>
            <div className="text-xs text-charcoal-500 font-medium">High-Speed Connectivity</div>
          </div>

          <div className="p-4 rounded-xl skeuo-inset">
            <Car className="w-6 h-6 text-gold mx-auto mb-2" />
            <div className="font-serif text-2xl font-bold text-charcoal">Free Parking</div>
            <div className="text-xs text-charcoal-500 font-medium">Secured On-Site Space</div>
          </div>
        </div>
      </section>

      {/* ABOUT SHIVANANDI VISTA SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Image Mosaic */}
          <div className="relative">
            <div className="relative z-10 rounded-2xl overflow-hidden skeuo-plate p-2.5">
              <img
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"
                alt="Hospitality at SHIVANANDI VISTA Yelahanka"
                className="w-full h-[400px] object-cover rounded-xl"
              />
            </div>
            {/* Overlapping Card */}
            <div className="absolute -bottom-6 -right-6 z-20 w-64 bg-[#1C1917] text-white p-5 rounded-2xl border border-gold/40 shadow-skeuo-elevated hidden sm:block">
              <div className="flex items-center gap-2 text-gold-bright text-xs font-bold uppercase tracking-wider mb-1">
                <Sparkles className="w-4 h-4 text-gold" />
                <span>Our Promise</span>
              </div>
              <p className="text-xs text-charcoal-300 leading-relaxed">
                "Thoughtful hospitality crafted around genuine care, hygiene, and guest satisfaction."
              </p>
            </div>
          </div>

          {/* Right Column: Narrative */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-cream border border-gold/30 text-gold-dark text-xs uppercase tracking-wider font-bold">
              <span>About Our Property</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal leading-tight">
              Experience Comfortable Hospitality in Bengaluru
            </h2>

            <p className="text-charcoal-600 text-sm sm:text-base leading-relaxed">
              At <strong>SHIVANANDI VISTA</strong>, we believe that a truly memorable stay begins with a welcoming atmosphere and thoughtful hospitality. Situated at No.15, RD Greenwoods, I Phase, Begur, BK Halli Post, in Yelahanka Taluk, our hotel and resort welcomes guests seeking quiet comfort away from congested city zones while remaining conveniently connected to North Bengaluru's major hubs.
            </p>

            <p className="text-charcoal-600 text-sm sm:text-base leading-relaxed">
              Whether you are arriving for an international flight stopover, exploring nearby heritage sights like Devanahalli Fort, taking a family weekend trip to Nandi Hills, or attending business engagements in Hebbal or Yelahanka, our dedicated team is at your service 24 hours a day.
            </p>

            {/* Feature Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-charcoal">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>24-Hour Front Desk Support</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-charcoal">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Airport Transit Assistance</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-charcoal">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Pristine Hygiene & Daily Housekeeping</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-charcoal">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Direct Booking Best Price Guarantee</span>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <Link
                to="/about-us"
                className="skeuo-btn-gold px-6 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2"
              >
                <span>Discover Our Story</span>
                <ArrowRight className="w-4 h-4 text-charcoal-900" />
              </Link>
              <Link
                to="/contact-us"
                className="skeuo-btn-dark px-5 py-3 rounded-xl text-xs sm:text-sm font-bold"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ROOMS & ACCOMMODATION SHOWCASE */}
      <section className="py-20 bg-alabaster-100 border-y border-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest font-bold text-gold-dark bg-gold-cream border border-gold/30 px-3.5 py-1 rounded-full">
              Stay in Comfort
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal mt-3 mb-4">
              Find Your Comfortable Stay
            </h2>
            <p className="text-charcoal-600 text-sm sm:text-base leading-relaxed">
              Explore our curated accommodation options at SHIVANANDI VISTA. Each room is appointed with premium bedding, modern split air conditioning, smart entertainment, and 24/7 ensuite hot water.
            </p>
          </div>

          {/* Rooms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.slice(0, 3).map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/rooms-and-accommodation"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl skeuo-btn-dark text-sm font-bold shadow-skeuo-sm hover:scale-105 transition-transform"
            >
              <span>Explore All Rooms & Suites</span>
              <ArrowRight className="w-4 h-4 text-gold-bright" />
            </Link>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE SHIVANANDI VISTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-bold text-gold-dark bg-gold-cream border border-gold/30 px-3.5 py-1 rounded-full">
            Our Hospitality
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal mt-3 mb-4">
            Hospitality That Makes Every Stay Special
          </h2>
          <p className="text-charcoal-600 text-sm sm:text-base">
            We aim to create a welcoming experience for guests visiting Bengaluru. Whether your visit is for leisure, family time, or business travel, our focus is on making your stay comfortable and convenient.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="skeuo-plate p-8 space-y-4 hover:border-gold/40 transition">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2D2723] to-[#1C1917] border border-gold/40 shadow-gold-btn flex items-center justify-center text-gold-bright">
              <Sparkles className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-xl font-bold text-charcoal">Welcoming Hospitality</h3>
            <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
              Warm, attentive service that anticipates your needs from check-in to departure, ensuring you feel genuinely cared for throughout your visit.
            </p>
          </div>

          <div className="skeuo-plate p-8 space-y-4 hover:border-gold/40 transition">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2D2723] to-[#1C1917] border border-gold/40 shadow-gold-btn flex items-center justify-center text-gold-bright">
              <Compass className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-xl font-bold text-charcoal">Convenient Location</h3>
            <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
              Strategically placed in Yelahanka Taluk with direct connectivity to Kempegowda International Airport, Devanahalli heritage belt, and Hebbal tech zones.
            </p>
          </div>

          <div className="skeuo-plate p-8 space-y-4 hover:border-gold/40 transition">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2D2723] to-[#1C1917] border border-gold/40 shadow-gold-btn flex items-center justify-center text-gold-bright">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-xl font-bold text-charcoal">Direct Booking Ease</h3>
            <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
              Enjoy transparent pricing without hidden online agency fees, instant WhatsApp enquiry assistance, and customized room arrangements.
            </p>
          </div>
        </div>
      </section>

      {/* PHOTO GALLERY SECTION with Filter Tabs */}
      <section className="py-20 bg-alabaster-200 border-y border-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-gold-dark bg-gold-cream border border-gold/30 px-3.5 py-1 rounded-full">
                Visual Tour
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mt-2">
                Photo Gallery
              </h2>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap gap-2">
              {galleryCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedGalleryCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${selectedGalleryCategory === cat
                      ? 'skeuo-btn-gold'
                      : 'bg-surface-muted text-charcoal-700 border border-surface-border hover:bg-surface-hover'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filteredGallery.map((item, idx) => (
              <div
                key={idx}
                className="group relative h-56 rounded-2xl overflow-hidden skeuo-plate border border-surface-border shadow-skeuo-card hover:shadow-skeuo-elevated transition-all"
              >
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 text-white">
                  <span className="text-[10px] uppercase tracking-wider text-gold-bright font-bold">
                    {item.category}
                  </span>
                  <span className="text-xs font-semibold">{item.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GENUINE TESTIMONIALS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest font-bold text-gold-dark bg-gold-cream border border-gold/30 px-3.5 py-1 rounded-full">
            Guest Feedback
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mt-3">
            What Our Guests Share
          </h2>
          <p className="text-charcoal-600 text-sm mt-2">
            Genuine verified experiences from guests who have stayed at SHIVANANDI VISTA.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="skeuo-plate p-8 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-gold">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-charcoal-700 text-sm italic leading-relaxed">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-surface-border">
                <div className="font-serif font-bold text-charcoal text-base">{t.name}</div>
                <div className="text-xs text-charcoal-500 flex items-center justify-between mt-0.5">
                  <span>{t.origin} • {t.stayType}</span>
                  <span className="text-gold-dark font-medium">{t.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <section className="py-20 bg-alabaster-100 border-t border-surface-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest font-bold text-gold-dark bg-gold-cream border border-gold/30 px-3.5 py-1 rounded-full">
              Got Questions?
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mt-3">
              Frequently Asked Questions
            </h2>
            <p className="text-charcoal-600 text-sm mt-2">
              Everything you need to know about staying at SHIVANANDI VISTA.
            </p>
          </div>

          <div className="space-y-3.5">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="skeuo-plate overflow-hidden transition-all duration-200 border border-surface-border"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full py-4 px-6 text-left flex items-center justify-between gap-4 font-semibold text-charcoal text-sm sm:text-base hover:text-gold-dark transition"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-gold shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''
                        }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-charcoal-600 text-xs sm:text-sm leading-relaxed border-t border-surface-border/50 bg-surface-muted/30">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION BANNER */}
      <section className="py-20 bg-[#161311] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gold-foil-subtle opacity-60 pointer-events-none"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10 space-y-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-bright to-gold-dark mx-auto flex items-center justify-center text-charcoal-900 shadow-gold-btn">
            <Sparkles className="w-6 h-6" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Planning Your Next Stay in Bengaluru?
          </h2>

          <p className="max-w-2xl mx-auto text-charcoal-300 text-sm sm:text-base leading-relaxed">
            Make your stay enquiry directly with SHIVANANDI VISTA. Call us or connect with our team on WhatsApp to enquire about room availability, group bookings, and tariffs.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href={`tel:${property.phoneRaw}`}
              className="skeuo-btn-dark px-8 py-3.5 rounded-xl text-sm font-bold flex items-center gap-2 border border-[#443D37]"
            >
              <Phone className="w-4 h-4 text-gold-bright" />
              <span>Call: {property.phone}</span>
            </a>

            <button
              onClick={() => openWhatsApp()}
              className="px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold flex items-center gap-2 shadow-lg transition active:scale-95"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Enquire on WhatsApp</span>
            </button>

            <Link
              to="/booking"
              className="skeuo-btn-gold px-8 py-3.5 rounded-xl text-sm font-bold flex items-center gap-2"
            >
              <span>Book Online Form</span>
              <ArrowRight className="w-4 h-4 text-charcoal-900" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function PlaneIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
    </svg>
  );
}
