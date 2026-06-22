/** Matches Tailwind `lg` — mobile / tablet below desktop layout. */
export const MOBILE_MQ = '(max-width: 1023px)';

/** Viewport or touch — keep in sync with theme media queries below. */
export const LITE_EXPERIENCE_MQ = `${MOBILE_MQ}, (pointer: coarse)`;

export function isLiteExperience() {
  if (typeof window === 'undefined') return true;

  return (
    window.matchMedia(MOBILE_MQ).matches ||
    window.matchMedia('(pointer: coarse)').matches ||
    navigator.maxTouchPoints > 0
  );
}

export function isDesktopLayout() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(min-width: 1024px)').matches;
}
