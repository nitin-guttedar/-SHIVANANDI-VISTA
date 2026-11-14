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

// Format raw room category/type name into a clean user-facing title without any room numbers
// e.g. "standard" -> "Standard Room", "Room 101 - standard" -> "Standard Room", "deluxe" -> "Deluxe Room"
export function formatRoomTypeName(rawName, label = 'Room') {
  if (!rawName) return 'Standard Room';
  let cleaned = String(rawName)
    .replace(/^room\s*#?\s*\d+[a-z]?\s*[-–—:]\s*/i, '')
    .replace(/\s*[-–—]\s*room\s*#?\s*\d+[a-z]?$/i, '')
    .replace(/^#\s*\d+[a-z]?\s*[-–—:]?\s*/i, '')
    .replace(/\broom\s*#?\s*\d+[a-z]?\b/gi, '')
    .replace(/^[-–—:\s]+|[-–—:\s]+$/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (!cleaned || /^\d+$/.test(cleaned)) {
    return 'Standard Room';
  }

  // Title-case each word
  const titled = cleaned
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');

  // Append "Room" (or category label) if no accommodation suffix word is present
  const hasTypeSuffix = /\b(room|rooms|suite|suites|villa|villas|cottage|cottages|apartment|apartments|studio|studios|tent|tents|dormitory|cabin|cabins|bungalow|houseboat|penthouse|chalet|loft)\b/i.test(titled);
  if (!hasTypeSuffix) {
    const cleanLabel = String(label || 'Room').trim();
    return `${titled} ${cleanLabel}`;
  }

  return titled;
}

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

  // Property Info state (synced dynamically from SuperAdmin 'hotels' table in Supabase)
  const [propertyInfo, setPropertyInfo] = useState(PROPERTY_INFO);

  // Admin auth state (Persisted across page refreshes until explicit logout)
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    try {
      return localStorage.getItem('sv_admin_auth') === 'true';
    } catch (e) {
      return false;
    }
  });

  // User auth state (Persisted across page refreshes until explicit logout)
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('sv_user_session');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return null;
  });

  // Keep user and admin sessions persisted in localStorage across refreshes
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('sv_user_session', JSON.stringify(user));
      }
    } catch (e) {}
  }, [user]);

  useEffect(() => {
    try {
      if (isAdminLoggedIn) {
        localStorage.setItem('sv_admin_auth', 'true');
      }
    } catch (e) {}
  }, [isAdminLoggedIn]);

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

    const targetCategory = formatRoomTypeName(roomIdentifier).toLowerCase();

    // Check all physical rooms in this category from dbRooms
    const matchingCategoryRooms = (dbRooms || []).filter(r => {
      const rCat = formatRoomTypeName(r.type || r.category || 'Standard Room').toLowerCase();
      return rCat === targetCategory || rCat.includes(targetCategory) || targetCategory.includes(rCat);
    });

    if (matchingCategoryRooms.length > 0) {
      const todayStr = new Date().toISOString().split('T')[0];
      const freeRoom = matchingCategoryRooms.find(r => {
        const isMaint = r.status === 'MAINTENANCE' || r.status === 'OUT_OF_ORDER' || r.status === 'BLOCKED';
        if (isMaint) return false;

        const rNum = String(r.room_number || r.roomNumber || r.id).trim();
        const hasResConflict = (reservations || []).some(res => {
          if (res.status === 'CANCELLED' || res.status === 'CHECKED_OUT') return false;
          const resRoom = String(res.room_number || res.room || '');
          const match = resRoom.match(/\b(\d+)\b/);
          const matchesThisRoom = (match && match[1] === rNum) || resRoom === rNum || resRoom.includes('Room ' + rNum);
          if (!matchesThisRoom) return false;
          const resIn = new Date(res.check_in || res.checkIn).getTime();
          const resOut = new Date(res.check_out || res.checkOut).getTime();
          if (isNaN(resIn) || isNaN(resOut)) return false;
          return (newIn < resOut && newOut > resIn);
        });
        if (hasResConflict) return false;

        // If marked OCCUPIED in dbRooms directly without a matching reservation row
        if (r.status === 'OCCUPIED') {
          if (r.check_out) {
            const occOut = new Date(r.check_out).getTime();
            if (!isNaN(occOut) && newIn < occOut) return false;
          } else if (checkInDate <= todayStr) {
            return false;
          }
        }

        return true;
      });

      if (!freeRoom) {
        return (reservations || []).find(res => {
          if (res.status === 'CANCELLED' || res.status === 'CHECKED_OUT') return false;
          const resCat = formatRoomTypeName(res.room_type || res.room || '').toLowerCase();
          if (resCat !== targetCategory && !resCat.includes(targetCategory)) return false;
          const resIn = new Date(res.check_in || res.checkIn).getTime();
          const resOut = new Date(res.check_out || res.checkOut).getTime();
          return (newIn < resOut && newOut > resIn);
        }) || {
          room: formatRoomTypeName(roomIdentifier),
          check_in: checkInDate,
          check_out: checkOutDate,
          guest: 'Reserved'
        };
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
      const [hotelsRes, roomTypesRes, roomsRes, resRes] = await Promise.all([
        supabase.from('hotels').select('*').order('created_at', { ascending: false }),
        supabase.from('room_types').select('*').order('created_at', { ascending: true }),
        supabase.from('rooms').select('*').order('room_number'),
        supabase.from('reservations').select('*').order('created_at', { ascending: false })
      ]);

      const hotelsData = Array.isArray(hotelsRes?.data)
        ? hotelsRes.data.filter(
            h =>
              String(h.id || '').toLowerCase() !== 'hotel_aurastay_01' &&
              String(h.email || '').toLowerCase() !== 'admin@aurastay.com'
          )
        : [];
      const activeHotel = hotelsData.find(h => h.status === 'ACTIVE') || hotelsData[0];
      if (activeHotel?.id) {
        setActiveHotelId(activeHotel.id);
        setPropertyInfo(prev => ({
          ...prev,
          name: activeHotel.name || prev.name,
          phone: activeHotel.mobile || prev.phone,
          email: activeHotel.email || prev.email,
          address: activeHotel.address || prev.address,
          city: activeHotel.city || prev.city
        }));
      }

      const roomTypesData = Array.isArray(roomTypesRes?.data) ? roomTypesRes.data : [];
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
          roomCategory: formatRoomTypeName(r.room_type || r.room || 'Standard Room'),
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

          // Group physical rooms by their normalized Room Type / Category so we show 1 card per Room Type
          const categoryGroups = new Map();

          roomsData.forEach((r) => {
            const rawType = r.type || r.category || 'Standard Room';
            const matchedRoomType = roomTypesData.find(rt =>
              (r.room_type_id && rt.id === r.room_type_id) ||
              String(rt.name || '').trim().toLowerCase() === String(rawType).trim().toLowerCase() ||
              formatRoomTypeName(rt.name, rt.label).toLowerCase() === formatRoomTypeName(rawType).toLowerCase()
            );

            const canonicalTitle = formatRoomTypeName(matchedRoomType?.name || rawType, matchedRoomType?.label || 'Room');
            const groupKey = canonicalTitle.toLowerCase();

            const roomNum = String(r.room_number || '').trim();
            const activeResToday = (resData || []).find(res => {
              if (res.status === 'CANCELLED' || res.status === 'CHECKED_OUT') return false;
              const resRoom = String(res.room_number || res.room || '');
              const matchNum = resRoom.match(/\b(\d+)\b/)?.[1] || '';
              const matches = (matchNum && matchNum === roomNum) || resRoom === roomNum || resRoom.includes('Room ' + roomNum);
              if (!matches) return false;
              const cIn = res.check_in || res.checkIn;
              const cOut = res.check_out || res.checkOut;
              return cIn <= todayStr && cOut > todayStr;
            });

            const isOccupied = r.status === 'OCCUPIED' || !!activeResToday;
            const isMaintenance = r.status === 'MAINTENANCE' || r.status === 'OUT_OF_ORDER' || r.status === 'BLOCKED';
            const isAvailable = !isOccupied && !isMaintenance;

            if (!categoryGroups.has(groupKey)) {
              categoryGroups.set(groupKey, {
                canonicalTitle,
                rawCategory: matchedRoomType?.name || rawType,
                matchedRoomType,
                hotelId: r.hotel_id || activeHotel?.id || null,
                physicalRooms: []
              });
            }

            categoryGroups.get(groupKey).physicalRooms.push({
              ...r,
              roomNum,
              isOccupied,
              isMaintenance,
              isAvailable,
              activeGuest: activeResToday?.guest || r.guest || null,
              bookedUntil: activeResToday?.check_out || r.check_out || null
            });
          });

          const groupedCards = Array.from(categoryGroups.values()).map((group, idx) => {
            const { canonicalTitle, matchedRoomType, hotelId, physicalRooms } = group;
            const firstRoom = physicalRooms[0] || {};
            const totalRooms = physicalRooms.length;
            const availableCount = physicalRooms.filter(rm => rm.isAvailable).length;
            const occupiedCount = physicalRooms.filter(rm => rm.isOccupied).length;
            const isCategoryAvailable = availableCount > 0;

            const matchingInitial = INITIAL_ROOMS.find(ir =>
              ir.title?.toLowerCase().includes(canonicalTitle.toLowerCase()) ||
              canonicalTitle.toLowerCase().includes((ir.category || '').toLowerCase())
            ) || INITIAL_ROOMS[idx % INITIAL_ROOMS.length];

            const maxAdults = Number(matchedRoomType?.max_adults) || 0;
            const capacityText = maxAdults > 0
              ? `Up to ${maxAdults} Guests`
              : (matchingInitial?.capacity || 'Up to 3 Guests');

            const areaSqft = Number(matchedRoomType?.area_sqft) || 0;
            const sizeText = areaSqft > 0
              ? `${areaSqft} sq.ft`
              : (matchingInitial?.size || '320 sq.ft');

            const bedText = matchedRoomType?.bedding_type || firstRoom.bed || matchingInitial?.bed || '1 King Bed';
            const pricePerNight = Number(firstRoom.price) || Number(matchedRoomType?.base_price) || matchingInitial?.pricePerNight || 2000;

            const customDesc = matchedRoomType?.description?.trim();
            const shortDesc = customDesc || matchingInitial?.shortDesc || `Comfortable ${canonicalTitle} featuring modern conveniences, tranquil surroundings, and high-speed Wi-Fi.`;
            const fullDesc = customDesc || matchingInitial?.fullDesc || shortDesc;

            const customAmenities = Array.isArray(matchedRoomType?.amenities) && matchedRoomType.amenities.length > 0
              ? matchedRoomType.amenities
              : null;

            return {
              id: `cat-${canonicalTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
              hotelId,
              title: canonicalTitle,
              category: canonicalTitle,
              totalRooms,
              availableCount,
              occupiedCount,
              roomNumbers: physicalRooms.map(rm => rm.roomNum),
              availableRoomNumbers: physicalRooms.filter(rm => rm.isAvailable).map(rm => rm.roomNum),
              shortDesc,
              fullDesc,
              size: sizeText,
              bed: bedText,
              capacity: capacityText,
              pricePerNight,
              badge: isCategoryAvailable ? `${availableCount} Available` : 'Sold Out',
              status: isCategoryAvailable ? 'VACANT_READY' : 'OCCUPIED',
              isAvailable: isCategoryAvailable,
              bookedUntil: !isCategoryAvailable ? (physicalRooms.find(rm => rm.bookedUntil)?.bookedUntil || null) : null,
              image: matchingInitial?.image || 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80',
              gallery: matchingInitial?.gallery || [
                'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80'
              ],
              amenities: customAmenities || matchingInitial?.amenities || [
                'High-speed Optic Fiber Wi-Fi',
                'Individual Split Air Conditioning',
                '43-inch 4K Smart TV',
                'Ensuite Bathroom with 24/7 Hot Water',
                'Daily Housekeeping'
              ]
            };
          });

          setRooms(groupedCards);
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
      .on('postgres_changes', { event: '*', schema: 'public', table: 'room_types' }, () => loadLiveInventory())
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
    const requestedCategory = formatRoomTypeName(data.roomCategory || 'Standard Room');

    // 1. Find an available physical room in the selected category from dbRooms
    let targetRoomNum = data.roomNumber;
    const roomPool = dbRooms || [];

    if (!targetRoomNum) {
      const catRooms = roomPool.filter(r => {
        const rCat = formatRoomTypeName(r.type || r.category || 'Standard Room').toLowerCase();
        const reqCat = requestedCategory.toLowerCase();
        return rCat === reqCat || rCat.includes(reqCat) || reqCat.includes(rCat);
      });
      const searchPool = catRooms.length > 0 ? catRooms : roomPool;

      // Prefer a room that is currently not OCCUPIED/MAINTENANCE and has no overlapping reservation
      const freeRoom = searchPool.find(r => {
        const isMaint = r.status === 'MAINTENANCE' || r.status === 'OUT_OF_ORDER' || r.status === 'BLOCKED';
        if (isMaint) return false;
        const rNum = String(r.room_number || r.roomNumber || r.id).trim();
        const hasOverlap = (reservations || []).some(res => {
          if (res.status === 'CANCELLED' || res.status === 'CHECKED_OUT') return false;
          const resRoom = String(res.room_number || res.room || '');
          const match = resRoom.match(/\b(\d+)\b/);
          const matchesThisRoom = (match && match[1] === rNum) || resRoom === rNum || resRoom.includes('Room ' + rNum);
          if (!matchesThisRoom) return false;
          return (new Date(data.checkIn) < new Date(res.check_out || res.checkOut) && new Date(data.checkOut) > new Date(res.check_in || res.checkIn));
        });
        if (hasOverlap) return false;
        if (r.status === 'OCCUPIED') return false;
        return true;
      }) || searchPool.find(r => {
        const rNum = String(r.room_number || r.roomNumber || r.id).trim();
        const hasOverlap = (reservations || []).some(res => {
          if (res.status === 'CANCELLED' || res.status === 'CHECKED_OUT') return false;
          const resRoom = String(res.room_number || res.room || '');
          const match = resRoom.match(/\b(\d+)\b/);
          const matchesThisRoom = (match && match[1] === rNum) || resRoom === rNum || resRoom.includes('Room ' + rNum);
          if (!matchesThisRoom) return false;
          return (new Date(data.checkIn) < new Date(res.check_out || res.checkOut) && new Date(data.checkOut) > new Date(res.check_in || res.checkIn));
        });
        return !hasOverlap;
      });

      targetRoomNum = freeRoom
        ? String(freeRoom.room_number || freeRoom.roomNumber)
        : String(searchPool[0]?.room_number || searchPool[0]?.roomNumber || '101');
    }

    const assignedRoom = roomPool.find(r => String(r.room_number || r.roomNumber) === String(targetRoomNum));
    const cleanCategoryName = formatRoomTypeName(assignedRoom?.type || assignedRoom?.category || requestedCategory);
    // Internal identifier stored in Supabase reservations so Admin PMS knows which physical room number is locked
    const internalAdminRoomLabel = `Room ${targetRoomNum} - ${cleanCategoryName}`;

    const newEnq = {
      id: bookingId,
      ...data,
      roomNumber: targetRoomNum,
      roomCategory: cleanCategoryName,
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
          room: internalAdminRoomLabel,
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

        // Lock the assigned physical room in Supabase so Admin immediately reflects it as Occupied
        // and the category available count decrements by 1
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

        // Optimistically decrement availableCount for this room category
        setRooms(prev => prev.map(r => {
          if (r.title.toLowerCase() === cleanCategoryName.toLowerCase()) {
            const nextAvailable = Math.max(0, (r.availableCount ?? 1) - 1);
            return {
              ...r,
              availableCount: nextAvailable,
              occupiedCount: (r.occupiedCount || 0) + 1,
              status: nextAvailable > 0 ? 'VACANT_READY' : 'OCCUPIED',
              isAvailable: nextAvailable > 0,
              badge: nextAvailable > 0 ? `${nextAvailable} Available` : 'Sold Out'
            };
          }
          return r;
        }));

        await loadLiveInventory();
      } catch (err) {
        console.warn('Supabase booking sync error:', err);
      }
    }

    showToast(`Reservation #${bookingId} confirmed! Your ${cleanCategoryName} has been reserved for your stay.`, 'success');
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
      const matchingRes = (reservations || []).find(r => r.id === bookingId);
      const matchingEnq = (bookingEnquiries || []).find(e => e.id === bookingId);
      const matchingDbRoom = (dbRooms || []).find(rm => rm.booking_id === bookingId);
      const rawRoomStr = matchingEnq?.roomNumber || matchingDbRoom?.room_number || matchingRes?.room_number || matchingRes?.room || roomIdentifier || '';
      const rMatch = String(rawRoomStr).match(/\b(\d+)\b/);

      // 1. Update Supabase reservations table
      if (isSupabaseConfigured) {
        await supabase
          .from('reservations')
          .update({ status: 'CANCELLED' })
          .eq('id', bookingId);

        // 2. Unlock and reset the physical room in Supabase rooms table
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

      // 3. Update local state & refresh inventory counts
      setReservations(prev => prev.map(r => r.id === bookingId ? { ...r, status: 'CANCELLED' } : r));
      setBookingEnquiries(prev => prev.map(enq => enq.id === bookingId ? { ...enq, status: 'Cancelled' } : enq));
      await loadLiveInventory();

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
        property: propertyInfo,
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
