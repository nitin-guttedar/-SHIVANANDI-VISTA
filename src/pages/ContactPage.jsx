import React, { useState } from 'react';
import {
  Phone,
  MessageSquare,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Navigation
} from 'lucide-react';
import SEO from '../components/common/SEO';
import { useHotel } from '../context/HotelContext';

export default function ContactPage() {
  const { property, addContactEnquiry, openWhatsApp } = useHotel();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addContactEnquiry(formData);
    setIsSubmitted(true);
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <>
      <SEO
        title="Contact SHIVANANDI VISTA | Hotel & Resort Bengaluru"
        description="Contact SHIVANANDI VISTA hotel and resort in Begur, BK Halli Post, Yelahanka Taluk, Bengaluru. Call +91 99003 14686 or enquire on WhatsApp."
        keywords="Contact SHIVANANDI VISTA, Phone Number SHIVANANDI VISTA, Hotel in Yelahanka Contact, Begur BK Halli Hotel, Bangalore Airport Stay Contact"
        canonicalUrl="/contact-us"
      />

      {/* Header Banner */}
      <section className="bg-[#141210] text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80"
            alt="Contact SHIVANANDI VISTA"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141210] via-[#141210]/80 to-black/60"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-gold-light text-xs uppercase font-semibold tracking-widest mb-3 border border-white/10">
            24/7 Front Desk Support
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight mb-3">
            Contact SHIVANANDI VISTA
          </h1>
          <p className="text-obsidian-300 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
            We Would Love to Hear From You. Connect directly with our team for accommodation, tariffs, and directions.
          </p>
        </div>
      </section>

      {/* Main Grid: Details + Form */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Business Details Cards with Logo */}
          <div className="lg:col-span-5 space-y-5">
            <div className="minimal-card p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-3.5 border-b border-stone-200 pb-4">
                <img
                  src="/logo.jpg"
                  alt="SHIVANANDI VISTA Logo"
                  className="h-12 w-12 object-contain rounded-xl bg-white p-1 border border-stone-200"
                />
                <div>
                  <h2 className="font-serif text-xl font-bold text-obsidian">
                    SHIVANANDI VISTA
                  </h2>
                  <p className="text-xs text-obsidian-500">Hotel &bull; Bengaluru</p>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-obsidian-700">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gold-pale text-gold-dark flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-obsidian block">Property Address</span>
                    <p className="text-obsidian-600 leading-relaxed mt-0.5">
                      {property.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gold-pale text-gold-dark flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-obsidian block">Phone Number</span>
                    <a href={`tel:${property.phoneRaw}`} className="text-obsidian-600 hover:text-gold transition font-medium">
                      {property.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-obsidian block">WhatsApp Reservation</span>
                    <button onClick={() => openWhatsApp()} className="text-emerald-700 hover:underline font-semibold">
                      {property.whatsapp} (Click to Chat)
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gold-pale text-gold-dark flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-obsidian block">Email Address</span>
                    <a href={`mailto:${property.email}`} className="text-obsidian-600 hover:text-gold transition">
                      {property.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gold-pale text-gold-dark flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-obsidian block">Business Hours</span>
                    <span className="text-emerald-700 font-semibold">{property.hours}</span>
                  </div>
                </div>
              </div>

              {/* Direct Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <a
                  href={`tel:${property.phoneRaw}`}
                  className="flex-1 py-2.5 px-4 rounded-xl minimal-btn-dark text-xs font-semibold flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-gold-light" />
                  <span>Call Us Now</span>
                </a>

                <button
                  onClick={() => openWhatsApp()}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-center gap-2 transition"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Chat</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="minimal-card p-6 sm:p-8">
              <div className="border-b border-stone-200 pb-3 mb-6">
                <h2 className="font-serif text-2xl font-bold text-obsidian">
                  Send Us a Message
                </h2>
                <p className="text-xs text-obsidian-500 mt-1">
                  Have a question about accommodation, tariffs, group booking, or facilities? Submit your message below.
                </p>
              </div>

              {isSubmitted ? (
                <div className="p-8 rounded-xl bg-white border border-emerald-300 text-center space-y-3 animate-fadeIn">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-obsidian">
                    Thank You for Reaching Out
                  </h3>
                  <p className="text-xs text-obsidian-600 max-w-md mx-auto leading-relaxed">
                    Your enquiry has been delivered to the SHIVANANDI VISTA management team. We will review your message and reply via phone or email shortly.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="minimal-btn-gold px-5 py-2 text-xs font-semibold"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-obsidian mb-1">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g. Anand Sharma"
                        className="w-full px-3.5 py-2.5 rounded-xl minimal-input text-xs sm:text-sm text-obsidian"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-obsidian mb-1">
                        Phone Number <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 99003 14686"
                        className="w-full px-3.5 py-2.5 rounded-xl minimal-input text-xs sm:text-sm text-obsidian"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-obsidian mb-1">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="anand@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl minimal-input text-xs sm:text-sm text-obsidian"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-obsidian mb-1">
                        Subject <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="e.g. Room enquiry / Group visit"
                        className="w-full px-3.5 py-2.5 rounded-xl minimal-input text-xs sm:text-sm text-obsidian"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-obsidian mb-1">
                      Your Message <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please let us know how we can assist you..."
                      className="w-full px-3.5 py-2.5 rounded-xl minimal-input text-xs sm:text-sm text-obsidian"
                      required
                    ></textarea>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 px-6 rounded-xl minimal-btn-gold text-xs sm:text-sm font-semibold flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Enquiry</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* Embedded Interactive Map Section */}
        <div className="mt-12 minimal-card p-2 overflow-hidden">
          <div className="w-full h-80 rounded-xl overflow-hidden bg-stone-100">
            <iframe
              title="SHIVANANDI VISTA Location Map"
              src={property.googleMapsEmbed}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            ></iframe>
          </div>
          <div className="p-3 text-xs text-obsidian-600 flex items-center justify-between">
            <span>Location: RD Greenwoods, Begur, BK Halli Post, Yelahanka Taluk, Bangalore – 562149</span>
            <a
              href={property.googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-dark font-semibold hover:underline flex items-center gap-1"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Get Directions</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
