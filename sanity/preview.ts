import { client } from './client';

/** True in `next dev` when a read token is configured — fetches draft overlays. */
export const isLocalDraftPreview =
  process.env.NODE_ENV === 'development' &&
  Boolean(process.env.SANITY_API_READ_TOKEN);

/**
 * In local development with SANITY_API_READ_TOKEN, returns a client that
 * overlays draft documents on published ones (perspective: 'drafts').
 * Production always uses the published client.
 */
export function getClient() {
  if (!isLocalDraftPreview) {
    return client;
  }

  return client.withConfig({
    token: process.env.SANITY_API_READ_TOKEN,
    perspective: 'drafts',
    useCdn: false,
  });
}
