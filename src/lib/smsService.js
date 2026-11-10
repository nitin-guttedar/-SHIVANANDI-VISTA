/**
 * Realtime SMS & WhatsApp OTP Delivery Service for SHIVANANDI VISTA
 * Delivers official verification OTP to the user's real device under the name "SHIVANANDI VISTA"
 */

export async function sendOtpToDevice(phoneNumber, otpCode) {
  const cleanPhone = String(phoneNumber).replace(/\D/g, '').slice(-10);
  const hotelName = "SHIVANANDI VISTA";

  const formattedMsg = `*${hotelName} - BENGALURU*\n\nYour official one-time verification code is: *${otpCode}*\n\nValid for 10 minutes. Use this OTP to confirm your room reservation at ${hotelName}. Do not share this code with anyone.`;
  const smsBody = `${hotelName}: Your verification OTP is ${otpCode}. Valid for 10 minutes.`;

  const deliveryPayload = {
    phone: cleanPhone,
    code: otpCode,
    smsSent: false,
    provider: 'Direct Realtime Channel',
    whatsappUrl: `https://api.whatsapp.com/send?phone=91${cleanPhone}&text=${encodeURIComponent(formattedMsg)}`,
    smsUrl: `sms:+91${cleanPhone}?body=${encodeURIComponent(smsBody)}`
  };

  // 1. Fast2SMS Telecom Cellular Gateway (if key configured)
  const fast2SmsKey = import.meta.env.VITE_FAST2SMS_API_KEY;
  if (fast2SmsKey) {
    try {
      const response = await fetch('https://www.fast2sms.com/dev/bulkV2', {
        method: 'POST',
        headers: {
          'authorization': fast2SmsKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          route: 'otp',
          variables_values: otpCode,
          numbers: cleanPhone
        })
      });
      const data = await response.json();
      if (data && data.return) {
        deliveryPayload.smsSent = true;
        deliveryPayload.provider = 'Fast2SMS Telecom Gateway';
        return deliveryPayload;
      }
    } catch (err) {
      console.warn('Fast2SMS gateway error:', err);
    }
  }

  // 2. 2Factor Telecom Cellular Gateway (if key configured)
  const twoFactorKey = import.meta.env.VITE_2FACTOR_API_KEY;
  if (twoFactorKey) {
    try {
      const response = await fetch(`https://2factor.in/API/V1/${twoFactorKey}/SMS/+91${cleanPhone}/${otpCode}/SHIVANANDI+VISTA`);
      const data = await response.json();
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
