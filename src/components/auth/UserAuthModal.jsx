import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Phone, 
  KeyRound, 
  User, 
  Mail, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  RefreshCw,
  UserCheck,
  Smartphone
} from 'lucide-react';
import { useHotel } from '../../context/HotelContext';

export default function UserAuthModal({ isOpen, onClose, onAuthenticated, title = 'Sign In or Continue as Guest' }) {
  const { user, loginWithPhoneOtp, loginAsGuest, showToast } = useHotel();

  // Tab: 'phone' or 'guest'
  const [activeTab, setActiveTab] = useState('phone');

  // Phone OTP Flow State
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [simulatedSms, setSimulatedSms] = useState(null);

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

  if (!isOpen) return null;

  // Handle Send OTP
  const handleSendOtp = (e) => {
    if (e) e.preventDefault();
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      showToast('Please enter a valid 10-digit mobile number.', 'error');
      return;
    }

    // Generate realistic 4-digit OTP
    const code = String(Math.floor(1000 + Math.random() * 9000));
    setGeneratedOtp(code);
    setOtpSent(true);
    setTimer(30);
    setIsTimerActive(true);
    setEnteredOtp(['', '', '', '']);

    // Check if phone was saved before
    const existingUsers = JSON.parse(localStorage.getItem('sv_saved_users') || '{}');
    if (existingUsers[cleanPhone]) {
      setFullName(existingUsers[cleanPhone].name || '');
      setEmail(existingUsers[cleanPhone].email || '');
      setIsNewUser(false);
    } else {
      setIsNewUser(true);
    }

    // Show simulated SMS banner
    setSimulatedSms({
      phone: cleanPhone,
      code
    });

    showToast(`SMS Verification Code sent to +91 ${cleanPhone.slice(-10)}`, 'success');

    // Focus first OTP field
    setTimeout(() => {
      if (otpInputsRef.current[0]) {
        otpInputsRef.current[0].focus();
      }
    }, 150);
  };

  // Handle OTP digit entry
  const handleOtpChange = (index, value) => {
    const val = value.replace(/\D/g, '').slice(-1);
    const newOtp = [...enteredOtp];
    newOtp[index] = val;
    setEnteredOtp(newOtp);

    // Auto move to next input
    if (val && index < 3) {
      otpInputsRef.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !enteredOtp[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    }
  };

  // Verify OTP & complete login
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const enteredCode = enteredOtp.join('');
    if (enteredCode !== generatedOtp) {
      showToast('Incorrect OTP. Please enter the 4-digit code shown in the SMS banner.', 'error');
      return;
    }

    if (isNewUser && !fullName.trim()) {
      showToast('Please enter your full name to complete profile setup.', 'error');
      return;
    }

    const cleanPhone = phone.replace(/\D/g, '');
    const userProfile = {
      phone: cleanPhone,
      name: fullName.trim() || `User ${cleanPhone.slice(-4)}`,
      email: email.trim() || `${cleanPhone}@guest.shivanandivista.com`,
      username: fullName.trim() ? fullName.trim().toLowerCase().replace(/\s+/g, '_') : `user_${cleanPhone.slice(-4)}`,
      isGuest: false,
      loginMethod: 'phone_otp',
      loggedInAt: new Date().toISOString()
    };

    // Save to user directory
    const existingUsers = JSON.parse(localStorage.getItem('sv_saved_users') || '{}');
    existingUsers[cleanPhone] = userProfile;
    localStorage.setItem('sv_saved_users', JSON.stringify(existingUsers));

    loginWithPhoneOtp(userProfile);
    showToast(`Welcome, ${userProfile.name}! Logged in successfully.`, 'success');
    if (onAuthenticated) onAuthenticated(userProfile);
    onClose();
  };

  // Handle Express Guest Login
  const handleContinueAsGuest = () => {
    const guestUser = loginAsGuest();
    showToast(`Continuing as Guest (${guestUser.guestId})`, 'success');
    if (onAuthenticated) onAuthenticated(guestUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* SMS Simulation Banner (Realistic Booking.com / Goibibo SMS Toast) */}
      {simulatedSms && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-60 max-w-md w-[92%] bg-[#1E293B] text-white p-3.5 rounded-2xl shadow-2xl border border-sky-400/40 flex items-center justify-between gap-3 animate-in slide-in-from-top-4 duration-300">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-sky-400 uppercase tracking-wider">
                SMS from SHIVANANDI VISTA
              </div>
              <div className="text-xs font-semibold text-slate-100 mt-0.5">
                Your verification code is: <span className="font-mono text-base font-black text-amber-300">{simulatedSms.code}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              const digits = simulatedSms.code.split('');
              setEnteredOtp(digits);
              showToast('OTP auto-filled!', 'info');
            }}
            className="px-2.5 py-1 bg-sky-500 hover:bg-sky-400 text-slate-900 text-xs font-extrabold rounded-lg shrink-0 transition"
          >
            Auto-fill
          </button>
        </div>
      )}

      {/* Main Modal Card */}
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-stone-200 overflow-hidden relative">
        
        {/* Header Bar */}
        <div className="bg-[#141210] text-white px-6 py-5 flex items-center justify-between relative">
          <div>
            <span className="text-[10px] tracking-[0.2em] font-bold uppercase text-gold">
              SHIVANANDI VISTA AUTHENTICATION
            </span>
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

        {/* Auth Method Selector Tabs */}
        <div className="grid grid-cols-2 p-1.5 bg-stone-100 border-b border-stone-200 text-xs font-bold">
          <button
            onClick={() => setActiveTab('phone')}
            className={`py-2.5 rounded-xl transition flex items-center justify-center gap-2 ${
              activeTab === 'phone'
                ? 'bg-white text-obsidian shadow-xs'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <Phone className="w-3.5 h-3.5 text-gold" />
            <span>Mobile Phone (OTP)</span>
          </button>

          <button
            onClick={() => setActiveTab('guest')}
            className={`py-2.5 rounded-xl transition flex items-center justify-center gap-2 ${
              activeTab === 'guest'
                ? 'bg-white text-obsidian shadow-xs'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Guest Checkout</span>
          </button>
        </div>

        <div className="p-6">
          {/* TAB 1: PHONE OTP LOGIN */}
          {activeTab === 'phone' && (
            <div className="space-y-5">
              {!otpSent ? (
                // Step 1: Enter Phone Number
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-obsidian mb-1.5">
                      Enter Mobile Number
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
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        placeholder="98765 43210"
                        className="w-full pl-20 pr-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-gold/60 text-sm font-semibold tracking-wide text-obsidian placeholder-stone-400"
                        autoFocus
                        required
                      />
                    </div>
                    <p className="text-[11px] text-stone-500 mt-1.5 leading-relaxed">
                      We'll send a 4-digit OTP to verify your mobile number. Standard carrier rates apply.
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-5 rounded-xl minimal-btn-gold text-xs font-bold flex items-center justify-center gap-2"
                  >
                    <span>Get Verification Code</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                // Step 2: Enter OTP & Profile Info
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-bold text-obsidian">
                        Enter 4-Digit Code
                      </label>
                      <button
                        type="button"
                        onClick={() => setOtpSent(false)}
                        className="text-[11px] text-gold-dark hover:underline font-bold"
                      >
                        Change +91 {phone}
                      </button>
                    </div>

                    <div className="flex justify-between gap-3">
                      {enteredOtp.map((digit, idx) => (
                        <input
                          key={idx}
                          ref={el => otpInputsRef.current[idx] = el}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(idx, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                          className="w-14 h-14 text-center font-mono text-2xl font-black rounded-xl border-2 border-stone-300 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/40 text-obsidian bg-stone-50/50"
                        />
                      ))}
                    </div>

                    <div className="flex items-center justify-between mt-2.5 text-xs">
                      <span className="text-stone-500">
                        {isTimerActive ? (
                          <span className="flex items-center gap-1 text-stone-500 font-medium">
                            <Clock className="w-3.5 h-3.5 text-stone-400" />
                            Resend OTP in {timer}s
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

                      {generatedOtp && (
                        <button
                          type="button"
                          onClick={() => setEnteredOtp(generatedOtp.split(''))}
                          className="text-[11px] text-sky-600 hover:text-sky-700 font-bold"
                        >
                          Fill Code ({generatedOtp})
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Profile inputs if new user */}
                  {isNewUser && (
                    <div className="space-y-3 pt-2 border-t border-stone-100">
                      <div>
                        <label className="block text-xs font-bold text-obsidian mb-1">
                          Your Full Name <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="e.g. Shashikant Panchal"
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
                            placeholder="e.g. shashi@example.com"
                            className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-stone-300 text-xs font-semibold text-obsidian focus:outline-none focus:ring-2 focus:ring-gold/60"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3.5 px-5 rounded-xl minimal-btn-gold text-xs font-bold flex items-center justify-center gap-2 mt-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Verify & Continue</span>
                  </button>
                </form>
              )}
            </div>
          )}

          {/* TAB 2: EXPRESS GUEST CHECKOUT */}
          {activeTab === 'guest' && (
            <div className="space-y-4 text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                <ShieldCheck className="w-7 h-7" />
              </div>

              <div className="space-y-1">
                <h3 className="font-serif text-lg font-bold text-obsidian">
                  Express Guest Booking
                </h3>
                <p className="text-xs text-stone-600 max-w-xs mx-auto leading-relaxed">
                  No password or verification code required. We will assign you a secure unique Guest Reference ID to manage your reservation.
                </p>
              </div>

              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 text-left text-xs space-y-1.5">
                <div className="font-bold text-obsidian flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-gold" />
                  <span>Guest Benefits:</span>
                </div>
                <ul className="text-stone-600 space-y-1 pl-4 list-disc text-[11.5px]">
                  <li>Instant one-click checkout without waiting for SMS</li>
                  <li>Permanent Guest ID assigned (e.g. <span className="font-mono font-bold text-stone-800">GST_7492A</span>)</li>
                  <li>Look up booking status anytime from "My Bookings"</li>
                </ul>
              </div>

              <button
                type="button"
                onClick={handleContinueAsGuest}
                className="w-full py-3.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition shadow-md"
              >
                <UserCheck className="w-4 h-4" />
                <span>Continue as Guest Now</span>
              </button>
            </div>
          )}

        </div>

        {/* Modal Footer Note */}
        <div className="px-6 py-3.5 bg-stone-50 border-t border-stone-200 text-center text-[10.5px] text-stone-500">
          🔒 Secure 256-Bit SSL Encrypted &bull; Direct Front Desk Sync
        </div>

      </div>
    </div>
  );
}
