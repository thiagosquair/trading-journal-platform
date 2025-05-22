import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number, currency = "USD", locale = "en-US"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value)
}

export function formatDateTime(dateString: string, locale = "en-US", options?: Intl.DateTimeFormatOptions): string {
  const date = new Date(dateString)
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }
  const mergedOptions = { ...defaultOptions, ...options }
  return new Intl.DateTimeFormat(locale, mergedOptions).format(date)
}

export function formatDate(dateString: string, locale = "en-US", options?: Intl.DateTimeFormatOptions): string {
  const date = new Date(dateString)
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  }
  const mergedOptions = { ...defaultOptions, ...options }
  return new Intl.DateTimeFormat(locale, mergedOptions).format(date)
}

export function formatTime(dateString: string, locale = "en-US", options?: Intl.DateTimeFormatOptions): string {
  const date = new Date(dateString)
  const defaultOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }
  const mergedOptions = { ...defaultOptions, ...options }
  return new Intl.DateTimeFormat(locale, mergedOptions).format(date)
}

export function formatNumber(value: number, locale = "en-US", options?: Intl.NumberFormatOptions): string {
  return new Intl.NumberFormat(locale, options).format(value)
}

export function formatPercent(value: number, locale = "en-US", options?: Intl.NumberFormatOptions): string {
  const defaultOptions: Intl.NumberFormatOptions = {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }
  const mergedOptions = { ...defaultOptions, ...options }
  return new Intl.NumberFormat(locale, mergedOptions).format(value)
}
