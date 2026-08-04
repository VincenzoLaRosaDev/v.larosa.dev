'use client';

import { PaddingBlock } from '@/sanity/types';
import { TailwindProps, WithChildren } from '@/types';
import {
  Children,
  CSSProperties,
  LegacyRef,
  ReactElement,
  cloneElement,
  isValidElement,
} from 'react';

export interface PaddingContainerProps extends TailwindProps, WithChildren {
  padding?: PaddingBlock;
  style?: CSSProperties;
  ref?: LegacyRef<HTMLDivElement>;
  id?: string;
}

function paddingClasses(padding?: PaddingBlock) {
  const top =
    padding?.paddingTop?.value === 'S'
      ? 'pt-8 lg:pt-16'
      : padding?.paddingTop?.value === 'M'
        ? 'pt-14 lg:pt-28'
        : padding?.paddingTop?.value === 'L'
          ? 'pt-28 lg:pt-56'
          : '';
  const bottom =
    padding?.paddingBottom?.value === 'S'
      ? 'pb-8 lg:pb-16'
      : padding?.paddingBottom?.value === 'M'
        ? 'pb-14 lg:pb-28'
        : padding?.paddingBottom?.value === 'L'
          ? 'pb-28 lg:pb-56'
          : '';
  return `${top} ${bottom}`.trim();
}

export const PaddingContainer = ({
  className,
  children,
  padding,
  id,
  style,
  ref,
}: PaddingContainerProps) => {
  const sectionClassName = `${paddingClasses(padding)} ${className ?? ''}`.trim();

  const child = Children.map(children, (node) => {
    if (!isValidElement(node)) return node;
    return cloneElement(
      node as ReactElement<{ sectionClassName?: string; id?: string }>,
      {
        sectionClassName,
        ...(id ? { id } : {}),
      },
    );
  });

  // `lg:contents` promotes sticky titles to the shared #scroll-title-stack parent
  // so they remain stuck until the end of all sections (matches former GSAP pin end).
  // Section `id` is forwarded onto ScrollTitleContainer (real box) for anchors.
  return (
    <div ref={ref} style={style} className="lg:contents">
      {child}
    </div>
  );
};
