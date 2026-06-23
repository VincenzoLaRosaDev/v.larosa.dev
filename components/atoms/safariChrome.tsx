'use client';

import { useTheme } from 'next-themes';
import { useEffect } from 'react';

const THEME_COLORS = {
  dark: '#091410',
  light: '#f4f6f4',
} as const;

function setThemeColor(content: string) {
  const existing = document.querySelectorAll('meta[name="theme-color"]');
  existing.forEach((node) => node.remove());

  const meta = document.createElement('meta');
  meta.name = 'theme-color';
  meta.content = content;
  document.head.appendChild(meta);
}

/** Keeps theme-color in sync for browsers that still read the meta tag. */
export const SafariChrome = () => {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const mode = resolvedTheme === 'light' ? 'light' : 'dark';
    setThemeColor(THEME_COLORS[mode]);
  }, [resolvedTheme]);

  return null;
};
