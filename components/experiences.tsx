'use client';

import { Experiences as ExperiencesSanity } from '@/sanity/types';
import { TailwindProps } from '@/types';
import { MosaicGrid, PaddingContainer, Tag, Tile } from './atoms';
import { useTranslations } from 'next-intl';
import { PortableText } from 'next-sanity';
import ArrowIcon from '@/public/arrow_outward.svg';
import LinkIcon from '@/public/link.svg';
import { ScrollTitleContainer } from './scrollTitleContainer';
import { FadeInOnView } from './animations';
import { tileSpanClass } from '@/utils';

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
  items,
}: ExperiencesProps) => {
  const t = useTranslations('Index');

  return (
    <PaddingContainer
      id={id}
      className={`relative bg-[var(--surface-0)] ${className}`}
    >
      <ScrollTitleContainer title={title ?? ''}>
        <MosaicGrid>
          {items?.map((item, key) => {
            return (
              <FadeInOnView key={key} className={tileSpanClass(key, 'row')}>
                <Tile
                  tone={key}
                  className="flex h-full flex-col lg:flex-row gap-5 lg:gap-8 p-8 lg:p-12"
                >
                  <div className="uppercase text-xl leading-tight archivo-black text-text-light lg:min-w-44 lg:max-w-44">
                    {`${item.startDate ? new Date(item.startDate).getFullYear() : ''} — ${
                      item.endDate
                        ? new Date(item.endDate).getFullYear()
                        : t('present')
                    }`}
                  </div>

                  {/* Above 1440px body and meta split into two inner columns so
                      the tile fills its row instead of trailing off. */}
                  <div className="flex flex-col gap-5 w-full wide:flex-row wide:items-start wide:gap-12">
                    <div className="flex flex-col gap-4 w-full">
                      <div>
                        <div className="text-sm text-text-light archivo-black">
                          {item.role}
                        </div>
                        {item.companyLink?.href ? (
                          <a
                            href={item.companyLink?.href}
                            target={`${item.companyLink?.blank ? '_blank' : '_self'}`}
                            className="group/link flex w-fit items-center gap-3"
                          >
                            <span className="text-2xl archivo-black transition-colors group-hover/link:text-primary">
                              {item.company}
                            </span>
                            <ArrowIcon className="h-6 w-6 min-h-6 min-w-6 fill-text rotate-45 transition-all group-hover/link:fill-primary group-hover/link:rotate-0" />
                          </a>
                        ) : (
                          <div className="flex items-center gap-3">
                            <span className="text-2xl archivo-black">
                              {item.company}
                            </span>
                          </div>
                        )}
                      </div>

                      {item.richText && (
                        <div className="tile-measure text-base text-text-light flex flex-col gap-2">
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
                    </div>

                    <div className="flex flex-col gap-4 wide:w-72 wide:shrink-0">
                      <div className="flex flex-wrap items-center gap-3">
                        {item.tag?.map((tag, key) => (
                          <a
                            key={key}
                            href={tag.href}
                            target={`${tag?.blank ? '_blank' : '_self'}`}
                            className="group flex items-center gap-2 text-text-light hover:text-text transition-all"
                          >
                            <LinkIcon className="fill-text-light h-4 w-4 min-h-4 min-w-4 group-hover:fill-text transition-all" />
                            <span className="text-sm">{tag.label}</span>
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
                </Tile>
              </FadeInOnView>
            );
          })}
        </MosaicGrid>
      </ScrollTitleContainer>
    </PaddingContainer>
  );
};
