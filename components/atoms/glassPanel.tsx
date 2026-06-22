import { TailwindProps, WithChildren } from '@/types';

export interface GlassPanelProps extends TailwindProps, WithChildren {
  rounded?: 'rounded-2xl' | 'rounded-full';
}

export const GlassPanel = ({
  className,
  children,
  rounded = 'rounded-2xl',
}: GlassPanelProps) => {
  return (
    <div className={`glass-panel ${rounded} ${className ?? ''}`}>
      {children}
    </div>
  );
};
