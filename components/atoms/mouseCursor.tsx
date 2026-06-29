'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';

type MouseCursorContextValue = {
  mounted: boolean;
  isHovering: boolean;
  isMobile: boolean;
  isInsideWindow: boolean;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  mouseY: ReturnType<typeof useMotionValue<number>>;
  glowX: ReturnType<typeof useSpring>;
  glowY: ReturnType<typeof useSpring>;
};

const MouseCursorContext = createContext<MouseCursorContextValue | null>(null);

function useMouseCursorContext() {
  const context = useContext(MouseCursorContext);
  if (!context) {
    throw new Error('MouseCursor components must be used within MouseCursorProvider');
  }
  return context;
}

export function MouseCursorProvider({ children }: { children: ReactNode }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [mounted, setMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isInsideWindow, setIsInsideWindow] = useState(true);

  const glowX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const glowY = useSpring(mouseY, { stiffness: 300, damping: 30 });

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
      setIsInsideWindow(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest(
        'a, button, [data-cursor-interactive]',
      );
      setIsHovering(!!isInteractive);
    };

    const handleMouseLeaveDocument = () => {
      setIsInsideWindow(false);
    };

    const handleVisibilityChange = () => {
      setIsInsideWindow(document.visibilityState !== 'hidden');
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
  }, [isMobile, mounted, mouseX, mouseY]);

  const value = useMemo(
    () => ({
      mounted,
      isHovering,
      isMobile,
      isInsideWindow,
      mouseX,
      mouseY,
      glowX,
      glowY,
    }),
    [mounted, isHovering, isMobile, isInsideWindow, mouseX, mouseY, glowX, glowY],
  );

  return (
    <MouseCursorContext.Provider value={value}>
      {children}
    </MouseCursorContext.Provider>
  );
}

export const MouseCursor = () => {
  const { mounted, isHovering, isMobile, isInsideWindow, mouseX, mouseY } =
    useMouseCursorContext();

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
              className="absolute rounded-full border border-white"
              style={{
                width: 16,
                height: 16,
                marginLeft: -8,
                marginTop: -8,
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
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
            className="rounded-full border border-white"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
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
    </>
  );
};

export const MouseGlow = () => {
  const { mounted, isMobile, glowX, glowY } = useMouseCursorContext();
  const glowTransform = useMotionTemplate`translate(${glowX}px, ${glowY}px) translate(-50%, -50%)`;

  if (!mounted) return null;

  if (isMobile) {
    return <div className="ambient-mouse-glow ambient-mouse-glow--center" />;
  }

  return (
    <motion.div
      className="ambient-mouse-glow"
      style={{ transform: glowTransform }}
    />
  );
};
