import React from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  MapPin,
  Navigation,
  Phone,
  MessageSquare,
  Car,
  Plane,
  Building,
  TreePine,
  CheckCircle2
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
        title="SHIVANANDI VISTA Location | Near Bengaluru International Airport"
        description="Find SHIVANANDI VISTA in Begur, BK Halli Post, near Bengaluru International Airport (BLR). Explore airport transit routes, Devanahalli and North Bengaluru travel guide."
        keywords="Location SHIVANANDI VISTA, Hotel Near Bangalore Airport, Accommodation Near Kempegowda Airport, Stay in Begur BK Halli, Driving Directions to SHIVANANDI VISTA"
        canonicalUrl="/location-and-nearby-attractions"
      />

      {/* Header Banner */}
      <section className="bg-[#141210] text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hotel-exterior-dusk.jpg"
            alt="SHIVANANDI VISTA Location"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141210] via-[#141210]/80 to-black/60"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-gold-light text-xs uppercase font-semibold tracking-widest mb-3 border border-white/10">
            Near Bengaluru International Airport (BLR)
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight mb-3">
            Find SHIVANANDI VISTA
          </h1>
          <p className="text-obsidian-300 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
            Your Comprehensive Location and Transit Guide Near Bengaluru International Airport.
          </p>
        </div>
      </section>

      {/* Address & Google Maps Embed Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Address Card */}
          <div className="lg:col-span-5 minimal-card p-6 sm:p-8 space-y-5">
            <div className="flex items-center gap-3 border-b border-stone-200 pb-3">
              <div className="w-10 h-10 rounded-xl bg-gold-pale text-gold-dark flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold text-obsidian">
                  Our Verified Address
                </h2>
                <span className="text-xs text-obsidian-500">Near Bengaluru International Airport (BLR)</span>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-obsidian-700 leading-relaxed">
              <div className="p-4 rounded-xl bg-stone-warm border border-stone-200 font-medium">
                <p className="font-bold text-obsidian text-base mb-1">SHIVANANDI VISTA</p>
                <p>No.15, RD Greenwoods,</p>
                <p>I Phase, Begur, BK Halli Post,</p>
                <p>Near Bengaluru International Airport – 562149,</p>
                <p className="text-gold-dark font-semibold mt-1">Karnataka, India</p>
              </div>

              <div className="space-y-2 pt-1 text-xs">
                <div className="flex items-center justify-between py-1 border-b border-stone-100">
                  <span className="text-obsidian-500">Business Hours:</span>
                  <span className="font-bold text-obsidian">{property.hours}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-stone-100">
                  <span className="text-obsidian-500">Standard Check-In:</span>
                  <span className="font-bold text-obsidian">{property.checkInTime}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-stone-100">
                  <span className="text-obsidian-500">Standard Check-Out:</span>
                  <span className="font-bold text-obsidian">{property.checkOutTime}</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-obsidian-500">Front Desk Assistance:</span>
                  <span className="font-bold text-emerald-700">24 Hours / 7 Days Active</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <a
                href={property.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl minimal-btn-gold text-xs font-bold flex items-center justify-center gap-2"
              >
                <Navigation className="w-4 h-4" />
                <span>Open in Google Maps</span>
              </a>

              <a
                href={`tel:${property.phoneRaw}`}
                className="w-full py-2.5 px-4 rounded-xl minimal-btn-outline text-xs font-semibold flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-gold" />
                <span>Call for Direction Assistance</span>
              </a>
            </div>
          </div>

          {/* Interactive Google Map */}
          <div className="lg:col-span-7 minimal-card p-2 overflow-hidden">
            <div className="w-full h-[420px] rounded-xl overflow-hidden bg-stone-100">
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
            <div className="p-3 text-[11px] text-obsidian-500 text-center">
              Coordinates: {property.coordinates.lat}° N, {property.coordinates.lng}° E &bull; Pin Code: 562149
            </div>
          </div>

        </div>
      </section>

      {/* Driving Routes & Connectivity */}
      <section className="py-16 bg-cream-100 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="minimal-badge inline-block mb-1.5">
              Directions & Access
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-obsidian">
              How to Reach SHIVANANDI VISTA
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {drivingRoutes.map((route, idx) => {
              const Icon = route.icon;
              return (
                <div key={idx} className="minimal-card p-5 space-y-2.5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-gold-pale text-gold-dark flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-obsidian text-base">
                        {route.origin}
                      </h3>
                      <p className="text-xs text-gold-dark font-medium">{route.route}</p>
                    </div>
                  </div>
                  <p className="text-xs text-obsidian-600 leading-relaxed pl-12">
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
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="minimal-badge inline-block mb-1.5">
            Neighborhood Guide
          </span>
          <h2 className="font-serif text-3xl font-bold text-obsidian">
            Explore the Surrounding Region
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nearbyLocations.map((loc, idx) => (
            <div
              key={idx}
              className="minimal-card p-6 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gold-dark bg-gold-pale px-2 py-0.5 rounded">
                    {loc.category}
                  </span>
                  <span className="text-[11px] font-medium text-obsidian-500">
                    {loc.distance}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-obsidian">
                  {loc.name}
                </h3>

                <p className="text-xs text-obsidian-600 leading-relaxed">
                  {loc.desc}
                </p>

                <div className="pt-2 border-t border-stone-100 space-y-1">
                  {loc.highlights.map((h, hIdx) => (
                    <div key={hIdx} className="flex items-center gap-2 text-xs text-obsidian-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100">
                <button
                  onClick={() => openWhatsApp(`Hello SHIVANANDI VISTA, I want information about visiting ${loc.name} and local transport.`)}
                  className="w-full py-2 px-3 rounded-lg bg-stone-warm hover:bg-stone-200/60 text-obsidian text-xs font-semibold flex items-center justify-center gap-1.5 transition"
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
      <section className="py-16 bg-[#141210] text-white">
        <div className="max-w-3xl mx-auto px-4 text-center space-y-4">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold">
            Need Help Navigating to SHIVANANDI VISTA?
          </h3>
          <p className="text-obsidian-300 text-sm leading-relaxed max-w-lg mx-auto">
            Our 24/7 reception desk will gladly provide exact guidance or coordinate trusted local cab services for your pickup from the airport or rail terminal.
          </p>
          <div className="pt-2 flex justify-center">
            <a
              href={`tel:${property.phoneRaw}`}
              className="minimal-btn-gold px-6 py-2.5 text-xs sm:text-sm font-semibold flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call +91 99003 14686</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
