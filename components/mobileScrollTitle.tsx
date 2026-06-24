'use client';

import { isLiteExperience } from '@/utils';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from 'react';
import { TextReveal } from './atoms';

type Section = {
  id: string;
  title: string;
  sentinel: HTMLElement;
  container: HTMLElement;
  labelClass?: string;
  scrollTo: () => void;
};

type RegisterOptions = {
  id: string;
  title: string;
  sentinel: HTMLElement;
  container: HTMLElement;
  labelClass?: string;
  scrollTo: () => void;
};

const MobileScrollTitleContext = createContext<{
  register: (opts: RegisterOptions) => void;
  unregister: (id: string) => void;
  pinnedId: string | null;
  firstSectionId: string | null;
} | null>(null);

function sortSectionsByDocumentOrder(sections: Section[]) {
  return [...sections].sort((a, b) => {
    const pos = a.sentinel.compareDocumentPosition(b.sentinel);
    if (pos & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
    if (pos & Node.DOCUMENT_POSITION_PRECEDING) return 1;
    return 0;
  });
}

function sectionIntersectsViewport(container: HTMLElement) {
  const { top, bottom } = container.getBoundingClientRect();
  return bottom > 0 && top < window.innerHeight;
}

function resolvePinnedSection(sections: Section[]): Section | null {
  if (sections.length === 0) return null;

  const first = sections[0];
  if (first.sentinel.getBoundingClientRect().top > 0) {
    return null;
  }

  for (const section of sections) {
    if (sectionIntersectsViewport(section.container)) {
      return section;
    }
  }

  return null;
}

function FixedScrollTitle({ section }: { section: Section }) {
  const prevIdRef = useRef<string | null>(null);
  const [useReveal, setUseReveal] = useState(false);
  const isTransitioning =
    prevIdRef.current !== null && prevIdRef.current !== section.id;
  const showReveal = useReveal || isTransitioning;

  useEffect(() => {
    if (isTransitioning) {
      setUseReveal(true);
    }
    prevIdRef.current = section.id;
  }, [section.id, isTransitioning]);

  const titleClass = `text-text archivo-black uppercase leading-8 block ${section.labelClass ?? ''}`;

  return (
    <div className="relative px-3 py-3">
      {showReveal ? (
        <TextReveal
          key={section.id}
          text={section.title}
          animateOnMobile
          className={titleClass}
        />
      ) : (
        <span className={titleClass}>{section.title}</span>
      )}
    </div>
  );
}

export function MobileScrollTitleProvider({ children }: { children: ReactNode }) {
  const sectionsRef = useRef<Map<string, Section>>(new Map());
  const [pinned, setPinned] = useState<Section | null>(null);
  const [firstSectionId, setFirstSectionId] = useState<string | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(isLiteExperience());
  }, []);

  const updatePinned = useCallback(() => {
    const sorted = sortSectionsByDocumentOrder(
      Array.from(sectionsRef.current.values()),
    );

    setFirstSectionId(sorted[0]?.id ?? null);

    const next = resolvePinnedSection(sorted);

    setPinned((current) =>
      current?.id === next?.id && current?.title === next?.title ? current : next,
    );
  }, []);

  const register = useCallback(
    (opts: RegisterOptions) => {
      sectionsRef.current.set(opts.id, {
        id: opts.id,
        title: opts.title,
        sentinel: opts.sentinel,
        container: opts.container,
        labelClass: opts.labelClass,
        scrollTo: opts.scrollTo,
      });
      updatePinned();
    },
    [updatePinned],
  );

  const unregister = useCallback(
    (id: string) => {
      sectionsRef.current.delete(id);
      updatePinned();
    },
    [updatePinned],
  );

  useEffect(() => {
    if (!enabled) return;

    const onScroll = () => updatePinned();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    updatePinned();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [enabled, updatePinned]);

  const value = useMemo(
    () => ({
      register,
      unregister,
      pinnedId: pinned?.id ?? null,
      firstSectionId,
    }),
    [register, unregister, pinned?.id, firstSectionId],
  );

  return (
    <MobileScrollTitleContext.Provider value={value}>
      {children}
      {enabled && pinned ? (
        <div
          className="lg:hidden fixed top-0 left-0 right-0 z-10 bg-transparent border-b border-[var(--glass-border)]"
          onClick={pinned.scrollTo}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              pinned.scrollTo();
            }
          }}
          role="button"
          tabIndex={0}
          aria-label={pinned.title}
        >
          <FixedScrollTitle section={pinned} />
        </div>
      ) : null}
    </MobileScrollTitleContext.Provider>
  );
}

export function useMobileScrollTitleRegistration({
  title,
  sentinelRef,
  containerRef,
  labelClass,
  scrollTo,
}: {
  title: string;
  sentinelRef: RefObject<HTMLElement | null>;
  containerRef: RefObject<HTMLElement | null>;
  labelClass?: string;
  scrollTo: () => void;
}) {
  const ctx = useContext(MobileScrollTitleContext);
  const id = useId();

  useLayoutEffect(() => {
    const sentinel = sentinelRef.current;
    const container = containerRef.current;
    if (!ctx || !sentinel || !container) return;

    ctx.register({ id, title, sentinel, container, labelClass, scrollTo });
    return () => ctx.unregister(id);
  }, [ctx, id, title, labelClass, scrollTo, sentinelRef, containerRef]);

  const isFirstSection = ctx?.firstSectionId === id;
  const hideInFlowTitle = isFirstSection && ctx?.pinnedId !== null;

  return { isFirstSection, hideInFlowTitle };
}
