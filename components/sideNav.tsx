'use client';

import { Page, Link } from '@/sanity/types';
import { TailwindProps } from '@/types';
import { PortableText } from 'next-sanity';
import { CmsLink } from './atoms';
import { ChangeLang } from './changeLang';
import { ToogleColorMode } from './toggleColorMode';

export interface SideNavProps extends TailwindProps {
  homeBanner: Page['homeBanner'];
  links: Link[];
}

export const SideNav = ({ className, homeBanner, links }: SideNavProps) => {
  return (
    <div className={`lg:sticky lg:h-screen lg:top-0 bg-bg ${className}`}>
      <div className="h-full flex flex-col gap-8">
        <div id="side-header">
          <h1 className="text-4xl archivo-black text-primary">
            {homeBanner?.title}
          </h1>
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
        <div className="flex items-center gap-4 justify-between">
          <div className="flex items-center gap-4">
            {links.map((link, key) => (
              <CmsLink key={key} link={link.link} className="group">
                <div
                  className="[&>*]:h-[24px] [&>*]:w-[24px] [&>*]:min-h-[24px] [&>*]:min-w-[24px] fill-text-light group-hover:fill-text transition-all"
                  dangerouslySetInnerHTML={{
                    __html: link.linkIcon ?? '',
                  }}
                ></div>
              </CmsLink>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <ChangeLang />
            <ToogleColorMode />
          </div>
        </div>
      </div>
    </div>
  );
};
