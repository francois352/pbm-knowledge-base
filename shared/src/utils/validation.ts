/**
 * Validation Utilities
 * Common validation functions
 */

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhone = (phone: string): boolean => {
  // European phone number format
  const phoneRegex = /^(\+|00)?[1-9]\d{1,14}$/;
  return phoneRegex.test(phone.replace(/[\s\-()]/g, ''));
};

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const isValidSlug = (slug: string): boolean => {
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(slug);
};

export const sanitizeSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const isValidRange = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max;
};

export const isValidMoodOrEnergy = (value: number): boolean => {
  return isValidRange(value, 1, 10) && Number.isInteger(value);
};

export const isValidCoherenceScore = (value: number): boolean => {
  return isValidRange(value, 0, 100);
};
