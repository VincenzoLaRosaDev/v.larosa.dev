import { defineQuery } from 'groq';
import { client } from './client';
import {
  PageQueryResult,
  PagesQueryResult,
} from './types';

// Pages Query

const pagesQuery = defineQuery(`*[_type == "page"]`);

export const getPages = (): Promise<PagesQueryResult> => {
  return client.fetch(pagesQuery);
};


const pageQueryBuild = (slug: string) => {
  return defineQuery(
    `*[_type == 'page' && seo.seoSlug == '${slug}']{
    
    }`,
  );
};

export const getPage = (slug: string): Promise<PageQueryResult> => {
  return client.fetch(pageQueryBuild(slug));
};
