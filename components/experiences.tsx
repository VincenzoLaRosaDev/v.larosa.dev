'use client';

import { Experiences as ExperiencesSanity } from '@/sanity/types';
import { TailwindProps } from '@/types';
import { PaddingContainer, Tag } from './atoms';
import { useTranslations } from 'next-intl';
import { PortableText } from 'next-sanity';
import ArrowIcon from '@/public/arrow_outward.svg';
import LinkIcon from '@/public/link.svg';
import { ScrollTitleContainer } from './scrollTitleContainer';
import { FadeInOnView } from './animations';
import {
  glassHoverClasses,
  cardDimmedClasses,
  cardTitleHoverClasses,
  cardArrowHoverClasses,
  cardArrowRotationClasses,
  useGlassCardFocus,
} from '@/utils';

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
  const { activeIndex, itemRef, getCardHoverHandlers } = useGlassCardFocus(
    items?.length ?? 0,
  );

  return (
    <PaddingContainer
      id={id}
      padding={{ _type: 'paddingBlock', ...paddingBlock }}
      className={`relative ${className}`}
    >
      <ScrollTitleContainer title={title ?? ''}>
        <div className="flex flex-col gap-16">
          {items?.map((item, key) => {
            const isDimmed = activeIndex !== null && activeIndex !== key;
            const isActive = activeIndex === key;

            return (
              <FadeInOnView key={key}>
                <div
                  ref={itemRef(key)}
                  {...getCardHoverHandlers(key)}
                  className={`flex flex-col lg:flex-row gap-6 p-6 ${glassHoverClasses(isActive)} ${cardDimmedClasses(isDimmed)}`}
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
                            className={`text-2xl archivo-black transition-all ${cardTitleHoverClasses(isActive)}`}
                          >
                            {item.company}
                          </span>
                          {item.companyLink?.href && (
                            <ArrowIcon
                              className={`h-6 w-6 min-h-6 min-w-6 transition-all ${cardArrowRotationClasses(isActive, 'group/link')} ${cardArrowHoverClasses(isActive)}`}
                            />
                          )}
                        </a>
                      ) : (
                        <div className="group/link flex items-center gap-3">
                          <span
                            className={`text-2xl archivo-black transition-all ${cardTitleHoverClasses(isActive)}`}
                          >
                            {item.company}
                          </span>
                        </div>
                      )}
                    </div>

                    {item.richText && (
                      <div className="text-sm lg:text-base text-text-light flex flex-col gap-2">
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
                          className="group flex items-center gap-2 text-text-light hover:text-text transition-all"
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
              </FadeInOnView>
            );
          })}
        </div>
      </ScrollTitleContainer>
    </PaddingContainer>
  );
};
