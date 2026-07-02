'use client';

import { useIsLiteExperience } from '@/utils';
import { useEffect, useRef } from 'react';

interface OrbState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

const ORB_SPEED_SCALE = 1;

// Orbs collide with each other (as well as bouncing off the screen margins) so
// all three never stack on the same spot and blow out into a single over-bright
// hotspot. Sizes are kept large; the expanded bleed gives them room to travel.
const ORB_LAYOUT = [
  { sizeRatio: 0.6, speed: 34 },
  { sizeRatio: 0.65, speed: 38 },
  { sizeRatio: 0.7, speed: 40 },
];

const START_POSITIONS = [
  { x: 0.08, y: 0.12 },
  { x: 0.58, y: 0.52 },
  { x: 0.22, y: 0.62 },
];

const START_ANGLES = [0.6, 2.4, 3.8];

const ORB_CLASSES = [
  'ambient-orb--teal',
  'ambient-orb--teal-alt',
  'ambient-orb--gold',
];

function parseCssLength(value: string) {
  const trimmed = value.trim();
  if (trimmed.endsWith('vw')) {
    return (window.innerWidth * parseFloat(trimmed)) / 100;
  }
  if (trimmed.endsWith('vh')) {
    return (window.innerHeight * parseFloat(trimmed)) / 100;
  }
  return parseFloat(trimmed) || 0;
}

function getAmbientBleed() {
  const layer = document.querySelector('.ambient-layer');
  if (!layer) {
    return { bleedX: 0, bleedY: 0 };
  }

  const styles = getComputedStyle(layer);
  return {
    bleedX: parseCssLength(styles.getPropertyValue('--ambient-bleed-x') || '0'),
    bleedY: parseCssLength(styles.getPropertyValue('--ambient-bleed-y') || '0'),
  };
}

function getOrbSize(viewportWidth: number, sizeRatio: number) {
  return viewportWidth * sizeRatio;
}

function getOrbCenter(orb: OrbState) {
  return { cx: orb.x + orb.size / 2, cy: orb.y + orb.size / 2 };
}

function createOrbs(
  boundsWidth: number,
  boundsHeight: number,
  viewportWidth: number,
): OrbState[] {
  return ORB_LAYOUT.map((layout, index) => {
    const size = getOrbSize(viewportWidth, layout.sizeRatio);
    const maxX = Math.max(boundsWidth - size, 0);
    const maxY = Math.max(boundsHeight - size, 0);
    const angle = START_ANGLES[index] + (Math.random() - 0.5) * 0.25;

    return {
      x: maxX * START_POSITIONS[index].x,
      y: maxY * START_POSITIONS[index].y,
      vx: Math.cos(angle) * layout.speed * ORB_SPEED_SCALE,
      vy: Math.sin(angle) * layout.speed * ORB_SPEED_SCALE,
      size,
    };
  });
}

function resolveOrbCollisions(orbs: OrbState[]) {
  for (let pass = 0; pass < 2; pass++) {
    for (let i = 0; i < orbs.length; i++) {
      for (let j = i + 1; j < orbs.length; j++) {
        const a = orbs[i];
        const b = orbs[j];
        const aCenter = getOrbCenter(a);
        const bCenter = getOrbCenter(b);
        const dx = bCenter.cx - aCenter.cx;
        const dy = bCenter.cy - aCenter.cy;
        const dist = Math.hypot(dx, dy);
        const minDist = (a.size + b.size) * 0.34;

        if (dist >= minDist || dist === 0) continue;

        const nx = dx / dist;
        const ny = dy / dist;
        const overlap = minDist - dist;

        a.x -= nx * overlap * 0.5;
        a.y -= ny * overlap * 0.5;
        b.x += nx * overlap * 0.5;
        b.y += ny * overlap * 0.5;

        const dvx = a.vx - b.vx;
        const dvy = a.vy - b.vy;
        const dot = dvx * nx + dvy * ny;

        if (dot > 0) {
          a.vx -= dot * nx;
          a.vy -= dot * ny;
          b.vx += dot * nx;
          b.vy += dot * ny;
        }
      }
    }
  }
}

function applyOrbToElement(orb: OrbState, el: HTMLDivElement) {
  el.style.width = `${orb.size}px`;
  el.style.height = `${orb.size}px`;
  el.style.transform = `translate3d(${Math.round(orb.x)}px, ${Math.round(orb.y)}px, 0)`;
}

function clampOrbs(orbs: OrbState[], width: number, height: number) {
  orbs.forEach((orb) => {
    const maxX = Math.max(width - orb.size, 0);
    const maxY = Math.max(height - orb.size, 0);
    orb.x = Math.min(Math.max(orb.x, 0), maxX);
    orb.y = Math.min(Math.max(orb.y, 0), maxY);
  });
}

function syncOrbSizes(orbs: OrbState[], viewportWidth: number) {
  orbs.forEach((orb, index) => {
    orb.size = getOrbSize(viewportWidth, ORB_LAYOUT[index].sizeRatio);
  });
}

function getExpandedBounds() {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const { bleedX, bleedY } = getAmbientBleed();

  return {
    width: viewportWidth + bleedX * 2,
    height: viewportHeight + bleedY * 2,
    viewportWidth,
  };
}

const AmbientOrbsAnimated = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbRefs = useRef<(HTMLDivElement | null)[]>([]);
  const orbsRef = useRef<OrbState[]>([]);
  const boundsRef = useRef({ width: 0, height: 0, viewportWidth: 0 });
  const reducedMotionRef = useRef(false);

  const syncBounds = () => {
    const el = containerRef.current;
    if (el) {
      boundsRef.current = {
        width: el.clientWidth,
        height: el.clientHeight,
        viewportWidth: window.innerWidth,
      };
      return boundsRef.current;
    }
    const bounds = getExpandedBounds();
    boundsRef.current = bounds;
    return bounds;
  };

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    const { width, height, viewportWidth } = syncBounds();
    orbsRef.current = createOrbs(width, height, viewportWidth);
    orbsRef.current.forEach((orb, index) => {
      const el = orbRefs.current[index];
      if (el) applyOrbToElement(orb, el);
    });

    let raf = 0;
    let lastTime = performance.now();

    const tick = (time: number) => {
      const delta = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;
      const { width, height } = boundsRef.current;

      if (!reducedMotionRef.current) {
        orbsRef.current.forEach((orb) => {
          orb.x += orb.vx * delta;
          orb.y += orb.vy * delta;

          if (orb.x <= 0) {
            orb.x = 0;
            orb.vx = Math.abs(orb.vx);
          }
          if (orb.y <= 0) {
            orb.y = 0;
            orb.vy = Math.abs(orb.vy);
          }
          if (orb.x + orb.size >= width) {
            orb.x = width - orb.size;
            orb.vx = -Math.abs(orb.vx);
          }
          if (orb.y + orb.size >= height) {
            orb.y = height - orb.size;
            orb.vy = -Math.abs(orb.vy);
          }
        });

        resolveOrbCollisions(orbsRef.current);
        clampOrbs(orbsRef.current, width, height);

        orbsRef.current.forEach((orb, index) => {
          const el = orbRefs.current[index];
          if (el) {
            el.style.transform = `translate3d(${Math.round(orb.x)}px, ${Math.round(orb.y)}px, 0)`;
          }
        });
      }

      raf = requestAnimationFrame(tick);
    };

    const handleResize = () => {
      const { width, height, viewportWidth } = syncBounds();
      syncOrbSizes(orbsRef.current, viewportWidth);
      clampOrbs(orbsRef.current, width, height);
      orbsRef.current.forEach((orb, index) => {
        const el = orbRefs.current[index];
        if (el) applyOrbToElement(orb, el);
      });
    };

    raf = requestAnimationFrame(tick);
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div ref={containerRef} className="ambient-orbs">
      {ORB_LAYOUT.map((_, index) => (
        <div
          key={index}
          ref={(el) => {
            orbRefs.current[index] = el;
          }}
          className="ambient-orb-track"
        >
          <div className={`ambient-orb ${ORB_CLASSES[index]}`} />
        </div>
      ))}
    </div>
  );
};

export const AmbientOrbs = () => {
  const isLite = useIsLiteExperience();

  if (isLite) return null;

  return <AmbientOrbsAnimated />;
};
