import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  LogOut,
  Calendar,
  MessageSquare,
  Hotel,
  BookOpen,
  FileText,
  Search,
  CheckCircle2,
  Clock,
  Trash2,
  Edit3,
  Plus,
  Phone,
  Mail,
  ExternalLink,
  Sparkles,
  Users
} from 'lucide-react';
import SEO from '../components/common/SEO';
import { useHotel } from '../context/HotelContext';

export default function AdminPage() {
  const {
    property,
    rooms,
    blogPosts,
    bookingEnquiries,
    contactEnquiries,
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin,
    updateBookingStatus,
    updateContactStatus,
    updateRoom,
    addBlogPost,
    deleteBlogPost,
    showToast
  } = useHotel();

  const [passwordInput, setPasswordInput] = useState('');
  const [activeTab, setActiveTab] = useState('bookings'); // bookings | contacts | rooms | blogs | seo
  const [bookingFilter, setBookingFilter] = useState('All');

  // Room edit modal state
  const [editingRoom, setEditingRoom] = useState(null);

  // New blog post state
  const [showAddBlog, setShowAddBlog] = useState(false);
  const [newBlog, setNewBlog] = useState({
    title: '',
    slug: '',
    category: 'Airport Travel Information',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=1000&q=80',
    excerpt: '',
    content: ''
  });

  const handleLogin = (e) => {
    e.preventDefault();
    loginAdmin(passwordInput);
    setPasswordInput('');
  };

  const filteredBookings = bookingFilter === 'All'
    ? bookingEnquiries
    : bookingEnquiries.filter(b => b.status === bookingFilter);

  // WhatsApp reply to guest
  const replyToGuestViaWhatsApp = (enquiry) => {
    const cleanPhone = enquiry.phone.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(
      `Hello ${enquiry.fullName}, this is the reservations team at SHIVANANDI VISTA regarding your enquiry (Ref: ${enquiry.id}) for the ${enquiry.roomCategory} from ${enquiry.checkIn} to ${enquiry.checkOut}. We are pleased to confirm availability and discuss booking details.`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
  };

  const handleSaveRoom = (e) => {
    e.preventDefault();
    if (editingRoom) {
      updateRoom(editingRoom);
      setEditingRoom(null);
    }
  };

  const handleSaveNewBlog = (e) => {
    e.preventDefault();
    if (!newBlog.title || !newBlog.slug) {
      showToast('Please provide a Title and Slug for the article.', 'error');
      return;
    }
    const fullPost = {
      ...newBlog,
      id: newBlog.slug,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      author: 'Hospitality Desk'
    };
    addBlogPost(fullPost);
    setShowAddBlog(false);
    setNewBlog({
      title: '',
      slug: '',
      category: 'Airport Travel Information',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=1000&q=80',
      excerpt: '',
      content: ''
    });
  };

  // If not logged in, show secure login card
  if (!isAdminLoggedIn) {
    return (
      <>
        <SEO title="Admin Login | SHIVANANDI VISTA" />
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-alabaster">
          <div className="max-w-md w-full skeuo-plate p-8 sm:p-10 border border-gold/40 shadow-skeuo-elevated text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2D2723] to-[#1C1917] border border-gold/50 shadow-gold-btn mx-auto flex items-center justify-center text-gold-bright">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h1 className="font-serif text-2xl font-bold text-charcoal">
                SHIVANANDI VISTA CMS
              </h1>
              <p className="text-xs text-charcoal-500">
                Hospitality Administration & Enquiry Portal
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-charcoal mb-1.5">
                  Administrative Password
                </label>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter admin password (e.g. vista2026)"
                  className="w-full px-3.5 py-2.5 rounded-xl skeuo-input text-xs sm:text-sm font-medium text-charcoal"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl skeuo-btn-gold text-xs font-bold flex items-center justify-center gap-2 shadow-gold-btn"
              >
                <ShieldCheck className="w-4 h-4 text-charcoal-900" />
                <span>Sign In to Admin Panel</span>
              </button>
            </form>

            <div className="pt-2 text-[11px] text-charcoal-500">
              Default password: <code className="bg-surface-muted px-1.5 py-0.5 rounded font-mono text-gold-dark font-bold">vista2026</code>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO title="Admin Management Portal | SHIVANANDI VISTA" />

      {/* Top Admin Bar */}
      <div className="bg-[#1C1917] text-white border-b border-[#38332E] py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gold text-charcoal-900 flex items-center justify-center font-bold font-serif text-sm">
              SV
            </div>
            <div>
              <span className="font-serif font-bold text-base text-white">
                SHIVANANDI VISTA Admin Panel
              </span>
              <span className="text-[10px] text-emerald-400 block font-mono">
                System Active &bull; Yelahanka Property
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={logoutAdmin}
              className="px-3.5 py-1.5 rounded-lg bg-surface-muted/10 hover:bg-surface-muted/20 border border-white/20 text-xs font-semibold text-charcoal-300 hover:text-white flex items-center gap-1.5 transition"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard Subnav & Stats */}
      <div className="bg-alabaster-200 border-b border-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <nav className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            <button
              onClick={() => setActiveTab('bookings')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition ${activeTab === 'bookings'
                  ? 'skeuo-btn-gold'
                  : 'bg-surface-muted text-charcoal-700 hover:bg-surface-hover'
                }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Bookings ({bookingEnquiries.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('contacts')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition ${activeTab === 'contacts'
                  ? 'skeuo-btn-gold'
                  : 'bg-surface-muted text-charcoal-700 hover:bg-surface-hover'
                }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Contact Messages ({contactEnquiries.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('rooms')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition ${activeTab === 'rooms'
                  ? 'skeuo-btn-gold'
                  : 'bg-surface-muted text-charcoal-700 hover:bg-surface-hover'
                }`}
            >
              <Hotel className="w-3.5 h-3.5" />
              <span>Manage Rooms ({rooms.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('blogs')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition ${activeTab === 'blogs'
                  ? 'skeuo-btn-gold'
                  : 'bg-surface-muted text-charcoal-700 hover:bg-surface-hover'
                }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Travel Blog ({blogPosts.length})</span>
            </button>
          </nav>

          <div className="flex items-center gap-2 text-xs text-charcoal-500">
            <Clock className="w-3.5 h-3.5 text-gold" />
            <span>Local Time: {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* TAB 1: BOOKING ENQUIRIES */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-bold text-charcoal">
                  Direct Stay & Room Enquiries
                </h2>
                <p className="text-xs text-charcoal-500">
                  Review incoming guest reservation requests, update booking status, and follow up instantly.
                </p>
              </div>

              {/* Status Filters */}
              <div className="flex items-center gap-1.5 text-xs">
                {['All', 'New', 'Contacted', 'Confirmed', 'Cancelled'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setBookingFilter(st)}
                    className={`px-3 py-1.5 rounded-lg font-bold transition ${bookingFilter === st
                        ? 'bg-charcoal text-white'
                        : 'bg-surface-muted text-charcoal-600 hover:bg-surface-hover'
                      }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {filteredBookings.length === 0 ? (
              <div className="skeuo-plate p-12 text-center text-charcoal-500 text-sm">
                No booking enquiries found for the selected filter.
              </div>
            ) : (
              <div className="space-y-4">
                {filteredBookings.map((enq) => (
                  <div
                    key={enq.id}
                    className="skeuo-plate p-5 sm:p-6 border border-surface-border hover:border-gold/40 transition space-y-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-surface-border pb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-gold-dark bg-gold-cream px-2.5 py-1 rounded border border-gold/30">
                          {enq.id}
                        </span>
                        <h3 className="font-serif font-bold text-lg text-charcoal">
                          {enq.fullName}
                        </h3>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${enq.status === 'New' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                            enq.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                              enq.status === 'Contacted' ? 'bg-sky-100 text-sky-800 border border-sky-300' :
                                'bg-zinc-100 text-zinc-600'
                          }`}>
                          {enq.status}
                        </span>
                      </div>

                      <div className="text-xs text-charcoal-500">
                        Received: {enq.createdAt}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-charcoal-700">
                      <div>
                        <span className="text-charcoal-500 block mb-0.5">Stay Dates:</span>
                        <span className="font-semibold text-charcoal">{enq.checkIn} to {enq.checkOut}</span>
                      </div>

                      <div>
                        <span className="text-charcoal-500 block mb-0.5">Requested Room:</span>
                        <span className="font-semibold text-charcoal">{enq.roomCategory}</span>
                      </div>

                      <div>
                        <span className="text-charcoal-500 block mb-0.5">Guests:</span>
                        <span className="font-semibold text-charcoal">{enq.adults} Adults, {enq.children || 0} Children</span>
                      </div>

                      <div>
                        <span className="text-charcoal-500 block mb-0.5">Contact:</span>
                        <span className="font-semibold text-charcoal">{enq.phone}</span>
                      </div>
                    </div>

                    {enq.specialRequests && (
                      <div className="p-3 rounded-lg bg-surface-muted/60 text-xs text-charcoal-600 border border-surface-border">
                        <span className="font-bold text-charcoal mr-1">Special Notes:</span>
                        {enq.specialRequests}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-surface-border">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-charcoal-500 font-semibold">Change Status:</span>
                        <select
                          value={enq.status}
                          onChange={(e) => updateBookingStatus(enq.id, e.target.value)}
                          className="px-2.5 py-1 rounded-lg skeuo-input text-xs font-semibold text-charcoal"
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => replyToGuestViaWhatsApp(enq)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>WhatsApp Reply</span>
                        </button>

                        <a
                          href={`tel:${enq.phone.replace(/[^0-9+]/g, '')}`}
                          className="px-3 py-1.5 rounded-lg bg-charcoal hover:bg-charcoal-800 text-white text-xs font-bold flex items-center gap-1.5 transition"
                        >
                          <Phone className="w-3.5 h-3.5 text-gold-bright" />
                          <span>Call Guest</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: CONTACT INQUIRIES */}
        {activeTab === 'contacts' && (
          <div className="space-y-6">
            <h2 className="font-serif text-2xl font-bold text-charcoal">
              General Contact Messages
            </h2>

            {contactEnquiries.length === 0 ? (
              <div className="skeuo-plate p-12 text-center text-charcoal-500 text-sm">
                No contact messages logged yet.
              </div>
            ) : (
              <div className="space-y-4">
                {contactEnquiries.map((cnt) => (
                  <div key={cnt.id} className="skeuo-plate p-6 space-y-3">
                    <div className="flex justify-between items-center border-b border-surface-border pb-3">
                      <div>
                        <span className="font-mono text-xs font-bold text-gold-dark bg-gold-cream px-2 py-0.5 rounded">
                          {cnt.id}
                        </span>
                        <span className="font-serif font-bold text-charcoal text-base ml-2">
                          {cnt.fullName}
                        </span>
                      </div>
                      <span className="text-xs text-charcoal-500">{cnt.createdAt}</span>
                    </div>

                    <div className="text-xs text-charcoal-600 space-y-1">
                      <p><strong>Subject:</strong> {cnt.subject}</p>
                      <p><strong>Email:</strong> {cnt.email} &bull; <strong>Phone:</strong> {cnt.phone}</p>
                      <div className="p-3 bg-surface-muted/50 rounded-lg text-charcoal mt-2 leading-relaxed">
                        {cnt.message}
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end gap-2">
                      <a
                        href={`mailto:${cnt.email}?subject=RE: ${encodeURIComponent(cnt.subject)}`}
                        className="px-3 py-1.5 rounded-lg skeuo-btn-dark text-xs font-bold flex items-center gap-1.5"
                      >
                        <Mail className="w-3.5 h-3.5 text-gold-bright" />
                        <span>Reply by Email</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: MANAGE ROOMS */}
        {activeTab === 'rooms' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl font-bold text-charcoal">
                  Room Inventory & Tariff Manager
                </h2>
                <p className="text-xs text-charcoal-500">
                  Update published room rates, bed configurations, badges, and features.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {rooms.map((room) => (
                <div key={room.id} className="skeuo-plate p-6 space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-serif font-bold text-xl text-charcoal">
                          {room.title}
                        </h3>
                        <span className="text-xs text-gold-dark font-semibold">{room.category}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-serif text-xl font-bold text-charcoal">
                          ₹{room.pricePerNight?.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] text-charcoal-500 block">/ night</span>
                      </div>
                    </div>

                    <p className="text-xs text-charcoal-600 leading-relaxed">
                      {room.shortDesc}
                    </p>

                    <div className="text-xs text-charcoal-600 space-y-1 pt-2 border-t border-surface-border">
                      <div><strong>Bed:</strong> {room.bed}</div>
                      <div><strong>Capacity:</strong> {room.capacity}</div>
                      <div><strong>Size:</strong> {room.size}</div>
                      {room.badge && <div><strong>Badge:</strong> {room.badge}</div>}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-surface-border flex justify-end">
                    <button
                      onClick={() => setEditingRoom(room)}
                      className="px-4 py-2 rounded-xl skeuo-btn-gold text-xs font-bold flex items-center gap-1.5"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-charcoal-900" />
                      <span>Edit Room Details</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Room Edit Modal */}
            {editingRoom && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-alabaster rounded-2xl max-w-lg w-full p-6 sm:p-8 skeuo-plate border border-gold/40 shadow-skeuo-elevated space-y-4 max-h-[90vh] overflow-y-auto">
                  <h3 className="font-serif text-2xl font-bold text-charcoal">
                    Edit {editingRoom.title}
                  </h3>

                  <form onSubmit={handleSaveRoom} className="space-y-4 text-xs">
                    <div>
                      <label className="block font-bold text-charcoal mb-1">Room Title</label>
                      <input
                        type="text"
                        value={editingRoom.title}
                        onChange={(e) => setEditingRoom({ ...editingRoom, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl skeuo-input"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-charcoal mb-1">Tariff (₹ / night)</label>
                        <input
                          type="number"
                          value={editingRoom.pricePerNight}
                          onChange={(e) => setEditingRoom({ ...editingRoom, pricePerNight: Number(e.target.value) })}
                          className="w-full px-3 py-2 rounded-xl skeuo-input"
                          required
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-charcoal mb-1">Badge (Optional)</label>
                        <input
                          type="text"
                          value={editingRoom.badge || ''}
                          onChange={(e) => setEditingRoom({ ...editingRoom, badge: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl skeuo-input"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-charcoal mb-1">Bedding</label>
                        <input
                          type="text"
                          value={editingRoom.bed}
                          onChange={(e) => setEditingRoom({ ...editingRoom, bed: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl skeuo-input"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-charcoal mb-1">Capacity</label>
                        <input
                          type="text"
                          value={editingRoom.capacity}
                          onChange={(e) => setEditingRoom({ ...editingRoom, capacity: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl skeuo-input"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-charcoal mb-1">Short Description</label>
                      <textarea
                        rows="3"
                        value={editingRoom.shortDesc}
                        onChange={(e) => setEditingRoom({ ...editingRoom, shortDesc: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl skeuo-input"
                      ></textarea>
                    </div>

                    <div className="pt-2 flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setEditingRoom(null)}
                        className="px-4 py-2 rounded-xl bg-surface-muted text-charcoal font-bold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl skeuo-btn-gold font-bold"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: BLOG & TRAVEL GUIDES */}
        {activeTab === 'blogs' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl font-bold text-charcoal">
                  Travel Blog & Destination Guides
                </h2>
                <p className="text-xs text-charcoal-500">
                  Manage published articles for SEO and local authority.
                </p>
              </div>

              <button
                onClick={() => setShowAddBlog(true)}
                className="px-4 py-2 rounded-xl skeuo-btn-gold text-xs font-bold flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4 text-charcoal-900" />
                <span>Write New Article</span>
              </button>
            </div>

            {/* Articles List */}
            <div className="space-y-4">
              {blogPosts.map((post) => (
                <div key={post.id} className="skeuo-plate p-5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-16 h-14 object-cover rounded-lg shrink-0"
                    />
                    <div>
                      <span className="text-[10px] font-bold uppercase text-gold-dark bg-gold-cream px-2 py-0.5 rounded">
                        {post.category}
                      </span>
                      <h4 className="font-serif font-bold text-sm sm:text-base text-charcoal mt-1 line-clamp-1">
                        {post.title}
                      </h4>
                      <div className="text-[11px] text-charcoal-500 mt-0.5">
                        {post.date} &bull; {post.readTime}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-surface-muted text-charcoal hover:text-gold transition"
                      title="View Article"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>

                    <button
                      onClick={() => deleteBlogPost(post.id)}
                      className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition"
                      title="Delete Article"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Blog Modal */}
            {showAddBlog && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-alabaster rounded-2xl max-w-xl w-full p-6 sm:p-8 skeuo-plate border border-gold/40 shadow-skeuo-elevated space-y-4 max-h-[90vh] overflow-y-auto">
                  <h3 className="font-serif text-2xl font-bold text-charcoal">
                    Create New Travel Guide
                  </h3>

                  <form onSubmit={handleSaveNewBlog} className="space-y-3.5 text-xs">
                    <div>
                      <label className="block font-bold text-charcoal mb-1">Article Title</label>
                      <input
                        type="text"
                        value={newBlog.title}
                        onChange={(e) => {
                          const title = e.target.value;
                          const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                          setNewBlog({ ...newBlog, title, slug });
                        }}
                        placeholder="e.g. 5 Must-Try Restaurants Near Yelahanka"
                        className="w-full px-3 py-2 rounded-xl skeuo-input"
                        required
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-charcoal mb-1">URL Slug</label>
                      <input
                        type="text"
                        value={newBlog.slug}
                        onChange={(e) => setNewBlog({ ...newBlog, slug: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl skeuo-input font-mono"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-charcoal mb-1">Category</label>
                        <select
                          value={newBlog.category}
                          onChange={(e) => setNewBlog({ ...newBlog, category: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl skeuo-input"
                        >
                          <option value="Airport Travel Information">Airport Travel Information</option>
                          <option value="Yelahanka Travel Guide">Yelahanka Travel Guide</option>
                          <option value="Devanahalli Attractions">Devanahalli Attractions</option>
                          <option value="Sightseeing & Nature">Sightseeing & Nature</option>
                          <option value="Hotel & Accommodation Tips">Hotel & Accommodation Tips</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-bold text-charcoal mb-1">Featured Image URL</label>
                        <input
                          type="url"
                          value={newBlog.image}
                          onChange={(e) => setNewBlog({ ...newBlog, image: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl skeuo-input"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-charcoal mb-1">Short Excerpt (Meta Description)</label>
                      <textarea
                        rows="2"
                        value={newBlog.excerpt}
                        onChange={(e) => setNewBlog({ ...newBlog, excerpt: e.target.value })}
                        placeholder="Short summary for Google and article cards..."
                        className="w-full px-3 py-2 rounded-xl skeuo-input"
                        required
                      ></textarea>
                    </div>

                    <div>
                      <label className="block font-bold text-charcoal mb-1">Article Content (Markdown supported)</label>
                      <textarea
                        rows="6"
                        value={newBlog.content}
                        onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                        placeholder="Write detailed paragraphs. Use ### for subheadings..."
                        className="w-full px-3 py-2 rounded-xl skeuo-input font-mono"
                        required
                      ></textarea>
                    </div>

                    <div className="pt-2 flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setShowAddBlog(false)}
                        className="px-4 py-2 rounded-xl bg-surface-muted text-charcoal font-bold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl skeuo-btn-gold font-bold"
                      >
                        Publish Article
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </>
  );
}
