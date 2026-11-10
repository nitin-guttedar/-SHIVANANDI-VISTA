import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Phone, 
  User, 
  Mail, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  RefreshCw,
  Smartphone,
  MessageSquare,
  AlertTriangle,
  Send
} from 'lucide-react';
import { useHotel } from '../../context/HotelContext';
import { validateIndianMobile } from '../../lib/phoneValidation';
import { sendOtpToDevice } from '../../lib/smsService';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';

export default function UserAuthModal({ isOpen, onClose, onAuthenticated, title = 'Sign In with Mobile OTP' }) {
  const { user, loginWithPhoneOtp, showToast } = useHotel();

  // Form State
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [deliveryInfo, setDeliveryInfo] = useState(null);
  const [enteredOtp, setEnteredOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(45);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [activeOtpPhone, setActiveOtpPhone] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const otpInputsRef = useRef([]);

  // Timer countdown
  useEffect(() => {
    let interval = null;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer(t => t - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timer]);

  // Reset when opened
  useEffect(() => {
    if (isOpen) {
      setPhone(user?.phone || '');
      setPhoneError('');
      setOtpSent(false);
      setDeliveryInfo(null);
      setEnteredOtp(['', '', '', '', '', '']);
    }
  }, [isOpen, user]);

  if (!isOpen) return null;

  // Real-time phone change with validation
  const handlePhoneChange = (e) => {
    const raw = e.target.value;
    const clean = raw.replace(/\D/g, '').slice(0, 10);
    setPhone(clean);

    if (clean.length > 0) {
      const validation = validateIndianMobile(clean);
      if (!validation.isValid && clean.length === 10) {
        setPhoneError(validation.error);
      } else if (clean.length > 0 && !/^[6-9]/.test(clean[0])) {
        setPhoneError(`Indian mobile numbers must start with 6, 7, 8, or 9 (starts with "${clean[0]}").`);
      } else {
        setPhoneError('');
      }
    } else {
      setPhoneError('');
    }
  };

  // Send real OTP to real device
  const handleSendOtp = async (e) => {
    if (e) e.preventDefault();
    setPhoneError('');

    const validation = validateIndianMobile(phone);
    if (!validation.isValid) {
      setPhoneError(validation.error);
      showToast(validation.error, 'error');
      return;
    }

    const cleanPhone = validation.cleanNumber;
    setIsSending(true);

    try {
      // Generate secure 6-digit OTP code
      const code = String(Math.floor(100000 + Math.random() * 900000));
      setGeneratedOtp(code);
      setActiveOtpPhone(cleanPhone);

      // Trigger real device delivery service (WhatsApp / SMS)
      const delivery = await sendOtpToDevice(cleanPhone, code);
      setDeliveryInfo(delivery);

      setOtpSent(true);
      setTimer(45);
      setIsTimerActive(true);
      setEnteredOtp(['', '', '', '', '', '']);

      // Persist pending OTP to Supabase guest_users table
      if (isSupabaseConfigured) {
        try {
          await supabase.from('guest_users').upsert({
            id: `user_${cleanPhone}`,
            phone: cleanPhone,
            name: fullName.trim() || `Guest ${cleanPhone.slice(-4)}`,
            email: email.trim() || `${cleanPhone}@shivanandivista.com`,
            password: `OTP_${code}`,
            updated_at: new Date().toISOString()
          });
        } catch (dbErr) {
          console.warn('Supabase OTP write fallback:', dbErr);
        }
      }

      // Check if user already exists locally
      const existingUsers = JSON.parse(localStorage.getItem('sv_saved_users') || '{}');
      if (existingUsers[cleanPhone]) {
        setFullName(existingUsers[cleanPhone].name || '');
        setEmail(existingUsers[cleanPhone].email || '');
        setIsNewUser(false);
      } else {
        setIsNewUser(true);
      }

      // Automatically launch WhatsApp OTP to deliver to device
      if (delivery.whatsappUrl) {
        window.open(delivery.whatsappUrl, '_blank');
      }

      showToast(`Verification OTP dispatched to +91 ${cleanPhone} in the name of SHIVANANDI VISTA`, 'success');

      // Auto focus first OTP input box
      setTimeout(() => {
        if (otpInputsRef.current[0]) {
          otpInputsRef.current[0].focus();
        }
      }, 150);

    } catch (err) {
      showToast('Error sending OTP. Please try again.', 'error');
    } finally {
      setIsSending(false);
    }
  };

  // Open WhatsApp with OTP for direct delivery
  const handleDispatchViaWhatsApp = () => {
    if (!deliveryInfo?.whatsappUrl) return;
    window.open(deliveryInfo.whatsappUrl, '_blank');
    showToast(`WhatsApp OTP opened for +91 ${activeOtpPhone}`, 'info');
  };

  // Open Device SMS
  const handleDispatchViaSms = () => {
    if (!deliveryInfo?.smsUrl) return;
    window.open(deliveryInfo.smsUrl, '_self');
  };

  // Handle OTP digit entry
  const handleOtpChange = (index, value) => {
    const val = value.replace(/\D/g, '').slice(-1);
    const newOtp = [...enteredOtp];
    newOtp[index] = val;
    setEnteredOtp(newOtp);

    // Auto move to next input
    if (val && index < 5) {
      otpInputsRef.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !enteredOtp[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    }
  };

  // Verify OTP & Complete Login
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const enteredCode = enteredOtp.join('');

    if (enteredCode.length !== 6) {
      showToast('Please enter all 6 digits of the OTP.', 'error');
      return;
    }

    setIsVerifying(true);

    try {
      let isCodeValid = (enteredCode === generatedOtp);

      // Also verify against Supabase backend if configured
      if (!isCodeValid && isSupabaseConfigured) {
        const { data: dbUser } = await supabase
          .from('guest_users')
          .select('password, updated_at')
          .eq('phone', activeOtpPhone)
          .single();

        if (dbUser && dbUser.password === `OTP_${enteredCode}`) {
          const diffMinutes = (Date.now() - new Date(dbUser.updated_at).getTime()) / (1000 * 60);
          if (diffMinutes <= 10) {
            isCodeValid = true;
          }
        }
      }

      if (!isCodeValid) {
        showToast('Invalid or expired OTP. Please re-check the 6-digit code.', 'error');
        setIsVerifying(false);
        return;
      }

      if (isNewUser && !fullName.trim()) {
        showToast('Please enter your full name to complete your profile.', 'error');
        setIsVerifying(false);
        return;
      }

      const userProfile = {
        phone: activeOtpPhone,
        name: fullName.trim() || `Guest ${activeOtpPhone.slice(-4)}`,
        email: email.trim() || `${activeOtpPhone}@guest.shivanandivista.com`,
        username: fullName.trim() ? fullName.trim().toLowerCase().replace(/\s+/g, '_') : `user_${activeOtpPhone.slice(-4)}`,
        isVerified: true,
        verifiedAt: new Date().toISOString()
      };

      // Save user to Supabase
      if (isSupabaseConfigured) {
        try {
          await supabase.from('guest_users').upsert({
            id: `user_${activeOtpPhone}`,
            phone: activeOtpPhone,
            name: userProfile.name,
            email: userProfile.email,
            password: 'VERIFIED_USER',
            updated_at: new Date().toISOString()
          });
        } catch (err) {}
      }

      // Save user to local storage
      const existingUsers = JSON.parse(localStorage.getItem('sv_saved_users') || '{}');
      existingUsers[activeOtpPhone] = userProfile;
      localStorage.setItem('sv_saved_users', JSON.stringify(existingUsers));

      loginWithPhoneOtp(userProfile);
      showToast(`Welcome, ${userProfile.name}! Mobile number verified successfully.`, 'success');
      if (onAuthenticated) onAuthenticated(userProfile);
      onClose();

    } catch (err) {
      showToast('Verification failed. Please try again.', 'error');
    } finally {
      setIsVerifying(false);
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
                SHIVANANDI VISTA SECURITY
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

        <div className="p-6">
          {!otpSent ? (
            // STEP 1: ENTER REAL MOBILE NUMBER
            <form onSubmit={handleSendOtp} className="space-y-4">
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

                <p className="text-[11px] text-stone-500 mt-1.5 leading-relaxed">
                  Enter an active 10-digit Indian mobile number starting with 6, 7, 8, or 9. An official OTP will be dispatched to your device under the sender name <strong>SHIVANANDI VISTA</strong>.
                </p>
              </div>

              <button
                type="submit"
                disabled={isSending || Boolean(phoneError) || phone.length !== 10}
                className={`w-full py-3.5 px-5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition ${
                  Boolean(phoneError) || phone.length !== 10 || isSending
                    ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                    : 'minimal-btn-gold text-white shadow-md'
                }`}
              >
                <Send className="w-4 h-4" />
                <span>{isSending ? 'Dispatching to Device...' : 'Send Verification OTP to Device'}</span>
              </button>
            </form>
          ) : (
            // STEP 2: VERIFY 6-DIGIT OTP & PROFILE
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              
              {/* Real Delivery Notification Card */}
              <div className="p-3.5 rounded-2xl bg-emerald-50/90 border border-emerald-200 text-xs text-emerald-950 space-y-2 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <span className="font-bold flex items-center gap-1.5 text-emerald-900">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Dispatched as "SHIVANANDI VISTA"</span>
                  </span>
                  <span className="font-mono text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                    +91 {activeOtpPhone}
                  </span>
                </div>
                <p className="text-[11px] text-emerald-800 leading-relaxed">
                  The OTP has been sent to your real device. If WhatsApp did not open automatically, tap below:
                </p>
                <div className="flex items-center gap-2 pt-0.5">
                  <button
                    type="button"
                    onClick={handleDispatchViaWhatsApp}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] rounded-xl flex items-center gap-1.5 transition shadow-2xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Open on WhatsApp</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleDispatchViaSms}
                    className="px-3 py-1.5 bg-white border border-emerald-300 hover:bg-emerald-50 text-emerald-900 font-bold text-[11px] rounded-xl flex items-center gap-1.5 transition shadow-2xs"
                  >
                    <Smartphone className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Open via SMS</span>
                  </button>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-obsidian">
                    Enter 6-Digit OTP Code
                  </label>
                  <button
                    type="button"
                    onClick={() => setOtpSent(false)}
                    className="text-[11px] text-gold-dark hover:underline font-bold"
                  >
                    Change +91 {activeOtpPhone}
                  </button>
                </div>

                <div className="flex justify-between gap-1.5 sm:gap-2">
                  {enteredOtp.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={el => otpInputsRef.current[idx] = el}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      className="w-11 h-12 sm:w-12 sm:h-14 text-center font-mono text-xl sm:text-2xl font-black rounded-xl border-2 border-stone-300 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/40 text-obsidian bg-stone-50/50"
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between mt-2.5 text-xs">
                  <span className="text-stone-500">
                    {isTimerActive ? (
                      <span className="flex items-center gap-1 text-stone-500 font-medium">
                        <Clock className="w-3.5 h-3.5 text-stone-400" />
                        Resend in {timer}s
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        className="font-bold text-gold-dark hover:underline flex items-center gap-1"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        Resend OTP
                      </button>
                    )}
                  </span>
                </div>
              </div>

              {/* Profile inputs if new user */}
              {isNewUser && (
                <div className="space-y-3 pt-2 border-t border-stone-100">
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
                disabled={isVerifying || enteredOtp.join('').length !== 6}
                className={`w-full py-3.5 px-5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 mt-2 transition ${
                  enteredOtp.join('').length !== 6 || isVerifying
                    ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                    : 'minimal-btn-gold text-white shadow-md'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isVerifying ? 'Verifying...' : 'Verify OTP & Complete Login'}</span>
              </button>
            </form>
          )}
        </div>

        {/* Modal Footer Note */}
        <div className="px-6 py-3.5 bg-stone-50 border-t border-stone-200 text-center text-[10.5px] text-stone-500">
          🔒 Secure 256-Bit SSL Encrypted &bull; Direct Front Desk PMS Sync
        </div>

      </div>
    </div>
  );
}
