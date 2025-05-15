import { TailwindProps, WithChildren } from '@/types';

export interface TagProps extends TailwindProps, WithChildren {}

export const Tag = ({ className, children }: TagProps) => {
  return (
    <div
      className={`inline px-3 py-1.5 text-xs leading-3 text-primary bg-primary-100 rounded-full overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
};
