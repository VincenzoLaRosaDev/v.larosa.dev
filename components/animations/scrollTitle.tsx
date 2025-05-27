'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

function isTouchDevice() {
  if (typeof navigator === 'undefined') return false;
  return navigator.maxTouchPoints > 0;
}

export const ScrollTitleAnimation = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const elements = document.querySelectorAll<HTMLElement>('#transitionTitle');
    const containers = document.querySelectorAll('#transitionContainer');
    const sideHeader = document.querySelector('#side-header');

    const isTouch = isTouchDevice();

    let space = 0;
    let totalSpace = 0;
    let sideHeaderHeight = sideHeader?.clientHeight
      ? sideHeader.clientHeight + 168
      : 0;

    elements.forEach((item) => {
      totalSpace += item.clientHeight;
    });

    elements.forEach((item, i) => {
      const pinTrigger = ScrollTrigger.create({
        trigger: item,
        endTrigger: containers[containers.length - 1],
        start: `top top+=${sideHeaderHeight + space}px`,
        end: `bottom top`,
        pin: true,
        pinSpacing: false,
        scrub: true,
        onEnter: () => {
          if (!isTouch) item.classList.add('!text-sm');
          item.classList.remove('!opacity-30');
        },
        onLeave: () => {
          if (!isTouch) item.classList.remove('!text-sm');
          item.classList.add('!opacity-30');
        },
        onEnterBack: () => {
          if (!isTouch) item.classList.add('!text-sm');
          item.classList.remove('!opacity-30');
        },
        onLeaveBack: () => {
          if (!isTouch) item.classList.remove('!text-sm');
          item.classList.add('!opacity-30');
        },
      });

      space += item.clientHeight;

      if (i < elements.length - 1) {
        ScrollTrigger.create({
          trigger: elements[i + 1],
          endTrigger: containers[containers.length - 1],
          start: `top top+=${sideHeaderHeight + space}px`,
          end: `bottom top+=${sideHeaderHeight + totalSpace}`,
          toggleActions: 'play none none reverse',
          onEnter: () => {
            if (!isTouch) item.classList.remove('!text-sm');
            item.classList.add('!opacity-30');
          },
          onLeaveBack: () => {
            if (!isTouch) item.classList.add('!text-sm');
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
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return null;
};
