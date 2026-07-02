'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { cardHoverHandlers } from './glass';
import { useIsLiteExperience } from './useIsLiteExperience';

/** Half-height of the viewport center band where a card can become glass-active. */
const CENTER_BAND_RATIO = 0.30;

export function useGlassCardFocus(itemCount: number) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [centerIndex, setCenterIndex] = useState<number | null>(null);
  const useCenterFocus = useIsLiteExperience();
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  const updateCenterIndex = useCallback(() => {
    const viewportCenter = window.innerHeight / 2;
    const halfBand = window.innerHeight * CENTER_BAND_RATIO;

    let best: { index: number; distance: number } | null = null;

    for (let index = 0; index < itemCount; index++) {
      const el = itemRefs.current[index];
      if (!el) continue;

      const rect = el.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      const distance = Math.abs(centerY - viewportCenter);

      if (distance <= halfBand && (!best || distance < best.distance)) {
        best = { index, distance };
      }
    }

    setCenterIndex(best?.index ?? null);
  }, [itemCount]);

  useEffect(() => {
    if (!useCenterFocus) return;

    const onScroll = () => updateCenterIndex();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    updateCenterIndex();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [useCenterFocus, updateCenterIndex]);

  const itemRef = useCallback(
    (index: number) => (el: HTMLElement | null) => {
      itemRefs.current[index] = el;
      if (useCenterFocus) {
        requestAnimationFrame(() => updateCenterIndex());
      }
    },
    [useCenterFocus, updateCenterIndex],
  );

  const getCardHoverHandlers = useCallback(
    (key: number) => cardHoverHandlers(setHoveredIndex, key),
    [],
  );

  const activeIndex = useCenterFocus ? centerIndex : hoveredIndex;

  return { activeIndex, itemRef, getCardHoverHandlers };
}
