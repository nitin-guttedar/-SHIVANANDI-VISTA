import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
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

async function broadcastVistaSync(payload) {
  if (!isSupabaseConfigured || !supabase) return;
  try {
    const channel = supabase.channel('aurastay_sync_broadcast');
    await channel.send({
      type: 'broadcast',
      event: 'webhook_update',
      payload: {
        ...payload,
        timestamp: new Date().toISOString()
      }
    });
    supabase.removeChannel(channel);
  } catch (e) { }
}

export function HotelProvider({ children }) {
  // Rooms state driven strictly by Supabase Backend (no localStorage caching)
  const [rooms, setRooms] = useState([]);

  // Live Supabase database rooms, reservations, and active hotel tenant ID
  const [dbRooms, setDbRooms] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [activeHotelId, setActiveHotelId] = useState(null);
  const [isLiveSynced, setIsLiveSynced] = useState(false);

  // Blog posts state
  const [blogPosts, setBlogPosts] = useState(INITIAL_BLOG_POSTS);

  // Booking enquiries (synced from Supabase reservations)
  const [bookingEnquiries, setBookingEnquiries] = useState([]);

  // Contact enquiries
  const [contactEnquiries, setContactEnquiries] = useState([]);

  // Clean up legacy localStorage keys on mount
  useEffect(() => {
    const legacyKeys = [
      'sv_rooms',
      'sv_rooms_v5',
      'sv_blogs_v5',
      'sv_booking_enquiries',
      'sv_contact_enquiries',
      'sv_saved_users'
    ];
    legacyKeys.forEach(k => {
      try { localStorage.removeItem(k); } catch (e) { }
    });
  }, []);

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
  const loginUser = (userProfile) => {
    setUser(userProfile);
    localStorage.setItem('sv_user_session', JSON.stringify(userProfile));
    return userProfile;
  };
  const loginWithPhoneOtp = loginUser;

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('sv_user_session');
    showToast('You have signed out from user session.');
  };

  // Enterprise Room Availability & Overlap Validation Engine
  const checkRoomConflict = (roomIdentifier, checkInDate, checkOutDate) => {
    if (!checkInDate || !checkOutDate) return null;
    const newIn = new Date(checkInDate).getTime();
    const newOut = new Date(checkOutDate).getTime();
    if (isNaN(newIn) || isNaN(newOut) || newOut <= newIn) return null;

    const cleanNum = String(roomIdentifier || '').match(/\b(\d+)\b/)?.[1] || '';
    const cleanIdent = String(roomIdentifier || '').toLowerCase();

    // 1. If checking a specific room instance with a known room number (e.g., Room 101)
    if (cleanNum) {
      return (reservations || []).find(res => {
        if (res.status === 'CANCELLED' || res.status === 'CHECKED_OUT') return false;
        const resRoom = String(res.room_number || res.room || '');
        const match = resRoom.match(/\b(\d+)\b/);
        const matchesThisRoom = (match && match[1] === cleanNum) || resRoom === cleanNum || resRoom.includes('Room ' + cleanNum);
        if (!matchesThisRoom) return false;

        const resIn = new Date(res.check_in || res.checkIn).getTime();
        const resOut = new Date(res.check_out || res.checkOut).getTime();
        if (isNaN(resIn) || isNaN(resOut)) return false;

        return (newIn < resOut && newOut > resIn);
      });
    }

    // 2. If checking by category (e.g. 'Standard Room'), check if ALL rooms in this category are booked
    const matchingCategoryRooms = (dbRooms && dbRooms.length > 0 ? dbRooms : rooms).filter(r => {
      const typeStr = (r.type || r.category || '').toLowerCase();
      return typeStr.includes(cleanIdent) || cleanIdent.includes(typeStr);
    });

    if (matchingCategoryRooms.length > 0) {
      const freeRoom = matchingCategoryRooms.find(r => {
        const rNum = String(r.room_number || r.roomNumber || r.id);
        const hasConflict = (reservations || []).some(res => {
          if (res.status === 'CANCELLED' || res.status === 'CHECKED_OUT') return false;
          const resRoom = String(res.room_number || res.room || '');
          if (!resRoom.includes(rNum)) return false;
          const resIn = new Date(res.check_in || res.checkIn).getTime();
          const resOut = new Date(res.check_out || res.checkOut).getTime();
          return (newIn < resOut && newOut > resIn);
        });
        return !hasConflict;
      });

      if (!freeRoom) {
        return (reservations || []).find(res => {
          if (res.status === 'CANCELLED' || res.status === 'CHECKED_OUT') return false;
          const resIn = new Date(res.check_in || res.checkIn).getTime();
          const resOut = new Date(res.check_out || res.checkOut).getTime();
          return (newIn < resOut && newOut > resIn);
        }) || { room: roomIdentifier, guest: 'Another Guest' };
      }
      return null;
    }

    return null;
  };

  // =========================================================================
  // LIVE SUPABASE INVENTORY & REALTIME SUBSCRIPTION
  // =========================================================================
  const loadLiveInventory = useCallback(async () => {
    if (!isSupabaseConfigured) return;
    try {
      const [hotelsRes, roomsRes, resRes] = await Promise.all([
        supabase.from('hotels').select('id, status').order('created_at', { ascending: false }),
        supabase.from('rooms').select('*').order('room_number'),
        supabase.from('reservations').select('*').order('created_at', { ascending: false })
      ]);

      const hotelsData = Array.isArray(hotelsRes?.data) ? hotelsRes.data : [];
      const activeHotel = hotelsData.find(h => h.status === 'ACTIVE') || hotelsData[0];
      if (activeHotel?.id) {
        setActiveHotelId(activeHotel.id);
      }

      const roomsData = Array.isArray(roomsRes?.data) ? roomsRes.data : null;
      const resData = Array.isArray(resRes?.data) ? resRes.data : [];

      if (!resRes?.error && Array.isArray(resRes?.data)) {
        setReservations(resData);
        setBookingEnquiries(resData.map(r => ({
          id: r.id,
          fullName: r.guest || 'Guest',
          email: r.guest_email || '',
          phone: r.guest_phone || '',
          roomNumber: r.room_number || (String(r.room || '').match(/\b(\d+)\b/)?.[1] || ''),
          roomCategory: r.room || 'Room',
          checkIn: r.check_in,
          checkOut: r.check_out,
          estimatedTariff: Number(r.amount) || 0,
          status: r.status === 'CANCELLED' ? 'Cancelled' : 'Confirmed',
          createdAt: (r.created_at || '').replace('T', ' ').slice(0, 16)
        })));
      }

      if (!roomsRes?.error && roomsData !== null) {
        setDbRooms(roomsData);
        setIsLiveSynced(true);

        if (roomsData.length === 0) {
          setRooms([]);
        } else {
          const todayStr = new Date().toISOString().split('T')[0];
          const mappedRooms = roomsData.map((r, idx) => {
            const matchingInitial = INITIAL_ROOMS.find(ir =>
              ir.title?.toLowerCase().includes((r.type || '').toLowerCase()) ||
              ir.category?.toLowerCase().includes((r.type || '').toLowerCase())
            ) || INITIAL_ROOMS[idx % INITIAL_ROOMS.length];

            const roomNum = String(r.room_number || '');
            const activeResToday = (resData || []).find(res => {
              if (res.status === 'CANCELLED' || res.status === 'CHECKED_OUT') return false;
              const resRoom = String(res.room_number || res.room || '');
              const matches = resRoom === roomNum || resRoom.includes('Room ' + roomNum) || resRoom.includes(roomNum);
              if (!matches) return false;
              const cIn = res.check_in || res.checkIn;
              const cOut = res.check_out || res.checkOut;
              return cIn <= todayStr && cOut > todayStr;
            });

            const isOccupied = r.status === 'OCCUPIED' || !!activeResToday;
            const isMaintenance = r.status === 'MAINTENANCE';
            const roomTitle = r.room_number ? `Room ${r.room_number} - ${r.type || 'Standard Room'}` : (r.type || 'Standard Room');

            return {
              id: String(r.id || r.room_number),
              hotelId: r.hotel_id || activeHotel?.id || null,
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
              status: isOccupied ? 'OCCUPIED' : r.status,
              isAvailable: !isOccupied && !isMaintenance,
              activeGuest: activeResToday?.guest || r.guest || null,
              bookedUntil: activeResToday?.check_out || r.check_out || null,
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
      }
    } catch (err) {
      console.warn('Supabase live inventory sync warning:', err);
    }
  }, []);

  useEffect(() => {
    loadLiveInventory();
    const pollTimer = setInterval(() => {
      loadLiveInventory();
    }, 4000);
    return () => clearInterval(pollTimer);
  }, [loadLiveInventory]);

  useEffect(() => {
    if (!isSupabaseConfigured) return;

    const channel = supabase.channel('shivanandi_vista_realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'rooms' }, () => loadLiveInventory())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'reservations' }, () => loadLiveInventory())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'hotels' }, () => loadLiveInventory())
      .subscribe();

    const broadcastChannel = supabase.channel('aurastay_sync_broadcast')
      .on('broadcast', { event: 'webhook_update' }, () => loadLiveInventory())
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
      supabase.removeChannel(broadcastChannel);
    };
  }, [loadLiveInventory]);

  // =========================================================================
  // LIVE BOOKING ENQUIRY & SUPABASE RESERVATION CREATION
  // =========================================================================
  const addBookingEnquiry = async (data) => {
    const bookingId = `AST-B-${Math.floor(1000 + Math.random() * 9000)}`;
    const todayStr = new Date().toISOString().split('T')[0];

    // 1. Identify which room instance is being booked
    let targetRoomNum = data.roomNumber;
    if (!targetRoomNum) {
      const match = String(data.roomCategory || '').match(/\b(\d+)\b/);
      if (match) targetRoomNum = match[1];
    }

    // If no room number yet, find candidate room from dbRooms / rooms
    if (!targetRoomNum) {
      const roomPool = (dbRooms && dbRooms.length > 0 ? dbRooms : rooms) || [];
      const catRooms = roomPool.filter(r => {
        const typeStr = (r.type || r.category || '').toLowerCase();
        const catStr = String(data.roomCategory || '').toLowerCase();
        return typeStr.includes(catStr) || catStr.includes(typeStr);
      });
      const searchPool = catRooms.length > 0 ? catRooms : roomPool;

      // Find free room without overlapping reservation
      const freeRoom = searchPool.find(r => {
        const rNum = String(r.room_number || r.roomNumber || r.id);
        const hasOverlap = (reservations || []).some(res => {
          if (res.status === 'CANCELLED' || res.status === 'CHECKED_OUT') return false;
          const resRoom = String(res.room_number || res.room || '');
          if (!resRoom.includes(rNum)) return false;
          return (new Date(data.checkIn) < new Date(res.check_out || res.checkOut) && new Date(data.checkOut) > new Date(res.check_in || res.checkIn));
        });
        return !hasOverlap;
      });

      targetRoomNum = freeRoom ? (freeRoom.room_number || freeRoom.roomNumber) : (searchPool[0]?.room_number || searchPool[0]?.roomNumber || '101');
    }

    const roomPool = (dbRooms && dbRooms.length > 0 ? dbRooms : rooms) || [];
    const assignedRoom = roomPool.find(r => String(r.room_number || r.roomNumber) === String(targetRoomNum));
    const roomType = assignedRoom?.type || assignedRoom?.category || data.roomCategory || 'Standard Room';
    const roomDisplayName = `Room ${targetRoomNum} - ${roomType}`;

    const newEnq = {
      id: bookingId,
      ...data,
      roomNumber: targetRoomNum,
      roomCategory: roomDisplayName,
      phone: data.phone || user?.phone || '',
      status: 'Confirmed',
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16)
    };

    setBookingEnquiries(prev => [newEnq, ...prev]);

    // Live insertion into Supabase reservations table
    if (isSupabaseConfigured) {
      try {
        const resolvedHotelId = assignedRoom?.hotel_id || assignedRoom?.hotelId || activeHotelId || null;
        const safePayload = {
          id: bookingId,
          ...(resolvedHotelId ? { hotel_id: resolvedHotelId } : {}),
          guest: data.fullName || user?.name || 'Verified Guest',
          guest_email: data.email || user?.email || null,
          guest_phone: data.phone || user?.phone || null,
          room: roomDisplayName,
          check_in: data.checkIn,
          check_out: data.checkOut,
          amount: Number(data.estimatedTariff) || 2000,
          status: 'CONFIRMED',
          payment: 'PENDING',
          source: 'Direct Website (Shivanandi Vista)'
        };

        const { error: insErr } = await supabase.from('reservations').insert(safePayload);
        if (insErr) {
          console.warn('Initial insert attempt error, retrying with fallback...', insErr);
          const fallback = { ...safePayload };
          delete fallback.hotel_id;
          await supabase.from('reservations').insert(fallback);
        }

        // Lock room in Supabase: mark OCCUPIED so Admin immediately reflects the room as Occupied
        await supabase.from('rooms').update({
          status: 'OCCUPIED',
          guest: data.fullName || user?.name || 'Verified Guest',
          booking_id: bookingId,
          check_out: data.checkOut
        }).eq('room_number', String(targetRoomNum));

        await broadcastVistaSync({
          action: 'book',
          bookingId,
          guestName: data.fullName || user?.name || 'Verified Guest',
          roomNumber: String(targetRoomNum)
        });

        // Optimistically update local room state
        setRooms(prev => prev.map(r => String(r.roomNumber || r.id) === String(targetRoomNum) ? {
          ...r,
          status: 'OCCUPIED',
          isAvailable: false,
          badge: 'Reserved',
          activeGuest: data.fullName || user?.name || 'Verified Guest',
          bookedUntil: data.checkOut
        } : r));

      } catch (err) {
        console.warn('Supabase booking sync error:', err);
      }
    }

    showToast(`Reservation #${bookingId} confirmed! Room #${targetRoomNum} has been locked for your stay.`, 'success');
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

  // Self-service guest reservation cancellation
  const cancelBooking = async (bookingId, roomIdentifier) => {
    try {
      // 1. Update Supabase reservations table
      if (isSupabaseConfigured) {
        await supabase
          .from('reservations')
          .update({ status: 'CANCELLED' })
          .eq('id', bookingId);

        // 2. Unlock and reset room in Supabase rooms table
        const rMatch = String(roomIdentifier || '').match(/\b(\d+)\b/);
        if (rMatch) {
          const rNum = rMatch[1];
          await supabase
            .from('rooms')
            .update({
              status: 'VACANT_READY',
              guest: null,
              booking_id: null,
              check_out: null
            })
            .eq('room_number', rNum);
        }

        await broadcastVistaSync({
          action: 'cancel',
          bookingId
        });
      }

      // 3. Update local state
      setReservations(prev => prev.map(r => r.id === bookingId ? { ...r, status: 'CANCELLED' } : r));
      setBookingEnquiries(prev => prev.map(enq => enq.id === bookingId ? { ...enq, status: 'Cancelled' } : enq));

      // 4. Update rooms local state
      const rMatch = String(roomIdentifier || '').match(/\b(\d+)\b/);
      if (rMatch) {
        const rNum = rMatch[1];
        setRooms(prev => prev.map(rm => String(rm.roomNumber || rm.id) === rNum ? {
          ...rm,
          status: 'VACANT_READY',
          isAvailable: true,
          badge: 'Available',
          activeGuest: null,
          bookedUntil: null
        } : rm));
      }

      showToast(`Booking #${bookingId} has been cancelled successfully. Your room has been released.`, 'success');
      return true;
    } catch (err) {
      console.error('Error cancelling reservation:', err);
      showToast('Failed to cancel reservation. Please contact hotel front desk.', 'error');
      return false;
    }
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

  const loginAdmin = async (password) => {
    if (!password || !isSupabaseConfigured) {
      showToast('Invalid administrative password.', 'error');
      return false;
    }
    try {
      const { data: hotelsData } = await supabase.from('hotels').select('*');
      const matched = (hotelsData || []).find(h => h.password === password.trim() && (h.status || 'ACTIVE') === 'ACTIVE');
      if (matched) {
        setIsAdminLoggedIn(true);
        localStorage.setItem('sv_admin_auth', 'true');
        showToast(`Welcome to ${matched.name} Admin Panel.`, 'success');
        return true;
      }
    } catch (e) { }
    showToast('Invalid administrative password. Use the password created by SuperAdmin.', 'error');
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('sv_admin_auth');
    showToast('You have been logged out securely.');
  };

  // WhatsApp Pre-fill helper
  const openWhatsApp = (customText = '') => {
    const defaultText =
      customText ||
      `Hello SHIVANANDI VISTA, I would like to enquire about room availability and booking at your Begur, BK Halli Post, Near Bengaluru International Airport property. Please share details.`;
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
        loginUser,
        loginWithPhoneOtp,
        logoutUser,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isMyBookingsOpen,
        setIsMyBookingsOpen,
        checkRoomConflict,
        toast,
        addBookingEnquiry,
        cancelBooking,
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
