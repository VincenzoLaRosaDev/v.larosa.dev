'use client';

import { useEffect, useRef } from 'react';
import { isDesktopLayout } from '@/utils';

export const SplitBackground = () => {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    const compute = () => {
      const left = document.querySelector<HTMLElement>(
        '[data-split-col="left"]',
      );
      const right = document.querySelector<HTMLElement>(
        '[data-split-col="right"]',
      );

      if (!isDesktopLayout() || !left || !right) {
        layer.style.removeProperty('--split-x');
        return;
      }

      const leftRect = left.getBoundingClientRect();
      const rightRect = right.getBoundingClientRect();
      const midpoint = (leftRect.right + rightRect.left) / 2;

      layer.style.setProperty('--split-x', `${Math.round(midpoint)}px`);
    };

    compute();

    const observer = new ResizeObserver(compute);
    observer.observe(document.body);
    window.addEventListener('resize', compute);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', compute);
    };
  }, []);

  return <div ref={layerRef} className="split-bg" aria-hidden />;
};
