'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export const ScrollTitleAnimation = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const elements = document.querySelectorAll('#transitionTitle');
    const containers = document.querySelectorAll('#transitionContainer');

    let space = 0;
    let totalSpace = 0;

    elements.forEach((item) => {
      totalSpace += item.children[0].clientHeight;
    });

    elements.forEach((item, i) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          endTrigger: containers[containers.length - 1],
          start: `top top+=${120 + space}px`,
          end: `bottom top+=${120 + totalSpace}`,
          pin: true,
          pinSpacing: false,
          scrub: true,
          markers: true,
        },
      });

      space += item.children[0].clientHeight;

      if (i < elements.length - 1) {
        const tl2 = gsap.timeline({
          scrollTrigger: {
            trigger: elements[i + 1],
            endTrigger: containers[containers.length - 1],
            start: `top top+=${120 + space}px`,
            end: `bottom top+=${120 + totalSpace}`,
            toggleActions: 'play none none reverse',
          },
        });
        tl2.to(item, {
          opacity: 0.5,
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return null;
};
