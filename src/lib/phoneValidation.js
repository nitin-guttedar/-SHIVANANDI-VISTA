/**
 * Strict Indian Mobile Number Validation
 * - Exactly 10 digits
 * - Starts with 6, 7, 8, or 9
 * - Rejects dummy repeating numbers (e.g. 5555555555, 9999999999, 0000000000)
 * - Rejects sequential dummy numbers (e.g. 1234567890, 9876543210)
 */
export function validateIndianMobile(phoneNumber) {
  if (!phoneNumber || typeof phoneNumber !== 'string') {
    return { 
      isValid: false, 
      error: 'Please enter a 10-digit mobile number.' 
    };
  }

  // Strip all non-digits
  const clean = phoneNumber.replace(/\D/g, '');

  // Handle +91 or 0 prefix
  let digits = clean;
  if (digits.length === 12 && digits.startsWith('91')) {
    digits = digits.slice(2);
  } else if (digits.length === 11 && digits.startsWith('0')) {
    digits = digits.slice(1);
  }

  if (digits.length === 0) {
    return { 
      isValid: false, 
      error: 'Mobile number is required.' 
    };
  }

  if (digits.length !== 10) {
    return { 
      isValid: false, 
      error: `Mobile number must be exactly 10 digits (currently ${digits.length} digits).` 
    };
  }

  // Must start with 6, 7, 8, or 9
  const firstDigit = digits[0];
  if (!/^[6-9]/.test(firstDigit)) {
    return { 
      isValid: false, 
      error: `Invalid mobile number. Numbers starting with "${firstDigit}" are not valid Indian mobile numbers. Must start with 6, 7, 8, or 9.` 
    };
  }

  // Reject all repeating identical digits (e.g. 5555555555, 9999999999, 8888888888)
  if (/^(\d)\1{9}$/.test(digits)) {
    return { 
      isValid: false, 
      error: 'Invalid dummy number. Repeating digit series (e.g. ' + digits + ') are not permitted.' 
    };
  }

  // Reject common dummy test strings
  const dummyNumbers = new Set([
    '9876543210',
    '8765432109',
    '7654321098',
    '6789012345',
    '9000000000',
    '9800000000',
    '9123456789'
  ]);
  if (dummyNumbers.has(digits)) {
    return {
      isValid: false,
      error: 'Please enter your genuine personal mobile number to receive your OTP.'
    };
  }

  return { 
    isValid: true, 
    cleanNumber: digits,
    formatted: `+91 ${digits.slice(0, 5)} ${digits.slice(5)}` 
  };
}

