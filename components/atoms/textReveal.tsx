'use client';

import { useIsLiteExperience } from '@/utils';
import { WithChildren } from '@/types';
import { useInView } from 'motion/react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

export interface TextRevealProps
  extends WithChildren,
    React.HTMLAttributes<HTMLDivElement> {
  text: string;
  renew?: boolean;
  /** Run scramble animation on mobile (e.g. section scroll titles). */
  animateOnMobile?: boolean;
}

const ANIMATION_CHARS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789§$%&';
const MIN_INTERVAL = 100;
const MAX_INTERVAL = 200;
const MAX_STEPS = 10;
const MIN_STEPS = 5;

function randomChar() {
  return ANIMATION_CHARS[Math.floor(Math.random() * ANIMATION_CHARS.length)];
}

function scrambledLetters(value: string) {
  return Array.from(value, () => randomChar());
}

export const TextReveal = ({
  className,
  text,
  renew = false,
  animateOnMobile = false,
  ...rest
}: TextRevealProps) => {
  const textEl = useRef<HTMLSpanElement>(null);
  const hasAnimatedRef = useRef(false);
  const [scrambleGen, setScrambleGen] = useState(0);

  const inView = useInView(textEl);

  const lite = useIsLiteExperience();
  const isLite = lite && !animateOnMobile;

  const [ready, setReady] = useState(false);
  const [letters, setLetters] = useState<string[]>([]);

  useLayoutEffect(() => {
    setReady(true);
    hasAnimatedRef.current = false;
    if (isLite) {
      setLetters([]);
      return;
    }
    setLetters(scrambledLetters(text));
    setScrambleGen((n) => n + 1);
  }, [isLite, text]);

  useEffect(() => {
    if (isLite || !ready) return;

    if (!inView) {
      hasAnimatedRef.current = false;
      return;
    }

    const shouldAnimate = !hasAnimatedRef.current || renew;
    if (!shouldAnimate) return;

    hasAnimatedRef.current = true;
    const timeoutIds: ReturnType<typeof setTimeout>[] = [];
    const targets = Array.from(text);

    targets.forEach((target, i) => {
      const animationSteps = Math.floor(
        Math.random() * (MAX_STEPS - MIN_STEPS) + MIN_STEPS,
      );
      const animationInterval = Math.floor(
        Math.random() * (MAX_INTERVAL - MIN_INTERVAL) + MIN_INTERVAL,
      );
      let stepsCount = 0;

      const animate = () => {
        if (stepsCount <= animationSteps) {
          setLetters((prev) => {
            const next = [...prev];
            next[i] =
              stepsCount < animationSteps ? randomChar() : target;
            return next;
          });
          stepsCount++;
          timeoutIds.push(setTimeout(animate, animationInterval));
        }
      };

      animate();
    });

    return () => {
      timeoutIds.forEach(clearTimeout);
    };
  }, [inView, isLite, ready, renew, text, scrambleGen]);

  return (
    <span {...rest} ref={textEl} className={`inline-block ${className ?? ''}`}>
      {isLite || !ready
        ? text
        : letters.map((letter, i) => (
            <span key={`${text}-${i}`} className="letter">
              {letter}
            </span>
          ))}
    </span>
  );
};
