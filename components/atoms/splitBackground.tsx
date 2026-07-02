'use client';

import { useEffect, useRef } from 'react';
import { isDesktopLayout } from '@/utils';

/**
 * Full-viewport two-tone page background for desktop. The divider (`--split-x`)
 * follows the real gap between the two columns (`[data-split-col="left"]` /
 * `="right"`), which flex computes dynamically, so it stays aligned at every
 * width. The layer is `position: fixed` with vertical overscan (see .split-bg
 * in globals.css) so the top/bottom rubber-band overscroll never reveals a bare
 * edge. It sits at z-index 0 (content is z-[1]) to avoid the negative-z-index
 * fixed repaint glitch.
 */
export const SplitBackground = () => {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    const compute = () => {
      const left = document.querySelector<HTMLElement>('[data-split-col="left"]');
      const right =
        document.querySelector<HTMLElement>('[data-split-col="right"]');

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
