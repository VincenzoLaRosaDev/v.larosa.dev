'use client';

import { TextReveal } from '@/components';
import { WithChildren } from '@/types';
import { getOffset } from '@/utils';
import { useTranslations } from 'next-intl';
import { ComponentProps, useEffect, useRef, useState } from 'react';

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
  ...rest
}: ScrollTitleContainerProps) => {
  const t = useTranslations('Index');

  const [initialPosition, setInitialPosition] = useState<number>(0);

  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInitialPosition((getOffset(container.current)?.top ?? 0) - 224);
  }, [container]);

  return (
    <div
      {...rest}
      id={'transitionContainer'}
      ref={container}
      className={`inline-flex w-full ${className}`}
    >
      <div className='flex justify-end absolute left-0 ml-2 lg:ml-0'>
        <h2
          id={'transitionTitle'}
          className={`text-vertical absolute left-0 lg:left-[unset] lg:right-6 h-fit text-nowrap pb-6 hover:opacity-[1 !important] pointer-events-auto text-xl lg:text-2xl tracking-[1.4px] font-bold first-letter:uppercase`}
          onClick={() => {
            scrollTo({
              top: initialPosition,
              behavior: 'smooth',
            });
          }}
        >
          <TextReveal text={title} className={`cursor-pointer px-1 py-2 rounded-lg relative text-text ${labelClass}`} />
        </h2>
      </div>
      <div className='w-full ml-10 lg:ml-0'>{children}</div>
    </div>
  );
};
