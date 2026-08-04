'use client';

import { ContentsBlock as ContentsBlockSanity } from '@/sanity/types';
import { TailwindProps } from '@/types';
import { PortableText } from 'next-sanity';
import { MosaicGrid, PaddingContainer, Tile } from './atoms';
import { ScrollTitleContainer } from './scrollTitleContainer';
import { FadeInOnView } from './animations';
import { staggerSpanClass } from '@/utils';

export interface ContentsBlockProps extends TailwindProps {
  id: ContentsBlockSanity['id'];
  title: ContentsBlockSanity['title'];
  paddingBlock: ContentsBlockSanity['paddingBlock'];
  items: ContentsBlockSanity['items'];
}

export const ContentsBlock = ({
  className,
  id,
  title,
  items,
}: ContentsBlockProps) => {
  return (
    <PaddingContainer
      id={id}
      className={`relative bg-[var(--surface-0)] ${className}`}
    >
      <ScrollTitleContainer title={title ?? ''}>
        <MosaicGrid variant="stagger">
          {items?.map((item, key) => (
            <FadeInOnView
              key={key}
              className={staggerSpanClass(key, items.length)}
            >
              <Tile tone={key} className="h-full p-6 lg:p-8">
                <div className="flex items-center gap-5">
                  <div
                    className="h-[36px] lg:h-[44px] [&>*]:h-[36px] [&>*]:lg:h-[44px] [&>*]:min-h-[36px] [&>*]:lg:min-h-[44px] w-auto overflow-hidden"
                    dangerouslySetInnerHTML={{
                      __html: item.icon ?? '',
                    }}
                  />
                  <div>
                    <div className="archivo-black text-sm text-text-light">
                      {item.tagTitle}
                    </div>

                    <div
                      className={`archivo-black ${item.richText ? 'text-2xl' : 'text-3xl'}`}
                    >
                      {item.title}
                    </div>
                  </div>
                </div>

                {item.richText && (
                  <div className="text-base mt-4 text-text-light flex flex-col gap-2">
                    <PortableText
                      value={item.richText}
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
              </Tile>
            </FadeInOnView>
          ))}
        </MosaicGrid>
      </ScrollTitleContainer>
    </PaddingContainer>
  );
};
