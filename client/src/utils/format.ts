import { CURRENCY } from "@/config/constants";

/**
 * Format price in Vietnamese Dong
 */
export function formatPrice(price: number): string {
  return CURRENCY.FORMAT.format(price);
}

/**
 * Format time to Vietnamese format
 */
export function formatTime(date: Date): string {
  return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
}

/**
 * Format date to Vietnamese format
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('vi-VN');
}

/**
 * Format duration from minutes to readable string
 */
export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (hours === 0) {
    return `${remainingMinutes}m`;
  } else if (remainingMinutes === 0) {
    return `${hours}h`;
  } else {
    return `${hours}h ${remainingMinutes}m`;
  }
}

/**
 * Format subject name for display
 */
export function formatSubjectName(name: string, nameVi: string): string {
  return `${nameVi} (${name})`;
}

/**
 * Truncate text to specified length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}