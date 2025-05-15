import { ContentsBlock as ContentsBlockSanity } from "@/sanity/types";
import { TailwindProps } from "@/types";
import { PaddingContainer } from "@/components";
import { PortableText } from "next-sanity";

export interface ContentsBlockProps extends TailwindProps {
  id: ContentsBlockSanity['id'];
  paddingBlock: ContentsBlockSanity['paddingBlock'];
  items: ContentsBlockSanity['items'];
}

export const ContentsBlock = ({className, id, paddingBlock, items}: ContentsBlockProps) => {
  return (
    <PaddingContainer id={id} padding={{_type: 'paddingBlock', ...paddingBlock}} className={`${className}`}>
      <div className="bg-light-grey/5 rounded-xl p-6 flex flex-col lg:flex-row flex-wrap gap-9">
        {items?.map((item, key) => (
          <div key={key} className={`${item.size === 'half' ? 'lg:w-[calc(50%_-_18px)]' : 'w-full'}`}>
            <div className="flex items-center gap-6">
              <div
                className="h-[32px] lg:h-[48px] [&>*]:h-[32px] [&>*]:lg:h-[48px] [&>*]:min-h-[32px] [&>*]:lg:min-h-[48px] w-auto rounded-md overflow-hidden"
                dangerouslySetInnerHTML={{
                  __html: item.icon ?? '',
                }}
              />
              <div>
                <div className="archivo-black text-sm text-text-light">
                  {item.tagTitle}
                </div>

                <div className="archivo-black text-2xl">
                  {item.title}
                </div>
              </div>
            </div>

            {item.richText &&
              <div className="mt-4 text-text-light">
                <PortableText value={item.richText} />
              </div>
            }
          </div>
        ))}
      </div>
    </PaddingContainer>
  )
}