'use client';

import { Projects as ProjectsSanity } from '@/sanity/types';
import { TailwindProps } from '@/types';
import { CmsLink, PaddingContainer, Tag } from './atoms';
import { useTranslations } from 'next-intl';
import { PortableText } from 'next-sanity';
import ArrowIcon from '@/public/arrow_outward.svg';
import { urlFor } from '@/sanity/client';
import { ScrollTitleContainer } from './scrollTitleContainer';
import { useState } from 'react';
import { motion } from 'motion/react';

export interface ProjectsProps extends TailwindProps {
  id: ProjectsSanity['id'];
  title: ProjectsSanity['title'];
  paddingBlock: ProjectsSanity['paddingBlock'];
  items: ProjectsSanity['items'];
}

export const Projects = ({
  className,
  id,
  title,
  paddingBlock,
  items,
}: ProjectsProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <PaddingContainer
      id={id}
      padding={{ _type: 'paddingBlock', ...paddingBlock }}
      className={`relative ${className}`}
    >
      <ScrollTitleContainer id={id} title={title ?? ''}>
        <motion.div
          style={{ willChange: 'opacity, transform', transform: 'translateZ(0)' }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: 'easeOut' },
          }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                    className={`group flex items-start flex-col gap-6 lg:p-6 rounded-lg overflow-hidden transition-all border-light/20 ${
                      hoveredIndex === key
                        ? 'lg:bg-grey/5 lg:border-t lg:border-light/20'
                        : ''
                    }`}
                  >
                    <img
                      src={urlFor(item.image).url()}
                      alt={item.image?.alt ?? ''}
                      className="w-full h-auto rounded-xl overflow-hidden"
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
                            className={`h-6 w-6 min-h-6 min-w-6 transition-all ${
                              hoveredIndex === key
                                ? 'fill-primary translate-x-0.5 -translate-y-0.5'
                                : 'fill-text'
                            }`}
                          />
                        )}
                      </div>

                      {item.richText && (
                        <div className="text-xs text-text-light">
                          <PortableText value={item.richText} />
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
        </motion.div>
      </ScrollTitleContainer>
    </PaddingContainer>
  );
};
