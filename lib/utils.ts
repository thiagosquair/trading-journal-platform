import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a number as currency
 * @param value - The number to format
 * @param currency - The currency code (default: USD)
 * @param locale - The locale to use for formatting (default: en-US)
 * @returns Formatted currency string
 */
export function formatCurrency(value: number, currency = "USD", locale = "en-US"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value)
}

/**
 * Format a date and time
 * @param date - The date to format
 * @param locale - The locale to use for formatting (default: en-US)
 * @returns Formatted date and time string
 */
export function formatDateTime(date: Date | string, locale = "en-US"): string {
  const dateObj = typeof date === "string" ? new Date(date) : date
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(dateObj)
}

/**
 * Format a date
 * @param date - The date to format
 * @param locale - The locale to use for formatting (default: en-US)
 * @returns Formatted date string
 */
export function formatDate(date: Date | string, locale = "en-US"): string {
  const dateObj = typeof date === "string" ? new Date(date) : date
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
  }).format(dateObj)
}

/**
 * Format a time
 * @param date - The date to format
 * @param locale - The locale to use for formatting (default: en-US)
 * @returns Formatted time string
 */
export function formatTime(date: Date | string, locale = "en-US"): string {
  const dateObj = typeof date === "string" ? new Date(date) : date
  return new Intl.DateTimeFormat(locale, {
    timeStyle: "short",
  }).format(dateObj)
}

/**
 * Format a number
 * @param value - The number to format
 * @param locale - The locale to use for formatting (default: en-US)
 * @returns Formatted number string
 */
export function formatNumber(value: number, locale = "en-US"): string {
  return new Intl.NumberFormat(locale).format(value)
}

/**
 * Format a percentage
 * @param value - The number to format as percentage (0.1 = 10%)
 * @param locale - The locale to use for formatting (default: en-US)
 * @returns Formatted percentage string
 */
export function formatPercent(value: number, locale = "en-US"): string {
  return new Intl.NumberFormat(locale, {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  }).format(value)
}
