import {
  RenderBlocks,
  RichText,
  ScrollTitleAnimation,
  SideNav,
  HelloSwiper,
} from '@/components';
import { getLinks, getLocalizeHomePage } from '@/sanity/queries';
import type { Metadata } from 'next';
import Image from 'next/image';

// Abilita ISR: revalida ogni 60 secondi o quando viene triggerato un webhook
export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<any>;
}): Promise<Metadata> {
  const locale = (await Promise.resolve(params)).locale;
  const data = await getLocalizeHomePage(locale);

  return {
    metadataBase: new URL(`${process.env.SITE_URL}`),
    title: `${data[0].seo?.seoTitle}`,
    description: `${data[0].seo?.seoDescription}`,
    alternates: {
      canonical: `${process.env.SITE_URL}/${locale}`,
    },
    openGraph: {
      title: `${data[0].seo?.seoTitle}`,
      description: `${data[0].seo?.seoDescription}`,
      siteName: `${data[0].seo?.seoTitle}`,
      type: 'website',
      images: {
        url: `${(data[0].seo?.seoImage?.asset as any)?.url}`,
      },
    },
    twitter: {
      title: `${data[0].seo?.seoTitle}`,
      description: `${data[0].seo?.seoDescription}`,
      images: {
        url: `${(data[0].seo?.seoImage?.asset as any)?.url}`,
      },
    },
  };
}

export default async function Home({ params }: { params: Promise<any> }) {
  const locale = (await Promise.resolve(params)).locale;
  const data = await getLocalizeHomePage(locale);
  const socialLinks = await getLinks();

  return (
    <>
      <section className="lg:flex lg:justify-between lg:gap-16 gap-4">
        <ScrollTitleAnimation />
        <SideNav
          className="w-full relative lg:max-w-96 pb-10 pt-20 lg:pb-40 lg:pt-32 px-3 lg:px-0"
          homeBanner={data[0].homeBanner}
          links={socialLinks}
        />
        <div
          data-split-col="right"
          className="w-full relative lg:max-w-[780px] pt-10 pb-20 lg:pb-40 lg:pt-32"
        >
          <div className="flex items-center gap-4 px-3 lg:px-0 lg:justify-end">
            <Image
              src="/vincenzo-la-rosa.jpg"
              alt="Vincenzo La Rosa"
              width={80}
              height={80}
              className="lg:hidden h-20 w-20 min-h-20 min-w-20 rounded-full overflow-hidden shrink-0"
            />
            <HelloSwiper />
          </div>
          <RenderBlocks layout={data[0].pageBlocks} />
          <RichText
            value={data[0].richText}
            paragraphSpace={false}
            className="text-xs text-center text-balance"
          />
          <div className="flex justify-center gap-4 mt-[50px]">
            <a
              href="https://www.iubenda.com/privacy-policy/96600430"
              className="text-xs text-text-light"
              title="Privacy Policy "
            >
              Privacy Policy
            </a>
            <a
              href="https://www.iubenda.com/privacy-policy/96600430/cookie-policy"
              className="text-xs text-text-light"
              title="Cookie Policy "
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
