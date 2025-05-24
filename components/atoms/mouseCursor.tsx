'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export const MouseCursor = () => {
  const { theme } = useTheme();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [mounted, setMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isInsideWindow, setIsInsideWindow] = useState(true);

  const glowX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const glowY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  const glowOffsetX = useMotionValue(0);
  const glowOffsetY = useMotionValue(0);

  useEffect(() => {
    return glowX.onChange((v) => glowOffsetX.set(v - 700));
  }, [glowX]);

  useEffect(() => {
    return glowY.onChange((v) => glowOffsetY.set(v - 700));
  }, [glowY]);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;

    const checkViewport = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsMobile(hasTouch);
    };

    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, [mounted]);

  useEffect(() => {
    if (!mounted || isMobile) return;

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isInsideWindow) setIsInsideWindow(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest(
        'a, button, [data-cursor-interactive]',
      );
      setIsHovering(!!isInteractive);
    };

    const handleMouseLeaveDocument = (e: MouseEvent) => {
      setIsInsideWindow(false);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        setIsInsideWindow(false);
      } else {
        setIsInsideWindow(true);
      }
    };

    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeaveDocument);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeaveDocument);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isMobile, mounted, isInsideWindow, mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <>
      {isInsideWindow && !isMobile && (
        <motion.div
          className="fixed top-0 left-0 z-[1000] pointer-events-none"
          style={{
            x: mouseX,
            y: mouseY,
          }}
        >
          {isHovering && (
            <motion.div
              className="absolute rounded-full border"
              style={{
                width: 16,
                height: 16,
                marginLeft: -8,
                marginTop: -8,
                backgroundColor:
                  theme === 'dark'
                    ? 'rgba(255, 255, 255, 0.5)'
                    : 'rgba(0, 0, 0, 0.5)',
                borderColor: theme === 'dark' ? 'white' : 'black',
                zIndex: -1,
              }}
              animate={{
                scale: [1, 1.5, 2],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          )}

          <motion.div
            className="rounded-full border"
            style={{
              borderColor: theme === 'dark' ? 'white' : 'black',
              backgroundColor:
                theme === 'dark' ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.2)',
            }}
            animate={{
              width: isHovering ? 16 : 24,
              height: isHovering ? 16 : 24,
              marginLeft: isHovering ? -8 : -16,
              marginTop: isHovering ? -8 : -16,
              transition: { type: 'spring', stiffness: 300, damping: 20 },
            }}
          />
        </motion.div>
      )}

      {theme === 'dark' && (
        <motion.div
          className={`bg-gradient-radial from-[#D7D1E970] from-0% to-[#D7D1E900] to-60% pointer-events-none`}
          style={{
            position: 'fixed',
            top: isMobile ? '50vh' : 0,
            left: isMobile ? '50vw' : 0,
            width: '1400px',
            height: '1400px',
            borderRadius: '50%',
            mixBlendMode: 'overlay',
            zIndex: 50,
            x: isMobile ? 0 : glowOffsetX,
            y: isMobile ? 0 : glowOffsetY,
            translateX: isMobile ? '-50%' : undefined,
            translateY: isMobile ? '-50%' : undefined,
          }}
        />
      )}
    </>
  );
};
