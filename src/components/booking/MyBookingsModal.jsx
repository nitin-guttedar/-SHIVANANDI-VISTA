import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Calendar, 
  BedDouble, 
  Clock, 
  Phone, 
  MessageSquare, 
  CheckCircle2, 
  AlertCircle, 
  User, 
  CreditCard,
  Building,
  Sparkles
} from 'lucide-react';
import { useHotel } from '../../context/HotelContext';

export default function MyBookingsModal({ isOpen, onClose }) {
  const { 
    user, 
    reservations = [], 
    bookingEnquiries = [], 
    openWhatsApp,
    property
  } = useHotel();

  const [searchQuery, setSearchQuery] = useState(user?.phone || '');

  if (!isOpen) return null;

  // Combine and normalize bookings from Supabase reservations and local enquiries
  const allBookings = [
    ...reservations.map(r => ({
      id: r.id,
      guest: r.guest || r.guest_name,
      phone: r.guest_phone || r.phone,
      email: r.guest_email || r.email,
      room: r.room || r.room_category || 'Standard Room',
      checkIn: r.check_in || r.checkIn,
      checkOut: r.check_out || r.checkOut,
      amount: r.amount || r.total_price || 2500,
      payment: r.payment || 'PENDING',
      status: r.status || 'CONFIRMED',
      source: r.source || 'Online Portal',
      specialRequests: r.special_requests || '',
      createdDate: r.created_at ? new Date(r.created_at).toLocaleDateString() : 'Recent'
    })),
    ...bookingEnquiries.map(enq => ({
      id: enq.id,
      guest: enq.fullName,
      phone: enq.phone,
      email: enq.email,
      room: enq.roomCategory,
      checkIn: enq.checkIn,
      checkOut: enq.checkOut,
      amount: enq.estimatedTariff || 2500,
      payment: 'PENDING',
      status: enq.status || 'Confirmed',
      source: 'Direct Web Enquiry',
      specialRequests: enq.specialRequests || '',
      createdDate: enq.createdAt || 'Recent'
    }))
  ];

  // De-duplicate by ID
  const uniqueBookingsMap = new Map();
  allBookings.forEach(b => {
    if (!uniqueBookingsMap.has(b.id)) {
      uniqueBookingsMap.set(b.id, b);
    }
  });
  const uniqueBookings = Array.from(uniqueBookingsMap.values());

  // Filter bookings based on active user or search query
  const filteredBookings = uniqueBookings.filter(b => {
    if (!searchQuery.trim()) {
      // If user is logged in, show their bookings by phone or name
      if (user) {
        if (user.phone && b.phone && b.phone.includes(user.phone.slice(-8))) return true;
        if (user.name && b.guest && b.guest.toLowerCase().includes(user.name.toLowerCase())) return true;
        return false;
      }
      return true; // Show all if no filter
    }

    const q = searchQuery.toLowerCase().trim();
    const cleanQ = q.replace(/\D/g, '');

    const matchId = b.id && b.id.toLowerCase().includes(q);
    const matchGuest = b.guest && b.guest.toLowerCase().includes(q);
    const matchRoom = b.room && b.room.toLowerCase().includes(q);
    const matchPhone = b.phone && cleanQ && b.phone.replace(/\D/g, '').includes(cleanQ);

    return matchId || matchGuest || matchRoom || matchPhone;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-[#141210] text-white px-6 py-5 flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] tracking-[0.2em] font-bold uppercase text-gold">
                GUEST RESERVATIONS
              </span>
              {user && (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-900/60 text-emerald-300 border border-emerald-500/40 text-[10px] font-semibold">
                  Verified: +91 {user.phone}
                </span>
              )}
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-white mt-0.5">
              My Hotel Bookings
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 bg-stone-50 border-b border-stone-200 shrink-0">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by 10-Digit Mobile Number (+91) or Booking Reference (AST-B-XXXX)..."
              className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-stone-300 text-xs font-semibold text-obsidian placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-gold/60"
            />
          </div>
        </div>

        {/* Bookings List Body */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {filteredBookings.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-obsidian">No Bookings Found</h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                {searchQuery 
                  ? `No reservations matching "${searchQuery}". Please check the phone number or reference ID.`
                  : "You don't have any recorded bookings under this account yet."
                }
              </p>
            </div>
          ) : (
            filteredBookings.map((b) => {
              const isPaid = b.payment === 'PAID';
              const isConfirmed = b.status === 'CONFIRMED' || b.status === 'Confirmed';
              const isCheckedIn = b.status === 'CHECKED_IN';

              return (
                <div 
                  key={b.id}
                  className="bg-white rounded-2xl border border-stone-200 p-5 shadow-2xs hover:shadow-md transition space-y-3.5"
                >
                  {/* Top Bar with ID & Status */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-black text-obsidian px-2.5 py-1 bg-stone-100 rounded-lg">
                        {b.id}
                      </span>
                      <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                        isCheckedIn
                          ? 'bg-blue-100 text-blue-800'
                          : isConfirmed
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-stone-100 text-stone-700'
                      }`}>
                        ● {b.status}
                      </span>
                    </div>

                    {/* Payment Badge */}
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                        isPaid 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}>
                        <CreditCard className="w-3 h-3" />
                        <span>Payment: {isPaid ? 'PAID' : 'PENDING'}</span>
                      </span>
                    </div>
                  </div>

                  {/* Room & Dates */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <div className="text-[10.5px] font-bold text-stone-400 uppercase tracking-wider">
                        Room Category
                      </div>
                      <div className="font-bold text-obsidian text-sm mt-0.5 flex items-center gap-1.5">
                        <BedDouble className="w-4 h-4 text-gold" />
                        <span>{b.room}</span>
                      </div>
                    </div>

                    <div>
                      <div className="text-[10.5px] font-bold text-stone-400 uppercase tracking-wider">
                        Stay Duration
                      </div>
                      <div className="font-medium text-stone-700 mt-0.5 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-stone-400" />
                        <span>{b.checkIn} &rarr; {b.checkOut}</span>
                      </div>
                    </div>

                    <div>
                      <div className="text-[10.5px] font-bold text-stone-400 uppercase tracking-wider">
                        Guest Contact
                      </div>
                      <div className="font-medium text-stone-700 mt-0.5">
                        {b.guest} &bull; {b.phone || 'Phone not provided'}
                      </div>
                    </div>

                    <div>
                      <div className="text-[10.5px] font-bold text-stone-400 uppercase tracking-wider">
                        Tariff Total
                      </div>
                      <div className="font-black text-obsidian text-base text-gold-dark mt-0.5">
                        ₹{Number(b.amount).toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[11px] text-stone-400">
                      Booked via {b.source} &bull; {b.createdDate}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          const msg = `Hello SHIVANANDI VISTA front desk,\n\nI have an enquiry regarding my reservation:\nBooking ID: ${b.id}\nRoom: ${b.room}\nDates: ${b.checkIn} to ${b.checkOut}\nGuest: ${b.guest}\n\nPlease update me on check-in arrangements.`;
                          openWhatsApp(msg);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold flex items-center gap-1.5 transition"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Help on WhatsApp</span>
                      </button>

                      <a
                        href={`tel:${property.phoneRaw}`}
                        className="px-3 py-1.5 rounded-lg border border-stone-300 hover:bg-stone-50 text-stone-700 text-[11px] font-bold flex items-center gap-1.5 transition"
                      >
                        <Phone className="w-3.5 h-3.5 text-stone-500" />
                        <span>Call Desk</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-stone-50 border-t border-stone-200 flex items-center justify-between shrink-0 text-xs">
          <span className="text-stone-500 text-[11px]">
            Front Desk 24/7 Hotline: <strong>{property.phone}</strong>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-white border border-stone-300 rounded-lg text-stone-700 font-bold hover:bg-stone-100 transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}

