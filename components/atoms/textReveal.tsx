'use client';

import { WithChildren } from '@/types';
import { useInView } from 'motion/react';
import { useEffect, useRef } from 'react';

export interface TextRevealProps
  extends WithChildren,
    React.HTMLAttributes<HTMLDivElement> {
  text: string;
}

export const TextReveal = ({ className, text, ...rest }: TextRevealProps) => {
  // const animationChars = "█▓▒░█▓▒░█▓▒░▙▚▛▜▞";
  const animationChars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789§$%&';
  const minInterval = 100;
  const maxInterval = 200;
  const maxSteps = 10;
  const minSteps = 5;

  const textEl = useRef<HTMLDivElement>(null);

  const textLetters = Array.from(text);
  const textSpans: unknown[] = [];

  const inView = useInView(textEl);
  // Class to animate letter a random number of times until correct value is shown
  const AnimatedLetter = (
    textSpans: Array<{ textContent: string }>,
    originalValue: string[],
  ) => {
    textSpans.forEach((span: { textContent: string }, i: number) => {
      const animationSteps = Math.floor(
        Math.random() * (maxSteps - minSteps) + minSteps,
      );
      const animationInterval = Math.floor(
        Math.random() * (maxInterval - minInterval) + minInterval,
      );
      let stepsCount = 0;

      function _toggleChar() {
        if (stepsCount < animationSteps) {
          span.textContent =
            animationChars[Math.floor(Math.random() * animationChars.length)];
        } else {
          span.textContent = originalValue[i];
        }
      }

      function animate() {
        if (stepsCount <= animationSteps) {
          _toggleChar();
          stepsCount++;
          setTimeout(() => animate(), animationInterval);
        }
      }

      animate();
    });
  };

  const InitialAnimatedLetter = (textSpans: Array<{ textContent: string }>) => {
    textSpans.forEach((span: { textContent: string }) => {
      span.textContent =
        animationChars[Math.floor(Math.random() * animationChars.length)];
    });
  };

  // Wrap each letter on a span and add them to the textSpans array.
  // Replace original content with the spans
  function wrapLetters() {
    textLetters.forEach((letter) => {
      const span = document.createElement('span');
      span.classList.add('letter');
      span.textContent = letter;
      textSpans.push(span);
    });

    if (textEl.current) {
      textEl.current.innerHTML = '';
      textSpans.forEach((span) => {
        textEl.current?.appendChild(span as unknown as Node);
      });
    }
  }

  // Wrap letters and create class instance for each letter

  // Initialize demo
  useEffect(() => {
    wrapLetters();
    InitialAnimatedLetter(textSpans as Array<{ textContent: string }>);
    if (inView) {
      AnimatedLetter(textSpans as Array<{ textContent: string }>, textLetters);
    }
  }, [inView]);

  return (
    <div {...rest} ref={textEl} className={className ?? ''}>
      {text}
    </div>
  );
};
