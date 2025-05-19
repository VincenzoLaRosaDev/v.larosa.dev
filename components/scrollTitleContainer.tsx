'use client';

import { WithChildren } from '@/types';
import { getOffset } from '@/utils';
import { ComponentProps, useEffect, useRef, useState } from 'react';
import { TextReveal } from './atoms';

export interface ScrollTitleContainerProps
  extends WithChildren,
    React.HTMLAttributes<HTMLDivElement> {
  title: string;
  labelClass?: ComponentProps<any>['className'];
}

export const ScrollTitleContainer = ({
  children,
  className,
  labelClass,
  title,
  id,
  ...rest
}: ScrollTitleContainerProps) => {
  const [initialPosition, setInitialPosition] = useState<number>(0);

  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInitialPosition((getOffset(container.current)?.top ?? 0) - 80);
  }, [container]);

  return (
    <div
      {...rest}
      id={'transitionContainer'}
      ref={container}
      className={`inline-flex w-full ${className}`}
    >
      <div className="justify-end absolute left-[-448px] hidden lg:flex">
        <h2
          id={'transitionTitle'}
          className={`h-fit w-auto text-nowrap pb-3 text-xs text-text hover:!opacity-100 archivo-black uppercase transition-opacity transition-font cursor-pointer`}
          onClick={() => {
            scrollTo({
              top: initialPosition,
              behavior: 'smooth',
            });
          }}
        >
          <TextReveal
            text={title}
            className={`px-1 py-2 relative text-text ${labelClass}`}
          />
        </h2>
      </div>
      <div className="lg:fixed lg:left-0 lg:bottom-0 lg:h-28 lg:w-full lg:max-w-96 lg:bg-gradient-to-t lg:from-bg"></div>
      <div className="w-full relative">
        <h2
          className="lg:hidden z-20 sticky top-0 backdrop-blur-sm px-3 py-3"
          onClick={() => {
            scrollTo({
              top: initialPosition,
              behavior: 'smooth',
            });
          }}
        >
          <TextReveal
            text={title}
            className={`text-text archivo-black uppercase leading-8 ${labelClass}`}
          />
        </h2>
        <div className="px-3 lg:px-0 mt-6 lg:mt-0">{children}</div>
      </div>
    </div>
  );
};
