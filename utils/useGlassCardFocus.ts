'use client';

import { useCallback, useState } from 'react';
import { cardHoverHandlers } from './glass';
import { useIsLiteExperience } from './useIsLiteExperience';

export function useGlassCardFocus(_itemCount: number) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const isLite = useIsLiteExperience();

  // Refs kept for call-site compatibility; center-scroll focus was removed.
  const itemRef = useCallback(
    (_index: number) => (_el: HTMLElement | null) => {},
    [],
  );

  const getCardHoverHandlers = useCallback(
    (key: number) => cardHoverHandlers(setHoveredIndex, key),
    [],
  );

  /** Drives title/arrow accent. Mobile/lite: always on. Desktop: hover only. */
  const isCardActive = useCallback(
    (key: number) => (isLite ? true : hoveredIndex === key),
    [isLite, hoveredIndex],
  );

  return { isCardActive, itemRef, getCardHoverHandlers };
}
