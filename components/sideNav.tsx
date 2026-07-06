'use client';

import { Page, Link } from '@/sanity/types';
import { TailwindProps } from '@/types';
import { PortableText } from 'next-sanity';
import Image from 'next/image';
import { CmsLink, FitText, GlassPanel } from './atoms';

export interface SideNavProps extends TailwindProps {
  homeBanner: Page['homeBanner'];
  links: Link[];
}

export const SideNav = ({ className, homeBanner, links }: SideNavProps) => {
  const profileImage = (
    <GlassPanel rounded="rounded-full" className="p-1.5 shrink-0">
      <Image
        src="/vincenzo-la-rosa.jpg"
        alt="Vincenzo La Rosa"
        width={80}
        height={80}
        className="h-20 w-20 min-h-20 min-w-20 rounded-full overflow-hidden"
      />
    </GlassPanel>
  );

  const socialLinkItems = links.map((link, key) => (
    <CmsLink key={key} link={link.link} className="group shrink-0">
      <GlassPanel
        rounded="rounded-full"
        className="flex items-center justify-center h-10 w-10 transition-colors group-hover:border-primary/30"
      >
        <div
          className="[&>*]:h-[20px] [&>*]:w-[20px] [&>*]:min-h-[20px] [&>*]:min-w-[20px] fill-text-light group-hover:fill-primary transition-all"
          dangerouslySetInnerHTML={{
            __html: link.linkIcon ?? '',
          }}
        />
      </GlassPanel>
    </CmsLink>
  ));

  const dotMarkers = (
    <div className="flex items-center gap-4 shrink-0" aria-hidden>
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
  );

  return (
    <div
      data-split-col="left"
      className={`lg:sticky lg:h-screen lg:top-0 lg:w-80 lg:min-w-80 lg:shrink-0 ${className}`}
    >
      <div className="h-full flex flex-col gap-8 w-full lg:min-w-80 min-w-0">
        <div id="side-header" className="w-full min-w-0">
          {/* Mobile + desktop: full-width spread */}
          <div className="flex tablet:hidden lg:flex w-full flex-wrap items-center justify-between gap-y-4 mb-10">
            {profileImage}
            <span
              aria-hidden
              className="h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: 'var(--glass-border)' }}
            />
            <span
              aria-hidden
              className="h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: 'var(--glass-border)' }}
            />
            <span
              aria-hidden
              className="h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: 'var(--glass-border)' }}
            />
            {socialLinkItems}
          </div>

          {/* Tablet (425px–1023px): compact layout */}
          <div className="hidden tablet:flex lg:hidden flex-wrap items-center gap-4 mb-10">
            {profileImage}
            {dotMarkers}
            <div className="flex items-center gap-4">{socialLinkItems}</div>
          </div>

          <FitText
            as="h1"
            className="tablet:hidden lg:block archivo-black text-text"
            minSize={24}
            maxSize={56}
          >
            {homeBanner?.title}
          </FitText>
          <h1 className="hidden tablet:block lg:hidden text-4xl archivo-black text-text">
            {homeBanner?.title}
          </h1>
          {homeBanner?.textTitle && (
            <div className="text-2xl text-text mt-2">
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
