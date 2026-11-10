import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Users,
  Briefcase,
  Plane,
  Heart,
  PartyPopper,
  Compass,
  MessageSquare,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import SEO from '../components/common/SEO';
import { useHotel } from '../context/HotelContext';

export default function ExperiencesPage() {
  const { openWhatsApp } = useHotel();

  const experiences = [
    {
      title: "Family Getaways & Vacations",
      icon: Users,
      badge: "Family Favorite",
      desc: "Planning quality time with your loved ones? Our spacious family rooms, serene green surroundings, and peaceful courtyard offer the perfect atmosphere for children and elders to unwind together.",
      highlights: [
        "Spacious Multi-Bed Configurations",
        "Safe & Quiet Residential Setting",
        "Close Proximity to Lakes & Parks in Yelahanka",
        "Customized In-Room Refreshments"
      ],
      image: "/images/hotel-room-deluxe.jpg"
    },
    {
      title: "Airport Transit & Layover Stays",
      icon: Plane,
      badge: "24/7 Check-In",
      desc: "Catching a red-eye flight or arriving late at Kempegowda International Airport (BLR)? Our comfortable, soundproofed rooms and 24-hour reception guarantee undisturbed sleep and timely transit.",
      highlights: [
        "Flexible 24/7 Check-in & Express Check-out",
        "Blackout Drapes & Acoustic Insulation",
        "Airport Cab & Taxi Booking Assistance",
        "Early Morning Wakeup Calls & Refreshments"
      ],
      image: "/images/hotel-exterior-dusk.jpg"
    },
    {
      title: "Corporate & Business Travel",
      icon: Briefcase,
      badge: "Work & Rest",
      desc: "Situated near the Hebbal, Manyata, and airport technology corridors, SHIVANANDI VISTA provides business executives with reliable optic Wi-Fi, ergonomic work areas, and restful privacy.",
      highlights: [
        "High-Speed Optic Fiber Broadband",
        "Dedicated In-Room Workstations",
        "Continuous 100% Power Generator Backup",
        "Digital Invoicing with GST Billing"
      ],
      image: "/images/hotel-room-collage.jpg"
    },
    {
      title: "Weekend Leisure & Staycations",
      icon: Compass,
      badge: "Nature & Peace",
      desc: "Disconnect from city bustle without driving for hours. Relax with fresh North Bengaluru breezes, enjoy a good book in our garden spaces, or plan an early morning drive to scenic Nandi Hills.",
      highlights: [
        "Lush Green Courtyard & Fresh Air",
        "Convenient Starting Point for Nandi Hills Sunrise",
        "Peaceful Neighborhood Away from Traffic",
        "Fresh Morning Breakfast Options"
      ],
      image: "/images/hotel-exterior-day.jpg"
    },
    {
      title: "Special Celebrations & Private Gatherings",
      icon: Heart,
      badge: "Milestones",
      desc: "Celebrate intimate birthdays, anniversaries, or pre-wedding family gatherings with personalized hospitality and attentive room blocks arranged exclusively for your guests.",
      highlights: [
        "Dedicated Assistance for Group Accommodations",
        "Personalized Hospitality Touches",
        "Flexible Gathering & Dining Arrangements",
        "Private and Secure Ambiance"
      ],
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=3840&q=95"
    },
    {
      title: "Group Stays & Wedding Guest Hosting",
      icon: PartyPopper,
      badge: "Group Blocks",
      desc: "Hosting wedding attendees, conference delegations, or sports groups in North Bengaluru? We provide consolidated room allocations, organized check-ins, and group transit coordination.",
      highlights: [
        "Special Group Tariff Rates",
        "Centralized Coordinator for Guest Assistance",
        "Generous On-Site Parking for Multiple Cabs",
        "Luggage Handling & Group Welcome"
      ],
      image: "/images/hotel-exterior-night.jpg"
    }
  ];

  return (
    <>
      <SEO
        title="Hotel & Resort Experiences in Bengaluru | SHIVANANDI VISTA"
        description="Explore hospitality experiences, family visits, leisure stays and special occasion enquiries at SHIVANANDI VISTA, Yelahanka, Bengaluru."
        keywords="Family Stay in Yelahanka, Weekend Getaway North Bangalore, Airport Layover Hotel BLR, Business Hotel Yelahanka, Wedding Guest Accommodation Bangalore"
        canonicalUrl="/experiences-and-occasions"
      />

      {/* Header Banner */}
      <section className="bg-[#141210] text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hotel-exterior-night.jpg"
            alt="Experiences at SHIVANANDI VISTA"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141210] via-[#141210]/80 to-black/60"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-gold-light text-xs uppercase font-semibold tracking-widest mb-3 border border-white/10">
            Memorable Moments
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight mb-3">
            Create Memorable Moments at SHIVANANDI VISTA
          </h1>
          <p className="text-obsidian-300 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
            A Welcoming Hospitality Experience Tailored for Every Occasion.
          </p>
        </div>
      </section>

      {/* Intro Narrative */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto text-center space-y-3">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-obsidian">
          Every Stay Has a Purpose
        </h2>
        <p className="text-obsidian-600 text-sm sm:text-base leading-relaxed">
          Every visit is an opportunity to create meaningful memories. <strong>SHIVANANDI VISTA</strong> warmly welcomes enquiries from guests planning different types of visits — from tranquil weekend breaks to focused corporate visits and smooth airport transits.
        </p>
      </section>

      {/* Experiences Grid */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((exp, idx) => {
            const IconComponent = exp.icon;
            return (
              <div
                key={idx}
                className="minimal-card overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-stone-100">
                    <img
                      src={exp.image}
                      alt={exp.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 text-obsidian text-[11px] font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5">
                      <IconComponent className="w-3.5 h-3.5 text-gold" />
                      <span>{exp.badge}</span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="font-serif text-xl font-bold text-obsidian group-hover:text-gold transition-colors">
                      {exp.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-obsidian-600 leading-relaxed">
                      {exp.desc}
                    </p>

                    <div className="pt-2 space-y-1.5 border-t border-stone-100">
                      {exp.highlights.map((h, hIdx) => (
                        <div key={hIdx} className="flex items-center gap-2 text-xs text-obsidian-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => openWhatsApp(`Hello SHIVANANDI VISTA, I want to discuss requirements for "${exp.title}". Please share details.`)}
                    className="w-full py-2.5 px-4 rounded-xl minimal-btn-gold text-xs font-semibold flex items-center justify-center gap-2"
                  >
                    <span>Enquire for This Occasion</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Discussion Banner */}
      <section className="py-16 bg-cream-100 border-t border-stone-200">
        <div className="max-w-3xl mx-auto px-4 text-center space-y-4">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-obsidian">
            Have a Bespoke Requirement?
          </h3>
          <p className="text-obsidian-600 text-sm max-w-xl mx-auto leading-relaxed">
            Connect directly with our hospitality manager to discuss dates, room blocks, and check-in schedules tailored specifically to your event.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => openWhatsApp("Hello SHIVANANDI VISTA, I have a bespoke hospitality requirement. Let's discuss.")}
              className="minimal-btn-gold px-6 py-2.5 text-xs sm:text-sm font-semibold flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Discuss Your Requirements</span>
            </button>

            <Link
              to="/booking"
              className="minimal-btn-outline px-6 py-2.5 text-xs sm:text-sm font-semibold flex items-center gap-2"
            >
              <span>Book Online Form</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
