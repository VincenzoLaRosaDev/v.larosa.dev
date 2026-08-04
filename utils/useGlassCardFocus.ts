'use client';

import { useCallback, useState } from 'react';
import { cardHoverHandlers } from './glass';

/**
 * Desktop-only hover focus for mosaic tiles. Touch devices get no active
 * highlight — CSS hover is also gated to fine pointers in mosaic.css.
 */
export function useGlassCardFocus(_itemCount: number) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const itemRef = useCallback(
    (_index: number) => (_el: HTMLElement | null) => {},
    [],
  );

  const getCardHoverHandlers = useCallback(
    (key: number) => cardHoverHandlers(setHoveredIndex, key),
    [],
  );

  return {
    activeIndex: hoveredIndex,
    itemRef,
    getCardHoverHandlers,
  };
}
