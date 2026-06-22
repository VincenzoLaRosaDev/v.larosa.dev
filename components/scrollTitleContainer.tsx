'use client';

import { WithChildren } from '@/types';
import { getOffset } from '@/utils';
import { ComponentProps, useEffect, useRef, useState } from 'react';
import { TextReveal } from './atoms';

export interface ScrollTitleContainerProps
  extends WithChildren,
    React.HTMLAttributes<HTMLDivElement> {
  title: string;
  labelClass?: ComponentProps<any>['className'];
}

export const ScrollTitleContainer = ({
  children,
  className,
  labelClass,
  title,
  ...rest
}: ScrollTitleContainerProps) => {
  const [initialPosition, setInitialPosition] = useState<number>(0);
  const [isStuck, setIsStuck] = useState(false);

  const container = useRef<HTMLDivElement>(null);
  const stickySentinelRef = useRef<HTMLDivElement>(null);
  const isStuckRef = useRef(false);

  useEffect(() => {
    setInitialPosition((getOffset(container.current)?.top ?? 0) - 80);
  }, [container]);

  useEffect(() => {
    const sentinel = stickySentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const next = !entry.isIntersecting;
        if (next === isStuckRef.current) return;
        isStuckRef.current = next;
        setIsStuck(next);
      },
      { threshold: 0, rootMargin: '-1px 0px 0px 0px' },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      {...rest}
      id={'transitionContainer'}
      ref={container}
      className={`inline-flex w-full ${className}`}
    >
      <div className="justify-end absolute left-[-448px] hidden lg:flex">
        <h2
          data-cursor-interactive
          id={'transitionTitle'}
          className={`h-fit !min-h-[56px] z-50 w-auto text-nowrap pb-3 text-xs text-text hover:!opacity-100 archivo-black uppercase !opacity-30 transition-[opacity,font-size] duration-300 ease-in-out`}
          onClick={() => {
            scrollTo({
              top: initialPosition,
              behavior: 'smooth',
            });
          }}
        >
          <TextReveal
            text={title}
            className={`px-1 py-2 relative text-text ${labelClass}`}
          />
        </h2>
      </div>
      <div className="w-full relative">
        <div ref={stickySentinelRef} className="lg:hidden h-px w-full" aria-hidden />
        <h2
          className="lg:hidden sticky top-0 z-[60] w-full"
          onClick={() => {
            scrollTo({
              top: initialPosition,
              behavior: 'smooth',
            });
          }}
        >
          <div
            aria-hidden
            className={`absolute inset-0 glass-sticky-layer transition-opacity duration-200 ease-out ${
              isStuck ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              boxShadow: isStuck
                ? 'inset 0 -1px 0 0 var(--glass-border)'
                : 'none',
            }}
          />
          <div className="relative px-3 py-3">
            <TextReveal
              text={title}
              className={`text-text archivo-black uppercase leading-8 ${labelClass}`}
            />
          </div>
        </h2>
        <div className="px-3 lg:px-0 mt-6 lg:mt-0">{children}</div>
      </div>
    </div>
  );
};
