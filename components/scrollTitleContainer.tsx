'use client';

import { WithChildren } from '@/types';
import { ComponentProps, useEffect, useRef, useState } from 'react';
import { TextReveal } from './atoms';
import { getOffset } from '@/utils';

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
    const offset = getOffset(container.current)?.top ?? 0;
    setInitialPosition(offset - 80);
  }, []);

  const scrollToSection = () => {
    window.scrollTo({ top: initialPosition, behavior: 'smooth' });
  };

  return (
    <div
      {...rest}
      id="transitionContainer"
      ref={container}
      className={`inline-flex w-full relative ${className}`}
      style={{ transform: 'translateZ(0)' }}
    >
      <div className="hidden lg:flex absolute left-[-448px] justify-end">
        <h2
          data-cursor-interactive
          onClick={scrollToSection}
          className={`h-fit z-50 w-auto text-nowrap pb-3 text-xs text-text hover:!opacity-100 archivo-black uppercase transition-opacity transition-font`}
        >
          <TextReveal
            text={title}
            className={`px-1 py-2 relative text-text ${labelClass}`}
          />
        </h2>
      </div>

      <div className="w-full relative">
        <h2
          className="lg:hidden z-10 sticky top-0 px-3 py-3 bg-background text-text archivo-black uppercase leading-8"
          onClick={scrollToSection}
        >
          <TextReveal
            text={title}
            className={`text-text ${labelClass}`}
          />
        </h2>

        <div className="px-3 lg:px-0 mt-6 lg:mt-0">
          {children}
        </div>
      </div>
    </div>
  );
};
