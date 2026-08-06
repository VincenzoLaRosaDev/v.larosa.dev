'use client';

import { WithChildren } from '@/types';
import { getOffset } from '@/utils';
import {
  ComponentProps,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useMobileSectionTitleRegistration } from './mobileSectionTitle';

export interface SectionBlockProps
  extends WithChildren,
    React.HTMLAttributes<HTMLDivElement> {
  title: string;
  labelClass?: ComponentProps<any>['className'];
  /** Injected by PaddingContainer — padding + block classNames on the content box. */
  sectionClassName?: string;
  /**
   * When false, section is omitted from desktop sidebar nav and mobile pinned
   * titles (e.g. iconsSwiper). Previous nav item stays active while in view.
   */
  includeInNav?: boolean;
}

export const SectionBlock = ({
  children,
  className,
  labelClass,
  title,
  sectionClassName,
  includeInNav = true,
  id,
  ...rest
}: SectionBlockProps) => {
  const hasTitle = Boolean(title?.trim());
  const inNav = includeInNav && hasTitle;
  const [initialPosition, setInitialPosition] = useState<number>(0);

  const container = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInitialPosition((getOffset(container.current)?.top ?? 0) - 80);
  }, [container]);

  const scrollToTitle = useCallback(() => {
    scrollTo({
      top: initialPosition,
      behavior: 'smooth',
    });
  }, [initialPosition]);

  const { isFirstSection, hideInFlowTitle } = useMobileSectionTitleRegistration({
    title,
    sentinelRef,
    containerRef: container,
    labelClass,
    scrollTo: scrollToTitle,
    enabled: inNav,
  });

  const mobileTitleClass = `text-text archivo-black uppercase leading-8 block ${labelClass ?? ''}`;

  return (
    <div
      {...rest}
      id={id}
      ref={container}
      data-section={inNav ? 'nav' : 'skip'}
      className={`w-full scroll-mt-24 lg:scroll-mt-8 ${sectionClassName ?? ''} ${className ?? ''}`}
    >
      <div className="w-full relative">
        {inNav ? (
          <>
            <div
              ref={sentinelRef}
              className="lg:hidden h-px w-full"
              aria-hidden
            />
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
            {hasTitle ? (
              <h2 className="hidden lg:block sr-only">{title}</h2>
            ) : null}
          </>
        ) : null}
        <div className="px-6 lg:px-0 mt-6 lg:mt-0">{children}</div>
      </div>
    </div>
  );
};
