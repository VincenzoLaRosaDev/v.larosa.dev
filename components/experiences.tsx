'use client';

import { Experiences as ExperiencesSanity } from '@/sanity/types';
import { TailwindProps } from '@/types';
import { PaddingContainer, Tag } from './atoms';
import { useTranslations } from 'next-intl';
import { PortableText } from 'next-sanity';
import ArrowIcon from '@/public/arrow_outward.svg';
import LinkIcon from '@/public/link.svg';
import { ScrollTitleContainer } from './scrollTitleContainer';
import { useState } from 'react';
import { motion } from 'motion/react';
import { FadeInOnView } from './animations';

export interface ExperiencesProps extends TailwindProps {
  id: ExperiencesSanity['id'];
  title: ExperiencesSanity['title'];
  paddingBlock: ExperiencesSanity['paddingBlock'];
  items: ExperiencesSanity['items'];
}

export const Experiences = ({
  className,
  id,
  title,
  paddingBlock,
  items,
}: ExperiencesProps) => {
  const t = useTranslations('Index');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <PaddingContainer
      id={id}
      padding={{ _type: 'paddingBlock', ...paddingBlock }}
      className={`relative ${className}`}
    >
      <ScrollTitleContainer id={id} title={title ?? ''}>
        <FadeInOnView>
          <div className="flex flex-col gap-16">
            {items?.map((item, key) => {
              const isHovered = hoveredIndex !== null && hoveredIndex !== key;
              return (
                <div
                  key={key}
                  onMouseEnter={() => setHoveredIndex(key)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`flex flex-col lg:flex-row gap-6 lg:p-6 rounded-lg overflow-hidden transition-all border-light/20 ${
                    hoveredIndex === key
                      ? 'lg:bg-light/5 lg:border-t lg:border-light/20'
                      : 'lg:border-t lg:border-transparent'
                  } ${isHovered ? 'lg:opacity-50' : 'lg:opacity-100'}`}
                >
                  <div className="uppercase archivo-black text-text-light min-w-40">
                    {`${item.startDate ? new Date(item.startDate).getFullYear() : ''} — ${
                      item.endDate
                        ? new Date(item.endDate).getFullYear()
                        : t('present')
                    }`}
                  </div>

                  <div className="flex flex-col gap-4 w-full">
                    <div>
                      <div className="text-text-light archivo-black">
                        {item.role}
                      </div>
                      {item.companyLink?.href ? (
                        <a
                          href={item.companyLink?.href}
                          target={`${item.companyLink?.blank ? '_blank' : '_self'}`}
                          className="group/link flex w-fit items-center gap-3"
                        >
                          <span
                            className={`text-2xl archivo-black transition-all ${
                              hoveredIndex === key ? 'text-primary' : ''
                            }`}
                          >
                            {item.company}
                          </span>
                          {item.companyLink?.href && (
                            <ArrowIcon
                              className={`h-6 w-6 min-h-6 min-w-6 transition-all rotate-45 group-hover/link:rotate-0
                          ${
                            hoveredIndex === key ? 'fill-primary' : 'fill-text'
                          }`}
                            />
                          )}
                        </a>
                      ) : (
                        <div className="group/link flex items-center gap-3">
                          <span
                            className={`text-2xl archivo-black transition-all ${
                              hoveredIndex === key ? 'text-primary' : ''
                            }`}
                          >
                            {item.company}
                          </span>
                        </div>
                      )}
                    </div>

                    {item.richText && (
                      <div className="text-text-light flex flex-col gap-2">
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
                      {item.tag?.map((tag, key) => (
                        <a
                          key={key}
                          href={tag.href}
                          target={`${tag?.blank ? '_blank' : '_self'}`}
                          className="group flex items-center gap-2.5 text-text-light hover:text-text transition-all"
                        >
                          <LinkIcon className="fill-text-light h-4 w-4 min-h-4 min-w-4 group-hover:fill-text transition-all" />
                          <span className="text-xs leading-3">{tag.label}</span>
                        </a>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      {item.skills?.map((skill, key) => (
                        <Tag key={key}>{skill}</Tag>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </FadeInOnView>
      </ScrollTitleContainer>
    </PaddingContainer>
  );
};
