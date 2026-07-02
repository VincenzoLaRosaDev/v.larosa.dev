'use client';

import { WithChildren } from '@/types';
import { motion, useInView } from 'framer-motion';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

interface FadeInOnViewProps extends WithChildren {}

function isInViewport(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}

export const FadeInOnView = ({ children }: FadeInOnViewProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0 });
  const [revealed, setRevealed] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (el && isInViewport(el)) {
      setRevealed(true);
    }
  }, []);

  useEffect(() => {
    if (isInView) {
      setRevealed(true);
    }
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={
        revealed
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 24 }
      }
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};
