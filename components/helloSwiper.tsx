'use client';

import { HELLO_ARRAY } from '@/constants';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Cursor, TextReveal } from '@/components';
import { TailwindProps } from '@/types';

export interface HelloSwiperProps extends TailwindProps {}

export const HelloSwiper = ({ className }: HelloSwiperProps) => {
  return (
    <div className="w-full flex items-center justify-between">
      <img
        src="/vincenzo-la-rosa-purple.jpg"
        alt="Vincenzo La Rosa"
        width={80}
        height={80}
        className="z-50 h-20 w-20 rounded-full overflow-hidden"
      />

      <div
        className={`w-full lg:max-w-[230px] text-reverse ${className ?? ''}`}
      >
        <Swiper
          className={`pointer-events-none h-16 rounded-xl lg:h-20 bg-light-grey/5 !mb-0`}
          style={{
            margin: 0,
            marginBottom: '20px',
            padding: '0 10px 0 20px',
          }}
          spaceBetween={0}
          slidesPerView={1}
          direction="vertical"
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop
          modules={[Autoplay]}
        >
          <div className="absolute left-4 top-1/2 translate-y-[-50%] text-2xl font-bold lg:text-3xl text-text">
            {'>'}
          </div>
          <Cursor className="absolute right-4 top-1/2 translate-y-[-50%]" />
          {HELLO_ARRAY.map((item) => (
            <SwiperSlide
              key={item.label}
              className="text-2xl font-bold lg:text-3xl"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <TextReveal text={`${item.label}!`} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
