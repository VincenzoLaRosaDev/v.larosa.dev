'use client';

import { TailwindProps } from '@/types';
import { CmsLink, PaddingContainer, Tile } from './atoms';
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
  cta,
}: ContactFormProps) => {
  const t = useTranslations('Index');
  const [message, setMessage] = useState('');

  return (
    <PaddingContainer
      id={id}
      className={`relative mosaic-ink ${className ?? ''}`}
    >
      <ScrollTitleContainer title={title ?? ''}>
        <FadeInOnView>
          <Tile tone={0} className="w-full p-6 lg:p-10">
            <form noValidate className="w-full flex flex-col gap-6">
              <textarea
                id="message"
                placeholder={t('message')}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full min-h-56 resize-none bg-[var(--surface-paper-inset)] p-4 align-top text-base text-text border-0 placeholder:text-[color-mix(in_srgb,var(--text-light)_70%,transparent)] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[color-mix(in_srgb,var(--text)_25%,transparent)] transition-shadow"
              />
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
                className="px-5 py-2.5 w-fit text-base uppercase bg-primary hover:bg-primary/90 transition-colors text-[var(--cta-fg)] archivo-black !text-center"
              >
                {cta?.ctaLabel}
              </CmsLink>
            </form>
          </Tile>
        </FadeInOnView>
      </ScrollTitleContainer>
    </PaddingContainer>
  );
};
