'use client';

import { RichTextObj } from '@/sanity/types';
import { TailwindProps } from '@/types';
import { PortableText } from 'next-sanity';
import { PaddingContainer, Tile } from './atoms';
import { ScrollTitleContainer } from './scrollTitleContainer';
import { FadeInOnView } from './animations';

export interface RichTextProps extends TailwindProps {
  id?: RichTextObj['id'];
  title?: RichTextObj['title'];
  value: RichTextObj['value'];
  paddingBlock?: RichTextObj['paddingBlock'];
  paragraphSpace?: boolean;
}

export const RichText = ({
  className,
  id,
  title,
  value,
  paragraphSpace = true,
}: RichTextProps) => {
  return (
    value && (
      <PaddingContainer
        id={id}
        className={`relative flex flex-col gap-4 ${
          paragraphSpace ? 'mosaic-ink' : ''
        } ${className ?? ''}`}
      >
        <ScrollTitleContainer title={title ?? ''}>
          <FadeInOnView>
            <Tile tone={paragraphSpace ? 1 : 2} className="p-6 lg:p-10">
              <div
                className={`tile-measure text-text-light ${
                  paragraphSpace
                    ? 'text-base flex flex-col gap-6 lg:[--tile-measure:50%]'
                    : 'text-sm'
                }`}
              >
                <PortableText
                  value={value}
                  components={{
                    marks: {
                      link: ({ children, value }) => (
                        <a
                          href={value?.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline text-text hover:opacity-70 transition-all"
                        >
                          {children}
                        </a>
                      ),
                    },
                  }}
                />
              </div>
            </Tile>
          </FadeInOnView>
        </ScrollTitleContainer>
      </PaddingContainer>
    )
  );
};
