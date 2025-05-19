import { defineQuery } from 'groq';
import { client } from './client';
import { Link, Page } from './types';
import { localesType } from '@/i18n/routing';

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
      }
    }`,
  );
};

export const getLocalizeHomePage = (locale: localesType): Promise<Page[]> => {
  return client.fetch(localizeHomePageQuery(locale));
};

const linksQuery = defineQuery(`*[_type == "link"]`);

export const getLinks = (): Promise<Link[]> => {
  return client.fetch(linksQuery);
};
