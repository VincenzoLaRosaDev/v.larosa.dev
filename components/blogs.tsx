'use client';

import { Blogs as BlogsSanity } from '@/sanity/types';
import { TailwindProps } from '@/types';
import { CmsLink, PaddingContainer, Tag } from './atoms';
import { useTranslations } from 'next-intl';
import { PortableText } from 'next-sanity';
import ArrowIcon from '@/public/arrow_outward.svg';
import { urlFor } from '@/sanity/client';
import { ScrollTitleContainer } from './scrollTitleContainer';
import { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { FadeInOnView } from './animations';

export interface BlogsProps extends TailwindProps {
  id: BlogsSanity['id'];
  title: BlogsSanity['title'];
  paddingBlock: BlogsSanity['paddingBlock'];
  items: BlogsSanity['items'];
}

export const Blogs = ({
  className,
  id,
  title,
  paddingBlock,
  items,
}: BlogsProps) => {
  const t = useTranslations('Index');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' });

  return (
    <PaddingContainer
      id={id}
      padding={{ _type: 'paddingBlock', ...paddingBlock }}
      className={`relative ${className}`}
    >
      <ScrollTitleContainer id={id} title={title ?? ''}>
        <FadeInOnView>
          <div className="flex flex-col gap-8">
            {items?.map((item, key) => {
              const isHovered = hoveredIndex !== null && hoveredIndex !== key;
              return (
                <div
                  key={key}
                  onMouseEnter={() => setHoveredIndex(key)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`transition-all ${isHovered ? 'lg:opacity-50' : 'lg:opacity-100'}`}
                >
                  <CmsLink
                    link={item.link}
                    className={`group flex items-start flex-col md:flex-row gap-6 lg:p-6 rounded-lg overflow-hidden transition-all border-light/20 ${
                      hoveredIndex === key
                        ? 'lg:bg-grey/5 lg:border-t lg:border-light/20'
                        : 'lg:border-t lg:border-transparent'
                    }`}
                  >
                    <img
                      src={urlFor(item.image).url()}
                      alt={item.image?.alt ?? ''}
                      className="w-full h-auto md:max-w-[164px] rounded-xl overflow-hidden"
                    />
                    <div className="flex flex-col gap-4 w-full">
                      <div className="flex items-start gap-3">
                        <span
                          className={`archivo-black transition-all ${
                            hoveredIndex === key ? 'text-primary' : ''
                          }`}
                        >
                          {item.title}
                        </span>
                        {item?.link && (
                          <ArrowIcon
                            className={`h-6 w-6 min-h-6 min-w-6 transition-all rotate-45 group-hover:rotate-0 ${
                              hoveredIndex === key
                                ? 'fill-primary'
                                : 'fill-text'
                            }`}
                          />
                        )}
                      </div>

                      {item.richText && (
                        <div className="text-xs text-text-light flex flex-col gap-8">
                          <PortableText
                            value={item.richText}
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

                      <div className="flex flex-wrap items-center gap-3">
                        {item.tag?.map((skill, key) => (
                          <Tag key={key}>{skill}</Tag>
                        ))}
                      </div>
                    </div>
                  </CmsLink>
                </div>
              );
            })}
          </div>
        </FadeInOnView>
      </ScrollTitleContainer>
    </PaddingContainer>
  );
};
