import {
  RenderBlocks,
  RichText,
  ScrollTitleAnimation,
  SideNav,
  HelloSwiper,
} from '@/components';
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
      <section className="lg:flex lg:gap-20 gap-4 lg:px-10">
        <ScrollTitleAnimation />
        <div className="w-full md:flex md:items-start md:gap-6 md:px-6 md:pt-20 md:pb-10 lg:contents">
          <SideNav
            className="w-full relative pb-10 pt-20 px-6 md:flex-1 md:min-w-0 md:pt-0 md:pb-0 md:px-0 lg:w-80 lg:min-w-80 lg:max-w-80 lg:flex-none lg:shrink-0 lg:pb-40 lg:pt-32 lg:px-0"
            homeBanner={data[0].homeBanner}
            links={socialLinks}
          />
          <div className="hidden md:block lg:hidden w-[230px] min-w-[230px] shrink-0 self-start">
            <HelloSwiper layout="fill" />
          </div>
        </div>
        <div
          data-split-col="right"
          className="w-full relative lg:flex-1 lg:min-w-0 pt-4 pb-20 lg:pb-40 lg:pt-32"
        >
          <div className="relative w-full lg:max-w-[844px] lg:mx-auto">
            <div className="w-full md:hidden lg:block px-6 lg:px-0">
              <HelloSwiper layout="responsive" />
            </div>
            <RenderBlocks layout={data[0].pageBlocks} />
            <RichText
              value={data[0].richText}
              paragraphSpace={false}
              className="text-xs text-center text-balance"
            />
            <div className="flex justify-center gap-4 mt-[50px] px-6 lg:px-0">
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
        </div>
      </section>
    </>
  );
}
