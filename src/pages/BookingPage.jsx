import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Sparkles,
  Calendar,
  Users,
  BedDouble,
  Phone,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText
} from 'lucide-react';
import SEO from '../components/common/SEO';
import { useHotel } from '../context/HotelContext';

export default function BookingPage() {
  const [searchParams] = useSearchParams();
  const { property, rooms, addBookingEnquiry, openWhatsApp } = useHotel();

  // URL search params defaults
  const paramCheckIn = searchParams.get('checkIn');
  const paramCheckOut = searchParams.get('checkOut');
  const paramAdults = searchParams.get('adults');
  const paramRoom = searchParams.get('room');

  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    checkIn: paramCheckIn || today,
    checkOut: paramCheckOut || tomorrow,
    adults: paramAdults || '2',
    children: '0',
    roomCategory: paramRoom || rooms[0]?.title || 'Deluxe Vista Suite',
    specialRequests: ''
  });

  const [submittedEnquiry, setSubmittedEnquiry] = useState(null);

  // Sync if URL search params change
  useEffect(() => {
    if (paramRoom) {
      setFormData(prev => ({ ...prev, roomCategory: paramRoom }));
    }
    if (paramCheckIn) {
      setFormData(prev => ({ ...prev, checkIn: paramCheckIn }));
    }
    if (paramCheckOut) {
      setFormData(prev => ({ ...prev, checkOut: paramCheckOut }));
    }
  }, [paramRoom, paramCheckIn, paramCheckOut]);

  // Calculate nights
  const calculateNights = () => {
    const d1 = new Date(formData.checkIn);
    const d2 = new Date(formData.checkOut);
    const diffTime = d2.getTime() - d1.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const selectedRoomObj = rooms.find(r => r.title === formData.roomCategory) || rooms[0];
  const totalNights = calculateNights();
  const estimatedTotal = (selectedRoomObj?.pricePerNight || 3000) * totalNights;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const enquiry = addBookingEnquiry({
      ...formData,
      nights: totalNights,
      estimatedTariff: estimatedTotal
    });
    setSubmittedEnquiry(enquiry);
  };

  const handleWhatsAppDirect = () => {
    const text = `Hello SHIVANANDI VISTA,\n\nI would like to enquire about room availability and booking.\n\nName: ${formData.fullName || 'Guest'}\nDates: ${formData.checkIn} to ${formData.checkOut} (${totalNights} Night(s))\nRoom: ${formData.roomCategory}\nGuests: ${formData.adults} Adults, ${formData.children} Children\n${formData.specialRequests ? `Special Requests: ${formData.specialRequests}\n` : ''}\nPlease share availability and tariff details.\nThank you.`;
    openWhatsApp(text);
  };

  return (
    <>
      <SEO
        title="Book Your Stay | SHIVANANDI VISTA Hotel Bengaluru"
        description="Enquire about room reservations at SHIVANANDI VISTA in Bengaluru. Contact our team directly by phone or WhatsApp for availability and accommodation details."
        keywords="Book Hotel in Yelahanka, SHIVANANDI VISTA Reservations, Airport Hotel Booking Bangalore, Direct Hotel Tariffs Yelahanka, Begur BK Halli Stay"
        canonicalUrl="/booking"
      />

      {/* Header Banner */}
      <section className="bg-[#1C1917] text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=80"
            alt="Booking at SHIVANANDI VISTA"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917] via-[#1C1917]/80 to-black/60"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold-cream/10 border border-gold/30 text-gold-bright text-xs uppercase font-bold tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Direct Reservations</span>
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight mb-3">
            Book Your Stay at SHIVANANDI VISTA
          </h1>
          <p className="text-charcoal-300 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
            Your Next Stay Begins Here. Connect directly with our front desk for confirmed availability and best available tariffs.
          </p>
        </div>
      </section>

      {/* Main Reservation Container */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-8">
            {submittedEnquiry ? (
              <div className="skeuo-plate p-8 sm:p-10 border-2 border-emerald-400 bg-[#F6FBF8] space-y-6 animate-fadeIn">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="text-center space-y-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-200/60 px-3 py-1 rounded-full">
                    Enquiry ID: {submittedEnquiry.id}
                  </span>
                  <h2 className="font-serif text-3xl font-bold text-charcoal">
                    Booking Enquiry Received
                  </h2>
                  <p className="text-xs sm:text-sm text-charcoal-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{submittedEnquiry.fullName}</strong>. Our reservations desk has logged your request for the <strong>{submittedEnquiry.roomCategory}</strong>.
                  </p>
                </div>

                {/* Important verified note */}
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <strong>Verification Notice:</strong> All booking enquiries are subject to manual confirmation of availability by our front desk. We will call you on <strong>{submittedEnquiry.phone}</strong> or send a message shortly to confirm your reservation and share booking terms.
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap justify-center gap-4">
                  <button
                    onClick={handleWhatsAppDirect}
                    className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm transition"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Follow Up on WhatsApp Now</span>
                  </button>

                  <button
                    onClick={() => setSubmittedEnquiry(null)}
                    className="skeuo-btn-dark px-6 py-3 rounded-xl text-xs sm:text-sm font-bold"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <div className="skeuo-plate p-6 sm:p-10 border border-surface-border">
                <div className="border-b border-surface-border pb-4 mb-6">
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
                    Reservation Enquiry Form
                  </h2>
                  <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
                    Fill in your travel dates and preferences. No immediate payment is required; our team will verify room availability and confirm with you directly.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-charcoal mb-1.5">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g. Ramesh Sharma"
                        className="w-full px-3.5 py-2.5 rounded-xl skeuo-input text-xs sm:text-sm font-medium text-charcoal"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-charcoal mb-1.5">
                        Mobile Number (WhatsApp Preferred) <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-xl skeuo-input text-xs sm:text-sm font-medium text-charcoal"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-charcoal mb-1.5">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. ramesh@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl skeuo-input text-xs sm:text-sm font-medium text-charcoal"
                      required
                    />
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-charcoal mb-1.5 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-gold" />
                        <span>Check-In Date <span className="text-rose-500">*</span></span>
                      </label>
                      <input
                        type="date"
                        name="checkIn"
                        value={formData.checkIn}
                        min={today}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl skeuo-input text-xs sm:text-sm font-medium text-charcoal"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-charcoal mb-1.5 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-gold" />
                        <span>Check-Out Date <span className="text-rose-500">*</span></span>
                      </label>
                      <input
                        type="date"
                        name="checkOut"
                        value={formData.checkOut}
                        min={formData.checkIn}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl skeuo-input text-xs sm:text-sm font-medium text-charcoal"
                        required
                      />
                    </div>
                  </div>

                  {/* Guests & Room */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-charcoal mb-1.5 flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-gold" />
                        <span>Adults</span>
                      </label>
                      <select
                        name="adults"
                        value={formData.adults}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl skeuo-input text-xs sm:text-sm font-medium text-charcoal"
                      >
                        <option value="1">1 Adult</option>
                        <option value="2">2 Adults</option>
                        <option value="3">3 Adults</option>
                        <option value="4">4 Adults</option>
                        <option value="5+">5+ Adults (Group)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-charcoal mb-1.5">
                        Children (Below 12)
                      </label>
                      <select
                        name="children"
                        value={formData.children}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl skeuo-input text-xs sm:text-sm font-medium text-charcoal"
                      >
                        <option value="0">0 Children</option>
                        <option value="1">1 Child</option>
                        <option value="2">2 Children</option>
                        <option value="3+">3+ Children</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-charcoal mb-1.5 flex items-center gap-1.5">
                        <BedDouble className="w-3.5 h-3.5 text-gold" />
                        <span>Preferred Room</span>
                      </label>
                      <select
                        name="roomCategory"
                        value={formData.roomCategory}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl skeuo-input text-xs sm:text-sm font-medium text-charcoal"
                      >
                        {rooms.map(r => (
                          <option key={r.id} value={r.title}>{r.title}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div>
                    <label className="block text-xs font-bold text-charcoal mb-1.5 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-gold" />
                      <span>Special Requests / Airport Pickup Needs (Optional)</span>
                    </label>
                    <textarea
                      name="specialRequests"
                      rows="3"
                      value={formData.specialRequests}
                      onChange={handleChange}
                      placeholder="e.g. Arriving late night around 2:00 AM on IndiGo flight. Please arrange airport taxi pickup. Ground floor room preferred."
                      className="w-full px-3.5 py-2.5 rounded-xl skeuo-input text-xs sm:text-sm font-medium text-charcoal"
                    ></textarea>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-4 px-6 rounded-xl skeuo-btn-gold text-sm font-bold flex items-center justify-center gap-2 shadow-gold-btn"
                    >
                      <span>Send Booking Enquiry</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Right Column: Reservation Summary & Direct WhatsApp */}
          <div className="lg:col-span-4 space-y-6">
            {/* Live Estimation Card */}
            <div className="skeuo-plate-gold p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-surface-border pb-3">
                <span className="text-xs uppercase font-bold tracking-wider text-charcoal-500">
                  Stay Summary
                </span>
                <span className="text-[11px] font-bold text-gold-dark bg-gold-cream px-2 py-0.5 rounded border border-gold/20">
                  {totalNights} Night{totalNights > 1 ? 's' : ''}
                </span>
              </div>

              <div className="space-y-3 text-xs text-charcoal-700">
                <div className="flex justify-between items-center">
                  <span className="text-charcoal-500">Selected Room:</span>
                  <span className="font-bold text-charcoal">{formData.roomCategory}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-charcoal-500">Check-In:</span>
                  <span className="font-semibold text-charcoal">{formData.checkIn} (12:00 PM)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-charcoal-500">Check-Out:</span>
                  <span className="font-semibold text-charcoal">{formData.checkOut} (11:00 AM)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-charcoal-500">Guests:</span>
                  <span className="font-semibold text-charcoal">{formData.adults} Adults, {formData.children} Children</span>
                </div>
              </div>

              <div className="pt-4 border-t border-surface-border space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-charcoal-500">Estimated Tariff:</span>
                  <span className="font-serif text-2xl font-bold text-charcoal">
                    ₹{estimatedTotal.toLocaleString('en-IN')}*
                  </span>
                </div>
                <p className="text-[10px] text-charcoal-500 leading-tight">
                  *Indicative tariff. Exact tax and seasonal discounts are confirmed upon enquiry verification.
                </p>
              </div>
            </div>

            {/* Direct Instant Channels */}
            <div className="skeuo-plate p-6 space-y-4">
              <h3 className="font-serif text-lg font-bold text-charcoal">
                Direct Contact Channels
              </h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Prefer speaking directly with our front desk? We are open 24 hours to assist you.
              </p>

              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Enquiry via WhatsApp</span>
                </button>

                <a
                  href={`tel:${property.phoneRaw}`}
                  className="w-full py-3 px-4 rounded-xl skeuo-btn-dark text-xs font-bold flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-gold-bright" />
                  <span>Call {property.phone}</span>
                </a>
              </div>

              <div className="pt-3 border-t border-surface-border text-[11px] text-charcoal-500 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-gold shrink-0" />
                <span>Front Desk: Active 24 Hours / 7 Days</span>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
