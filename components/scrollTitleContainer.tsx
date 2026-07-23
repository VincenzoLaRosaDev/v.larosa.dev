'use client';

import { WithChildren } from '@/types';
import { getOffset } from '@/utils';
import { ComponentProps, useCallback, useEffect, useRef, useState } from 'react';
import { useMobileScrollTitleRegistration } from './mobileScrollTitle';
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

  const container = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const desktopTitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInitialPosition((getOffset(container.current)?.top ?? 0) - 80);
  }, [container]);

  // Keep desktop scroll-title menu aligned with the left edge of the sidebar,
  // even when the content column is centered in the remaining viewport space.
  useEffect(() => {
    const titleEl = desktopTitleRef.current;
    const sectionEl = container.current;
    if (!titleEl || !sectionEl) return;

    const alignToSidebar = () => {
      if (!window.matchMedia('(min-width: 1024px)').matches) {
        titleEl.style.removeProperty('left');
        return;
      }

      const sidebar = document.querySelector<HTMLElement>(
        '[data-split-col="left"]',
      );
      if (!sidebar) return;

      const left =
        sidebar.getBoundingClientRect().left -
        sectionEl.getBoundingClientRect().left;
      titleEl.style.left = `${Math.round(left)}px`;
    };

    alignToSidebar();

    const observer = new ResizeObserver(alignToSidebar);
    observer.observe(document.body);
    window.addEventListener('resize', alignToSidebar);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', alignToSidebar);
      titleEl.style.removeProperty('left');
    };
  }, []);

  const scrollToTitle = useCallback(() => {
    scrollTo({
      top: initialPosition,
      behavior: 'smooth',
    });
  }, [initialPosition]);

  const { isFirstSection, hideInFlowTitle } = useMobileScrollTitleRegistration({
    title,
    sentinelRef,
    containerRef: container,
    labelClass,
    scrollTo: scrollToTitle,
  });

  const mobileTitleClass = `text-text archivo-black uppercase leading-8 block ${labelClass ?? ''}`;

  return (
    <div
      {...rest}
      id={'transitionContainer'}
      ref={container}
      className={`inline-flex w-full ${className}`}
    >
      <div
        ref={desktopTitleRef}
        className="justify-end absolute left-[-400px] hidden lg:flex"
      >
        <h2
          data-cursor-interactive
          id={'transitionTitle'}
          className={`h-fit !min-h-[56px] z-50 w-auto text-nowrap pb-3 text-xs text-text-light hover:text-text archivo-black uppercase transition-[font-size,color] duration-300 ease-in-out`}
          onClick={scrollToTitle}
        >
          <TextReveal
            once
            text={title}
            className={`px-1 py-2 relative ${labelClass ?? ''}`}
          />
        </h2>
      </div>
      <div className="w-full relative">
        <div ref={sentinelRef} className="lg:hidden h-px w-full" aria-hidden />
        {isFirstSection ? (
          <h2
            className={`lg:hidden w-full bg-transparent ${hideInFlowTitle ? 'invisible' : ''}`}
            onClick={scrollToTitle}
            aria-hidden={hideInFlowTitle}
          >
            <div className="relative px-6 py-3">
              <span className={mobileTitleClass}>{title}</span>
            </div>
          </h2>
        ) : (
          <>
            <div className="lg:hidden min-h-[3.5rem]" aria-hidden />
            <h2 className="sr-only text-text archivo-black uppercase leading-8">{title}</h2>
          </>
        )}
        <div className="px-6 lg:px-0 mt-6 lg:mt-0">{children}</div>
      </div>
    </div>
  );
};
