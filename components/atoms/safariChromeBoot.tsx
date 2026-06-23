'use client';

import { useLayoutEffect } from 'react';
import { isLiteExperience } from '@/utils/device';

/**
 * iOS 26 Safari composites chrome differently at scrollY=0 vs after scroll.
 * A 1px scroll runway (see theme.css --safari-scroll-offset) nudges the
 * compositor so edge gradients are visible behind Liquid Glass on first paint.
 */
export function SafariChromeBoot() {
  useLayoutEffect(() => {
    if (!isLiteExperience()) return;

    const offset =
      Number.parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          '--safari-scroll-offset',
        ),
      ) || 1;

    const apply = () => {
      if (window.scrollY < offset) {
        window.scrollTo(0, offset);
      }
    };

    apply();
    requestAnimationFrame(apply);

    window.visualViewport?.addEventListener('resize', apply);
    return () => window.visualViewport?.removeEventListener('resize', apply);
  }, []);

  return null;
}
