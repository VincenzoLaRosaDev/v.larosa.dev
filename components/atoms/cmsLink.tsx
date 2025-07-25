'use client';

import Link from 'next/link';

export interface CmsLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  link: any;
  styleButton?: 'yellow' | 'blue';
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const CmsLink = ({
  className,
  link,
  styleButton,
  onClick,
  ...props
}: CmsLinkProps) => {
  return link?.externalLink?.href || link?.internalLink || link?.customLink ? (
    <Link
      data-cursor-interactive
      onClick={(e) => (onClick ? onClick(e) : null)}
      tabIndex={props.tabIndex}
      style={props.style}
      className={`${className}`}
      href={
        link.ctaType === 'external'
          ? (link.externalLink?.href ?? '/')
          : link.ctaType === 'custom'
            ? link.customLink
            : link?.internalLink?.seo?.seoSlug &&
                link?.internalLink?.seo?.seoSlug !== '/'
              ? `/${link?.internalLink?.seo?.seoSlug}`
              : '/'
      }
      target={
        link.ctaType === 'external' && link.externalLink?.blank
          ? '_blank'
          : '_self'
      }
    >
      {props.children}
    </Link>
  ) : (
    <div
      tabIndex={props.tabIndex}
      style={props.style}
      className={`${className}`}
    >
      {props.children}
    </div>
  );
};
