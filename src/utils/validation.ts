export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function isValidSignupPassword(value: string): boolean {
  return value.length >= 12 && /[^A-Za-z0-9]/.test(value);
}
