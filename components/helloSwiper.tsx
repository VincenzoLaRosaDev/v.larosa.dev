'use client';

import { HELLO_ARRAY } from '@/constants';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { TailwindProps } from '@/types';
import { Cursor, TextReveal } from './atoms';
import { useRef, useEffect } from 'react';
import { useInView } from 'framer-motion';
import Image from 'next/image'

export interface HelloSwiperProps extends TailwindProps {}

export const HelloSwiper = ({ className }: HelloSwiperProps) => {
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
      className="w-full flex items-center justify-between gap-8"
    >
      <Image
        src="/vincenzo-la-rosa-purple.jpg"
        alt="Vincenzo La Rosa"
        width={80}
        height={80}
        className="z-10 h-20 w-20 min-h-20 min-w-20 rounded-full overflow-hidden"
      />

      <div className={`w-full max-w-[230px] text-reverse ${className ?? ''}`}>
        <Swiper
          className="pointer-events-none rounded-xl h-20 bg-grey/5 border-t border-light/20 !mb-0"
          style={{ margin: 0, padding: '0 10px 0 20px' }}
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
          <div className="absolute left-4 top-1/2 translate-y-[-50%] font-bold text-3xl text-text">
            {'>'}
          </div>
          <Cursor className="absolute right-4 top-1/2 translate-y-[-50%]" />

          {HELLO_ARRAY.map((item) => (
            <SwiperSlide
              key={item.label}
              className="font-bold text-3xl"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {({ isActive }) => (
                <TextReveal
                  text={`${item.label}!`}
                  renew={isActive && inView}
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
