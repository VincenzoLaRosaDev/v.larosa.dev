'use client';

import { TailwindProps } from '@/types';
import { CmsLink, GlassPanel, PaddingContainer } from './atoms';
import { ContactForm as ContactFormSanity } from '@/sanity/types';
import { ScrollTitleContainer } from './scrollTitleContainer';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { FadeInOnView } from './animations';

export interface ContactFormProps extends TailwindProps {
  id: ContactFormSanity['id'];
  title: ContactFormSanity['title'];
  paddingBlock: ContactFormSanity['paddingBlock'];
  cta: ContactFormSanity['cta'];
}

export const ContactForm = ({
  className,
  id,
  title,
  paddingBlock,
  cta,
}: ContactFormProps) => {
  const t = useTranslations('Index');
  const [message, setMessage] = useState('');

  return (
    <PaddingContainer
      id={id}
      padding={{ _type: 'paddingBlock', ...paddingBlock }}
      className={`relative ${className}`}
    >
      <ScrollTitleContainer title={title ?? ''}>
        <FadeInOnView>
          <form noValidate className="w-full flex flex-col gap-6">
            <GlassPanel className="w-full">
              <textarea
                id="message"
                placeholder={t('message')}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full min-h-64 resize-none bg-transparent rounded-2xl p-4 align-top text-text border-0 placeholder:text-text-light/60 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary/30 transition-shadow"
              />
            </GlassPanel>
            <CmsLink
              onClick={() =>
                setTimeout(() => {
                  setMessage('');
                }, 500)
              }
              link={{
                ...cta?.ctaLink,
                customLink: cta?.ctaLink?.customLink?.concat(
                  `?subject=Contact from vlarosadev website&body=${message}`,
                ),
              }}
              type="submit"
              className="px-3 py-1 uppercase bg-primary/90 hover:bg-primary transition-all text-bg archivo-black rounded-full overflow-hidden !text-center"
            >
              {cta?.ctaLabel}
            </CmsLink>
          </form>
        </FadeInOnView>
      </ScrollTitleContainer>
    </PaddingContainer>
  );
};
