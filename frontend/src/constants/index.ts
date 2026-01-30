// Application Constants
export const APP_CONFIG = {
  APP_NAME: 'EV Population Analytics Dashboard',
  VERSION: '1.0.0',
  ITEMS_PER_PAGE: 20,
  MAX_CHART_ITEMS: 10,
} as const;

// Chart Colors
export const CHART_COLORS = [
  '#0ea5e9', // sky-500
  '#8b5cf6', // violet-500
  '#ec4899', // pink-500
  '#f59e0b', // amber-500
  '#10b981', // emerald-500
  '#ef4444', // red-500
  '#6366f1', // indigo-500
  '#14b8a6', // teal-500
  '#f97316', // orange-500
  '#a855f7', // purple-500
] as const;

// Breakpoints (matching Tailwind defaults)
export const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1280,
} as const;

// Filter Options
export const EV_TYPES = ['BEV', 'PHEV'] as const;

// Accessibility
export const A11Y = {
  MIN_CONTRAST_RATIO: 4.5,
  FOCUS_VISIBLE_CLASS: 'ring-2 ring-primary-500 ring-offset-2',
} as const;
