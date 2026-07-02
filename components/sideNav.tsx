'use client';

import { Page, Link } from '@/sanity/types';
import { TailwindProps } from '@/types';
import { PortableText } from 'next-sanity';
import Image from 'next/image';
import { CmsLink, GlassPanel } from './atoms';

export interface SideNavProps extends TailwindProps {
  homeBanner: Page['homeBanner'];
  links: Link[];
}

export const SideNav = ({ className, homeBanner, links }: SideNavProps) => {
  const socialIcons = (
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
  );

  return (
    <div
      data-split-col="left"
      className={`lg:sticky lg:h-screen lg:top-0 ${className}`}
    >
      <div className="h-full flex flex-col gap-8">
        <div id="side-header">
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <GlassPanel rounded="rounded-full" className="p-1.5 shrink-0">
              <Image
                src="/vincenzo-la-rosa.jpg"
                alt="Vincenzo La Rosa"
                width={80}
                height={80}
                className="h-20 w-20 min-h-20 min-w-20 rounded-full overflow-hidden"
              />
            </GlassPanel>
            <div className="flex items-center gap-2 shrink-0" aria-hidden>
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: 'var(--glass-border)' }}
              />
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: 'var(--glass-border)' }}
              />
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: 'var(--glass-border)' }}
              />
            </div>
            {socialIcons}
          </div>
          <h1 className="text-4xl archivo-black text-text">
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
            <div className="text-base text-text-light mt-2 text-balance">
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
      </div>
    </div>
  );
};
