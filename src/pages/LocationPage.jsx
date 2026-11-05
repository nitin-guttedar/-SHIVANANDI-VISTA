import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  MapPin,
  Compass,
  Navigation,
  Phone,
  MessageSquare,
  Clock,
  Car,
  Plane,
  Building,
  TreePine,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import SEO from '../components/common/SEO';
import { useHotel } from '../context/HotelContext';

export default function LocationPage() {
  const { property, nearbyLocations, openWhatsApp } = useHotel();

  const drivingRoutes = [
    {
      origin: "Kempegowda International Airport (BLR)",
      icon: Plane,
      route: "Via Devanahalli Airport Road & BK Halli Main Road",
      transitNotes: "Smooth highway transit avoiding city traffic bottlenecks. Ideal for late-night flights and early morning departures."
    },
    {
      origin: "Yelahanka New Town & Railway Junction",
      icon: Building,
      route: "Via Yelahanka-Doddaballapur Road connecting to Begur / BK Halli",
      transitNotes: "Direct arterial connectivity to local markets, dining, and medical centers."
    },
    {
      origin: "Hebbal Flyover & Manyata Tech Park",
      icon: Car,
      route: "Via NH 44 Airport Expressway northwards turning into Yelahanka / Begur corridor",
      transitNotes: "Straight expressway access connecting Central & North Bengaluru business belts."
    },
    {
      origin: "Nandi Hills (Scenic Weekend Gateway)",
      icon: TreePine,
      route: "Via NH 44 North toward Chikkaballapur foothill road",
      transitNotes: "Scenic morning highway drive. Great for sunrise tours and nature photography."
    }
  ];

  return (
    <>
      <SEO
        title="SHIVANANDI VISTA Location | Yelahanka & Bengaluru Travel Guide"
        description="Find SHIVANANDI VISTA in Begur, BK Halli Post, Yelahanka Taluk, Bengaluru. Explore North Bengaluru, Devanahalli and airport-area travel information."
        keywords="Location SHIVANANDI VISTA, Hotels in Yelahanka, Accommodation Near Bangalore Airport, Stay in Begur BK Halli, Driving Directions to SHIVANANDI VISTA"
        canonicalUrl="/location-and-nearby-attractions"
      />

      {/* Header Banner */}
      <section className="bg-[#1C1917] text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1600&q=80"
            alt="North Bengaluru Landscape"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917] via-[#1C1917]/80 to-black/60"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold-cream/10 border border-gold/30 text-gold-bright text-xs uppercase font-bold tracking-widest mb-4">
            <Compass className="w-3.5 h-3.5 text-gold" />
            <span>North Bengaluru Travel Guide</span>
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
            Find SHIVANANDI VISTA
          </h1>
          <p className="text-charcoal-300 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Your Comprehensive Location and Neighborhood Guide in Yelahanka Taluk, Bengaluru.
          </p>
        </div>
      </section>

      {/* Address & Google Maps Embed Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Address Details Plate */}
          <div className="lg:col-span-5 skeuo-plate p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3 border-b border-surface-border pb-4">
              <div className="w-12 h-12 rounded-xl bg-gold-cream border border-gold/30 text-gold-dark flex items-center justify-center shadow-skeuo-sm">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-serif text-2xl font-bold text-charcoal">
                  Our Verified Address
                </h2>
                <span className="text-xs text-charcoal-500">Yelahanka Taluk, Bengaluru</span>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-charcoal-700 leading-relaxed">
              <div className="p-4 rounded-xl skeuo-inset bg-surface-muted/50 border border-surface-border font-medium">
                <p className="font-bold text-charcoal text-base mb-1">SHIVANANDI VISTA</p>
                <p>No.15, RD Greenwoods,</p>
                <p>I Phase, Begur, BK Halli Post,</p>
                <p>Yelahanka Taluk, Bangalore – 562149,</p>
                <p className="text-gold-dark font-semibold mt-1">Karnataka, India</p>
              </div>

              <div className="space-y-2 pt-1 text-xs">
                <div className="flex items-center justify-between py-1.5 border-b border-surface-border">
                  <span className="text-charcoal-500">Business Hours:</span>
                  <span className="font-bold text-charcoal">{property.hours}</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-surface-border">
                  <span className="text-charcoal-500">Standard Check-In:</span>
                  <span className="font-bold text-charcoal">{property.checkInTime}</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-surface-border">
                  <span className="text-charcoal-500">Standard Check-Out:</span>
                  <span className="font-bold text-charcoal">{property.checkOutTime}</span>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <span className="text-charcoal-500">Front Desk Assistance:</span>
                  <span className="font-bold text-emerald-700">24 Hours / 7 Days Active</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2.5">
              <a
                href={property.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl skeuo-btn-gold text-xs font-bold flex items-center justify-center gap-2 shadow-gold-btn"
              >
                <Navigation className="w-4 h-4 text-charcoal-900" />
                <span>Open in Google Maps</span>
              </a>

              <a
                href={`tel:${property.phoneRaw}`}
                className="w-full py-2.5 px-4 rounded-xl skeuo-btn-dark text-xs font-bold flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-gold-bright" />
                <span>Call for Direction Assistance</span>
              </a>
            </div>
          </div>

          {/* Interactive Google Map */}
          <div className="lg:col-span-7 skeuo-plate p-2.5 overflow-hidden shadow-skeuo-elevated">
            <div className="w-full h-[450px] rounded-xl overflow-hidden bg-surface-muted relative">
              <iframe
                title="SHIVANANDI VISTA Location Map"
                src={property.googleMapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>
            </div>
            <div className="p-3 text-[11px] text-charcoal-500 text-center">
              Coordinates: {property.coordinates.lat}° N, {property.coordinates.lng}° E &bull; Pin Code: 562149
            </div>
          </div>

        </div>
      </section>

      {/* Driving Routes & Connectivity */}
      <section className="py-16 bg-alabaster-200 border-y border-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest font-bold text-gold-dark bg-gold-cream border border-gold/30 px-3.5 py-1 rounded-full">
              Directions & Access
            </span>
            <h2 className="font-serif text-3xl font-bold text-charcoal mt-2">
              How to Reach SHIVANANDI VISTA
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-600 mt-1">
              Verified routes connecting major North Bengaluru transport corridors to our property.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {drivingRoutes.map((route, idx) => {
              const Icon = route.icon;
              return (
                <div key={idx} className="skeuo-plate p-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gold-cream text-gold-dark border border-gold/30 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-charcoal text-base">
                        {route.origin}
                      </h3>
                      <p className="text-xs text-gold-dark font-semibold">{route.route}</p>
                    </div>
                  </div>
                  <p className="text-xs text-charcoal-600 leading-relaxed pl-13">
                    {route.transitNotes}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Surrounding Region & Nearby Attractions */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest font-bold text-gold-dark bg-gold-cream border border-gold/30 px-3.5 py-1 rounded-full">
            Neighborhood Guide
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mt-3 mb-4">
            Explore the Surrounding Region
          </h2>
          <p className="text-charcoal-600 text-sm sm:text-base leading-relaxed">
            Our location in Yelahanka Taluk offers convenient proximity to heritage attractions, natural reserves, aviation centers, and tech hubs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {nearbyLocations.map((loc, idx) => (
            <div
              key={idx}
              className="skeuo-plate p-6 space-y-4 hover:border-gold/40 hover:shadow-skeuo-elevated transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gold-dark bg-gold-cream px-2 py-0.5 rounded border border-gold/20">
                    {loc.category}
                  </span>
                  <span className="text-[11px] font-semibold text-charcoal-500">
                    {loc.distance}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-charcoal">
                  {loc.name}
                </h3>

                <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                  {loc.desc}
                </p>

                <div className="pt-2 border-t border-surface-border space-y-1.5">
                  {loc.highlights.map((h, hIdx) => (
                    <div key={hIdx} className="flex items-center gap-2 text-xs text-charcoal-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-surface-border">
                <button
                  onClick={() => openWhatsApp(`Hello SHIVANANDI VISTA, I want information about visiting ${loc.name} and local transport.`)}
                  className="w-full py-2 px-3 rounded-lg bg-surface-muted hover:bg-surface-hover text-charcoal text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-gold-dark" />
                  <span>Enquire About Sightseeing</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Plan Journey Banner */}
      <section className="py-16 bg-[#1C1917] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-5">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold">
            Need Help Navigating to SHIVANANDI VISTA?
          </h3>
          <p className="text-charcoal-300 text-sm leading-relaxed max-w-xl mx-auto">
            Our 24/7 reception desk will gladly provide exact turn-by-turn guidance or coordinate trusted local cab services for your pickup from the airport or rail terminal.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <a
              href={`tel:${property.phoneRaw}`}
              className="skeuo-btn-gold px-8 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-charcoal-900" />
              <span>Call +91 99003 14686</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
