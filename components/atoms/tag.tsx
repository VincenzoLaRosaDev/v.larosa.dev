'use client';

import { TailwindProps, WithChildren } from '@/types';

export interface TagProps extends TailwindProps, WithChildren {
  live?: boolean;
}

export const Tag = ({ className, children, live }: TagProps) => {
  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs leading-3 text-primary rounded-full relative isolate bg-[var(--tag-bg)] border border-[var(--tag-border)] lg:backdrop-blur-[8px] ${live ? 'overflow-visible' : 'overflow-hidden'} ${className}`}
    >
      {live && (
        <span
          className="motion-safe:animate-rec-blink inline-flex h-[7px] w-[7px] shrink-0 rounded-full bg-primary will-change-[opacity]"
          aria-hidden
        />
      )}
      {children}
    </div>
  );
};
