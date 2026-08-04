'use client';

import { isLightTileTone, tileToneVar, type TileTone } from '@/utils';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

export interface TileProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  /** Position in the tone ramp — pass the item index to keep neighbours apart. */
  tone?: TileTone;
  interactive?: boolean;
  active?: boolean;
}

export const Tile = forwardRef<HTMLDivElement, TileProps>(function Tile(
  { tone = 0, interactive, active, className, children, style, ...rest },
  ref,
) {
  const light = isLightTileTone(tone);

  return (
    <div
      ref={ref}
      data-interactive={interactive ? 'true' : undefined}
      data-active={active ? 'true' : undefined}
      data-scheme={light ? 'light' : undefined}
      className={`tile ${className ?? ''}`}
      style={{ ['--tile-bg' as any]: tileToneVar(tone), ...style }}
      {...rest}
    >
      {children}
    </div>
  );
});

export interface MosaicGridProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  /** stagger = 5-col grid for soft 40/60 alternating rows. */
  variant?: 'default' | 'stagger';
}

export const MosaicGrid = ({
  className,
  children,
  variant = 'default',
  ...rest
}: MosaicGridProps) => (
  <div
    className={`${
      variant === 'stagger'
        ? 'grid grid-cols-1 md:grid-cols-5 gap-0'
        : 'grid grid-cols-1 md:grid-cols-2 wide:grid-cols-3 gap-0'
    } ${className ?? ''}`}
    {...rest}
  >
    {children}
  </div>
);
