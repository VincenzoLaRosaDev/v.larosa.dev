import {
  RenderBlocks,
  RichText,
  ScrollTitleAnimation,
  SideNav,
  HelloSwiper,
} from '@/components';
import { Tile } from '@/components/atoms';
import { getLinks, getLocalizeHomePage } from '@/sanity/queries';
import type { Metadata } from 'next';

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
      <section className="lg:flex lg:gap-0 gap-0">
        <ScrollTitleAnimation />
        <div className="w-full md:flex md:items-start lg:contents">
          <SideNav
            className="w-full relative p-0 md:flex-1 md:min-w-0 lg:w-[var(--sidebar-w)] lg:min-w-[var(--sidebar-w)] lg:max-w-[var(--sidebar-w)] lg:flex-none lg:shrink-0"
            homeBanner={data[0].homeBanner}
            links={socialLinks}
          />
          <div className="hidden md:block lg:hidden w-[230px] min-w-[230px] shrink-0 self-start">
            <HelloSwiper layout="fill" />
          </div>
        </div>
        <div
          data-split-col="right"
          className="w-full relative lg:flex-1 lg:min-w-0"
        >
          <div className="relative w-full">
            <div className="w-full md:hidden lg:block">
              <HelloSwiper layout="fill" />
            </div>
            <div id="scroll-title-stack">
              <RenderBlocks layout={data[0].pageBlocks} />
              <RichText
                value={data[0].richText}
                paragraphSpace={false}
                className="text-sm text-balance"
              />
            </div>
            <Tile
              tone={2}
              className="flex flex-wrap gap-6 px-6 py-8 lg:px-10"
            >
              <a
                href="https://www.iubenda.com/privacy-policy/96600430"
                className="text-sm text-text-light hover:text-text transition-colors"
                title="Privacy Policy "
              >
                Privacy Policy
              </a>
              <a
                href="https://www.iubenda.com/privacy-policy/96600430/cookie-policy"
                className="text-sm text-text-light hover:text-text transition-colors"
                title="Cookie Policy "
              >
                Cookie Policy
              </a>
            </Tile>
          </div>
        </div>
      </section>
    </>
  );
}
