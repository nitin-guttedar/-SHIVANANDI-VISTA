import React, { useState } from 'react';
import {
  Sparkles,
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
      <section className="bg-[#1C1917] text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80"
            alt="Contact SHIVANANDI VISTA"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917] via-[#1C1917]/80 to-black/60"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold-cream/10 border border-gold/30 text-gold-bright text-xs uppercase font-bold tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>24/7 Front Desk Support</span>
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
            Contact SHIVANANDI VISTA
          </h1>
          <p className="text-charcoal-300 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            We Would Love to Hear From You. Connect directly with our team for accommodation, tariffs, and directions.
          </p>
        </div>
      </section>

      {/* Main Grid: Details + Form */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Business Details Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="skeuo-plate p-6 sm:p-8 space-y-6 border border-surface-border">
              <div className="border-b border-surface-border pb-4">
                <span className="text-xs uppercase font-bold tracking-wider text-gold-dark bg-gold-cream px-2.5 py-0.5 rounded border border-gold/20">
                  Business Details
                </span>
                <h2 className="font-serif text-2xl font-bold text-charcoal mt-2">
                  SHIVANANDI VISTA
                </h2>
                <p className="text-xs text-charcoal-500">Hotel & Resort • Bengaluru</p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-charcoal-700">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gold-cream border border-gold/30 text-gold-dark flex items-center justify-center shrink-0 mt-0.5 shadow-skeuo-sm">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-charcoal block">Property Address</span>
                    <p className="text-charcoal-600 leading-relaxed mt-0.5">
                      {property.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gold-cream border border-gold/30 text-gold-dark flex items-center justify-center shrink-0 shadow-skeuo-sm">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-charcoal block">Phone Number</span>
                    <a href={`tel:${property.phoneRaw}`} className="text-charcoal-600 hover:text-gold-dark transition font-medium">
                      {property.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0 shadow-skeuo-sm">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-charcoal block">WhatsApp Reservation</span>
                    <button onClick={() => openWhatsApp()} className="text-emerald-700 hover:underline font-semibold">
                      {property.whatsapp} (Click to Chat)
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gold-cream border border-gold/30 text-gold-dark flex items-center justify-center shrink-0 shadow-skeuo-sm">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-charcoal block">Email Address</span>
                    <a href={`mailto:${property.email}`} className="text-charcoal-600 hover:text-gold-dark transition">
                      {property.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gold-cream border border-gold/30 text-gold-dark flex items-center justify-center shrink-0 shadow-skeuo-sm">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-charcoal block">Business Hours</span>
                    <span className="text-emerald-700 font-semibold">{property.hours}</span>
                  </div>
                </div>
              </div>

              {/* Direct Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={`tel:${property.phoneRaw}`}
                  className="flex-1 py-3 px-4 rounded-xl skeuo-btn-dark text-xs font-bold flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-gold-bright" />
                  <span>Call Us Now</span>
                </a>

                <button
                  onClick={() => openWhatsApp()}
                  className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Chat</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="skeuo-plate p-6 sm:p-10 border border-surface-border">
              <div className="border-b border-surface-border pb-4 mb-6">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
                  Send Us a Message
                </h2>
                <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
                  Have a question about accommodation, tariffs, group booking, or facilities? Submit your message below.
                </p>
              </div>

              {isSubmitted ? (
                <div className="p-8 rounded-xl bg-[#F6FBF8] border border-emerald-300 text-center space-y-4 animate-fadeIn">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-charcoal">
                    Thank You for Reaching Out
                  </h3>
                  <p className="text-xs sm:text-sm text-charcoal-600 max-w-md mx-auto leading-relaxed">
                    Your enquiry has been delivered to the SHIVANANDI VISTA management team. We will review your message and reply via phone or email shortly.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="skeuo-btn-gold px-6 py-2.5 rounded-xl text-xs font-bold"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
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
                        placeholder="e.g. Anand Sharma"
                        className="w-full px-3.5 py-2.5 rounded-xl skeuo-input text-xs sm:text-sm font-medium text-charcoal"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-charcoal mb-1.5">
                        Phone Number <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 99003 14686"
                        className="w-full px-3.5 py-2.5 rounded-xl skeuo-input text-xs sm:text-sm font-medium text-charcoal"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-charcoal mb-1.5">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="anand@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl skeuo-input text-xs sm:text-sm font-medium text-charcoal"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-charcoal mb-1.5">
                        Subject <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="e.g. Room enquiry / Group visit"
                        className="w-full px-3.5 py-2.5 rounded-xl skeuo-input text-xs sm:text-sm font-medium text-charcoal"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-charcoal mb-1.5">
                      Your Message <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please let us know how we can assist you..."
                      className="w-full px-3.5 py-2.5 rounded-xl skeuo-input text-xs sm:text-sm font-medium text-charcoal"
                      required
                    ></textarea>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 rounded-xl skeuo-btn-gold text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-gold-btn"
                    >
                      <Send className="w-4 h-4 text-charcoal-900" />
                      <span>Submit Enquiry</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* Embedded Interactive Map Section */}
        <div className="mt-16 skeuo-plate p-2.5 overflow-hidden shadow-skeuo-card">
          <div className="w-full h-80 rounded-xl overflow-hidden bg-surface-muted">
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
          <div className="p-3 text-xs text-charcoal-600 flex items-center justify-between">
            <span>Location: RD Greenwoods, Begur, BK Halli Post, Yelahanka Taluk, Bangalore – 562149</span>
            <a
              href={property.googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-dark font-bold hover:underline flex items-center gap-1"
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
