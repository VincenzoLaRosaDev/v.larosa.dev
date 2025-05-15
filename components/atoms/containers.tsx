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
      ${padding?.paddingTop?.value === 'S' ? 'pt-6 lg:pt-[50px]' : padding?.paddingTop?.value === 'M' ? 'pt-12 lg:pt-[100px]' : padding?.paddingTop?.value === 'L' ? 'pt-24 lg:pt-[200px]' : ''}
      ${padding?.paddingBottom?.value === 'S' ? 'pb-6 lg:pb-[50px]' : padding?.paddingBottom?.value === 'M' ? 'pb-12 lg:pb-[100px]' : padding?.paddingBottom?.value === 'L' ? 'pb-24 lg:pb-[200px]' : ''}
      ${className}
    `}
    >
      {children}
    </div>
  );
};
