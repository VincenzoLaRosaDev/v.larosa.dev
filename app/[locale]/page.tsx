import {
  RenderBlocks,
  RichText,
  ScrollTitleAnimation,
  SideNav,
  HelloSwiper,
} from '@/components';
import { getLinks, getLocalizeHomePage } from '@/sanity/queries';
import type { Metadata } from 'next';
import Head from 'next/head';

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
      <Head>
        {/* Iubenda script di configurazione */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
          var _iub = _iub || [];
          _iub.csConfiguration = {
            siteId: 4043574,
            cookiePolicyId: 96600430,
            lang: "en-GB",
            storage: { useSiteId: true }
          };
        `,
          }}
        />
        {/* Script autoblocking */}
        <script
          type="text/javascript"
          src="https://cs.iubenda.com/autoblocking/4043574.js"
        />
        {/* Script principale Iubenda */}
        <script
          type="text/javascript"
          src="//cdn.iubenda.com/cs/iubenda_cs.js"
          charSet="UTF-8"
          async
        />
      </Head>
      <section className="lg:flex lg:justify-between lg:gap-16 gap-4">
        <ScrollTitleAnimation />
        <SideNav
          className="w-full relative lg:max-w-96 py-10 lg:py-20 px-3 lg:px-0"
          homeBanner={data[0].homeBanner}
          links={socialLinks}
        />
        <div className="w-full relative lg:max-w-[780px] py-10 lg:py-20">
          <div className="flex justify-end px-3 lg:px-0">
            <HelloSwiper />
          </div>
          <RenderBlocks layout={data[0].pageBlocks} />
          <RichText
            value={data[0].richText}
            paragraphSpace={false}
            className="text-xs text-center text-balance"
          />
          <div className='flex justify-center gap-4 mt-[50px]'>
            <a href="https://www.iubenda.com/privacy-policy/96600430" className="text-xs text-text-light" title="Privacy Policy ">Privacy Policy</a>
            <a href="https://www.iubenda.com/privacy-policy/96600430/cookie-policy" className="text-xs text-text-light" title="Cookie Policy ">Cookie Policy</a>
          </div>
        </div>
        <div className="fixed z-50 left-0 top-0 h-10 lg:h-20 w-full bg-gradient-to-b from-bg"></div>
        <div className="fixed z-50 left-0 bottom-0 h-10 lg:h-20 w-full bg-gradient-to-t from-bg"></div>
      </section>
    </>
  );
  null;
}
