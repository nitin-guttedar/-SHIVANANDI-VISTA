/**
 * Realtime SMS & WhatsApp OTP Delivery Service for SHIVANANDI VISTA
 * Delivers official verification OTP directly to the user's mobile device under the name "SHIVANANDI VISTA"
 */

const DEFAULT_FAST2SMS_KEY = 'F46rS06weTNwpkl5d6gFyx6MGwEw4EIIw6OLp0ldZcFqhDJLsjHLvpQ8220wgCq242drEHXcQFeTM3Tx';

export async function sendOtpToDevice(phoneNumber, otpCode) {
  const cleanPhone = String(phoneNumber).replace(/\D/g, '').slice(-10);
  const hotelName = "SHIVANANDI VISTA";

  const formattedMsg = `*${hotelName} - BENGALURU*\n\nYour official room reservation verification code is: *${otpCode}*\n\nValid for 10 minutes. Use this OTP to confirm your booking at ${hotelName}. Do not share this code with anyone.`;
  const smsBody = `${hotelName}: Your verification OTP is ${otpCode}. Valid for 10 minutes.`;

  const deliveryPayload = {
    phone: cleanPhone,
    code: otpCode,
    smsSent: false,
    provider: 'Direct Realtime Channel',
    message: null,
    errorCode: null,
    errorMessage: null,
    whatsappUrl: `https://api.whatsapp.com/send?phone=91${cleanPhone}&text=${encodeURIComponent(formattedMsg)}`,
    smsUrl: `sms:+91${cleanPhone}?body=${encodeURIComponent(smsBody)}`
  };

  // 1. Fast2SMS Telecom Cellular Gateway
  const fast2SmsKey = import.meta.env.VITE_FAST2SMS_API_KEY || DEFAULT_FAST2SMS_KEY;

  if (fast2SmsKey) {
    try {
      // Attempt 1: Fast2SMS Dedicated OTP Route
      const otpRes = await fetch('https://www.fast2sms.com/dev/bulkV2', {
        method: 'POST',
        headers: {
          'authorization': fast2SmsKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          route: 'otp',
          variables_values: String(otpCode),
          numbers: cleanPhone
        })
      });

      const otpData = await otpRes.json().catch(() => null);

      if (otpData && otpData.return === true) {
        deliveryPayload.smsSent = true;
        deliveryPayload.provider = 'Fast2SMS Telecom Cellular Gateway';
        deliveryPayload.message = `SMS successfully dispatched to +91 ${cleanPhone} via Fast2SMS`;
        return deliveryPayload;
      }

      // Record any diagnostic info from OTP route
      if (otpData) {
        deliveryPayload.errorCode = otpData.status_code || null;
        deliveryPayload.errorMessage = otpData.message || null;
      }

      // Attempt 2: Fast2SMS Quick SMS Route (with hotel name in text)
      const qRes = await fetch('https://www.fast2sms.com/dev/bulkV2', {
        method: 'POST',
        headers: {
          'authorization': fast2SmsKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          route: 'q',
          message: `${hotelName}: Your verification OTP is ${otpCode}. Valid for 10 minutes.`,
          language: 'english',
          flash: 0,
          numbers: cleanPhone
        })
      });

      const qData = await qRes.json().catch(() => null);

      if (qData && qData.return === true) {
        deliveryPayload.smsSent = true;
        deliveryPayload.provider = 'Fast2SMS Quick Telecom Gateway';
        deliveryPayload.message = `SMS successfully dispatched to +91 ${cleanPhone} via Fast2SMS`;
        return deliveryPayload;
      }

      if (qData && !deliveryPayload.errorMessage) {
        deliveryPayload.errorCode = qData.status_code || null;
        deliveryPayload.errorMessage = qData.message || null;
      }

    } catch (err) {
      console.warn('Fast2SMS gateway error:', err);
      deliveryPayload.errorMessage = err.message || 'Network error reaching SMS gateway';
    }
  }

  // 2. 2Factor Telecom Gateway fallback (if configured)
  const twoFactorKey = import.meta.env.VITE_2FACTOR_API_KEY;
  if (twoFactorKey && !deliveryPayload.smsSent) {
    try {
      const response = await fetch(`https://2factor.in/API/V1/${twoFactorKey}/SMS/+91${cleanPhone}/${otpCode}/SHIVANANDI+VISTA`);
      const data = await response.json().catch(() => null);
      if (data && data.Status === 'Success') {
        deliveryPayload.smsSent = true;
        deliveryPayload.provider = '2Factor Telecom Gateway';
        return deliveryPayload;
      }
    } catch (err) {
      console.warn('2Factor gateway error:', err);
    }
  }

  return deliveryPayload;
}
