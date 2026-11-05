import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, Target, Compass, MapPin, MessageSquare, ArrowRight } from 'lucide-react';
import SEO from '../components/common/SEO';
import { useHotel } from '../context/HotelContext';

export default function AboutUs() {
  const { property, openWhatsApp } = useHotel();

  return (
    <>
      <SEO
        title="About SHIVANANDI VISTA | Hotel & Resort in Bengaluru"
        description="Learn about SHIVANANDI VISTA, a hotel and resort in Yelahanka Taluk, Bengaluru, offering welcoming hospitality and accommodation enquiries."
        keywords="About SHIVANANDI VISTA, Hotel in Yelahanka, Resort in Yelahanka Taluk Bengaluru, Begur BK Halli stay, Hospitality in North Bangalore"
        canonicalUrl="/about-us"
      />

      {/* Header Banner */}
      <section className="bg-[#141210] text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80"
            alt="About SHIVANANDI VISTA Hospitality"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141210] via-[#141210]/80 to-black/60"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-gold-light text-xs uppercase font-semibold tracking-widest mb-3 border border-white/10">
            Our Heritage & Values
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight mb-3">
            About SHIVANANDI VISTA
          </h1>
          <p className="text-obsidian-300 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
            A Welcoming Destination for Comfortable Hospitality in Yelahanka Taluk, Bengaluru.
          </p>
        </div>
      </section>

      {/* Main Narrative Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="minimal-badge inline-block">
              Our Story
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-obsidian leading-snug">
              Creating Memorable Hospitality Experiences
            </h2>
            <p className="text-obsidian-600 text-sm sm:text-base leading-relaxed">
              Welcome to <strong>SHIVANANDI VISTA</strong>, a hotel and resort located in Yelahanka Taluk, Bengaluru, Karnataka. We believe that every guest deserves a welcoming environment, thoughtful service, and a comfortable hospitality experience.
            </p>
            <p className="text-obsidian-600 text-sm sm:text-base leading-relaxed">
              Our goal is to offer visitors an enjoyable place to stay while making their travel and accommodation experience completely convenient. Tucked away in the calm environs of RD Greenwoods, Begur, BK Halli Post, our property provides a tranquil refuge from the busy urban center while ensuring swift access to Kempegowda International Airport and North Bengaluru's business corridors.
            </p>
            <p className="text-obsidian-600 text-sm sm:text-base leading-relaxed">
              From our comfortable air-conditioned suites to our round-the-clock front desk support, every detail of SHIVANANDI VISTA is curated with precision, cleanliness, and authentic warmth.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                to="/rooms-and-accommodation"
                className="minimal-btn-gold px-6 py-2.5 text-xs sm:text-sm font-semibold flex items-center gap-2"
              >
                <span>View Our Rooms</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => openWhatsApp()}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 transition"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Enquire on WhatsApp</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-stone-200 bg-white p-3 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
                alt="SHIVANANDI VISTA Entrance and Hospitality"
                className="w-full h-[400px] object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision, Mission & Philosophy Cards */}
      <section className="py-20 bg-cream-100 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Vision */}
            <div className="minimal-card p-8 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-gold-pale text-gold-dark flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-obsidian">Our Vision</h3>
              <p className="text-obsidian-600 text-sm leading-relaxed">
                To build SHIVANANDI VISTA into a recognized hospitality destination in Bengaluru, known for guest satisfaction, quality service, and welcoming experiences that inspire return visits.
              </p>
            </div>

            {/* Mission */}
            <div className="minimal-card p-8 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-gold-pale text-gold-dark flex items-center justify-center">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-obsidian">Our Mission</h3>
              <p className="text-obsidian-600 text-sm leading-relaxed">
                Our mission is to provide a comfortable accommodation experience, maintain professional hospitality standards, ensure uncompromising cleanliness, and create positive memories for every guest.
              </p>
            </div>

            {/* Philosophy */}
            <div className="minimal-card p-8 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-gold-pale text-gold-dark flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-obsidian">Hospitality Philosophy</h3>
              <p className="text-obsidian-600 text-sm leading-relaxed">
                We believe hospitality is about much more than accommodation. It is about genuinely welcoming guests, understanding their unique needs, and helping them feel completely at ease throughout their visit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Property Location Details Banner with Logo */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center space-y-6">
        <img
          src="/logo.jpg"
          alt="SHIVANANDI VISTA Emblem"
          className="w-20 h-20 object-contain rounded-xl mx-auto p-1 bg-white border border-stone-200 shadow-sm"
        />

        <h2 className="font-serif text-3xl font-bold text-obsidian">
          Our Location & Setting
        </h2>

        <p className="text-obsidian-700 text-base leading-relaxed max-w-xl mx-auto font-medium">
          {property.address}
        </p>

        <p className="text-obsidian-600 text-sm max-w-2xl mx-auto leading-relaxed">
          Located in Yelahanka Taluk within the serene Begur and BK Halli neighborhood, our location allows guests to experience peaceful rest with swift access to Kempegowda International Airport (BLR), Devanahalli heritage sites, and the Hebbal expressway.
        </p>

        <div className="pt-2 flex flex-wrap justify-center gap-3">
          <Link
            to="/location-and-nearby-attractions"
            className="minimal-btn-gold px-6 py-2.5 text-xs sm:text-sm font-semibold flex items-center gap-2"
          >
            <span>Explore Surrounding Region & Maps</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/booking"
            className="minimal-btn-outline px-6 py-2.5 text-xs sm:text-sm font-semibold"
          >
            Plan Your Stay With Us
          </Link>
        </div>
      </section>
    </>
  );
}
