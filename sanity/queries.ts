import { defineQuery } from 'groq';
import { client } from './client';
import { Link, Page } from './types';
import { localesType } from '@/i18n/routing';
import { unstable_cache } from 'next/cache';

// Pages Query

const pagesQuery = defineQuery(`*[_type == "page"]`);

export const getPages = (): Promise<Page[]> => {
  return client.fetch(pagesQuery);
};

const localizeHomePageQuery = (locale: localesType) => {
  return defineQuery(
    `*[_type == "page" && language == "${locale}" && seo.seoSlug == "/"]{
      ...,
      pageBlocks[] {
        ...,
        items[] {
          ...,
          link {
            ...,
            internalLink->
          }
        }
      },
      seo {
        ...,
        seoImage {
          ...,
          asset ->
        }
      }
    }`,
  );
};

export const getLocalizeHomePage = (locale: localesType): Promise<Page[]> => {
  return unstable_cache(
    async () => {
      return client.fetch(localizeHomePageQuery(locale));
    },
    [`homepage-${locale}`],
    {
      tags: [`homepage-${locale}`, 'pages'],
      revalidate: 60,
    }
  )();
};

const linksQuery = defineQuery(`*[_type == "link"]`);

export const getLinks = (): Promise<Link[]> => {
  return unstable_cache(
    async () => {
      return client.fetch(linksQuery);
    },
    ['links'],
    {
      tags: ['links'],
      revalidate: 60,
    }
  )();
};
