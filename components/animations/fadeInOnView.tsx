'use client';

import { motion, useInView } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface FadeInOnViewProps {
  children: ReactNode;
  y?: number; // distanza iniziale Y
  delay?: number;
  duration?: number;
  once?: boolean;
  className?: string;
}

export const FadeInOnView = ({
  children,
  y = 50,
  delay = 0,
  duration = 0.6,
  once = true,
  className = '',
}: FadeInOnViewProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once,
    margin: '0px 0px -20% 0px',
  });

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{ opacity: 0, y }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration, delay, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </div>
  );
};
