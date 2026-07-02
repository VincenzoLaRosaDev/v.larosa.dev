'use client';

import { useIsLiteExperience } from '@/utils';
import { WithChildren } from '@/types';
import { useInView } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

export interface TextRevealProps
  extends WithChildren,
    React.HTMLAttributes<HTMLDivElement> {
  text: string;
  renew?: boolean;
  /** Run scramble animation on mobile (e.g. section scroll titles). */
  animateOnMobile?: boolean;
}

export const TextReveal = ({
  className,
  text,
  renew = false,
  animateOnMobile = false,
  ...rest
}: TextRevealProps) => {
  const animationChars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789§$%&';
  const minInterval = 100;
  const maxInterval = 200;
  const maxSteps = 10;
  const minSteps = 5;

  const textEl = useRef<HTMLSpanElement>(null);
  const textSpansRef = useRef<HTMLSpanElement[]>([]);
  const [hasAnimated, setHasAnimated] = useState(false);

  const textLetters = Array.from(text);
  const inView = useInView(textEl);

  const lite = useIsLiteExperience();
  const isLite = lite && !animateOnMobile;

  const InitialAnimatedLetter = () => {
    textSpansRef.current.forEach((span) => {
      span.textContent =
        animationChars[Math.floor(Math.random() * animationChars.length)];
    });
  };

  const AnimatedLetter = () => {
    textSpansRef.current.forEach((span, i) => {
      const animationSteps = Math.floor(
        Math.random() * (maxSteps - minSteps) + minSteps,
      );
      const animationInterval = Math.floor(
        Math.random() * (maxInterval - minInterval) + minInterval,
      );
      let stepsCount = 0;

      const _toggleChar = () => {
        if (stepsCount < animationSteps) {
          span.textContent =
            animationChars[Math.floor(Math.random() * animationChars.length)];
        } else {
          span.textContent = textLetters[i];
        }
      };

      const animate = () => {
        if (stepsCount <= animationSteps) {
          _toggleChar();
          stepsCount++;
          setTimeout(animate, animationInterval);
        }
      };

      animate();
    });
  };

  useEffect(() => {
    if (isLite || !textEl.current) return;

    textEl.current.innerHTML = '';
    textSpansRef.current = [];

    textLetters.forEach((letter) => {
      const span = document.createElement('span');
      span.classList.add('letter');
      span.textContent = letter;
      textEl.current?.appendChild(span);
      textSpansRef.current.push(span);
    });

    InitialAnimatedLetter();
  }, [isLite, text]);

  useEffect(() => {
    if (isLite) return;

    if (inView && !hasAnimated) {
      AnimatedLetter();
      setHasAnimated(true);
    }
    if (inView && renew) {
      AnimatedLetter();
      setHasAnimated(true);
    }
  }, [inView, hasAnimated, isLite, renew]);

  return (
    <span {...rest} ref={textEl} className={`inline-block ${className ?? ''}`}>
      {text}
    </span>
  );
};
