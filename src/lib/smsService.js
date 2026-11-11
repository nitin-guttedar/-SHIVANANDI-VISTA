/**
 * Deprecated: Fast2SMS and Telecom OTP gateways have been replaced with direct Supabase authentication.
 * See: src/lib/supabaseAuthService.js
 */

export async function sendOtpToDevice(phoneNumber, otpCode) {
  console.info('OTP delivery via Fast2SMS removed in favor of direct Supabase authentication.');
  return {
    phone: phoneNumber,
    smsSent: false,
    provider: 'Supabase Direct Auth'
  };
}
