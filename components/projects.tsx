'use client';

import { Projects as ProjectsSanity } from '@/sanity/types';
import { TailwindProps } from '@/types';
import { CmsLink, PaddingContainer, Tag } from './atoms';
import { useTranslations } from 'next-intl';
import { PortableText } from 'next-sanity';
import ArrowIcon from '@/public/arrow_outward.svg';
import { urlFor } from '@/sanity/client';

export interface ProjectsProps extends TailwindProps {
  id: ProjectsSanity['id'];
  paddingBlock: ProjectsSanity['paddingBlock'];
  items: ProjectsSanity['items'];
}

export const Projects = ({
  className,
  id,
  paddingBlock,
  items,
}: ProjectsProps) => {
  const t = useTranslations('Index');
  return (
    <PaddingContainer
      id={id}
      padding={{ _type: 'paddingBlock', ...paddingBlock }}
      className={`${className}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {items?.map((item, key) => (
          <div key={key}>
            <CmsLink
              link={item.link}
              className="group flex items-start flex-col gap-6 p-6 rounded-lg overflow-hidden hover:bg-light-grey/5 transition-all"
            >
              <img
                src={urlFor(item.image).url()}
                alt={item.image?.alt ?? ''}
                className="w-full h-auto rounded-xl overflow-hidden"
              ></img>
              <div className="flex flex-col gap-4 w-full">
                <div className="">
                  <div className="flex items-start gap-3">
                    <span className="archivo-black group-hover:text-primary transition-all ">
                      {item.title}
                    </span>
                    {item?.link && (
                      <ArrowIcon className="group-hover:fill-primary fill-text group-hover:translate-x-0.5 group-hover:-translate-y-0.5 h-6 w-6 min-h-6 min-w-6 transition-all" />
                    )}
                  </div>
                </div>
                {item.richText && (
                  <div className="text-xs text-text-light">
                    <PortableText value={item.richText} />
                  </div>
                )}
                <div className="flex flex-wrap items-center gap-3">
                  {item.tag?.map((skill, key) => <Tag key={key}>{skill}</Tag>)}
                </div>
              </div>
            </CmsLink>
          </div>
        ))}
      </div>
    </PaddingContainer>
  );
};
