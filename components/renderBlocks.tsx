'use client';

import { blocks } from '@/constants';
import { Page } from '@/sanity/types';

export const RenderBlocks = ({ layout }: { layout: Page['pageBlocks'] }) => {
  return (
    <div>
      {layout?.map((block, key) => {
        const Block = blocks[block._type as any];
        if (Block) {
          return <Block key={key} {...block} />;
        }
        return null;
      })}
    </div>
  );
};
