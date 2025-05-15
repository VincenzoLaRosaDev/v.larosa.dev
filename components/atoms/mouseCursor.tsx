'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect } from 'react';

export const MouseCursor = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX - 700); // OFFSET DI METÀ DEL CERCHIO
      mouseY.set(e.clientY - 700);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '1400px',
        height: '1400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, #D7D1E9 0%, #D7D1E900 60%)',
        mixBlendMode: 'overlay',
        pointerEvents: 'none',
        zIndex: 20,
        x: springX,
        y: springY,
      }}
    />
  );
};
