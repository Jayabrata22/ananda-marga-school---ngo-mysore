/**
 * Ananda Marga Welfare Society - Security & Input Sanitization Utilities
 * Prevents XSS, script injections, malicious URL protocols, header tampering,
 * and invalid payment data payload injection.
 */

// Basic HTML entity encoding map for XSS prevention
const ENTITY_MAP: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;',
};

/**
 * Escapes HTML entities to prevent XSS string injections
 */
export function escapeHtml(str: string): string {
  if (!str) return '';
  return String(str).replace(/[&<>"'`=/]/g, (s) => ENTITY_MAP[s] || s);
}

/**
 * Sanitizes plain text input by stripping dangerous tags and scripts,
 * trimming whitespace, and capping max length.
 */
export function sanitizeText(input: string, maxLength: number = 500): string {
  if (typeof input !== 'string') return '';
  
  let cleaned = input
    .replace(/<script\b[^<]*>([\s\S]*?)<\/script>/gi, '') // Strip script tags
    .replace(/javascript\s*:/gi, '')                     // Strip javascript: pseudo-protocols
    .replace(/data\s*:/gi, '')                           // Strip data: URIs
    .replace(/vbscript\s*:/gi, '')                       // Strip vbscript:
    .replace(/on\w+\s*=/gi, '')                          // Strip inline event handlers (e.g. onload=)
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, '');       // Strip non-printable ASCII control chars

  cleaned = cleaned.trim();
  if (cleaned.length > maxLength) {
    cleaned = cleaned.substring(0, maxLength);
  }
  return cleaned;
}

/**
 * Validates and sanitizes email address
 */
export function sanitizeEmail(email: string): string {
  if (!email) return '';
  const cleaned = sanitizeText(email, 120).toLowerCase().trim();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(cleaned)) {
    return '';
  }
  return cleaned;
}

/**
 * Sanitizes phone numbers (keeps digits, +, spaces, hyphens)
 */
export function sanitizePhone(phone: string): string {
  if (!phone) return '';
  const cleaned = phone.replace(/[^\d\s+\-()]/g, '').trim();
  return cleaned.substring(0, 25);
}

/**
 * Sanitizes and validates donation amount
 */
export function sanitizeAmount(
  amount: number | string,
  min: number = 10,
  max: number = 1000000
): number {
  let num: number;
  if (typeof amount === 'string') {
    num = parseFloat(amount.replace(/[^0-9.]/g, ''));
  } else {
    num = Number(amount);
  }

  if (isNaN(num) || !isFinite(num) || num < min) {
    return min;
  }
  if (num > max) {
    return max;
  }
  return Math.round(num);
}

/**
 * Sanitizes reference numbers (UTR, Transaction ID, PAN)
 */
export function sanitizeReferenceNumber(input: string, maxLength: number = 40): string {
  if (!input) return '';
  const cleaned = input.toUpperCase().replace(/[^A-Z0-9\-]/g, '').trim();
  return cleaned.substring(0, maxLength);
}

/**
 * Validates and sanitizes outbound URLs to prevent javascript: or malicious protocol injections
 */
export function sanitizeUrl(url: string): string {
  if (!url) return '#';
  const trimmed = url.trim();
  
  // Reject pseudo-protocols
  if (/^(javascript|data|vbscript|file):/i.test(trimmed)) {
    return '#';
  }

  // Allow standard relative URLs or safe protocols
  if (
    trimmed.startsWith('/') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('http://') ||
    trimmed.startsWith('mailto:') ||
    trimmed.startsWith('tel:')
  ) {
    return trimmed;
  }

  return '#';
}

/**
 * Client-Side Rate Limiter helper (prevents brute forcing login or spamming forms)
 */
class RateLimiter {
  private attempts: Map<string, { count: number; resetTime: number }> = new Map();

  isAllowed(key: string, maxAttempts: number = 5, windowMs: number = 60000): { allowed: boolean; remainingMs: number } {
    const now = Date.now();
    const entry = this.attempts.get(key);

    if (!entry || now > entry.resetTime) {
      this.attempts.set(key, { count: 1, resetTime: now + windowMs });
      return { allowed: true, remainingMs: 0 };
    }

    if (entry.count >= maxAttempts) {
      return { allowed: false, remainingMs: entry.resetTime - now };
    }

    entry.count += 1;
    return { allowed: true, remainingMs: 0 };
  }

  reset(key: string) {
    this.attempts.delete(key);
  }
}

export const securityLimiter = new RateLimiter();
