'use client';

import { WithChildren } from '@/types';
import { getOffset, SIDE_NAV_PAD_X } from '@/utils';
import { ComponentProps, useCallback, useEffect, useRef, useState } from 'react';
import { useMobileScrollTitleRegistration } from './mobileScrollTitle';
import { TextReveal } from './atoms';

export interface ScrollTitleContainerProps
  extends WithChildren,
    React.HTMLAttributes<HTMLDivElement> {
  title: string;
  labelClass?: ComponentProps<any>['className'];
  /** Injected by PaddingContainer — padding + block classNames on the content box. */
  sectionClassName?: string;
}

export const ScrollTitleContainer = ({
  children,
  className,
  labelClass,
  title,
  sectionClassName,
  ...rest
}: ScrollTitleContainerProps) => {
  const [initialPosition, setInitialPosition] = useState<number>(0);

  const container = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const desktopTitleRef = useRef<HTMLHeadingElement>(null);
  const desktopLabelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setInitialPosition((getOffset(container.current)?.top ?? 0) - 80);
  }, [container]);

  // Keep desktop scroll-title menu aligned inside the sidebar nav panel,
  // even when the content column is centered in the remaining viewport space.
  useEffect(() => {
    const labelEl = desktopLabelRef.current;
    const sectionEl = container.current;
    if (!labelEl || !sectionEl) return;

    const alignToSidebarNav = () => {
      if (!window.matchMedia('(min-width: 1024px)').matches) {
        labelEl.style.removeProperty('left');
        return;
      }

      const sideNav = document.querySelector<HTMLElement>('#side-nav');
      if (!sideNav) return;

      const left =
        sideNav.getBoundingClientRect().left +
        SIDE_NAV_PAD_X -
        sectionEl.getBoundingClientRect().left;
      labelEl.style.left = `${Math.round(left)}px`;
    };

    alignToSidebarNav();

    const observer = new ResizeObserver(alignToSidebarNav);
    observer.observe(document.body);
    window.addEventListener('resize', alignToSidebarNav);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', alignToSidebarNav);
      labelEl.style.removeProperty('left');
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

  const mobileTitleClass = `text-text text-lg archivo-black uppercase block ${labelClass ?? ''}`;

  return (
    <>
      {/* Desktop: sticky slot (h-0) so titles bounce with overscroll; label is
          absolutely positioned into the sidebar column. Sticky containing block
          is #scroll-title-stack via lg:contents ancestors. */}
      <h2
        ref={desktopTitleRef}
        id="transitionTitle"
        className="hidden lg:block sticky z-50 h-0 m-0 p-0 w-full overflow-visible pointer-events-none"
        style={{ top: 'var(--scroll-title-top, 0px)' }}
      >
        {/* Untitled sections (e.g. the closing note) keep the sticky slot for
            index alignment but contribute no menu entry. */}
        {title ? (
          <span
            ref={desktopLabelRef}
            role="button"
            tabIndex={0}
            onClick={scrollToTitle}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                scrollToTitle();
              }
            }}
            className={`absolute top-0 h-fit !min-h-[40px] w-auto text-nowrap pb-2 text-xs text-[var(--sidebar-text-muted)] hover:text-[var(--sidebar-primary)] archivo-black uppercase transition-[font-size,color] duration-300 ease-in-out pointer-events-auto ${labelClass ?? ''}`}
          >
            <TextReveal
              once
              text={title}
              className={`px-1 py-2 relative ${labelClass ?? ''}`}
            />
          </span>
        ) : null}
      </h2>

      <div
        {...rest}
        id="transitionContainer"
        ref={container}
        className={`w-full ${sectionClassName ?? ''} ${className ?? ''}`}
      >
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
              <h2 className="sr-only text-text archivo-black uppercase leading-8">
                {title}
              </h2>
            </>
          )}
          {/* Flush: tiles carry their own padding so the mosaic has no gutters. */}
          <div className="w-full">{children}</div>
        </div>
      </div>
    </>
  );
};
