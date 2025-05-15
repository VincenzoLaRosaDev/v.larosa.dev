'use client';

import { Page } from '@/sanity/types';
import { TailwindProps } from '@/types';
import { PortableText } from 'next-sanity';

export interface SideNavProps extends TailwindProps {
  homeBanner: Page['homeBanner'];
}

export const SideNav = ({ className, homeBanner }: SideNavProps) => {
  return (
    <div className={`lg:sticky lg:h-screen lg:top-0 ${className}`}>
      <h1 className="text-4xl archivo-black">{homeBanner?.title}</h1>
      {homeBanner?.textTitle && (
        <div className="text-2xl">
          <PortableText value={homeBanner?.textTitle} />
        </div>
      )}
      {homeBanner?.subText && (
        <div className="text-base text-text-light mt-6">
          <PortableText value={homeBanner?.subText} />
        </div>
      )}
    </div>
  );
};
