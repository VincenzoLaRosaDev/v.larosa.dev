'use client';

import { Projects as ProjectsSanity } from '@/sanity/types';
import { TailwindProps } from '@/types';
import { CmsLink, MosaicGrid, PaddingContainer, Tag, Tile } from './atoms';
import { PortableText } from 'next-sanity';
import ArrowIcon from '@/public/arrow_outward.svg';
import { urlFor } from '@/sanity/client';
import { ScrollTitleContainer } from './scrollTitleContainer';
import { FadeInOnView } from './animations';
import { cardArrowRotationClasses, tileSpanClass, useGlassCardFocus } from '@/utils';

export interface ProjectsProps extends TailwindProps {
  id: ProjectsSanity['id'];
  title: ProjectsSanity['title'];
  paddingBlock: ProjectsSanity['paddingBlock'];
  items: ProjectsSanity['items'];
}

export const Projects = ({ className, id, title, items }: ProjectsProps) => {
  const { activeIndex, itemRef, getCardHoverHandlers } = useGlassCardFocus(
    items?.length ?? 0,
  );

  return (
    <PaddingContainer
      id={id}
      className={`relative bg-[var(--surface-0)] ${className}`}
    >
      <ScrollTitleContainer title={title ?? ''}>
        <MosaicGrid>
          {items?.map((item, key) => {
            const isActive = activeIndex === key;

            return (
              <FadeInOnView key={key} className={tileSpanClass(key, 'half')}>
                <Tile
                  ref={itemRef(key)}
                  tone={key}
                  interactive
                  active={isActive}
                  className="h-full"
                  {...getCardHoverHandlers(key)}
                >
                  <CmsLink
                    link={item.link}
                    className="group flex h-full items-stretch flex-col"
                  >
                    <img
                      src={urlFor(item.image).url()}
                      alt={item.image?.alt ?? ''}
                      className="block w-full h-auto"
                    />

                    <div className="flex flex-col gap-4 w-full p-6 lg:p-8">
                      <div className="flex items-start gap-3">
                        <span className="text-xl archivo-black">
                          {item.title}
                        </span>
                        {item?.link && (
                          <ArrowIcon
                            className={`h-6 w-6 min-h-6 min-w-6 fill-current transition-transform ${cardArrowRotationClasses(isActive)}`}
                          />
                        )}
                      </div>

                      {item.richText && (
                        <div className="tile-measure text-base text-text-light flex flex-col gap-6">
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
                </Tile>
              </FadeInOnView>
            );
          })}
        </MosaicGrid>
      </ScrollTitleContainer>
    </PaddingContainer>
  );
};
