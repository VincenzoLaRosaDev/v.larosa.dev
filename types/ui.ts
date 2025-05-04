import { ComponentProps } from 'react';

export interface TailwindProps {
  className?: ComponentProps<'div'>['className'];
}

export interface WithChildren {
  children?: React.ReactNode;
}
