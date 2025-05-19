'use client';

import { PaddingBlock } from '@/sanity/types';
import { TailwindProps, WithChildren } from '@/types';
import { CSSProperties, LegacyRef } from 'react';

export interface PaddingContainerProps extends TailwindProps, WithChildren {
  padding?: PaddingBlock;
  style?: CSSProperties;
  ref?: LegacyRef<HTMLDivElement>;
  id?: string;
}

export const PaddingContainer = ({
  className,
  children,
  padding,
  id,
  style,
  ref,
}: PaddingContainerProps) => {
  return (
    <div
      id={id}
      ref={ref}
      style={style}
      className={`
      ${padding?.paddingTop?.value === 'S' ? 'pt-8 lg:pt-16' : padding?.paddingTop?.value === 'M' ? 'pt-14 lg:pt-28' : padding?.paddingTop?.value === 'L' ? 'pt-28 lg:pt-56' : ''}
      ${padding?.paddingBottom?.value === 'S' ? 'pb-8 lg:pb-16' : padding?.paddingBottom?.value === 'M' ? 'pb-14 lg:pb-28' : padding?.paddingBottom?.value === 'L' ? 'pb-28 lg:pb-56' : ''}
      ${className}
    `}
    >
      {children}
    </div>
  );
};
