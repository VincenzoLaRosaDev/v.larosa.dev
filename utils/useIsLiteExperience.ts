'use client';

import { useEffect, useState } from 'react';
import { LITE_EXPERIENCE_MQ, isLiteExperience } from './device';

/**
 * Reactive version of `isLiteExperience()`. Subscribes to the lite-experience
 * media query so components re-evaluate the mobile/desktop mode when the
 * viewport crosses the breakpoint (or the pointer type changes), instead of
 * snapshotting the value once on mount.
 */
export function useIsLiteExperience() {
  // Seed with the SSR value (always lite) so the first client render matches the
  // server markup; the effect then syncs to the real viewport after mount.
  const [isLite, setIsLite] = useState<boolean>(true);

  useEffect(() => {
    const mql = window.matchMedia(LITE_EXPERIENCE_MQ);
    const update = () => setIsLite(isLiteExperience());

    update();
    mql.addEventListener('change', update);

    return () => mql.removeEventListener('change', update);
  }, []);

  return isLite;
}
