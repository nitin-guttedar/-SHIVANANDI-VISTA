import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Phone,
  MessageSquare,
  Clock,
  Wifi,
  Car,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  Compass,
  ShieldCheck,
  Hotel
} from 'lucide-react';
import SEO from '../components/common/SEO';
import BookingWidget from '../components/booking/BookingWidget';
import RoomCard from '../components/rooms/RoomCard';
import { useHotel } from '../context/HotelContext';

export default function Home() {
  const { property, rooms, faqs, gallery, openWhatsApp } = useHotel();
  const [activeFaq, setActiveFaq] = useState(0);
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState('All');

  const galleryCategories = ['All', 'Rooms', 'Property', 'Amenities', 'Dining'];
  const filteredGallery = selectedGalleryCategory === 'All'
    ? gallery
    : gallery.filter(g => g.category === selectedGalleryCategory);

    const homeSchema = useMemo(() => ({
      "@context": "https://schema.org",
      "@type": "Hotel",
      "name": property.name,
      "description": "Premium hotel and resort near Bengaluru International Airport (BLR). Offering comfortable rooms, hospitality, and swift airport transit.",
      "telephone": property.phone,
      "email": property.email,
      "logo": "https://shivanandivista.com/logo.jpg",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "No.15, RD Greenwoods, I Phase, Begur, BK Halli Post",
        "addressLocality": "Near Bengaluru International Airport, Begur, BK Halli",
        "addressRegion": "Karnataka",
        "postalCode": "562149",
        "addressCountry": "IN"
      }
  }), [property.name, property.phone, property.email]);

  return (
    <>
      <SEO
        title="SHIVANANDI VISTA | Hotel & Resort Near Bengaluru International Airport"
        description="Discover SHIVANANDI VISTA, a welcoming hotel and resort located near Bengaluru International Airport (BLR). Explore comfortable rooms, hospitality, airport connectivity, and direct booking enquiries."
        keywords="Hotel Near Bangalore Airport, Accommodation Near Bangalore Airport, Stay Near Kempegowda International Airport, Hotels Near Bangalore Airport, Accommodation in North Bangalore, Stay Near Devanahalli Bangalore, Hotels Near Yelahanka, Accommodation Near North Bengaluru"
        canonicalUrl="/"
        schema={homeSchema}
      />

      {/* HERO SECTION - Minimalist Luxury with Logo Badge */}
      <section className="relative min-h-[85vh] flex flex-col justify-between pt-12 pb-16 bg-[#141210] text-white overflow-hidden">
        {/* Subtle Background Layer */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hotel-exterior-dusk.jpg"
            alt="SHIVANANDI VISTA Luxury Hotel and Resort in Yelahanka Bangalore"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141210] via-[#141210]/70 to-black/50"></div>
        </div>

        {/* Hero Top Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-6 sm:pt-10 my-auto">

          {/* Official Client Logo Presentation - Centered in Middle */}
          <div className="flex justify-center mb-6">
            <div className="p-2 sm:p-2.5 bg-white rounded-2xl shadow-xl border border-stone-200/30 inline-flex items-center justify-center transition-transform hover:scale-105 duration-300">
              <img
                src="/logo.jpg"
                alt="SHIVANANDI VISTA Official Logo"
                className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-xl"
              />
            </div>
          </div>

          {/* Centered Location Badge */}
          <div className="flex justify-center mb-5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-gold-light text-xs uppercase tracking-widest font-semibold border border-white/10 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>Near Bengaluru International Airport (BLR)</span>
            </div>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-5 leading-tight">
            Discover Comfort and Hospitality at{' '}
            <span className="block mt-1 text-gold-soft font-serif">
              SHIVANANDI VISTA
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-obsidian-300 text-sm sm:text-base md:text-lg font-light leading-relaxed mb-8">
            Located near Bengaluru International Airport (BLR), RD Greenwoods, Begur, BK Halli Post.
            Experience a tranquil stay designed around your comfort with 24/7 guest service and seamless airport connectivity.
          </p>

          {/* Minimalist Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 mb-10">
            <Link
              to="/rooms-and-accommodation"
              className="minimal-btn-gold px-7 py-3 text-xs sm:text-sm font-semibold flex items-center gap-2"
            >
              <Hotel className="w-4 h-4" />
              <span>Explore Our Rooms</span>
            </Link>

            <button
              onClick={() => openWhatsApp()}
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 transition"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Enquire on WhatsApp</span>
            </button>

            <Link
              to="/contact-us"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs sm:text-sm font-semibold flex items-center gap-2 transition"
            >
              <Phone className="w-4 h-4 text-gold-light" />
              <span>Contact Us</span>
            </Link>
          </div>
        </div>

        {/* Minimalist Booking Bar */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 w-full">
          <BookingWidget variant="horizontal" />
        </div>
      </section>

      {/* QUICK TRUST BAR - Minimalist clean row */}
      <section className="bg-white border-b border-stone-200 py-6 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-3">
            <Clock className="w-5 h-5 text-gold mx-auto mb-1.5" />
            <div className="font-serif text-xl font-bold text-obsidian">24/7</div>
            <div className="text-xs text-obsidian-500 font-medium">Front Desk & Check-In</div>
          </div>

          <div className="p-3">
            <PlaneIcon className="w-5 h-5 text-gold mx-auto mb-1.5" />
            <div className="font-serif text-xl font-bold text-obsidian">Airport</div>
            <div className="text-xs text-obsidian-500 font-medium">Proximity & Cab Support</div>
          </div>

          <div className="p-3">
            <Wifi className="w-5 h-5 text-gold mx-auto mb-1.5" />
            <div className="font-serif text-xl font-bold text-obsidian">Optic Wi-Fi</div>
            <div className="text-xs text-obsidian-500 font-medium">High-Speed Broadband</div>
          </div>

          <div className="p-3">
            <Car className="w-5 h-5 text-gold mx-auto mb-1.5" />
            <div className="font-serif text-xl font-bold text-obsidian">Free Parking</div>
            <div className="text-xs text-obsidian-500 font-medium">Secured On-Site Space</div>
          </div>
        </div>
      </section>

      {/* ABOUT SHIVANANDI VISTA SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-minimal">
              <img
                src="/images/hotel-exterior-day.jpg"
                alt="Hospitality at SHIVANANDI VISTA Yelahanka"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>

          {/* Text Narrative */}
          <div className="space-y-6">
            <span className="minimal-badge inline-block">
              About Our Property
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-obsidian leading-tight">
              Experience Comfortable Hospitality in Bengaluru
            </h2>

            <p className="text-obsidian-600 text-sm sm:text-base leading-relaxed">
              At <strong>SHIVANANDI VISTA</strong>, we believe that a truly memorable stay begins with a welcoming atmosphere and thoughtful hospitality. Situated at No.15, RD Greenwoods, I Phase, Begur, BK Halli Post, conveniently located near Bengaluru International Airport (BLR), our hotel welcomes guests seeking calm comfort away from heavy city congestion while maintaining swift access to the airport terminals and North Bengaluru's major landmarks.
            </p>

            <p className="text-obsidian-600 text-sm sm:text-base leading-relaxed">
              Whether you are arriving for an international flight stopover, visiting nearby heritage destinations like Devanahalli Fort, taking a family weekend excursion to Nandi Hills, or attending business meetings in Hebbal or Yelahanka, our dedicated team is at your service 24 hours a day.
            </p>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-obsidian">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>24-Hour Front Desk Support</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-obsidian">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Airport Transit Assistance</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-obsidian">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Pristine Daily Housekeeping</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-obsidian">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Direct Booking Best Price Guarantee</span>
              </div>
            </div>

            <div className="pt-3 flex items-center gap-3">
              <Link
                to="/about-us"
                className="minimal-btn-gold px-6 py-2.5 text-xs sm:text-sm font-semibold flex items-center gap-2"
              >
                <span>Discover Our Story</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact-us"
                className="minimal-btn-outline px-5 py-2.5 text-xs sm:text-sm font-semibold"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ROOMS & ACCOMMODATION SECTION */}
      <section className="py-20 bg-cream-100 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="minimal-badge inline-block mb-2">
              Stay in Comfort
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-obsidian mb-3">
              Find Your Comfortable Stay
            </h2>
            <p className="text-obsidian-600 text-sm sm:text-base leading-relaxed">
              Explore our curated accommodation options at SHIVANANDI VISTA. Each room features premium bedding, modern split air conditioning, smart entertainment, and 24/7 hot water.
            </p>
          </div>

          {/* Rooms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.length > 0 ? (
              rooms.slice(0, 3).map((room) => (
                <RoomCard key={room.id} room={room} />
              ))
            ) : (
              <div className="col-span-full text-center py-12 bg-stone-50 rounded-2xl border border-stone-200 p-6 space-y-2">
                <p className="text-stone-500 text-sm">Room inventory is being updated by front desk. Direct booking available shortly.</p>
              </div>
            )}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/rooms-and-accommodation"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl minimal-btn-dark text-xs sm:text-sm font-bold shadow-sm"
            >
              <span>Explore All Rooms & Suites</span>
              <ArrowRight className="w-4 h-4 text-gold-light" />
            </Link>
          </div>
        </div>
      </section>

      {/* OUR HOSPITALITY - 3 Minimalist Columns */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="minimal-badge inline-block mb-2">
            Our Hospitality
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-obsidian mb-3">
            Hospitality That Makes Every Stay Special
          </h2>
          <p className="text-obsidian-600 text-sm">
            We aim to create a welcoming experience for guests visiting Bengaluru. Whether your visit is for leisure, family time, or business travel, our focus is on comfort and convenience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="minimal-card p-8 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-gold-pale text-gold-dark flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-obsidian">Welcoming Hospitality</h3>
            <p className="text-xs sm:text-sm text-obsidian-600 leading-relaxed">
              Warm, attentive service that anticipates your needs from check-in to departure, ensuring you feel genuinely cared for throughout your visit.
            </p>
          </div>

          <div className="minimal-card p-8 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-gold-pale text-gold-dark flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-obsidian">Convenient Location</h3>
            <p className="text-xs sm:text-sm text-obsidian-600 leading-relaxed">
              Strategically situated near Bengaluru International Airport (BLR) with effortless direct highway connectivity to terminal gates, Devanahalli heritage belt, and Hebbal tech zones.
            </p>
          </div>

          <div className="minimal-card p-8 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-gold-pale text-gold-dark flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-obsidian">Direct Booking Ease</h3>
            <p className="text-xs sm:text-sm text-obsidian-600 leading-relaxed">
              Enjoy transparent pricing without hidden third-party fees, instant WhatsApp enquiry assistance, and customized room arrangements.
            </p>
          </div>
        </div>
      </section>

      {/* PHOTO GALLERY SECTION */}
      <section className="py-20 bg-cream-100 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
            <div>
              <span className="minimal-badge inline-block mb-1.5">
                Visual Tour
              </span>
              <h2 className="font-serif text-3xl font-bold text-obsidian">
                Photo Gallery
              </h2>
            </div>

            {/* Filter pills */}
            <div className="flex flex-wrap gap-1.5">
              {galleryCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedGalleryCategory(cat);
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${selectedGalleryCategory === cat
                    ? 'bg-obsidian text-white shadow-sm'
                    : 'bg-white text-obsidian-600 border border-stone-200 hover:bg-stone-warm'
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
                className="group relative h-56 rounded-xl overflow-hidden border border-stone-200 bg-stone-100"
              >
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 text-white">
                  <span className="text-[10px] uppercase tracking-wider text-gold-light font-bold">
                    {item.category}
                  </span>
                  <span className="text-xs font-semibold">{item.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQS - Minimalist Accordion */}
      <section className="py-20 bg-cream-100 border-t border-stone-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="minimal-badge inline-block mb-2">
              Got Questions?
            </span>
            <h2 className="font-serif text-3xl font-bold text-obsidian">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-stone-200 overflow-hidden transition"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 font-semibold text-obsidian text-sm hover:text-gold transition"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-gold shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''
                        }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 pt-1 text-obsidian-600 text-xs sm:text-sm leading-relaxed border-t border-stone-100 bg-stone-warm/30">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* MINIMAL CTA BANNER */}
      <section className="py-16 bg-[#141210] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-5">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold">
            Planning Your Next Stay in Bengaluru?
          </h2>
          <p className="max-w-xl mx-auto text-obsidian-300 text-sm leading-relaxed">
            Make your stay enquiry directly with SHIVANANDI VISTA. Call us or connect with our team on WhatsApp to check room availability and tariffs.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <a
              href={`tel:${property.phoneRaw}`}
              className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-semibold flex items-center gap-2 transition"
            >
              <Phone className="w-3.5 h-3.5 text-gold-light" />
              <span>Call: {property.phone}</span>
            </a>

            <button
              onClick={() => openWhatsApp()}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-2 transition"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Enquire on WhatsApp</span>
            </button>

            <Link
              to="/booking"
              className="minimal-btn-gold px-6 py-2.5 text-xs font-semibold flex items-center gap-2"
            >
              <span>Book Online Form</span>
              <ArrowRight className="w-3.5 h-3.5" />
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
