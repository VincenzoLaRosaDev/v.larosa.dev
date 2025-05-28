'use client';

import { WithChildren } from '@/types';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface FadeInOnViewProps extends WithChildren {}

export const FadeInOnView = ({ children }: FadeInOnViewProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      setIsMobile(width < 1024);
    }
  }, []);

  if (isMobile) {
    return <div>{children}</div>;
  }

  return (
    <motion.div
      style={{ willChange: 'opacity, transform', transform: 'translateZ(0)' }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut' },
      }}
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
};
