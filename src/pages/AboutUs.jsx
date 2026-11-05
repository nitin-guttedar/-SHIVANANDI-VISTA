import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, Target, Compass, ShieldCheck, MapPin, Phone, MessageSquare, CheckCircle2, ArrowRight } from 'lucide-react';
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
      <section className="bg-[#1C1917] text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80"
            alt="About SHIVANANDI VISTA Hospitality"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917] via-[#1C1917]/80 to-black/60"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold-cream/10 border border-gold/30 text-gold-bright text-xs uppercase font-bold tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Our Heritage & Values</span>
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
            About SHIVANANDI VISTA
          </h1>
          <p className="text-charcoal-300 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            A Welcoming Destination for Comfortable Hospitality in Yelahanka Taluk, Bengaluru.
          </p>
        </div>
      </section>

      {/* Main Narrative Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase tracking-widest font-bold text-gold-dark bg-gold-cream border border-gold/30 px-3.5 py-1 rounded-full">
              Our Story
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal leading-snug">
              Creating Memorable Hospitality Experiences
            </h2>
            <p className="text-charcoal-700 text-sm sm:text-base leading-relaxed">
              Welcome to <strong>SHIVANANDI VISTA</strong>, a hotel and resort located in Yelahanka Taluk, Bengaluru, Karnataka. We believe that every guest deserves a welcoming environment, thoughtful service, and a comfortable hospitality experience.
            </p>
            <p className="text-charcoal-700 text-sm sm:text-base leading-relaxed">
              Our goal is to offer visitors an enjoyable place to stay while making their travel and accommodation experience completely convenient. Tucked away in the calm environs of RD Greenwoods, Begur, BK Halli Post, our property provides a tranquil refuge from the frenetic pace of urban Bengaluru while ensuring fast, effortless access to Kempegowda International Airport and North Bengaluru business hubs.
            </p>
            <p className="text-charcoal-700 text-sm sm:text-base leading-relaxed">
              From our comfortable air-conditioned suites to our round-the-clock front desk support, every detail of SHIVANANDI VISTA is curated with precision, cleanliness, and authentic warmth.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                to="/rooms-and-accommodation"
                className="skeuo-btn-gold px-6 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2"
              >
                <span>View Our Rooms</span>
                <ArrowRight className="w-4 h-4 text-charcoal-900" />
              </Link>
              <button
                onClick={() => openWhatsApp()}
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Enquire on WhatsApp</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="skeuo-plate-gold p-3 shadow-skeuo-elevated">
              <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
                alt="SHIVANANDI VISTA Entrance and Hospitality"
                className="w-full h-[450px] object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision, Mission & Philosophy Cards */}
      <section className="py-20 bg-alabaster-200 border-y border-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Vision */}
            <div className="skeuo-plate p-8 space-y-4 hover:border-gold/50 transition">
              <div className="w-14 h-14 rounded-2xl bg-[#1C1917] border border-gold/40 shadow-gold-btn flex items-center justify-center text-gold-bright">
                <Target className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-charcoal">Our Vision</h3>
              <p className="text-charcoal-600 text-sm leading-relaxed">
                To build SHIVANANDI VISTA into a recognized hospitality destination in Bengaluru, known for guest satisfaction, quality service, and welcoming experiences that inspire return visits.
              </p>
            </div>

            {/* Mission */}
            <div className="skeuo-plate p-8 space-y-4 hover:border-gold/50 transition">
              <div className="w-14 h-14 rounded-2xl bg-[#1C1917] border border-gold/40 shadow-gold-btn flex items-center justify-center text-gold-bright">
                <Compass className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-charcoal">Our Mission</h3>
              <p className="text-charcoal-600 text-sm leading-relaxed">
                Our mission is to provide a comfortable accommodation experience, maintain professional hospitality standards, ensure uncompromising cleanliness, and create positive memories for every guest.
              </p>
            </div>

            {/* Philosophy */}
            <div className="skeuo-plate p-8 space-y-4 hover:border-gold/50 transition">
              <div className="w-14 h-14 rounded-2xl bg-[#1C1917] border border-gold/40 shadow-gold-btn flex items-center justify-center text-gold-bright">
                <Heart className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-charcoal">Hospitality Philosophy</h3>
              <p className="text-charcoal-600 text-sm leading-relaxed">
                We believe hospitality is about much more than accommodation. It is about genuinely welcoming guests, understanding their unique needs, and helping them feel completely at ease throughout their visit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Property Location Details Banner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="skeuo-plate-gold p-8 sm:p-12 text-center space-y-6">
          <div className="w-14 h-14 rounded-full bg-gold-cream border border-gold/30 mx-auto flex items-center justify-center text-gold-dark shadow-skeuo-sm">
            <MapPin className="w-7 h-7" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
            Our Location & Setting
          </h2>

          <p className="text-charcoal-700 text-base leading-relaxed max-w-2xl mx-auto font-medium">
            {property.address}
          </p>

          <p className="text-charcoal-600 text-sm max-w-3xl mx-auto leading-relaxed">
            Located in Yelahanka Taluk within the serene Begur and BK Halli neighborhood, our location allows guests to experience peaceful rest with swift access to Kempegowda International Airport (BLR), Devanahalli heritage sites, Yelahanka Junction, and the Hebbal expressway.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link
              to="/location-and-nearby-attractions"
              className="skeuo-btn-gold px-6 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2"
            >
              <span>Explore Surrounding Region & Maps</span>
              <ArrowRight className="w-4 h-4 text-charcoal-900" />
            </Link>

            <Link
              to="/booking"
              className="skeuo-btn-dark px-6 py-3 rounded-xl text-xs sm:text-sm font-bold"
            >
              Plan Your Stay With Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

