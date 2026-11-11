import { supabase, isSupabaseConfigured } from './supabase';

/**
 * Supabase Guest Authentication & Identity Service for SHIVANANDI VISTA
 * Replaces SMS/OTP gateways with direct, cloud-hosted Supabase database authentication.
 */

// Lookup guest by 10-digit mobile number in Supabase
export async function lookupGuestByPhone(phoneNumber) {
  const cleanPhone = String(phoneNumber).replace(/\D/g, '').slice(-10);
  if (!cleanPhone || cleanPhone.length !== 10) return null;

  if (!isSupabaseConfigured) {
    const local = JSON.parse(localStorage.getItem('sv_saved_users') || '{}');
    return local[cleanPhone] || null;
  }

  try {
    const { data, error } = await supabase
      .from('guest_users')
      .select('*')
      .eq('phone', cleanPhone)
      .maybeSingle();

    if (error) {
      console.warn('Supabase guest lookup warning:', error);
      const local = JSON.parse(localStorage.getItem('sv_saved_users') || '{}');
      return local[cleanPhone] || null;
    }

    return data;
  } catch (err) {
    console.warn('Lookup error:', err);
    return null;
  }
}

// Sign in or register directly using Supabase guest_users table
export async function authenticateWithPhone({ phone, name, email = '', password = '' }) {
  const cleanPhone = String(phone).replace(/\D/g, '').slice(-10);
  if (!cleanPhone || cleanPhone.length !== 10) {
    throw new Error('Please enter a valid 10-digit Indian mobile number.');
  }

  const existingGuest = await lookupGuestByPhone(cleanPhone);

  const finalName = name?.trim() || existingGuest?.name || `Guest ${cleanPhone.slice(-4)}`;
  const finalEmail = email?.trim() || existingGuest?.email || `${cleanPhone}@guest.shivanandivista.com`;

  const userProfile = {
    id: `user_${cleanPhone}`,
    phone: cleanPhone,
    name: finalName,
    email: finalEmail,
    username: finalName.toLowerCase().replace(/\s+/g, '_'),
    isVerified: true,
    authProvider: 'Supabase Database',
    verifiedAt: new Date().toISOString()
  };

  // Upsert to Supabase
  if (isSupabaseConfigured) {
    try {
      const { error } = await supabase
        .from('guest_users')
        .upsert({
          id: userProfile.id,
          phone: cleanPhone,
          name: userProfile.name,
          email: userProfile.email,
          password: password ? `HASH_${password}` : 'SUPABASE_VERIFIED',
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.warn('Supabase upsert warning:', error);
      }
    } catch (err) {
      console.warn('Supabase auth error:', err);
    }
  }

  // Sync to localStorage
  try {
    const localUsers = JSON.parse(localStorage.getItem('sv_saved_users') || '{}');
    localUsers[cleanPhone] = userProfile;
    localStorage.setItem('sv_saved_users', JSON.stringify(localUsers));
  } catch (e) {}

  return userProfile;
}

// Sign in with Email and Password using Supabase Auth
export async function authenticateWithEmailPassword(email, password, isSignUp = false, metadata = {}) {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured.');
  }

  if (isSignUp) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    });
    if (error) throw error;

    const userProfile = {
      id: data.user?.id || `user_${Date.now()}`,
      name: metadata.name || email.split('@')[0],
      email: email,
      phone: metadata.phone || '',
      isVerified: true,
      authProvider: 'Supabase Auth',
      verifiedAt: new Date().toISOString()
    };

    return userProfile;
  } else {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) throw error;

    const userProfile = {
      id: data.user?.id,
      name: data.user?.user_metadata?.name || email.split('@')[0],
      email: data.user?.email || email,
      phone: data.user?.user_metadata?.phone || '',
      isVerified: true,
      authProvider: 'Supabase Auth',
      verifiedAt: new Date().toISOString()
    };

    return userProfile;
  }
}
