'use client';

import { RichTextObj } from '@/sanity/types';
import { TailwindProps } from '@/types';
import { PortableText } from 'next-sanity';
import { PaddingContainer } from './atoms';
import { ScrollTitleContainer } from './scrollTitleContainer';
import { motion } from 'motion/react';

export interface RichTextProps extends TailwindProps {
  id?: RichTextObj['id'];
  title?: RichTextObj['title'];
  value: RichTextObj['value'];
  paddingBlock?: RichTextObj['paddingBlock'];
}

export const RichText = ({
  className,
  id,
  title,
  value,
  paddingBlock,
}: RichTextProps) => {
  return (
    value && (
      <PaddingContainer
        id={id}
        padding={{ _type: 'paddingBlock', ...paddingBlock }}
        className={`relative text-text-light flex flex-col gap-4 ${className}`}
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
            <PortableText value={value} />
          </motion.div>
        </ScrollTitleContainer>
      </PaddingContainer>
    )
  );
};
