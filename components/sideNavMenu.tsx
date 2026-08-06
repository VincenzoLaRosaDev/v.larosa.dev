'use client';

import { NavItem } from '@/constants/nav';
import { useEffect, useState } from 'react';

const ACTIVE_CLASS = 'text-primary';
const IDLE_CLASS = 'text-text-light hover:text-text';

export function SideNavMenu({ items }: { items: NavItem[] }) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    if (!items.length) return;
    if (typeof window === 'undefined') return;

    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!sections.length) return;

    const updateActive = () => {
      // Last nav section whose top has crossed the activation line stays active
      // while scrolling through non-nav blocks (e.g. iconsSwiper).
      const line = window.innerHeight * 0.28;
      let current = items[0]?.id ?? null;

      for (const section of sections) {
        if (section.getBoundingClientRect().top <= line) {
          current = section.id;
        }
      }

      setActiveId(current);
    };

    updateActive();
    window.addEventListener('scroll', updateActive, { passive: true });
    window.addEventListener('resize', updateActive);

    return () => {
      window.removeEventListener('scroll', updateActive);
      window.removeEventListener('resize', updateActive);
    };
  }, [items]);

  if (!items.length) return null;

  return (
    <nav
      aria-label="Sections"
      className="hidden lg:flex flex-col gap-1 mt-10 w-full"
    >
      {items.map((item) => {
        const isActive = item.id === activeId;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(event) => {
              event.preventDefault();
              document.getElementById(item.id)?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              });
            }}
            className={`group relative flex w-fit items-center text-nowrap py-2 text-xs archivo-black uppercase transition-colors duration-300 ease-in-out ${
              isActive ? ACTIVE_CLASS : IDLE_CLASS
            }`}
          >
            <span
              aria-hidden
              className={`pointer-events-none absolute left-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-primary transition-all duration-300 ease-in-out ${
                isActive ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
              }`}
            />
            <span
              className={`inline-block px-1 transition-transform duration-300 ease-in-out ${
                isActive ? 'translate-x-4' : 'translate-x-0'
              }`}
            >
              {item.title}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
