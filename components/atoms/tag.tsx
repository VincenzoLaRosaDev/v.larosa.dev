'use client';

import { TailwindProps, WithChildren } from '@/types';

export interface TagProps extends TailwindProps, WithChildren {
  live?: boolean;
}

export const Tag = ({ className, children, live }: TagProps) => {
  return (
    <div
      className={`inline-flex items-center gap-2 px-3.5 py-2 text-sm leading-none text-primary relative isolate bg-[var(--tag-bg)] ${live ? 'overflow-visible' : 'overflow-hidden'} ${className}`}
    >
      {live && (
        <span
          className="motion-safe:animate-rec-blink inline-flex h-[7px] w-[7px] shrink-0 bg-primary will-change-[opacity]"
          aria-hidden
        />
      )}
      {children}
    </div>
  );
};
