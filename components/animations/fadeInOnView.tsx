'use client';

import { WithChildren } from '@/types';
import { motion } from 'framer-motion';

interface FadeInOnViewProps extends WithChildren {}

export const FadeInOnView = ({ children }: FadeInOnViewProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: 'easeOut' },
      }}
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </motion.div>
  );
};
