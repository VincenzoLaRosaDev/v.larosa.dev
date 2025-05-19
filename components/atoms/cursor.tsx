'use client';

import { TailwindProps } from '@/types';

export const Cursor = ({ className }: TailwindProps) => {
  return (
    <div className={`h-8 w-1.5 animate-cursor-pulse bg-text ${className}`} />
  );
};
