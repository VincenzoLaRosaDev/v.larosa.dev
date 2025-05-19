import { apiVersion, dataset, projectId } from './env';
import imageUrlBuilder from '@sanity/image-url';
import { ClientConfig, createClient } from '@sanity/client';

const config: ClientConfig = {
  projectId: projectId,
  dataset: dataset,
  apiVersion: apiVersion,
  useCdn: false,
};

export const client = createClient(config);

const builder = imageUrlBuilder(client);

export const urlFor = (source: any) => {
  return builder.image(source);
};
