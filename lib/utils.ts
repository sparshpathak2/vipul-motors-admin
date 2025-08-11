import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function setWithExpiry(key: string, value: any, ttlMs: number) {
  const now = Date.now()
  const item = {
    value,
    expiry: now + ttlMs,
  }
  localStorage.setItem(key, JSON.stringify(item))
}

export function getWithExpiry(key: string) {
  const itemStr = localStorage.getItem(key)
  if (!itemStr) return null

  try {
    const item = JSON.parse(itemStr)
    if (Date.now() > item.expiry) {
      localStorage.removeItem(key)
      return null
    }
    return item.value
  } catch {
    localStorage.removeItem(key)
    return null
  }
}
