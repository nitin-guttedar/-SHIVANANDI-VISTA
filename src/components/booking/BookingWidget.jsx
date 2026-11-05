import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, BedDouble, ArrowRight, MessageSquare, Sparkles } from 'lucide-react';
import { useHotel } from '../../context/HotelContext';

export default function BookingWidget({ variant = 'horizontal' }) {
  const navigate = useNavigate();
  const { rooms, openWhatsApp } = useHotel();

  // Dates defaults: today and tomorrow
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [adults, setAdults] = useState('2');
  const [roomCategory, setRoomCategory] = useState(rooms[0]?.title || 'Deluxe Vista Suite');

  const handleProceed = (e) => {
    e.preventDefault();
    navigate(`/booking?checkIn=${checkIn}&checkOut=${checkOut}&adults=${adults}&room=${encodeURIComponent(roomCategory)}`);
  };

  const handleWhatsAppQuickEnquiry = () => {
    const text = `Hello SHIVANANDI VISTA, I want to enquire about booking "${roomCategory}" from ${checkIn} to ${checkOut} for ${adults} guests. Please share availability & tariffs.`;
    openWhatsApp(text);
  };

  if (variant === 'vertical') {
    return (
      <div className="skeuo-plate-gold p-6 sm:p-8 space-y-5">
        <div className="flex items-center justify-between border-b border-surface-border pb-3">
          <div>
            <h3 className="font-serif text-lg font-bold text-charcoal">Quick Stay Reservation</h3>
            <p className="text-xs text-charcoal-500">Best tariff guaranteed directly with property</p>
          </div>
          <Sparkles className="w-5 h-5 text-gold" />
        </div>

        <form onSubmit={handleProceed} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-charcoal-700 mb-1 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-gold" />
              <span>Check-in Date</span>
            </label>
            <input
              type="date"
              value={checkIn}
              min={today}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl skeuo-input text-xs font-medium text-charcoal"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal-700 mb-1 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-gold" />
              <span>Check-out Date</span>
            </label>
            <input
              type="date"
              value={checkOut}
              min={checkIn}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl skeuo-input text-xs font-medium text-charcoal"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-charcoal-700 mb-1 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-gold" />
                <span>Guests</span>
              </label>
              <select
                value={adults}
                onChange={(e) => setAdults(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl skeuo-input text-xs font-medium text-charcoal"
              >
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4+ Guests</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal-700 mb-1 flex items-center gap-1.5">
                <BedDouble className="w-3.5 h-3.5 text-gold" />
                <span>Room Type</span>
              </label>
              <select
                value={roomCategory}
                onChange={(e) => setRoomCategory(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl skeuo-input text-xs font-medium text-charcoal"
              >
                {rooms.map((r) => (
                  <option key={r.id} value={r.title}>{r.title}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl skeuo-btn-gold text-xs font-bold flex items-center justify-center gap-2 mt-2"
          >
            <span>Proceed to Reservation Form</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleWhatsAppQuickEnquiry}
            className="w-full py-2.5 px-4 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100 text-xs font-bold flex items-center justify-center gap-2 transition"
          >
            <MessageSquare className="w-4 h-4 text-emerald-600" />
            <span>Instant Enquiry via WhatsApp</span>
          </button>
        </form>
      </div>
    );
  }

  // Horizontal variant (Ideal for Hero sections)
  return (
    <div className="skeuo-plate-gold p-4 sm:p-5 shadow-skeuo-elevated max-w-5xl mx-auto border-2 border-gold/40">
      <form onSubmit={handleProceed} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
        {/* Check-in */}
        <div>
          <label className="block text-[11px] uppercase tracking-wider font-bold text-charcoal-600 mb-1.5 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-gold" />
            <span>Check-In</span>
          </label>
          <input
            type="date"
            value={checkIn}
            min={today}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl skeuo-input text-xs font-medium text-charcoal"
            required
          />
        </div>

        {/* Check-out */}
        <div>
          <label className="block text-[11px] uppercase tracking-wider font-bold text-charcoal-600 mb-1.5 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-gold" />
            <span>Check-Out</span>
          </label>
          <input
            type="date"
            value={checkOut}
            min={checkIn}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl skeuo-input text-xs font-medium text-charcoal"
            required
          />
        </div>

        {/* Guests */}
        <div>
          <label className="block text-[11px] uppercase tracking-wider font-bold text-charcoal-600 mb-1.5 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-gold" />
            <span>Guests</span>
          </label>
          <select
            value={adults}
            onChange={(e) => setAdults(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl skeuo-input text-xs font-medium text-charcoal"
          >
            <option value="1">1 Adult</option>
            <option value="2">2 Adults</option>
            <option value="3">3 Adults</option>
            <option value="4">4+ Adults / Family</option>
          </select>
        </div>

        {/* Room Category */}
        <div>
          <label className="block text-[11px] uppercase tracking-wider font-bold text-charcoal-600 mb-1.5 flex items-center gap-1.5">
            <BedDouble className="w-3.5 h-3.5 text-gold" />
            <span>Room Type</span>
          </label>
          <select
            value={roomCategory}
            onChange={(e) => setRoomCategory(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl skeuo-input text-xs font-medium text-charcoal"
          >
            {rooms.map((r) => (
              <option key={r.id} value={r.title}>{r.title}</option>
            ))}
          </select>
        </div>

        {/* CTA Button */}
        <div>
          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-xl skeuo-btn-gold text-xs font-bold flex items-center justify-center gap-2 h-[42px]"
          >
            <span>Check Availability</span>
            <ArrowRight className="w-4 h-4 text-charcoal-900" />
          </button>
        </div>
      </form>
    </div>
  );
}
