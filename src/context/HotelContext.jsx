import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
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
import { supabase, isSupabaseConfigured, supabaseUrl, supabaseAnonKey } from '../lib/supabase';

const PMS_API_URL = `${supabaseUrl}/functions/v1/pms-api`;

async function triggerOtaInventorySync({ hotelId, hotelCode, startDate, endDate }) {
  if (!hotelId) return;
  try {
    await fetch(PMS_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
        'x-aavasa-client': 'shivanandi-vista-guest'
      },
      body: JSON.stringify({
        action: 'push_ota_inventory',
        hotelId,
        ...(hotelCode ? { hotelCode } : {}),
        ...(startDate ? { startDate } : {}),
        ...(endDate ? { endDate } : {})
      })
    });
  } catch {
    // Non-blocking OTA sync
  }
}

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

  // Live Supabase database rooms, reservations, roomTypes, and active hotel tenant ID
  const [dbRooms, setDbRooms] = useState([]);
  const [dbRoomTypes, setDbRoomTypes] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [activeHotelId, setActiveHotelId] = useState(null);
  const [activeHotelCode, setActiveHotelCode] = useState('');
  const [isLiveSynced, setIsLiveSynced] = useState(false);
  const syncDebounceRef = useRef(null);

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
      const now = new Date();
      const todayStr = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().split('T')[0];
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

        // If marked OCCUPIED or RESERVED in dbRooms directly without a matching reservation row
        if (r.status === 'OCCUPIED' || r.status === 'RESERVED') {
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

  // Build category-grouped inventory cards for any [checkInDate, checkOutDate) window
  // (Blocks physical rooms reserved via Goibibo/MakeMyTrip/Booking.com/Direct for overlapping dates)
  const buildGroupedRoomsForDates = useCallback((rawRooms, rawRoomTypes, rawReservations, checkInDate = null, checkOutDate = null, hotelIdOverride = null) => {
    if (!Array.isArray(rawRooms) || rawRooms.length === 0) return [];

    const now = new Date();
    const todayStr = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().split('T')[0];
    const tomorrowStr = new Date(now.getTime() - now.getTimezoneOffset() * 60000 + 86400000).toISOString().split('T')[0];
    const winStart = String(checkInDate || todayStr).slice(0, 10);
    const winEnd = String(checkOutDate || tomorrowStr).slice(0, 10);
    const effectiveEnd = winEnd > winStart ? winEnd : tomorrowStr;
    const coversToday = winStart <= todayStr && effectiveEnd > todayStr;

    const categoryGroups = new Map();

    rawRooms.forEach((r) => {
      const rawType = r.type || r.category || 'Standard Room';
      const matchedRoomType = (rawRoomTypes || []).find(rt =>
        (r.room_type_id && rt.id === r.room_type_id) ||
        String(rt.name || '').trim().toLowerCase() === String(rawType).trim().toLowerCase() ||
        formatRoomTypeName(rt.name, rt.label).toLowerCase() === formatRoomTypeName(rawType).toLowerCase()
      );

      const canonicalTitle = formatRoomTypeName(matchedRoomType?.name || rawType, matchedRoomType?.label || 'Room');
      const groupKey = canonicalTitle.toLowerCase();
      const roomNum = String(r.room_number || '').trim();

      const overlappingRes = (rawReservations || []).find(res => {
        const st = String(res.status || '').toUpperCase();
        if (st === 'CANCELLED' || st === 'CHECKED_OUT' || st === 'NO_SHOW') return false;
        const resRoom = String(res.room_number || res.room || '');
        const matchNum = resRoom.match(/\b(\d+)\b/)?.[1] || '';
        const matches = (matchNum && matchNum === roomNum) || resRoom === roomNum || resRoom.includes('Room ' + roomNum);
        if (!matches) return false;
        const cIn = String(res.check_in || res.checkIn || '').slice(0, 10);
        const cOut = String(res.check_out || res.checkOut || '').slice(0, 10);
        return cIn && cOut && winStart < cOut && effectiveEnd > cIn;
      });

      const isMaintenance = r.status === 'MAINTENANCE' || r.status === 'OUT_OF_ORDER' || r.status === 'BLOCKED';
      const isOccupiedDirectly =
        (r.status === 'OCCUPIED' || r.status === 'RESERVED') &&
        (r.check_out ? winStart < String(r.check_out).slice(0, 10) && effectiveEnd > todayStr : coversToday);

      const isOccupied = Boolean(overlappingRes) || isOccupiedDirectly;
      const isAvailable = !isOccupied && !isMaintenance;

      if (!categoryGroups.has(groupKey)) {
        categoryGroups.set(groupKey, {
          canonicalTitle,
          matchedRoomType,
          hotelId: r.hotel_id || hotelIdOverride || null,
          physicalRooms: []
        });
      }

      categoryGroups.get(groupKey).physicalRooms.push({
        ...r,
        roomNum,
        isOccupied,
        isMaintenance,
        isAvailable,
        bookedUntil: overlappingRes?.check_out || r.check_out || null
      });
    });

    return Array.from(categoryGroups.values()).map((group, idx) => {
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
      const capacityText = maxAdults > 0 ? `Up to ${maxAdults} Guests` : (matchingInitial?.capacity || 'Up to 3 Guests');
      const areaSqft = Number(matchedRoomType?.area_sqft) || 0;
      const sizeText = areaSqft > 0 ? `${areaSqft} sq.ft` : (matchingInitial?.size || '320 sq.ft');
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
  }, []);

  const getRoomsForDates = useCallback((checkInDate, checkOutDate) => {
    return buildGroupedRoomsForDates(dbRooms, dbRoomTypes, reservations, checkInDate, checkOutDate, activeHotelId);
  }, [buildGroupedRoomsForDates, dbRooms, dbRoomTypes, reservations, activeHotelId]);

  // =========================================================================
  // LIVE SUPABASE INVENTORY & SCOPED REALTIME SUBSCRIPTION (Free-Plan Optimized)
  // =========================================================================
  const loadLiveInventory = useCallback(async () => {
    if (!isSupabaseConfigured) return;
    try {
      // Never fetch sensitive fields like password to the public website
      const hotelsRes = await supabase
        .from('hotels')
        .select('id, slug, name, short_name, logo_url, mobile, address, city, status, aiosell_hotel_code, created_at')
        .order('created_at', { ascending: false });

      const hotelsData = Array.isArray(hotelsRes?.data)
        ? hotelsRes.data.filter(h => String(h.id || '').toLowerCase() !== 'hotel_aurastay_01')
        : [];
      const urlHotelSlug =
        typeof window !== 'undefined'
          ? new URLSearchParams(window.location.search).get('hotel')?.trim().toLowerCase()
          : '';
      const activeHotel =
        (urlHotelSlug
          ? hotelsData.find(h => String(h.slug || h.id || '').trim().toLowerCase() === urlHotelSlug)
          : null) ||
        hotelsData.find(h => h.status === 'ACTIVE') ||
        hotelsData[0];

      const scopedHotelId = activeHotel?.id || null;
      if (!scopedHotelId) {
        setRooms([]);
        setDbRooms([]);
        return;
      }

      setActiveHotelId(scopedHotelId);
      setActiveHotelCode(activeHotel.aiosell_hotel_code || activeHotel.slug || scopedHotelId);
      setPropertyInfo(prev => ({
        ...prev,
        name: activeHotel.name || prev.name,
        phone: activeHotel.mobile || prev.phone,
        address: activeHotel.address || prev.address,
        city: activeHotel.city || prev.city
      }));

      // Scoped queries strictly for this hotel_id
      const [roomTypesRes, roomsRes, resRes] = await Promise.all([
        supabase.from('room_types').select('*').eq('hotel_id', scopedHotelId).order('created_at', { ascending: true }),
        supabase.from('rooms').select('*').eq('hotel_id', scopedHotelId).order('room_number'),
        supabase.from('reservations').select('id, hotel_id, guest, guest_email, guest_phone, room, room_number, room_type, check_in, check_out, amount, status, source, created_at').eq('hotel_id', scopedHotelId).order('created_at', { ascending: false })
      ]);

      const roomTypesData = Array.isArray(roomTypesRes?.data) ? roomTypesRes.data : [];
      const roomsData = Array.isArray(roomsRes?.data) ? roomsRes.data : [];
      const resData = Array.isArray(resRes?.data) ? resRes.data : [];

      setDbRoomTypes(roomTypesData);
      if (!resRes?.error) {
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

      if (!roomsRes?.error) {
        setDbRooms(roomsData);
        setIsLiveSynced(true);
        setRooms(buildGroupedRoomsForDates(roomsData, roomTypesData, resData, null, null, scopedHotelId));
      }
    } catch (err) {
      console.warn('Supabase live inventory sync warning:', err);
    }
  }, [buildGroupedRoomsForDates]);

  const scheduleInventoryRefresh = useCallback(() => {
    if (syncDebounceRef.current) clearTimeout(syncDebounceRef.current);
    syncDebounceRef.current = setTimeout(() => {
      loadLiveInventory();
    }, 250);
  }, [loadLiveInventory]);

  useEffect(() => {
    loadLiveInventory();
    // Free-Plan optimized 30s safety poll (Realtime triggers instant webhook refresh)
    const pollTimer = setInterval(() => {
      loadLiveInventory();
    }, 30000);
    return () => {
      clearInterval(pollTimer);
      if (syncDebounceRef.current) clearTimeout(syncDebounceRef.current);
    };
  }, [loadLiveInventory]);

  useEffect(() => {
    if (!isSupabaseConfigured) return;

    const filterOpt = activeHotelId ? { filter: `hotel_id=eq.${activeHotelId}` } : {};
    const channel = supabase.channel(`shivanandi_vista_realtime_${activeHotelId || 'init'}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'rooms', ...filterOpt }, scheduleInventoryRefresh)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'room_types', ...filterOpt }, scheduleInventoryRefresh)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'reservations', ...filterOpt }, scheduleInventoryRefresh)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'hotels' }, scheduleInventoryRefresh)
      .subscribe();

    const broadcastChannel = supabase.channel('aurastay_sync_broadcast')
      .on('broadcast', { event: 'webhook_update' }, (msg) => {
        if (activeHotelId && msg?.payload?.hotelId && String(msg.payload.hotelId) !== String(activeHotelId)) {
          return;
        }
        scheduleInventoryRefresh();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
      supabase.removeChannel(broadcastChannel);
    };
  }, [activeHotelId, scheduleInventoryRefresh]);

  // =========================================================================
  // LIVE BOOKING ENQUIRY & ANTI-DOUBLE-BOOKING SUPABASE RESERVATION CREATION
  // =========================================================================
  const addBookingEnquiry = async (data) => {
    const bookingId = `AST-B-${Math.floor(1000 + Math.random() * 9000)}`;
    const requestedCategory = formatRoomTypeName(data.roomCategory || 'Standard Room');
    const now = new Date();
    const todayStr = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().split('T')[0];
    const reqCheckIn = String(data.checkIn || todayStr).slice(0, 10);
    const reqCheckOut = String(data.checkOut || todayStr).slice(0, 10);
    const coversToday = reqCheckIn <= todayStr && reqCheckOut > todayStr;

    let roomPool = dbRooms || [];
    let liveReservations = reservations || [];
    const scopedHotel = activeHotelId || roomPool[0]?.hotel_id || null;

    // Live check directly against Supabase before inserting (catches millisecond-level OTA/Goibibo webhooks)
    if (isSupabaseConfigured && scopedHotel) {
      try {
        const [{ data: latestRooms }, { data: latestRes }] = await Promise.all([
          supabase.from('rooms').select('*').eq('hotel_id', scopedHotel).order('room_number'),
          supabase
            .from('reservations')
            .select('id, room_number, room, status, check_in, check_out')
            .eq('hotel_id', scopedHotel)
            .not('status', 'in', '(CANCELLED,CHECKED_OUT,NO_SHOW)')
        ]);
        if (Array.isArray(latestRooms) && latestRooms.length > 0) roomPool = latestRooms;
        if (Array.isArray(latestRes)) liveReservations = latestRes;
      } catch {
        // Use current synced state if network hiccups
      }
    }

    const catRooms = roomPool.filter(r => {
      const rCat = formatRoomTypeName(r.type || r.category || 'Standard Room').toLowerCase();
      const reqCat = requestedCategory.toLowerCase();
      return rCat === reqCat || rCat.includes(reqCat) || reqCat.includes(rCat);
    });
    const searchPool = catRooms.length > 0 ? catRooms : roomPool;

    const isRoomFree = (r) => {
      const st = String(r.status || 'VACANT_READY').toUpperCase();
      if (['MAINTENANCE', 'OUT_OF_ORDER', 'BLOCKED'].includes(st)) return false;
      const rNum = String(r.room_number || r.roomNumber || r.id).trim();
      const hasOverlap = liveReservations.some(res => {
        if (['CANCELLED', 'CHECKED_OUT', 'NO_SHOW'].includes(String(res.status || '').toUpperCase())) return false;
        const resRoom = String(res.room_number || res.room || '');
        const match = resRoom.match(/\b(\d+)\b/);
        const matchesThisRoom = (match && match[1] === rNum) || resRoom === rNum || resRoom.includes('Room ' + rNum);
        if (!matchesThisRoom) return false;
        const rIn = String(res.check_in || res.checkIn || '').slice(0, 10);
        const rOut = String(res.check_out || res.checkOut || '').slice(0, 10);
        return reqCheckIn < rOut && reqCheckOut > rIn;
      });
      if (hasOverlap) return false;
      if (st === 'OCCUPIED' || st === 'RESERVED') {
        if (r.check_out) {
          return !(reqCheckIn < String(r.check_out).slice(0, 10) && reqCheckOut > todayStr);
        }
        if (coversToday) return false;
      }
      return true;
    };

    let targetRoomNum = data.roomNumber;
    if (targetRoomNum) {
      const chosenRoom = searchPool.find(r => String(r.room_number || r.roomNumber) === String(targetRoomNum));
      if (chosenRoom && !isRoomFree(chosenRoom)) {
        targetRoomNum = null;
      }
    }

    if (!targetRoomNum) {
      const freeRoom = searchPool.find(isRoomFree);
      if (!freeRoom) {
        showToast(
          `Sorry, all ${requestedCategory}s are already reserved for ${reqCheckIn} to ${reqCheckOut} (including OTA/Goibibo channels). Please pick another date or room type.`,
          'error'
        );
        await loadLiveInventory();
        return null;
      }
      targetRoomNum = String(freeRoom.room_number || freeRoom.roomNumber);
    }

    const assignedRoom = roomPool.find(r => String(r.room_number || r.roomNumber) === String(targetRoomNum));
    const cleanCategoryName = formatRoomTypeName(assignedRoom?.type || assignedRoom?.category || requestedCategory);
    const internalAdminRoomLabel = `Room ${targetRoomNum} - ${cleanCategoryName}`;
    const resolvedHotelId = assignedRoom?.hotel_id || assignedRoom?.hotelId || activeHotelId || null;

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

    if (isSupabaseConfigured && resolvedHotelId) {
      try {
        const safePayload = {
          id: bookingId,
          hotel_id: resolvedHotelId,
          guest: data.fullName || user?.name || 'Verified Guest',
          guest_email: data.email || user?.email || null,
          guest_phone: data.phone || user?.phone || null,
          room: internalAdminRoomLabel,
          room_number: String(targetRoomNum),
          room_type: cleanCategoryName,
          check_in: reqCheckIn,
          check_out: reqCheckOut,
          amount: Number(data.estimatedTariff) || 2000,
          status: 'CONFIRMED',
          payment: 'PENDING',
          source: `Direct Website (${propertyInfo?.name || 'Shivanandi Vista'})`
        };

        const { error: insErr } = await supabase.from('reservations').insert(safePayload);
        if (insErr) {
          await supabase.from('reservations').insert({
            id: bookingId,
            hotel_id: resolvedHotelId,
            guest: safePayload.guest,
            guest_email: safePayload.guest_email,
            guest_phone: safePayload.guest_phone,
            room: internalAdminRoomLabel,
            check_in: reqCheckIn,
            check_out: reqCheckOut,
            amount: safePayload.amount,
            status: 'CONFIRMED',
            payment: 'PENDING',
            source: safePayload.source
          });
        }

        // Lock physical room as RESERVED immediately when stay covers today; transitions to OCCUPIED only when Admin checks guest in
        if (coversToday) {
          await supabase
            .from('rooms')
            .update({
              status: 'RESERVED',
              guest: safePayload.guest,
              booking_id: bookingId,
              check_out: reqCheckOut
            })
            .eq('hotel_id', resolvedHotelId)
            .eq('room_number', String(targetRoomNum));
        }

        await broadcastVistaSync({
          action: 'book',
          hotelId: resolvedHotelId,
          bookingId,
          guestName: safePayload.guest,
          roomNumber: String(targetRoomNum)
        });

        triggerOtaInventorySync({
          hotelId: resolvedHotelId,
          hotelCode: activeHotelCode,
          startDate: reqCheckIn,
          endDate: reqCheckOut
        });

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
        const cancelHotelId = matchingRes?.hotel_id || matchingDbRoom?.hotel_id || activeHotelId;
        let cancelQ = supabase
          .from('reservations')
          .update({ status: 'CANCELLED' })
          .eq('id', bookingId);
        if (cancelHotelId) {
          cancelQ = cancelQ.eq('hotel_id', cancelHotelId);
        }
        await cancelQ;

        // 2. Unlock physical room ONLY if this reservation currently holds it in this hotel
        if (cancelHotelId) {
          await supabase
            .from('rooms')
            .update({
              status: 'VACANT_READY',
              guest: null,
              booking_id: null,
              check_out: null,
              is_ota_locked: false,
              ota_channel: null
            })
            .eq('hotel_id', cancelHotelId)
            .eq('booking_id', bookingId);
        }

        await broadcastVistaSync({
          action: 'cancel',
          hotelId: cancelHotelId,
          bookingId
        });

        if (cancelHotelId) {
          triggerOtaInventorySync({
            hotelId: cancelHotelId,
            hotelCode: activeHotelCode,
            startDate: matchingRes?.check_in,
            endDate: matchingRes?.check_out
          });
        }
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
        getRoomsForDates,
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
