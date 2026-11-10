import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  PROPERTY_INFO,
  INITIAL_ROOMS,
  INITIAL_BLOG_POSTS,
  AMENITIES_LIST,
  NEARBY_LOCATIONS,
  FAQS_LIST,
  GALLERY_IMAGES,
  TESTIMONIALS
} from '../data/hotelData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const HotelContext = createContext(null);

export function HotelProvider({ children }) {
  // Rooms state with initial fallback to verified hotel rooms
  const [rooms, setRooms] = useState(() => {
    try {
      const saved = localStorage.getItem('sv_rooms');
      if (saved) return JSON.parse(saved);
    } catch (e) { }
    return INITIAL_ROOMS;
  });

  // Live Supabase database rooms and reservations
  const [dbRooms, setDbRooms] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [isLiveSynced, setIsLiveSynced] = useState(false);

  // Blog posts state
  const [blogPosts, setBlogPosts] = useState(() => {
    const saved = localStorage.getItem('sv_blogs_v5');
    return saved ? JSON.parse(saved) : INITIAL_BLOG_POSTS;
  });

  // Booking enquiries
  const [bookingEnquiries, setBookingEnquiries] = useState(() => {
    const saved = localStorage.getItem('sv_booking_enquiries');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'ENQ-1001',
        fullName: 'Karthik Rao',
        phone: '+91 98450 12345',
        email: 'karthik.rao@example.com',
        checkIn: '2026-11-12',
        checkOut: '2026-11-14',
        adults: 2,
        children: 1,
        roomCategory: 'Deluxe Vista Suite',
        specialRequests: 'Quiet room requested for family stay. Early check-in if possible.',
        status: 'Confirmed',
        createdAt: '2026-11-04 14:32'
      }
    ];
  });

  // Contact enquiries
  const [contactEnquiries, setContactEnquiries] = useState(() => {
    const saved = localStorage.getItem('sv_contact_enquiries');
    if (saved) return JSON.parse(saved);
    return [];
  });

  // Admin auth state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('sv_admin_auth') === 'true';
  });

  // User auth state (Phone OTP / Express Guest)
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('sv_user_session');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return null;
  });

  // Modal open states
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);

  // Toast message
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // User auth operations
  const loginWithPhoneOtp = (userProfile) => {
    setUser(userProfile);
    localStorage.setItem('sv_user_session', JSON.stringify(userProfile));
    return userProfile;
  };

  const loginAsGuest = () => {
    const randomSuffix = Math.random().toString(36).substring(2, 7).toUpperCase();
    const guestId = `GST_${randomSuffix}`;
    const guestProfile = {
      isGuest: true,
      guestId,
      name: `Guest ${guestId}`,
      phone: '',
      email: '',
      username: `guest_${randomSuffix.toLowerCase()}`,
      loggedInAt: new Date().toISOString()
    };
    setUser(guestProfile);
    localStorage.setItem('sv_user_session', JSON.stringify(guestProfile));
    return guestProfile;
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('sv_user_session');
    showToast('You have signed out from user session.');
  };

  // Overlap and Conflict Validation
  const checkRoomConflict = (roomIdentifier, checkInDate, checkOutDate) => {
    if (!checkInDate || !checkOutDate) return null;
    const newIn = new Date(checkInDate).getTime();
    const newOut = new Date(checkOutDate).getTime();
    if (isNaN(newIn) || isNaN(newOut) || newOut <= newIn) return null;

    const cleanNum = String(roomIdentifier || '').replace(/\D/g, '');
    const cleanIdent = String(roomIdentifier || '').toLowerCase();

    return (reservations || []).find(res => {
      if (res.status === 'CANCELLED') return false;

      const rStr = String(res.room || '').toLowerCase();
      const matchesRoom = rStr === cleanIdent || 
        (cleanNum && (rStr.includes(`room ${cleanNum}`) || rStr.includes(cleanNum) || rStr === cleanNum));

      if (!matchesRoom) return false;

      const resIn = new Date(res.check_in || res.checkIn).getTime();
      const resOut = new Date(res.check_out || res.checkOut).getTime();
      if (isNaN(resIn) || isNaN(resOut)) return false;

      // Overlap condition: newIn < resOut && newOut > resIn
      return (newIn < resOut && newOut > resIn);
    });
  };

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('sv_rooms_v5', JSON.stringify(rooms));
  }, [rooms]);

  useEffect(() => {
    localStorage.setItem('sv_blogs_v5', JSON.stringify(blogPosts));
  }, [blogPosts]);

  useEffect(() => {
    localStorage.setItem('sv_booking_enquiries', JSON.stringify(bookingEnquiries));
  }, [bookingEnquiries]);

  useEffect(() => {
    localStorage.setItem('sv_contact_enquiries', JSON.stringify(contactEnquiries));
  }, [contactEnquiries]);

  // =========================================================================
  // LIVE SUPABASE INVENTORY & REALTIME SUBSCRIPTION
  // =========================================================================
  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let isMounted = true;

    async function loadLiveInventory() {
      try {
        // 1. Fetch live rooms from Supabase
        const { data: roomsData, error: roomsErr } = await supabase
          .from('rooms')
          .select('*')
          .order('room_number');

        // 2. Fetch live reservations from Supabase
        const { data: resData, error: resErr } = await supabase
          .from('reservations')
          .select('*')
          .order('created_at', { ascending: false });

        if (!roomsErr && roomsData && roomsData.length > 0 && isMounted) {
          setDbRooms(roomsData);
          setIsLiveSynced(true);

          // Map Supabase rooms to Shivanandi Vista room card format
          const mappedRooms = roomsData.map((r, idx) => {
            const matchingInitial = INITIAL_ROOMS.find(ir =>
              ir.title?.toLowerCase().includes((r.type || '').toLowerCase()) ||
              ir.category?.toLowerCase().includes((r.type || '').toLowerCase())
            ) || INITIAL_ROOMS[idx % INITIAL_ROOMS.length];

            const roomTitle = r.room_number ? `Room ${r.room_number} - ${r.type || 'Standard Room'}` : (r.type || 'Standard Room');
            const isOccupied = r.status === 'OCCUPIED';
            const isMaintenance = r.status === 'MAINTENANCE';

            return {
              id: String(r.id || r.room_number),
              roomNumber: r.room_number,
              title: roomTitle,
              category: r.type || 'Standard Room',
              shortDesc: matchingInitial?.shortDesc || `Refined ${r.type} located on ${r.floor || 'Floor 1'}. Features modern conveniences, quiet surroundings, and high-speed Wi-Fi.`,
              fullDesc: matchingInitial?.fullDesc || matchingInitial?.shortDesc,
              size: matchingInitial?.size || '320 sq.ft',
              bed: r.bed || matchingInitial?.bed || '1 King Bed',
              floor: r.floor,
              capacity: matchingInitial?.capacity || 'Up to 3 Guests',
              pricePerNight: Number(r.price) || matchingInitial?.pricePerNight || 2000,
              badge: isOccupied ? 'Reserved' : isMaintenance ? 'Maintenance' : (matchingInitial?.badge || 'Available'),
              status: r.status,
              isAvailable: r.status === 'VACANT_READY',
              image: matchingInitial?.image || 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80',
              gallery: matchingInitial?.gallery || [
                'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80'
              ],
              amenities: matchingInitial?.amenities || [
                'High-speed Optic Fiber Wi-Fi',
                'Individual Split Air Conditioning',
                '43-inch 4K Smart TV',
                'Ensuite Bathroom with 24/7 Hot Water',
                'Daily Housekeeping'
              ]
            };
          });

          setRooms(mappedRooms);
        }

        if (!resErr && resData && isMounted) {
          setReservations(resData);
        }
      } catch (err) {
        console.warn('Supabase live inventory sync warning:', err);
      }
    }

    loadLiveInventory();

    // Setup Supabase Realtime channel for instant synchronization
    const channel = supabase.channel('shivanandi_vista_realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'rooms' }, () => loadLiveInventory())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'reservations' }, () => loadLiveInventory())
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  // =========================================================================
  // LIVE BOOKING ENQUIRY & SUPABASE RESERVATION CREATION
  // =========================================================================
  const addBookingEnquiry = async (data) => {
    const bookingId = `AST-B-${Math.floor(1000 + Math.random() * 9000)}`;
    const guestId = user?.isGuest ? user.guestId : null;
    const guestTag = guestId ? `[Guest ID: ${guestId}] ` : (user?.username ? `[@${user.username}] ` : '');

    const newEnq = {
      id: bookingId,
      ...data,
      guestId,
      status: 'Confirmed',
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16)
    };

    setBookingEnquiries(prev => [newEnq, ...prev]);

    // Live insertion into Supabase reservations table
    if (isSupabaseConfigured) {
      try {
        const payload = {
          id: bookingId,
          guest: data.fullName || user?.name || (guestId ? `Guest ${guestId}` : 'Guest'),
          guest_email: data.email || user?.email || null,
          guest_phone: data.phone || user?.phone || null,
          room: data.roomCategory || 'Room',
          check_in: data.checkIn,
          check_out: data.checkOut,
          amount: Number(data.estimatedTariff) || 2000,
          status: 'CONFIRMED',
          payment: 'PENDING',
          source: user?.isGuest ? 'Guest Checkout (Shivanandi Vista)' : 'Phone OTP Verified (Shivanandi Vista)',
          special_requests: guestTag + (data.specialRequests || '')
        };

        const { error } = await supabase.from('reservations').insert(payload);
        if (error) {
          console.warn('Supabase reservation insert attempt with hotel_id fallback...', error);
          await supabase.from('reservations').insert({
            ...payload,
            hotel_id: 'hotel_aurastay_01'
          });
        }

        // Check if check-in is today and update room to OCCUPIED
        const todayStr = new Date().toISOString().split('T')[0];
        const roomNumMatch = String(data.roomCategory).match(/\b(\d+)\b/);
        if (roomNumMatch && data.checkIn <= todayStr && data.checkOut >= todayStr) {
          await supabase.from('rooms').update({ status: 'OCCUPIED' }).eq('room_number', roomNumMatch[1]);
        }
      } catch (err) {
        console.warn('Supabase reservation insert synced locally', err);
      }
    }

    showToast('Your reservation has been confirmed and synced with the hotel front desk!', 'success');
    return newEnq;
  };

  const addContactEnquiry = (data) => {
    const newContact = {
      id: `CNT-${Date.now().toString().slice(-4)}`,
      ...data,
      status: 'New',
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16)
    };
    setContactEnquiries(prev => [newContact, ...prev]);
    showToast('Thank you for contacting SHIVANANDI VISTA. We will get back to you promptly.', 'success');
    return newContact;
  };

  const updateBookingStatus = (id, status) => {
    setBookingEnquiries(prev =>
      prev.map(enq => (enq.id === id ? { ...enq, status } : enq))
    );
    showToast(`Enquiry ${id} status updated to "${status}".`);
  };

  const updateContactStatus = (id, status) => {
    setContactEnquiries(prev =>
      prev.map(c => (c.id === id ? { ...c, status } : c))
    );
    showToast(`Contact enquiry status updated to "${status}".`);
  };

  const updateRoom = (updatedRoom) => {
    setRooms(prev => prev.map(r => (r.id === updatedRoom.id ? updatedRoom : r)));
    showToast(`Room "${updatedRoom.title}" updated successfully.`);
  };

  const addBlogPost = (newPost) => {
    setBlogPosts(prev => [newPost, ...prev]);
    showToast(`Blog article "${newPost.title}" published successfully.`);
  };

  const deleteBlogPost = (id) => {
    setBlogPosts(prev => prev.filter(p => p.id !== id));
    showToast('Article deleted.');
  };

  const loginAdmin = (password) => {
    if (password === 'vista2026' || password === 'admin123') {
      setIsAdminLoggedIn(true);
      localStorage.setItem('sv_admin_auth', 'true');
      showToast('Welcome to SHIVANANDI VISTA Admin Panel.', 'success');
      return true;
    }
    showToast('Invalid administrative password.', 'error');
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('sv_admin_auth');
    showToast('You have been logged out securely.');
  };

  // WhatsApp Pre-fill helper
  const openWhatsApp = (customText = '') => {
    const defaultText = customText || `Hello SHIVANANDI VISTA, I would like to enquire about room availability and booking at your Yelahanka property. Please share details.`;
    const encoded = encodeURIComponent(defaultText);
    const url = `https://wa.me/${PROPERTY_INFO.whatsappRaw}?text=${encoded}`;
    window.open(url, '_blank');
  };

  return (
    <HotelContext.Provider
      value={{
        property: PROPERTY_INFO,
        rooms,
        dbRooms,
        reservations,
        isLiveSynced,
        blogPosts,
        amenities: AMENITIES_LIST,
        nearbyLocations: NEARBY_LOCATIONS,
        faqs: FAQS_LIST,
        gallery: GALLERY_IMAGES,
        testimonials: TESTIMONIALS,
        bookingEnquiries,
        contactEnquiries,
        isAdminLoggedIn,
        user,
        loginWithPhoneOtp,
        loginAsGuest,
        logoutUser,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isMyBookingsOpen,
        setIsMyBookingsOpen,
        checkRoomConflict,
        toast,
        addBookingEnquiry,
        addContactEnquiry,
        updateBookingStatus,
        updateContactStatus,
        updateRoom,
        addBlogPost,
        deleteBlogPost,
        loginAdmin,
        logoutAdmin,
        openWhatsApp,
        showToast
      }}
    >
      {children}
    </HotelContext.Provider>
  );
}

export const useHotel = () => {
  const context = useContext(HotelContext);
  if (!context) throw new Error('useHotel must be used within HotelProvider');
  return context;
};
