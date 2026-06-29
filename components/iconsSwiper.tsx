'use client';

import { IconsSwiper as IconsSwiperSanity } from '@/sanity/types';
import { TailwindProps } from '@/types';
import { PaddingContainer } from './atoms';
import { useMemo, useRef } from 'react';
import { useAnimationFrame } from 'motion/react';
import { ScrollTitleContainer } from './scrollTitleContainer';
import { FadeInOnView } from './animations';

export interface IconsSwiperProps extends TailwindProps {
  id: IconsSwiperSanity['id'];
  title: IconsSwiperSanity['title'];
  paddingBlock: IconsSwiperSanity['paddingBlock'];
  icons: IconsSwiperSanity['icons'];
  speed?: number;
}

export const IconsSwiper = ({
  className,
  id,
  title,
  paddingBlock,
  icons,
  speed = 50,
}: IconsSwiperProps) => {
  return (
    icons && (
      <PaddingContainer
        id={id}
        padding={{ _type: 'paddingBlock', ...paddingBlock }}
        className={`relative w-full py-8 ${className}`}
      >
        <ScrollTitleContainer title={title ?? ''}>
          <FadeInOnView>
            <div className="overflow-hidden h-full relative [mask-image:linear-gradient(to_right,transparent,black_48px,black_calc(100%-48px),transparent)]">
              <SwiperRow icons={icons} speed={speed} reverse={false} />
              <div className="h-4 lg:h-8" />
              <SwiperRow icons={icons} speed={speed} reverse={true} />
            </div>
          </FadeInOnView>
        </ScrollTitleContainer>
      </PaddingContainer>
    )
  );
};

function shuffleWithSeed<T>(items: T[], seed: number): T[] {
  const shuffled = [...items];
  let state = seed;

  const next = () => {
    state = (state * 1103515245 + 12345) & 0x7fffffff;
    return state / 0x7fffffff;
  };

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(next() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

interface SwiperRowProps {
  icons: string[];
  speed: number;
  reverse?: boolean;
}

export const SwiperRow = ({
  icons,
  speed,
  reverse = false,
}: SwiperRowProps) => {
  const duplicatedIcons = useMemo(() => {
    const shuffled = shuffleWithSeed(icons, reverse ? 7919 : 104729);
    return [...shuffled, ...shuffled];
  }, [icons, reverse]);
  const containerRef = useRef<HTMLDivElement>(null);
  const baseX = useRef(0);

  useAnimationFrame((t, delta) => {
    const moveBy = (speed * delta) / 1000;
    baseX.current += reverse ? moveBy : -moveBy;

    const container = containerRef.current;
    if (!container) return;

    const children = Array.from(container.children).slice(
      0,
      duplicatedIcons.length / 2,
    );
    const totalWidth = children.reduce(
      (sum, el) => sum + (el as HTMLElement).offsetWidth,
      0,
    );

    const shift = baseX.current % totalWidth;
    container.style.transform = `translateX(${Math.floor(shift)}px)`;
  });

  return (
    <div className={`relative h-[64px] ${!reverse ? 'mb-[100px]' : ''}`}>
      <div
        className={`absolute flex min-w-max will-change-transform ${reverse ? 'right-0' : 'left-0'}`}
        ref={containerRef}
      >
        {duplicatedIcons.map((icon, index) => (
          <div
            key={`swiper-${index}`}
            className="[&>*]:h-[64px] [&>*]:w-[64px] flex-shrink-0 px-10"
            dangerouslySetInnerHTML={{ __html: icon ?? '' }}
            suppressHydrationWarning
          />
        ))}
      </div>
    </div>
  );
};
