'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

const ACTIVE_CLASSES = ['!text-sm', '!text-primary'];
const STAGGER = 32;

export const ScrollTitleAnimation = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      const elements = gsap.utils.toArray<HTMLElement>('#transitionTitle');
      const containers = gsap.utils.toArray<HTMLElement>(
        '#transitionContainer',
      );

      if (!elements.length || !containers.length) return;

      const lastContainer = containers[containers.length - 1];
      const sideHeader = document.querySelector<HTMLElement>('#side-header');

      const sideHeaderHeight = () =>
        sideHeader?.clientHeight ? sideHeader.clientHeight + 180 : 0;
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
            `${sideHeaderHeight() + offsetFor(i)}px`,
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
          start: () => `top top+=${sideHeaderHeight() + offsetFor(i)}px`,
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
              `top top+=${sideHeaderHeight() + offsetFor(i + 1)}px`,
            end: () => `bottom top+=${sideHeaderHeight() + stackHeight()}`,
            toggleActions: 'play none none reverse',
            onEnter: () => setDimmed(item),
            onLeaveBack: () => setActive(item),
          });
        } else if (elements.length > 1) {
          ScrollTrigger.create({
            trigger: containers[i] ?? item,
            endTrigger: lastContainer,
            start: () => `top top+=${sideHeaderHeight() + offsetFor(i)}px`,
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
