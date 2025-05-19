'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export const MouseCursor = () => {
  const { theme } = useTheme();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 1024); // tailwind lg breakpoint
    };

    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  useEffect(() => {
    if (isMobile) {
      const centerX = window.innerWidth / 2 - 700;
      const centerY = window.innerHeight / 2 - 700;
      mouseX.set(centerX);
      mouseY.set(centerY);
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX - 700);
      mouseY.set(e.clientY - 700);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [isMobile, mouseX, mouseY]);

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '1400px',
        height: '1400px',
        borderRadius: '50%',
        background:
          theme === 'dark'
            ? 'radial-gradient(circle, #D7D1E990 0%, #D7D1E900 60%)'
            : 'radial-gradient(circle, #D7D1E930 0%, #D7D1E900 60%)',
        mixBlendMode: 'overlay',
        pointerEvents: 'none',
        zIndex: 50,
        x: springX,
        y: springY,
      }}
      suppressHydrationWarning
    />
  );
};
