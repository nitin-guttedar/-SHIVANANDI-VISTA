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
  const { property, openWhatsApp } = useHotel();

  const experiences = [
    {
      title: "Family Getaways & Vacations",
      icon: Users,
      badge: "Family Favorite",
      desc: "Planning quality time with your loved ones? Our spacious family rooms, serene green surroundings, and peaceful courtyard offer the perfect atmosphere for children and elders to unwind together.",
      highlights: [
        "Spacious Multi-Bed Configurations",
        "Safe & Quiet Enclosed Residential Setting",
        "Close Proximity to Lakes & Parks in Yelahanka",
        "Customized In-Room Refreshments"
      ],
      image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Airport Transit & Layover Stays",
      icon: Plane,
      badge: "24/7 Check-In",
      desc: "Catching a red-eye flight or arriving on a late-night arrival at Kempegowda International Airport (BLR)? Our comfortable, soundproofed rooms and 24-hour reception guarantee undisturbed sleep and timely transit.",
      highlights: [
        "Flexible 24/7 Check-in & Express Check-out",
        "Blackout Drapes & Acoustic Insulation",
        "Reliable Airport Cab & Taxi Booking Assistance",
        "Early Morning Wakeup Calls & Refreshments"
      ],
      image: "https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=800&q=80"
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
      image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80"
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
        "Delicious Morning Breakfast Options"
      ],
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
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
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80"
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
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80"
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
      <section className="bg-[#1C1917] text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1600&q=80"
            alt="Experiences at SHIVANANDI VISTA"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917] via-[#1C1917]/80 to-black/60"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold-cream/10 border border-gold/30 text-gold-bright text-xs uppercase font-bold tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Memorable Moments</span>
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
            Create Memorable Moments at SHIVANANDI VISTA
          </h1>
          <p className="text-charcoal-300 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            A Welcoming Hospitality Experience Tailored for Every Occasion.
          </p>
        </div>
      </section>

      {/* Intro Narrative */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center space-y-4">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
          Every Stay Has a Purpose
        </h2>
        <p className="text-charcoal-600 text-sm sm:text-base leading-relaxed">
          Every visit is an opportunity to create meaningful memories. <strong>SHIVANANDI VISTA</strong> warmly welcomes enquiries from guests planning different types of visits — from tranquil weekend breaks to focused corporate visits and smooth airport transits.
        </p>
      </section>

      {/* Experiences Grid */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((exp, idx) => {
            const IconComponent = exp.icon;
            return (
              <div
                key={idx}
                className="skeuo-plate overflow-hidden flex flex-col justify-between border border-surface-border hover:border-gold/40 hover:shadow-skeuo-elevated transition-all duration-300 group"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-charcoal-800">
                    <img
                      src={exp.image}
                      alt={exp.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>

                    <div className="absolute top-3 left-3 bg-[#1C1917]/90 text-gold-bright border border-gold/40 text-[11px] font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5 backdrop-blur-sm">
                      <IconComponent className="w-3.5 h-3.5 text-gold" />
                      <span>{exp.badge}</span>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <h3 className="font-serif text-xl font-bold text-charcoal group-hover:text-gold-dark transition-colors">
                      {exp.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                      {exp.desc}
                    </p>

                    <div className="pt-2 space-y-2 border-t border-surface-border">
                      {exp.highlights.map((h, hIdx) => (
                        <div key={hIdx} className="flex items-center gap-2 text-xs text-charcoal-700">
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
                    className="w-full py-2.5 px-4 rounded-xl skeuo-btn-gold text-xs font-bold flex items-center justify-center gap-2"
                  >
                    <span>Enquire for This Occasion</span>
                    <ArrowRight className="w-4 h-4 text-charcoal-900" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Custom Discussion Banner */}
      <section className="py-20 bg-alabaster-200 border-t border-surface-border">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="w-12 h-12 rounded-xl bg-gold text-charcoal-900 mx-auto flex items-center justify-center shadow-gold-btn">
            <Sparkles className="w-6 h-6" />
          </div>

          <h3 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
            Have a Bespoke Requirement?
          </h3>

          <p className="text-charcoal-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Connect directly with our hospitality manager to discuss dates, room blocks, catering options, and check-in schedules tailored specifically to your event.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => openWhatsApp("Hello SHIVANANDI VISTA, I have a bespoke hospitality requirement. Let's discuss.")}
              className="skeuo-btn-gold px-8 py-3.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-charcoal-900" />
              <span>Discuss Your Requirements</span>
            </button>

            <Link
              to="/booking"
              className="skeuo-btn-dark px-8 py-3.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2"
            >
              <span>Book Online Form</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

