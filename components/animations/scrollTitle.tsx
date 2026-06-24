'use client';

import { isDesktopLayout } from '@/utils';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export const ScrollTitleAnimation = () => {
  useEffect(() => {
    if (typeof window === 'undefined' || !isDesktopLayout()) return;

    gsap.registerPlugin(ScrollTrigger);

    const elements = document.querySelectorAll<HTMLElement>('#transitionTitle');
    const containers = document.querySelectorAll('#transitionContainer');
    const sideHeader = document.querySelector('#side-header');

    let space = 0;
    let totalSpace = 0;
    const sideHeaderHeight = sideHeader?.clientHeight
      ? sideHeader.clientHeight + 228
      : 0;

    elements.forEach((item) => {
      totalSpace += item.clientHeight;
    });

    elements.forEach((item) => {
      item.classList.add('!opacity-30');
      item.classList.remove('!text-sm');
    });

    if (elements[0]) {
      elements[0].classList.remove('!opacity-30');
      elements[0].classList.add('!text-sm');
    }

    elements.forEach((item, i) => {
      ScrollTrigger.create({
        trigger: item,
        endTrigger: containers[containers.length - 1],
        start: `top top+=${sideHeaderHeight + space}px`,
        end: `bottom top`,
        pin: true,
        pinSpacing: false,
        scrub: true,
        onEnter: () => {
          item.classList.add('!text-sm');
          item.classList.remove('!opacity-30');
        },
        onLeave: () => {
          item.classList.remove('!text-sm');
          item.classList.add('!opacity-30');
        },
        onEnterBack: () => {
          item.classList.add('!text-sm');
          item.classList.remove('!opacity-30');
        },
        onLeaveBack: () => {
          item.classList.remove('!text-sm');
          item.classList.add('!opacity-30');
        },
      });

      space += 32;

      if (i < elements.length - 1) {
        ScrollTrigger.create({
          trigger: elements[i + 1],
          endTrigger: containers[containers.length - 1],
          start: `top top+=${sideHeaderHeight + space}px`,
          end: `bottom top+=${sideHeaderHeight + totalSpace}`,
          toggleActions: 'play none none reverse',
          onEnter: () => {
            item.classList.remove('!text-sm');
            item.classList.add('!opacity-30');
          },
          onLeaveBack: () => {
            item.classList.add('!text-sm');
            item.classList.remove('!opacity-30');
          },
        });

        gsap.to(item, {
          scrollTrigger: {
            trigger: elements[i + 1],
            endTrigger: containers[containers.length - 1],
            start: `top top+=${sideHeaderHeight + space}px`,
            scrub: true,
          },
        });
      } else if (elements.length > 1) {
        ScrollTrigger.create({
          trigger: elements[i],
          endTrigger: containers[containers.length - 1],
          start: `top top+=${sideHeaderHeight + space}px`,
          end: `bottom top`,
          onLeaveBack: () => {
            item.classList.add('!opacity-30');
            item.classList.remove('!text-sm');
          },
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return null;
};
