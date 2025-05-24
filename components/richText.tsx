'use client';

import { RichTextObj } from '@/sanity/types';
import { TailwindProps } from '@/types';
import { PortableText } from 'next-sanity';
import { PaddingContainer } from './atoms';
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
  paddingBlock,
  paragraphSpace = true,
}: RichTextProps) => {
  return (
    value && (
      <PaddingContainer
        id={id}
        padding={{ _type: 'paddingBlock', ...paddingBlock }}
        className={`relative text-text-light flex flex-col gap-4 ${className}`}
      >
        <ScrollTitleContainer id={id} title={title ?? ''}>
          <FadeInOnView>
            <div className={`${paragraphSpace && 'flex flex-col gap-8'}`}>
              <PortableText
                value={value}
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
          </FadeInOnView>
        </ScrollTitleContainer>
      </PaddingContainer>
    )
  );
};
