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

const HotelContext = createContext(null);

export function HotelProvider({ children }) {
  // Rooms state with local persistence
  const [rooms, setRooms] = useState(() => {
    const saved = localStorage.getItem('sv_rooms');
    return saved ? JSON.parse(saved) : INITIAL_ROOMS;
  });

  // Blog posts state
  const [blogPosts, setBlogPosts] = useState(() => {
    const saved = localStorage.getItem('sv_blogs');
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
        status: 'New',
        createdAt: '2026-11-04 14:32'
      },
      {
        id: 'ENQ-1002',
        fullName: 'Sunil Kumar',
        phone: '+91 98860 54321',
        email: 'sunil.k@techcorp.com',
        checkIn: '2026-11-18',
        checkOut: '2026-11-19',
        adults: 1,
        children: 0,
        roomCategory: 'Transit Comfort Deluxe',
        specialRequests: 'Late night arrival around 1:30 AM flight. Need airport cab pickup.',
        status: 'Contacted',
        createdAt: '2026-11-05 09:15'
      }
    ];
  });

  // Contact enquiries
  const [contactEnquiries, setContactEnquiries] = useState(() => {
    const saved = localStorage.getItem('sv_contact_enquiries');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'CNT-2001',
        fullName: 'Dr. Meenakshi',
        phone: '+91 94480 87654',
        email: 'meenakshi.d@hospital.org',
        subject: 'Family Group Stay Enquiry for 12 Guests',
        message: 'Hello team, we are planning a family reunion in December. Can you provide rates for multiple rooms and catering options?',
        status: 'New',
        createdAt: '2026-11-05 11:20'
      }
    ];
  });

  // Admin auth state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('sv_admin_auth') === 'true';
  });

  // Toast message
  const [toast, setToast] = useState(null);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('sv_rooms', JSON.stringify(rooms));
  }, [rooms]);

  useEffect(() => {
    localStorage.setItem('sv_blogs', JSON.stringify(blogPosts));
  }, [blogPosts]);

  useEffect(() => {
    localStorage.setItem('sv_booking_enquiries', JSON.stringify(bookingEnquiries));
  }, [bookingEnquiries]);

  useEffect(() => {
    localStorage.setItem('sv_contact_enquiries', JSON.stringify(contactEnquiries));
  }, [contactEnquiries]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const addBookingEnquiry = (data) => {
    const newEnq = {
      id: `ENQ-${Date.now().toString().slice(-4)}`,
      ...data,
      status: 'New',
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16)
    };
    setBookingEnquiries(prev => [newEnq, ...prev]);
    showToast('Your booking enquiry has been submitted successfully! Our team will contact you shortly.', 'success');
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
        blogPosts,
        amenities: AMENITIES_LIST,
        nearbyLocations: NEARBY_LOCATIONS,
        faqs: FAQS_LIST,
        gallery: GALLERY_IMAGES,
        testimonials: TESTIMONIALS,
        bookingEnquiries,
        contactEnquiries,
        isAdminLoggedIn,
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

