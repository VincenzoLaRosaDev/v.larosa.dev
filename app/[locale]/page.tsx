// import { RenderBlocks } from '@/components/renderBlocks';
import { RenderBlocks, ScrollTitleAnimation, SideNav } from '@/components';
import { HelloSwiper } from '@/components/helloSwiper';
import { localesType } from '@/i18n/routing';
import { getLocalizeHomePage } from '@/sanity/queries';
import type { Metadata } from 'next';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: localesType };
}): Promise<Metadata> {
  const data = await getLocalizeHomePage(locale);

  return {
    metadataBase: new URL(`${process.env.SITE_URL}`),
    title: `${data[0].seo?.seoTitle}`,
    description: `${data[0].seo?.seoDescription}`,
    alternates: {
      canonical: `${process.env.SITE_URL}/${locale}/`,
    },
    openGraph: {
      title: `${data[0].seo?.seoTitle}`,
      description: `${data[0].seo?.seoDescription}`,
      siteName: "A'Cunziria",
      type: 'website',
      images: {
        url: '/image-preview.jpg',
      },
    },
    twitter: {
      title: `${data[0].seo?.seoTitle}`,
      description: `${data[0].seo?.seoDescription}`,
      images: {
        url: '/image-preview.jpg',
      },
    },
  };
}

export default async function Home({
  params: { locale },
}: {
  params: { locale: localesType };
}) {
  const data = await getLocalizeHomePage(locale);

  return (
    <section className="lg:flex lg:justify-between lg:gap-16 gap-4">
        {/* <ScrollTitleAnimation /> */}
        <SideNav
          className="w-full lg:max-w-96 py-10 lg:py-20"
          homeBanner={data[0].homeBanner}
        />
        <div className="w-full lg:max-w-[780px] py-10 lg:py-20">
          <div className="flex justify-end">
            <HelloSwiper />
          </div>
          <RenderBlocks layout={data[0].pageBlocks} />
        </div>
    </section>
  );
  null;
}
