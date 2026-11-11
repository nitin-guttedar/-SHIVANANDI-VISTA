import React, { useState, useEffect } from 'react';
import { 
  X, 
  Phone, 
  User, 
  Mail, 
  Lock,
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  AlertTriangle,
  KeyRound
} from 'lucide-react';
import { useHotel } from '../../context/HotelContext';
import { validateIndianMobile } from '../../lib/phoneValidation';
import { 
  lookupGuestByPhone, 
  authenticateWithPhone, 
  authenticateWithEmailPassword 
} from '../../lib/supabaseAuthService';
import { isSupabaseConfigured } from '../../lib/supabase';

export default function UserAuthModal({ isOpen, onClose, onAuthenticated, title = 'Guest Sign In & Registration' }) {
  const { user, loginWithPhoneOtp, showToast } = useHotel();

  // Active Tab: 'phone' | 'email'
  const [authMode, setAuthMode] = useState('phone');

  // Phone Form State
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [isExistingGuest, setIsExistingGuest] = useState(false);
  const [isLookingUp, setIsLookingUp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Email / Password Form State
  const [emailAuthMode, setEmailAuthMode] = useState('login'); // 'login' | 'signup'
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [authPhone, setAuthPhone] = useState('');
  const [authError, setAuthError] = useState('');

  // Reset when opened
  useEffect(() => {
    if (isOpen) {
      setPhone(user?.phone || '');
      setPhoneError('');
      setFullName(user?.name || '');
      setEmail(user?.email || '');
      setIsExistingGuest(false);
      setAuthError('');
    }
  }, [isOpen, user]);

  if (!isOpen) return null;

  // Real-time phone check against Supabase
  const handlePhoneChange = async (e) => {
    const raw = e.target.value;
    const clean = raw.replace(/\D/g, '').slice(0, 10);
    setPhone(clean);

    if (clean.length > 0) {
      const validation = validateIndianMobile(clean);
      if (!validation.isValid && clean.length === 10) {
        setPhoneError(validation.error);
        setIsExistingGuest(false);
        return;
      } else if (clean.length > 0 && !/^[6-9]/.test(clean[0])) {
        setPhoneError(`Indian mobile numbers must start with 6, 7, 8, or 9 (starts with "${clean[0]}").`);
        setIsExistingGuest(false);
        return;
      } else {
        setPhoneError('');
      }
    } else {
      setPhoneError('');
      setIsExistingGuest(false);
      return;
    }

    // When 10 valid digits are typed, check Supabase guest_users
    if (clean.length === 10) {
      setIsLookingUp(true);
      try {
        const guest = await lookupGuestByPhone(clean);
        if (guest) {
          setIsExistingGuest(true);
          setFullName(guest.name || '');
          setEmail(guest.email || '');
        } else {
          setIsExistingGuest(false);
        }
      } catch (err) {
        setIsExistingGuest(false);
      } finally {
        setIsLookingUp(false);
      }
    }
  };

  // Submit Phone Sign In / Registration to Supabase
  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    setPhoneError('');

    const validation = validateIndianMobile(phone);
    if (!validation.isValid) {
      setPhoneError(validation.error);
      showToast(validation.error, 'error');
      return;
    }

    if (!isExistingGuest && !fullName.trim()) {
      setPhoneError('Please enter your full name to complete registration.');
      return;
    }

    setIsSubmitting(true);

    try {
      const userProfile = await authenticateWithPhone({
        phone: validation.cleanNumber,
        name: fullName.trim() || `Guest ${validation.cleanNumber.slice(-4)}`,
        email: email.trim()
      });

      loginWithPhoneOtp(userProfile);
      showToast(`Welcome, ${userProfile.name}! Signed in successfully.`, 'success');
      if (onAuthenticated) onAuthenticated(userProfile);
      onClose();

    } catch (err) {
      setPhoneError(err.message || 'Authentication failed. Please try again.');
      showToast(err.message || 'Authentication failed', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Submit Email & Password via Supabase Auth
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    setIsSubmitting(true);

    try {
      const isSignUp = emailAuthMode === 'signup';
      const profile = await authenticateWithEmailPassword(
        authEmail,
        authPassword,
        isSignUp,
        {
          name: authName.trim() || authEmail.split('@')[0],
          phone: authPhone.replace(/\D/g, '').slice(-10)
        }
      );

      loginWithPhoneOtp(profile);
      showToast(`Welcome, ${profile.name}! Signed in successfully.`, 'success');
      if (onAuthenticated) onAuthenticated(profile);
      onClose();

    } catch (err) {
      setAuthError(err.message || 'Authentication failed. Please check credentials.');
      showToast(err.message || 'Authentication failed', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Main Modal Card */}
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-stone-200 overflow-hidden relative">
        
        {/* Header Bar */}
        <div className="bg-[#141210] text-white px-6 py-5 flex items-center justify-between relative">
          <div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-gold" />
              <span className="text-[10px] tracking-[0.2em] font-bold uppercase text-gold">
                SHIVANANDI VISTA GUEST PORTAL
              </span>
            </div>
            <h2 className="font-serif text-xl font-bold text-white mt-0.5">
              {title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-stone-200 bg-stone-50 text-xs font-bold text-stone-600">
          <button
            type="button"
            onClick={() => setAuthMode('phone')}
            className={`flex-1 py-3 text-center transition flex items-center justify-center gap-1.5 border-b-2 ${
              authMode === 'phone'
                ? 'border-gold text-obsidian bg-white'
                : 'border-transparent hover:text-obsidian'
            }`}
          >
            <Phone className="w-3.5 h-3.5 text-gold" />
            <span>Mobile Sign In</span>
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('email')}
            className={`flex-1 py-3 text-center transition flex items-center justify-center gap-1.5 border-b-2 ${
              authMode === 'email'
                ? 'border-gold text-obsidian bg-white'
                : 'border-transparent hover:text-obsidian'
            }`}
          >
            <Mail className="w-3.5 h-3.5 text-gold" />
            <span>Email & Password</span>
          </button>
        </div>

        <div className="p-6">
          {authMode === 'phone' ? (
            // ===============================================================
            // TAB 1: PHONE SIGN IN / REGISTRATION POWERED BY SUPABASE
            // ===============================================================
            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-obsidian mb-1.5">
                  Mobile Number <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-xs font-bold text-stone-600">
                    <span>🇮🇳</span>
                    <span>+91</span>
                    <span className="text-stone-300">|</span>
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="98450 12345"
                    maxLength={10}
                    className={`w-full pl-20 pr-4 py-3 rounded-xl border text-sm font-semibold tracking-wide text-obsidian placeholder-stone-400 focus:outline-none focus:ring-2 ${
                      phoneError 
                        ? 'border-rose-400 bg-rose-50/20 focus:ring-rose-400' 
                        : 'border-stone-300 focus:ring-gold/60'
                    }`}
                    autoFocus
                    required
                  />
                </div>

                {/* Validation Error Banner */}
                {phoneError && (
                  <div className="mt-2 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-[11px] leading-relaxed flex items-start gap-1.5 animate-in fade-in">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>{phoneError}</span>
                  </div>
                )}

                {/* Looking up status */}
                {isLookingUp && (
                  <div className="mt-2 text-[11px] text-stone-500 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-gold animate-ping" />
                    <span>Finding your guest account...</span>
                  </div>
                )}

                {/* Returning guest badge */}
                {isExistingGuest && !phoneError && (
                  <div className="mt-2.5 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-[11.5px] text-emerald-900 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <span className="font-bold">Welcome back, {fullName}!</span>
                      <span className="text-emerald-700 block text-[10.5px]">
                        Your guest profile is ready for quick sign-in.
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* If new guest or guest wants to edit their name */}
              {(!isExistingGuest || !fullName) && phone.length === 10 && !phoneError && (
                <div className="space-y-3 pt-2 border-t border-stone-100 animate-in fade-in">
                  <div>
                    <label className="block text-xs font-bold text-obsidian mb-1">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Ramesh Sharma"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-stone-300 text-xs font-semibold text-obsidian focus:outline-none focus:ring-2 focus:ring-gold/60"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-obsidian mb-1">
                      Email Address (Optional)
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. ramesh@example.com"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-stone-300 text-xs font-semibold text-obsidian focus:outline-none focus:ring-2 focus:ring-gold/60"
                      />
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || Boolean(phoneError) || phone.length !== 10}
                className={`w-full py-3.5 px-5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition ${
                  Boolean(phoneError) || phone.length !== 10 || isSubmitting
                    ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                    : 'minimal-btn-gold text-white shadow-md'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {isSubmitting 
                    ? 'Signing in...' 
                    : isExistingGuest 
                    ? `Sign In as ${fullName || 'Guest'}` 
                    : 'Register & Continue'}
                </span>
              </button>

              <p className="text-[11px] text-stone-500 text-center leading-relaxed">
                Direct booking advantage with best rates guaranteed and 24/7 front desk support.
              </p>
            </form>
          ) : (
            // ===============================================================
            // TAB 2: EMAIL & PASSWORD (SUPABASE AUTH)
            // ===============================================================
            <form onSubmit={handleEmailSubmit} className="space-y-3.5">
              {authError && (
                <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-[11px] flex items-start gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{authError}</span>
                </div>
              )}

              {emailAuthMode === 'signup' && (
                <div>
                  <label className="block text-xs font-bold text-obsidian mb-1">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={authName}
                      onChange={(e) => setAuthName(e.target.value)}
                      placeholder="e.g. Ramesh Sharma"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-gold/60"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-obsidian mb-1">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    placeholder="guest@example.com"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-gold/60"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-obsidian mb-1">
                  Password <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-gold/60"
                    required
                  />
                </div>
              </div>

              {emailAuthMode === 'signup' && (
                <div>
                  <label className="block text-xs font-bold text-obsidian mb-1">
                    Mobile Number (Optional)
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={authPhone}
                      onChange={(e) => setAuthPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="98450 12345"
                      maxLength={10}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-gold/60"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-5 rounded-xl text-xs font-bold minimal-btn-gold text-white shadow-md flex items-center justify-center gap-2 mt-2 transition"
              >
                <KeyRound className="w-4 h-4" />
                <span>
                  {isSubmitting 
                    ? 'Processing...' 
                    : emailAuthMode === 'signup' 
                    ? 'Create Account' 
                    : 'Sign In with Email'}
                </span>
              </button>

              <div className="text-center pt-2 text-xs text-stone-500">
                {emailAuthMode === 'signup' ? (
                  <span>
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setEmailAuthMode('login')}
                      className="text-gold-dark font-bold hover:underline"
                    >
                      Sign In
                    </button>
                  </span>
                ) : (
                  <span>
                    New guest?{' '}
                    <button
                      type="button"
                      onClick={() => setEmailAuthMode('signup')}
                      className="text-gold-dark font-bold hover:underline"
                    >
                      Create Account
                    </button>
                  </span>
                )}
              </div>
            </form>
          )}
        </div>

        {/* Modal Footer Note */}
        <div className="px-6 py-3.5 bg-stone-50 border-t border-stone-200 text-center text-[10.5px] text-stone-500 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Official Guest Portal &bull; 24/7 Front Desk Support</span>
        </div>

      </div>
    </div>
  );
}
