import { Page } from '@/sanity/types';

/** Block types that never appear in the desktop sidebar menu. */
export const NAV_EXCLUDE_TYPES = new Set(['iconsSwiper']);

export type NavItem = {
  id: string;
  title: string;
};

export function getNavItems(blocks: Page['pageBlocks']): NavItem[] {
  return (blocks ?? []).flatMap((block) => {
    if (NAV_EXCLUDE_TYPES.has(block._type)) return [];
    const id = 'id' in block ? block.id : undefined;
    const title = 'title' in block ? block.title : undefined;
    if (!id?.trim() || !title?.trim()) return [];
    return [{ id, title }];
  });
}
