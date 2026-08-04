'use client';

import { Page, Link } from '@/sanity/types';
import { TailwindProps } from '@/types';
import { SIDE_NAV_PAD_X, SIDE_NAV_PAD_Y } from '@/utils';
import { PortableText } from 'next-sanity';
import Image from 'next/image';
import { CmsLink, FitText } from './atoms';

export interface SideNavProps extends TailwindProps {
  homeBanner: Page['homeBanner'];
  links: Link[];
}

export const SideNav = ({ className, homeBanner, links }: SideNavProps) => {
  const socialLinkItems = links.map((link, key) => (
    <CmsLink key={key} link={link.link} className="group shrink-0">
      <div className="flex items-center justify-center h-11 w-11 bg-black/45 transition-colors group-hover:bg-black/75">
        <div
          className="[&>*]:h-[20px] [&>*]:w-[20px] [&>*]:min-h-[20px] [&>*]:min-w-[20px] fill-[var(--sidebar-text)] group-hover:fill-primary transition-all"
          dangerouslySetInnerHTML={{
            __html: link.linkIcon ?? '',
          }}
        />
      </div>
    </CmsLink>
  ));

  return (
    <div
      data-split-col="left"
      className={`lg:sticky lg:h-screen lg:top-0 lg:w-[var(--sidebar-w)] lg:min-w-[var(--sidebar-w)] lg:shrink-0 ${className}`}
    >
      <div className="h-full flex flex-col w-full min-w-0">
        {/* 1 — Profile image + social overlay. Square to keep the photo
            proportions; sidebar width is capped so the nav still fits. */}
        <div className="relative aspect-square w-full overflow-hidden shrink-0 bg-[var(--bg-card)]">
          <Image
            src="/vincenzo-la-rosa.jpg"
            alt="Vincenzo La Rosa"
            fill
            priority
            sizes="(min-width: 1920px) 380px, (min-width: 1440px) 340px, (min-width: 1024px) 300px, 100vw"
            className="profile-photo object-cover object-center"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[var(--ink-0)]/90 via-[var(--ink-1)]/45 to-transparent"
          />
          <div className="absolute bottom-0 right-0 flex items-center">
            {socialLinkItems}
          </div>
        </div>

        {/* 2 — Info */}
        <div
          id="side-header"
          className="w-full min-w-0 shrink-0 px-6 py-10 lg:px-7 lg:py-8 bg-[var(--side-info-bg)]"
        >
          <FitText
            as="h1"
            className="tablet:hidden lg:block archivo-black text-[var(--sidebar-text)]"
            minSize={24}
            maxSize={52}
          >
            {homeBanner?.title}
          </FitText>
          <h1 className="hidden tablet:block lg:hidden text-3xl archivo-black text-[var(--sidebar-text)]">
            {homeBanner?.title}
          </h1>
          {homeBanner?.textTitle && (
            <div className="text-lg text-[var(--sidebar-text)] mt-2">
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
            <div className="text-sm text-[var(--sidebar-text-muted)] mt-2 text-balance">
              <PortableText
                value={homeBanner.subText}
                components={{
                  marks: {
                    link: ({ children, value }) => (
                      <a
                        href={value?.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-[var(--sidebar-text)] transition-all"
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

        {/* 3 — Nav menu slot (desktop scroll titles anchor here) */}
        <div
          id="side-nav"
          className="hidden lg:block relative w-full min-h-0 flex-1 bg-[var(--side-nav-bg)]"
          style={{
            paddingInline: `${SIDE_NAV_PAD_X}px`,
            paddingBlock: `${SIDE_NAV_PAD_Y}px`,
          }}
        />
      </div>
    </div>
  );
};
