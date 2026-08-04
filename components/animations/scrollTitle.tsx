'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { SIDE_NAV_PAD_Y } from '@/utils';

/* Bright ice from :root — labels live in the content DOM tree, so remapped
   --primary would otherwise mute the active state on the dark sidebar. */
const ACTIVE_CLASSES = ['!text-[14px]', '!text-[var(--sidebar-primary)]'];
const STAGGER = 28;

export const ScrollTitleAnimation = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      const allTitles = gsap.utils.toArray<HTMLElement>('#transitionTitle');
      const allContainers = gsap.utils.toArray<HTMLElement>(
        '#transitionContainer',
      );

      // Sections without a title render an empty sticky slot; drop them so they
      // take no room in the stacked menu.
      const pairs = allTitles
        .map((title, index) => ({ title, container: allContainers[index] }))
        .filter(({ title }) => title.querySelector(':scope > span'));

      const elements = pairs.map(({ title }) => title);
      const containers = pairs.map(({ container }) => container);

      if (!elements.length || !containers.length) return;

      const lastContainer = containers[containers.length - 1];
      const sidebar = document.querySelector<HTMLElement>(
        '[data-split-col="left"]',
      );
      const sideNav = document.querySelector<HTMLElement>('#side-nav');

      // Sticky top of each menu label = top of the nav panel (relative to the
      // sticky sidebar) + panel padding + staggered index offset.
      const sideNavTop = () => {
        if (!sideNav || !sidebar) return 0;
        return (
          sideNav.getBoundingClientRect().top -
          sidebar.getBoundingClientRect().top +
          SIDE_NAV_PAD_Y
        );
      };
      const offsetFor = (index: number) => index * STAGGER;
      const stackHeight = () =>
        elements.reduce((total, el) => {
          const label = el.querySelector<HTMLElement>(':scope > span');
          return total + (label?.offsetHeight || el.scrollHeight || 56);
        }, 0);

      const applyStickyTops = () => {
        elements.forEach((item, i) => {
          item.style.setProperty(
            '--scroll-title-top',
            `${sideNavTop() + offsetFor(i)}px`,
          );
        });
      };

      const setActive = (item: HTMLElement) => {
        const label = item.querySelector<HTMLElement>(':scope > span') ?? item;
        label.classList.add(...ACTIVE_CLASSES);
      };
      const setDimmed = (item: HTMLElement) => {
        const label = item.querySelector<HTMLElement>(':scope > span') ?? item;
        label.classList.remove(...ACTIVE_CLASSES);
      };

      applyStickyTops();
      elements.forEach(setDimmed);
      if (elements[0]) setActive(elements[0]);

      elements.forEach((item, i) => {
        // Active while this title's section is the current one — no GSAP pin
        // (CSS sticky handles stacking and participates in native overscroll).
        ScrollTrigger.create({
          trigger: containers[i] ?? item,
          endTrigger: lastContainer,
          start: () => `top top+=${sideNavTop() + offsetFor(i)}px`,
          end: 'bottom top',
          onEnter: () => setActive(item),
          onLeave: () => setDimmed(item),
          onEnterBack: () => setActive(item),
          onLeaveBack: () => setDimmed(item),
        });

        if (i < elements.length - 1) {
          ScrollTrigger.create({
            trigger: containers[i + 1] ?? elements[i + 1],
            endTrigger: lastContainer,
            start: () =>
              `top top+=${sideNavTop() + offsetFor(i + 1)}px`,
            end: () => `bottom top+=${sideNavTop() + stackHeight()}`,
            toggleActions: 'play none none reverse',
            onEnter: () => setDimmed(item),
            onLeaveBack: () => setActive(item),
          });
        } else if (elements.length > 1) {
          ScrollTrigger.create({
            trigger: containers[i] ?? item,
            endTrigger: lastContainer,
            start: () => `top top+=${sideNavTop() + offsetFor(i)}px`,
            end: 'bottom top',
            onLeaveBack: () => setDimmed(item),
          });
        }
      });

      let rafId = 0;
      const onResize = () => {
        if (rafId) return;
        rafId = window.requestAnimationFrame(() => {
          rafId = 0;
          applyStickyTops();
          ScrollTrigger.refresh();
        });
      };
      window.addEventListener('resize', onResize);

      return () => {
        window.removeEventListener('resize', onResize);
        if (rafId) window.cancelAnimationFrame(rafId);
        elements.forEach((item) => {
          item.style.removeProperty('--scroll-title-top');
          setDimmed(item);
        });
      };
    });

    return () => mm.revert();
  }, []);

  return null;
};
