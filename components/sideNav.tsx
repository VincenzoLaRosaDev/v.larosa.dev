'use client';

import { Page, Link } from '@/sanity/types';
import { TailwindProps } from '@/types';
import { PortableText } from 'next-sanity';
import { CmsLink, GlassPanel, Tag } from './atoms';

export interface SideNavProps extends TailwindProps {
  homeBanner: Page['homeBanner'];
  links: Link[];
}

export const SideNav = ({ className, homeBanner, links }: SideNavProps) => {
  return (
    <div className={`lg:sticky lg:h-screen lg:top-0 ${className}`}>
      <div className="h-full flex flex-col gap-8">
        <div id="side-header">
          <Tag live className="uppercase tracking-wider">
            Available
          </Tag>
          <h1 className="text-4xl archivo-black text-text mt-2">
            {homeBanner?.title}
          </h1>
          {homeBanner?.textTitle && (
            <div className="text-2xl text-text">
              <PortableText
                value={homeBanner.textTitle}
                components={{
                  marks: {
                    link: ({ children, value }) => (
                      <a
                        href={value?.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                      >
                        {children}
                      </a>
                    ),
                  },
                }}
              />
            </div>
          )}
          {homeBanner?.subText && (
            <div className="text-base text-text-light mt-1 text-balance">
              <PortableText
                value={homeBanner.subText}
                components={{
                  marks: {
                    link: ({ children, value }) => (
                      <a
                        href={value?.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-text transition-all"
                      >
                        {children}
                      </a>
                    ),
                  },
                }}
              />
            </div>
          )}
        </div>
        <div className="flex items-center gap-4 justify-between">
          <div className="flex items-center gap-4">
            {links.map((link, key) => (
              <CmsLink key={key} link={link.link} className="group">
                <GlassPanel
                  rounded="rounded-full"
                  className="flex items-center justify-center h-10 w-10 shrink-0 transition-colors group-hover:border-primary/30"
                >
                  <div
                    className="[&>*]:h-[20px] [&>*]:w-[20px] [&>*]:min-h-[20px] [&>*]:min-w-[20px] fill-text-light group-hover:fill-primary transition-all"
                    dangerouslySetInnerHTML={{
                      __html: link.linkIcon ?? '',
                    }}
                  />
                </GlassPanel>
              </CmsLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
