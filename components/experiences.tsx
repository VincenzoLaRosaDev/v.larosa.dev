'use client'

import { Experiences as ExperiencesSanity } from "@/sanity/types";
import { TailwindProps } from "@/types"
import { PaddingContainer, Tag } from "./atoms";
import { useTranslations } from "next-intl";
import { PortableText } from "next-sanity";
import ArrowIcon from '@/public/arrow_outward.svg'
import LinkIcon from '@/public/link.svg'

export interface ExperiencesProps extends TailwindProps {
  id: ExperiencesSanity['id'];
  paddingBlock: ExperiencesSanity['paddingBlock'];
  items: ExperiencesSanity['items']
}

export const Experiences = ({className, id, paddingBlock, items}: ExperiencesProps) => {
  const t = useTranslations('Index')
  return (
    <PaddingContainer id={id} padding={{_type: 'paddingBlock', ...paddingBlock}} className={`${className}`}>
      <div className="flex flex-col gap-16">
        {items?.map((item, key) => (
          <div key={key} className="group flex flex-col lg:flex-row gap-6 p-6 rounded-lg overflow-hidden hover:bg-light-grey/5 transition-all">
            <div className="uppercase archivo-black text-text-light min-w-40">
              {`
                ${item.startDate &&
                  new Date(item.startDate).getFullYear()
                } — 
                ${item.endDate ?
                  new Date(item.endDate).getFullYear()
                  : t('present')
                }
              `}
            </div>
            <div className="flex flex-col gap-4 w-full">
              <div className="">
                <div className="text-text-light archivo-black">{item.role}</div>
                <a href={item.companyLink?.href} target={`${item.companyLink?.blank ? '_blank' : '_self'}`} className="group/link flex items-center gap-3">
                  <span className="text-2xl archivo-black group-hover:text-primary transition-all ">{item.company}</span>
                  {item.companyLink?.href &&
                    <ArrowIcon className="group-hover:fill-primary fill-text group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 h-6 w-6 min-h-6 min-w-6 transition-all" />
                  }
                </a>
              </div>
              {item.richText &&
                <div className="text-text-light">
                  <PortableText value={item.richText} />
                </div>
              }
              <div className="flex flex-wrap items-center gap-3">
                {item.tag?.map((tag, key) => (
                  <a key={key} href={tag.href} target={`${tag?.blank ? '_blank' : '_self'}`} className="flex items-center gap-2.5">
                    <LinkIcon className="fill-text h-4 w-4 min-h-4 min-w-4" />
                    <span className="text-xs leading-3">{tag.label}</span>
                  </a>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {item.skills?.map((skill, key) => (
                  <Tag key={key}>{skill}</Tag>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </PaddingContainer>
  )
}