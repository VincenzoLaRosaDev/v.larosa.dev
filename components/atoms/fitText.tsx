'use client';

import {
  useLayoutEffect,
  useRef,
  useState,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
} from 'react';

export interface FitTextProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  as?: ElementType;
  minSize?: number;
  maxSize?: number;
}

export const FitText = ({
  as: Tag = 'span',
  children,
  className,
  minSize = 20,
  maxSize = 72,
  ...rest
}: FitTextProps) => {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  // null = use CSS first-paint size (no inline override) until measured
  const [fontSize, setFontSize] = useState<number | null>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    if (!container || !text) return;

    let cancelled = false;

    const fit = () => {
      if (cancelled) return;

      const availableWidth = container.clientWidth;
      if (!availableWidth) return;

      let low = minSize;
      let high = maxSize;
      let best = minSize;

      text.style.fontSize = `${high}px`;
      if (text.scrollWidth <= availableWidth) {
        setFontSize(high);
        return;
      }

      while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        text.style.fontSize = `${mid}px`;

        if (text.scrollWidth <= availableWidth) {
          best = mid;
          low = mid + 1;
        } else {
          high = mid - 1;
        }
      }

      text.style.fontSize = `${best}px`;
      setFontSize(best);
    };

    fit();

    const observer = new ResizeObserver(fit);
    observer.observe(container);

    document.fonts?.ready.then(() => {
      if (!cancelled) fit();
    }).catch(() => undefined);

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [children, minSize, maxSize]);

  return (
    <Tag
      {...rest}
      ref={containerRef}
      className={`block w-full min-w-0 overflow-hidden ${className ?? ''}`}
    >
      <span
        ref={textRef}
        className="inline-block max-w-full whitespace-nowrap leading-none"
        style={fontSize != null ? { fontSize } : undefined}
      >
        {children}
      </span>
    </Tag>
  );
};
