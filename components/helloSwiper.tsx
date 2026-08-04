'use client';

import { HELLO_ARRAY } from '@/constants';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { TailwindProps } from '@/types';
import { Cursor, TextReveal, Tile } from './atoms';
import { useRef, useEffect } from 'react';
import { useInView } from 'framer-motion';

export interface HelloSwiperProps extends TailwindProps {
  /** responsive: 230px (full-width sotto 425px). fill: 100% del parent. */
  layout?: 'responsive' | 'fill';
}

export const HelloSwiper = ({
  className,
  layout = 'responsive',
}: HelloSwiperProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { amount: 0.3 });
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    if (swiperRef.current?.autoplay) {
      if (inView) {
        swiperRef.current.autoplay.start();
      } else {
        swiperRef.current.autoplay.stop();
      }
    }
  }, [inView]);

  return (
    <div
      ref={containerRef}
      className={`hello-swiper hello-swiper--${layout} ${className ?? ''}`}
    >
      <Tile tone={2} className="hello-swiper__panel overflow-hidden">
        {/* CLI row: `> greeting█` — left-aligned, caret after the word */}
        <div className="flex h-full w-full items-center gap-3 px-6 lg:px-8 font-bold text-3xl">
          <span
            className="shrink-0 text-text-light select-none leading-none"
            aria-hidden
          >
            {'>'}
          </span>

          <div className="flex h-full min-w-0 items-center gap-2">
            <Swiper
              className="pointer-events-none h-full w-[8ch] !m-0 !mb-0 bg-transparent"
              spaceBetween={0}
              slidesPerView={1}
              direction="vertical"
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              loop
              modules={[Autoplay]}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
            >
              {HELLO_ARRAY.map((item) => (
                <SwiperSlide
                  key={item.label}
                  className="!flex items-center justify-start leading-none"
                >
                  {({ isActive }) => (
                    <TextReveal
                      animateOnMobile
                      text={`${item.label}!`}
                      renew={isActive && inView}
                    />
                  )}
                </SwiperSlide>
              ))}
            </Swiper>

            <Cursor className="shrink-0" />
          </div>
        </div>
      </Tile>
    </div>
  );
};
