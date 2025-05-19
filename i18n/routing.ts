import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export type localesType = 'en' | 'nl';
export const locales = ['en', 'nl'];
export const defaultLocale = locales[0];
export const navLang: { id: string; label: string }[] = [
  { id: 'en', label: 'english' },
  { id: 'nl', label: 'netherlands' },
];

export const routing = defineRouting({
  locales: locales,
  defaultLocale: defaultLocale,
  localeDetection: false,
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
